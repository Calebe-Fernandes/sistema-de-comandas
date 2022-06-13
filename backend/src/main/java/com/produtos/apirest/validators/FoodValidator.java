package com.produtos.apirest.validators;

import com.produtos.apirest.exceptions.ApiRequestException;
import com.produtos.apirest.models.FoodStuff;
import org.springframework.stereotype.Component;

@Component
public class FoodValidator {
    public FoodValidator() {
    }

    public FoodStuff validateFood(FoodStuff food) {
        Float price = food.getPrice();
        String productName = food.getProductName();
        String description = food.getDescription();
        Boolean isAvaliable = food.getIsAvaliable();
        Boolean isActive = food.isActive();

        if (price == null || price <= 0) {
            throw new ApiRequestException("Preço deve ser maior do que 0");
        } else if (productName == null || productName.isEmpty()) {
            throw new ApiRequestException("O Produto deve ter um nome");
        } else if (description == null || description.isEmpty()) {
            throw new ApiRequestException("O Produto deve ter uma descrição");
        } else if (isAvaliable == null) {
            throw new ApiRequestException("A disponibilidade do produto deve ser informada");
        } else if (isActive == null) {
            throw new ApiRequestException("Informe se será ofertada no cardápio.");
        } else {
            return food;
        }
    }
}
