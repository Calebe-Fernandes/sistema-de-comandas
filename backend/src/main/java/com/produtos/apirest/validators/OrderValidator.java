package com.produtos.apirest.validators;

import com.produtos.apirest.exceptions.ApiRequestException;
import com.produtos.apirest.models.OrderModel;


public class OrderValidator {

    public OrderValidator(){}

    TableValidator tableValdiator = new TableValidator();

    public void validateOrder(OrderModel order){
        Integer tableNumber = order.getTable();
        if(tableNumber <= 0 || tableNumber == null){
            throw new ApiRequestException("Por favor entre um número válido para a mesa");
        }else{
            tableValdiator.validateTable(order);
        }
    }
}
