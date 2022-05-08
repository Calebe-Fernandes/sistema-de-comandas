package com.produtos.apirest.validators;

import com.produtos.apirest.exceptions.ApiRequestException;
import com.produtos.apirest.models.OrderModel;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
public class OrderValidator {


    public OrderValidator(){}

    public void validateOrder(OrderModel order){
        Integer tableNumber = order.getTable();
        if(tableNumber <= 0 || tableNumber == null){
            throw new ApiRequestException("Por favor entre um número válido para a mesa");
        }
    }
}
