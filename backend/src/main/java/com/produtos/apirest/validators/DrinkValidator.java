package com.produtos.apirest.validators;

import com.produtos.apirest.exceptions.ApiRequestException;
import com.produtos.apirest.models.Drink;
import org.springframework.stereotype.Component;

@Component
public class DrinkValidator {

    public DrinkValidator() {
    }

    public Drink valdiateDrink(Drink drink) {
        Float price = drink.getPrice();
        String productName = drink.getProductName();
        String description = drink.getDescription();
        Integer stockAmmount = drink.getStockAmmount();
        Boolean isAlcoholic = drink.getAlcoholic();
        Boolean isActive = drink.isActive();

        if (price == null || price <= 0) {
            throw new ApiRequestException("Preço deve ser maior do que 0");
        } else if (productName == null || productName.isEmpty()) {
            throw new ApiRequestException("O Produto deve ter um nome");
        } else if (description == null || description.isEmpty()) {
            throw new ApiRequestException("O Produto deve ter uma descrição");
        } else if (stockAmmount == null || stockAmmount <= 0) {
            throw new ApiRequestException("O estoque deve ser maior que 0");
        } else if (isAlcoholic == null) {
            throw new ApiRequestException("Por favor, informe se a bebida é ou não alcóolica");
        } else if (isActive == null) {
            throw new ApiRequestException("Bebida não disponível no estoque ou não ofertada no cardápio.");
        } else {
            return drink;
        }
    }
}
