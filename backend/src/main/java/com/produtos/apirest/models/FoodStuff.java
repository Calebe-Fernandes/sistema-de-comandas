package com.produtos.apirest.models;

import com.produtos.apirest.exceptions.ApiRequestException;

import javax.persistence.*;

@Entity
@Table(name = "TB_FOODSTUFF")
public class FoodStuff extends Item {

    private Boolean isAvaliable;

    public FoodStuff() {
    }

    public FoodStuff(long id, int sales, Float price, String productName, String description, Boolean isAvaliable) {
        super(id, sales, price, productName, description, true);
        this.isAvaliable = isAvaliable;
    }

    public Boolean getIsAvaliable() {
        return isAvaliable;
    }

    public void setIsAvaliable(Boolean avaliable) {
        if (avaliable == null) {
            throw new ApiRequestException("A disponibilidade do produto deve ser informada");
        }
        isAvaliable = avaliable;
    }
}
