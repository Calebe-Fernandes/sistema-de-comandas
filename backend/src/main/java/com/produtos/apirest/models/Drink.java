package com.produtos.apirest.models;

import com.produtos.apirest.exceptions.ApiRequestException;

import javax.persistence.*;

@Entity
@Table(name = "TB_DRINKS")
public class Drink extends Item {

    private Integer stockAmmount;
    private Boolean isAlcoholic;

    public Drink() {
    }

    public Drink(long id, int sales, Float price, String productName, String description, Integer stockAmmount,
            Boolean isAlcoholic) {
        super(id, sales, price, productName, description, true);
        this.stockAmmount = stockAmmount;
        this.isAlcoholic = isAlcoholic;
    }

    public Integer getStockAmmount() {
        return stockAmmount;
    }

    public void setStockAmmount(Integer stockAmmount) {
        if (stockAmmount == null || stockAmmount <= 0) {
            throw new ApiRequestException("O estoque deve ser maior que 0");
        }
        this.stockAmmount = stockAmmount;
    }

    public Boolean getAlcoholic() {
        return isAlcoholic;
    }

    public void setAlcoholic(Boolean alcoholic) {
        if (alcoholic == null) {
            throw new ApiRequestException("Por favor, informe se a bebida é ou não alcóolica");
        }
        isAlcoholic = alcoholic;
    }
}
