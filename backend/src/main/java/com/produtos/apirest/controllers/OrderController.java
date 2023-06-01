package com.produtos.apirest.controllers;

import com.produtos.apirest.models.*;
import com.produtos.apirest.repository.*;
import com.produtos.apirest.validators.DrinkWithdrawValidator;
import com.produtos.apirest.validators.FoodWithdrawValidadator;
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

import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import javax.transaction.Transactional;

import java.sql.Timestamp;
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
    FoodStuffWithdrawRepository foodStuffWithdrawRepository;

    @Autowired
    DrinkRepository drinkRepository;

    @Autowired
    FoodStuffRepository foodStuffRepository;

    @Autowired
    OrderRepository orderRepository;


    @Autowired
    OpenTablesRepository tablesRepository;

    @Autowired
    OrderValidator orderValidator;

    @Autowired
    TableValidator tableValidator;

    @Autowired
    DrinkWithdrawValidator drinkWithdrawValidator;

    @Autowired
    FoodWithdrawValidadator foodWithdrawValidadator;

    @Autowired
    ReturnDrinkValidator returnDrinkValidator;

    public static Date toDate(String date) {
        if (date == "")
            return null;

        return Timestamp.valueOf(date);

    }

    // -------------------------------------------------ORDERS
    // OPERATIONS------------------------------------------------
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

    // Get Commands by Id
    @GetMapping("/order/{id}")
    @Transactional
    @ApiOperation("Busca uma comanda por id")
    public OrderModel getOrdersByID(@PathVariable(value = "id") long id) {
        OrderModel order = orderRepository.findById(id);
        orderValidator.validateOrderExistence(order);
        return order;
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

    //send a body and filter closed orders by date
    @PostMapping("/order/closed")
    @ApiOperation(value = "Envia um body para filtro de data")
    public OrderModel filterPPD(@RequestBody PostBody postBody) {

        OrderModel totalOrder = new OrderModel();
        Date date1 = stringToDate(postBody.initialDate);
        Date date2 = stringToDate(postBody.finalDate);
        totalOrder.setOpeningTime(date1);
        totalOrder.setClosingTime(date2);
        totalOrder.setOrderTotal((float) 0);
        List<OrderModel> allOrders = orderRepository.findByIsOpen(false);

        for(OrderModel order : allOrders) {
            if(order.getClosingTime().compareTo(totalOrder.getClosingTime()) < 0
            && order.getClosingTime().compareTo(totalOrder.getOpeningTime()) > 0
            || order.getClosingTime().compareTo(totalOrder.getClosingTime()) == 0
            || order.getClosingTime().compareTo(totalOrder.getOpeningTime()) == 0
            ){
                //operação dentro do filtro

                PPDAxis ppd = new PPDAxis();
                ppd.setDate(order.getClosingTime());
                ppd.setProfit(order.getOrderTotal());
                totalOrder.getPPDAxisList().add(ppd);

                for(DrinkWithdrawal drinkWithdrawal : order.getDrinkWithdrawalList()){
                    ItemAxis item = new ItemAxis();
                    item.setSales(drinkWithdrawal.getQuantity());
                    item.setName(drinkWithdrawal.getDrink().getProductName());
                    totalOrder.getItemAxisList().add(item);
                }
                for(FoodWithdraw foodWithdraw : order.getFoodWithdrawalList()){
                    ItemAxis item = new ItemAxis();
                    item.setSales(foodWithdraw.getQuantity());
                    item.setName(foodWithdraw.getFood().getProductName());
                    totalOrder.getItemAxisList().add(item);
                }

                for(ItemAxis item : totalOrder.getItemAxisList()){
                    String name = item.getName();
                    for(ItemAxis itemComparate : totalOrder.getItemAxisList()){
                        if(itemComparate.getName()==name){
                            item.setSales(item.getSales()+itemComparate.getSales());
                            totalOrder.getItemAxisList().remove(itemComparate);
                        }
                    }
                }

                //
            }
        }
        return totalOrder;
    }
    public Date stringToDate(String string){
        ParsePosition pp = new ParsePosition(0);
        Date date=new SimpleDateFormat("dd/MM/yyyy").parse(string, pp);
        return date;
    }
    public static class PostBody {
        public String initialDate;
        public String finalDate;
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

    // ---------------------------------------------DRINKS OPERATIONS IN
    // ORDER-------------------------------------------
    // Create a new withdraw for Drinks;
    @PostMapping("/order/request-drink/{orderId}")
    @Transactional
    @ApiOperation(value = "Adiciona um drink na comanda e retira a quantidade de estoque selecionado referente ao item desejado. Parâmetros de URL: id da comanda e id do produto. "
            +
            "Parâmetros a serem enviados:'drinkId' e 'drinkAmount'")
    public ResponseEntity<String> drinksWithdraw(@RequestBody @Validated List<DrinkRequestObject> requestArray,
            @PathVariable(value = "orderId") long orderId) {

        for (DrinkRequestObject request : requestArray) {
            Drink requestDrink = drinkRepository.getById(request.getDrinkId());
            if (!requestDrink.isActive())
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Item {" + requestDrink.getProductName() + "} não disponibilizado para consumo!");
        }

        for (DrinkRequestObject request : requestArray) {
            Drink requestDrink = drinkRepository.getById(request.getDrinkId());

            DrinkWithdrawal withdraw = new DrinkWithdrawal(requestDrink, request.getDrinkAmount());
            drinkWithdrawValidator.validateDrinkWithdrawal(orderId, withdraw);

            OrderModel order = orderRepository.findById(orderId);

            // Save Withdraw
            withdraw.setOrder(order);
            drinkWithdrawsRepository.save(withdraw);

            // Update Order total
            order.setOrderTotal(order.getOrderTotal() + (withdraw.getQuantity() * requestDrink.getPrice()));
            orderRepository.save(order);

            // Update Drink stockAmmount
            Integer stockAvaliable = requestDrink.getStockAmmount();
            Integer newStockQuantity = stockAvaliable - withdraw.getQuantity();
            requestDrink.setStockAmmount(newStockQuantity);
            drinkRepository.save(requestDrink);
        }
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Saída contabilizada no estoque");
    }

    // Return Drink from an Order and readd stock
    // Needs to update the method to be equal drinksWithdraw, also needs to modify
    // implementations to edit quantity instead
    // of deleting the witwdraw, if the items equals 0, then the withdraw can be
    // deleted
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

    // ----------------------------------------------FOOD OPERATIONS IN
    // ORDER--------------------------------------------

    @PostMapping("/order/request-food/{orderId}")
    @Transactional
    @ApiOperation(value = "Adiciona uma porção na comanda e retira a quantidade de estoque selecionado referente ao item desejado. Parâmetros de URL: id da comanda e id do produto. "
            +
            "Parâmetros a serem enviados:'drinkId' e 'drinkAmount'")
    public ResponseEntity<String> foodWithdraw(@RequestBody @Validated List<FoodRequestObject> requestArray,
            @PathVariable(value = "orderId") long orderId) {

        for (FoodRequestObject request : requestArray) {
            FoodStuff requestFood = foodStuffRepository.findById(request.getFoodId());
            if (!requestFood.isActive())
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Item {" + requestFood.getProductName() + "} não disponibilizado para consumo!");
        }

        for (FoodRequestObject request : requestArray) {
            FoodStuff requestFood = foodStuffRepository.findById(request.getFoodId());

            FoodWithdraw withdraw = new FoodWithdraw(requestFood, request.getQuantity());
            foodWithdrawValidadator.validateFoodWithdraw(orderId, withdraw);

            OrderModel order = orderRepository.findById(orderId);

            // Save Withdraw
            withdraw.setOrder(order);
            foodStuffWithdrawRepository.save(withdraw);

            // Update Order total
            order.setOrderTotal(order.getOrderTotal() + (requestFood.getPrice() * request.getQuantity()));
            orderRepository.save(order);

        }
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Saída contabilizada no estoque");
    }

    // Return Drink from an Order and readd stock
    // Needs to update the method to be equal drinksWithdraw, also needs to modify
    // implementations to edit quantity instead
    // of deleting the witwdraw, if the items equals 0, then the withdraw can be
    // deleted
    @PutMapping("/order/{idOrder}/food-return/{idWithdraw}")
    @Transactional
    @ApiOperation("Cancelar um item 'comida' de uma comanda")
    public ResponseEntity<String> returnFoodStuff(
            @PathVariable(value = "idOrder") long idOrder,
            @PathVariable(value = "idWithdraw") long idWithdraw) {

        // Service
        FoodWithdraw deleteFood = foodStuffWithdrawRepository.findOneById(idWithdraw);
        OrderModel order = orderRepository.findById(idOrder);
        List<FoodWithdraw> orderList = order.getFoodWithdrawalList();

        orderList.remove(deleteFood);
        order.setFoodWithdrawalList(orderList);

        Float prevOrderTotal = order.getOrderTotal();
        order.setOrderTotal(prevOrderTotal - (deleteFood.getFood().getPrice() * deleteFood.getQuantity()));
        foodStuffWithdrawRepository.delete(deleteFood);
        orderRepository.save(order);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Retorno contabilizado no estoque");
    }
}
