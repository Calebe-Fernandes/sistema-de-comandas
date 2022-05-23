package com.produtos.apirest.validators;

import com.produtos.apirest.exceptions.ApiRequestException;
import com.produtos.apirest.models.FoodStuff;
import com.produtos.apirest.models.FoodWithdraw;
import com.produtos.apirest.models.OrderModel;
import com.produtos.apirest.repository.FoodStuffRepository;
import com.produtos.apirest.repository.OrderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class FoodWithdrawValidadator {

    @Autowired
    FoodStuffRepository foodStuffRepository;

    @Autowired
    OrderRepository orderRepository;

    public void validateFoodWithdraw(long idOrder, FoodWithdraw withdraw) {
        OrderModel order;
        FoodStuff food = withdraw.getFood();

        if (orderRepository.existsById(idOrder) && foodStuffRepository.existsById(food.getId()))
            order = orderRepository.findById(idOrder);
        else
            throw new ApiRequestException("Não existe comida ou comanda");

        if (!order.getOpen())
            throw new ApiRequestException("A comanda precisa estar aberta");
        else if (food.getIsAvaliable())
            throw new ApiRequestException("Comida não disponivel");

    }

}
