package com.produtos.apirest.validators;

import com.produtos.apirest.exceptions.ApiRequestException;
import com.produtos.apirest.models.Drink;
import com.produtos.apirest.models.DrinkWithdrawal;
import com.produtos.apirest.models.OrderModel;
import com.produtos.apirest.repository.DrinkRepository;
import com.produtos.apirest.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DrinkWithdrawValidator {
    @Autowired
    DrinkRepository drinkRepository;

    @Autowired
    OrderRepository orderRepository;

    public DrinkWithdrawValidator() {
    }

    public void validateDrinkWithdrawal(long idOrder, DrinkWithdrawal withdrawal) {

        OrderModel order;
        Drink drink = withdrawal.getDrink();

        if (orderRepository.existsById(idOrder) && drinkRepository.existsById(drink.getId())) {
            order = orderRepository.findById(idOrder);
        } else {
            throw new ApiRequestException("Não existe bebida ou comanda");
        }

        if (!order.getOpen()) {
            throw new ApiRequestException("A comanda precisa estar aberta");
        } else if (drink.getStockAmmount() < withdrawal.getQuantity()) {
            throw new ApiRequestException("Não existe estoque suficiente");
        } else if (withdrawal.getQuantity() == 0) {
            throw new ApiRequestException("O valor de itens a serem retirados deve ser maior que 0");
        }
        if (withdrawal.getQuantity() <= 0) {
            throw new ApiRequestException("Você deve solicitar a compra de pelo menos um item");
        }

    }

}
