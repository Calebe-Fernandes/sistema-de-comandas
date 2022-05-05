package com.produtos.apirest.controllers;

import com.produtos.apirest.exceptions.ApiRequestException;
import com.produtos.apirest.models.*;
import com.produtos.apirest.repository.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.hibernate.criterion.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;


@RestController
@RequestMapping(value="/api")
@Api(value="API REST Produtos")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    DrinkWithdrawsRepository drinkWithdrawsRepository;

    @Autowired
    DrinkRepository drinkRepository;

    @Autowired
    ReturnDrinkRepository returnDrinkRepository;

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OpenTables openTables;

    //Create and Open a new Order
    @PostMapping("/order")
    @Transactional
    @ApiOperation("Cria e abre uma nova ordem. Ao criar a ordem, enviar apenas o parâmetro 'table'")
    public OrderModel createOrder(@RequestBody OrderModel order){
        Integer tableNumber = order.getTable();

        if(openTables.findTableByNumber(tableNumber) != null){
            throw new ApiRequestException("A mesa já está aberta");
        }else{
            AvaliableTable table = new AvaliableTable(tableNumber);
            order.setOpen(true);
            order.setOpeningTime(Timestamp.from(Instant.now()));
            openTables.save(table);
            return orderRepository.save(order);
        }
    }
    //Create a new withdraw for Drinks;
    @PostMapping("/order/{idOrder}/drink-withdrawal/{idDrink}")
    @Transactional
    @ApiOperation(value="Retira a quantidade de estoque selecionado referente ao item desejado. Parâmetros de URL: id da comanda e id do produto. Parâmetros a serem enviados: 'quantity'")
    public ResponseEntity<String> drinksWithdraw(
            @RequestBody @Validated DrinkWithdrawal withdrawal,
            @PathVariable(value="idOrder") long idOrder,
            @PathVariable(value="idDrink") long idDrink
    ){
        OrderModel order = orderRepository.findById(idOrder);
        withdrawal.setOrder(order);

        Drink drink = drinkRepository.findById(idDrink);
        withdrawal.setDrink(drink);

        Integer stockAvaliable = drink.getStockAmmount();

        if(withdrawal.getOrder() == null){
            throw new ApiRequestException("Não há uma comanda associada à transação");
        }else if(drink == null){
            throw new ApiRequestException("Não há objeto cadastrado com esse id");
        }else if(withdrawal.getQuantity() > stockAvaliable){
            throw new ApiRequestException("Não existe estoque suficiente");
        }else if(withdrawal.getQuantity() <= 0){
            throw new ApiRequestException("O valor de itens a serem retirados deve ser maior que 0");
        }
        else{
            drinkWithdrawsRepository.save(withdrawal);

            List<DrinkWithdrawal> associatedTransaction = drinkWithdrawsRepository.findById(withdrawal.getId());
            order.setDrinkWithdrawalList(associatedTransaction);
            order.setOrderTotal(order.getOrderTotal() + (withdrawal.getQuantity()*drink.getPrice()));
            orderRepository.save(order);

            Integer newStockQuantity = stockAvaliable - withdrawal.getQuantity();
            drink.setStockAmmount(newStockQuantity);
            drinkRepository.save(drink);

            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Saída contabilizada no estoque");
        }
    }

    //Get Commands (needs to be filtered to return only open commands)
    @GetMapping("/order/{id}")
    @Transactional
    @ApiOperation("Cria e abre uma nova ordem. Ao criar a ordem, o usuário deve enviar também ao menos um produto")
    public OrderModel getOrders(@PathVariable(value="id") long id){

        return orderRepository.findById(id);
    }

    //Close Order
    @PutMapping("/order/{id}")
    @Transactional
    @ApiOperation("Fecha a comanda de uma mesa, tornando a mesa disponível novamente")
    public OrderModel closeOrder(
            @RequestBody @Validated OrderModel order,
            @PathVariable(value="id") long id
    ){
        order.setOpen(false);
        order.setClosingTime(Timestamp.from(Instant.now()));
        AvaliableTable closingTable = openTables.findTableByNumber(order.getTable());
        openTables.delete(closingTable);
        return orderRepository.save(order);
    }

    //Return Drink from an Order and readd stock
    @PostMapping("/order/{id}/drink-return")
    @Transactional
    @ApiOperation("Adiciona ao estoque a quantidade correta ao cancelar um item 'bebida' de uma comanda")
    public ResponseEntity<String> returnDrinks(
            @RequestBody @Validated ReturnDrink returnDrink,
            @PathVariable(value="id") long id
    ){
        Drink drink = drinkRepository.findById(id);
        Integer stockAvaliable = drink.getStockAmmount();

        returnDrinkRepository.save(returnDrink);
        Integer newStockQuantity = stockAvaliable + returnDrink.getQuantity();
        drink.setStockAmmount(newStockQuantity);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Retorno contabilizado no estoque");
    }
}
