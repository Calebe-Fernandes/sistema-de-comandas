package com.produtos.apirest.models;

import javax.persistence.*;

@Entity
@Table(name="TB_DRINKS")
public class Drink extends Item{

    private Integer stockAmmount;
    private Boolean isAlcoholic;

    public Drink(){}

    public Drink(long id, Float price, String productName, String description, Integer stockAmmount, Boolean isAlcoholic) {
        super(id, price, productName, description);
        this.stockAmmount = stockAmmount;
        this.isAlcoholic = isAlcoholic;
    }

    public Integer getStockAmmount() {
        return stockAmmount;
    }

    public void setStockAmmount(Integer stockAmmount) {
        this.stockAmmount = stockAmmount;
    }

    public Boolean getAlcoholic() {
        return isAlcoholic;
    }

    public void setAlcoholic(Boolean alcoholic) {
        isAlcoholic = alcoholic;
    }
}
