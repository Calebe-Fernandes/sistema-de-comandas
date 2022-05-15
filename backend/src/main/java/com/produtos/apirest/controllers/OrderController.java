package com.produtos.apirest.controllers;

import com.produtos.apirest.exceptions.ApiRequestException;
import com.produtos.apirest.models.*;
import com.produtos.apirest.repository.*;
import com.produtos.apirest.validators.DrinkWithdrawValidator;
import com.produtos.apirest.validators.OrderValidator;
import com.produtos.apirest.validators.ReturnDrinkValidator;
import com.produtos.apirest.validators.TableValidator;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(value = "/api")
@Api(value = "API REST Produtos")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    DrinkWithdrawsRepository drinkWithdrawsRepository;

    @Autowired
    DrinkRepository drinkRepository;

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OpenTablesRepository tablesRepository;

    @Autowired
    OrderValidator orderValidator;

    @Autowired
    TableValidator tableValidator;

    @Autowired
    DrinkWithdrawValidator withdrawValidator;

    @Autowired
    ReturnDrinkValidator returnDrinkValidator;

    public static Date toDate(String date) {
        if (date == "")
            return null;

        return Timestamp.valueOf(date);

    }

    // Create and Open a new Order
    @PostMapping("/order")
    @Transactional
    @ApiOperation("Cria e abre uma nova ordem. Ao criar a ordem, enviar apenas o parâmetro 'table'")
    public OrderModel createOrder(@RequestBody OrderModel order) {
        orderValidator.validateOrder(order);
        tableValidator.validateTable(order);

        Integer tableNumber = order.getTable();
        AvaliableTable table = new AvaliableTable(tableNumber);
        tablesRepository.save(table);

        order.setOrderAttrOnCreate();

        return orderRepository.save(order);
    }

    // Create a new withdraw for Drinks;
    @PostMapping("/order/{idOrder}/drink-withdrawal/{idDrink}")
    @Transactional
    @ApiOperation(value = "Retira a quantidade de estoque selecionado referente ao item desejado. Parâmetros de URL: id da comanda e id do produto. Parâmetros a serem enviados: 'quantity'")
    public ResponseEntity<String> drinksWithdraw(
            @RequestBody @Validated DrinkWithdrawal withdrawal,
            @PathVariable(value = "idOrder") long idOrder) {

        long drinkId = withdrawal.getDrink().getId();
        withdrawValidator.validateDrinkWithdrawal(idOrder, withdrawal);

        // Save Withdraw
        OrderModel order = orderRepository.findById(idOrder);
        Drink drink = drinkRepository.findById(drinkId);

        withdrawal.setOrder(order);
        withdrawal.setDrink(drink);

        drinkWithdrawsRepository.save(withdrawal);

        // Associate Withdraw and Order
        List<DrinkWithdrawal> associatedTransaction = drinkWithdrawsRepository.findById(withdrawal.getId());
        order.setDrinkWithdrawalList(associatedTransaction);

        // Update Order total
        order.setOrderTotal(order.getOrderTotal() + (withdrawal.getQuantity() * drink.getPrice()));
        orderRepository.save(order);

        // Update Drink stockAmmount
        Integer stockAvaliable = drink.getStockAmmount();
        Integer newStockQuantity = stockAvaliable - withdrawal.getQuantity();
        drink.setStockAmmount(newStockQuantity);
        drinkRepository.save(drink);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Saída contabilizada no estoque");
    }

    // Get Commands by Id
    @GetMapping("/order/{id}")
    @Transactional
    @ApiOperation("Busca uma comanda por id")
    public OrderModel getOrdersByID(@PathVariable(value = "id") long id) {
        return orderRepository.findById(id);
    }

    // Get All Commands
    @GetMapping("/order")
    @Transactional
    @ApiOperation("Busca todas as comandas registradas no sistema com filtro de period (yyyy-mm-dd)")
    public List<OrderModel> getAllOrders(@RequestParam(value = "workDay", required = false) String workDay) {

        if (workDay != null)
            return orderRepository.getCommandsByWorkday(workDay);

        return orderRepository.findAll();
    }

    // Get All Open Commands
    @GetMapping("/order/open")
    @Transactional
    @ApiOperation("Busca todas as comandas abertas")
    public List<OrderModel> getOpenCommandsOrders() {
        return orderRepository.findByIsOpen(true);
    }

    // Get All Closed Commands
    @GetMapping("/order/closed")
    @Transactional
    @ApiOperation("Busca todas as comandas abertas")
    public List<OrderModel> getClosedCommandsOrders() {
        return orderRepository.findByIsOpen(false);
    }

    // Close Order
    @PutMapping("/order/close/{id}")
    @Transactional
    @ApiOperation("Fecha a comanda de uma mesa, tornando a mesa disponível novamente")
    public OrderModel closeOrder(
            @PathVariable(value = "id") long id) {
        OrderModel order = orderRepository.findById(id);
        order.setOpen(false);
        order.setClosingTime(Timestamp.from(Instant.now()));

        AvaliableTable closingTable = tablesRepository.findByNumber(order.getTable());
        tablesRepository.delete(closingTable);

        return orderRepository.save(order);
    }

    // Return Drink from an Order and readd stock
    @PutMapping("/order/{idOrder}/drink-return/{idWithdraw}")
    @Transactional
    @ApiOperation("Adiciona ao estoque a quantidade correta ao cancelar um item 'bebida' de uma comanda")
    public ResponseEntity<String> returnDrinks(
            @PathVariable(value = "idOrder") long idOrder,
            @PathVariable(value = "idWithdraw") long idWithdraw) {

        returnDrinkValidator.validateReturnDrink(idOrder, idWithdraw);
        // Service
        DrinkWithdrawal deleteDrink = drinkWithdrawsRepository.findOneById(idWithdraw);
        OrderModel order = orderRepository.findById(idOrder);
        List<DrinkWithdrawal> orderList = order.getDrinkWithdrawalList();

        int index = orderList.indexOf(deleteDrink);
        DrinkWithdrawal e = orderList.get(index);

        Drink drink = e.getDrink();
        Integer currentStock = drink.getStockAmmount();
        Integer readdStock = e.getQuantity();

        drink.setStockAmmount(currentStock + readdStock);
        drinkRepository.save(drink);

        Float prevOrderTotal = order.getOrderTotal();
        order.setOrderTotal(prevOrderTotal - (deleteDrink.getQuantity() * deleteDrink.getDrink().getPrice()));
        drinkWithdrawsRepository.delete(deleteDrink);
        orderRepository.save(order);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Retorno contabilizado no estoque");
    }

}
