package com.produtos.apirest.validators;

import com.produtos.apirest.exceptions.ApiRequestException;
import com.produtos.apirest.models.OrderModel;
import com.produtos.apirest.repository.DrinkWithdrawsRepository;
import com.produtos.apirest.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ReturnDrinkValidator {

    public ReturnDrinkValidator() {
    }

    @Autowired
    DrinkWithdrawsRepository drinkWithdrawsRepository;
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    OrderModel order;

    public void validateReturnDrink(long idOrder, long idWithdraw){

        order = orderRepository.findById(idOrder);
        Boolean isOpen = order.getOpen();

        if(!orderRepository.existsById(idOrder)){
            throw new ApiRequestException("A comanda não existe");
        }else if(!drinkWithdrawsRepository.existsById(idWithdraw)){
            throw new ApiRequestException("A operação de retirada não existe");
        }else if(!isOpen){
            throw new ApiRequestException("A comanda já está fechada");
        }
    }
}
