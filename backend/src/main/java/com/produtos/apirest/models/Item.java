package com.produtos.apirest.models;

import com.produtos.apirest.exceptions.ApiRequestException;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class Item implements Serializable {
    private static final long serialVersionUID =1L;

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;

    private Float price;
    private String productName;
    private String description;

    public Item(){}

    public Item(long id, Float price, String productName, String description) {
        this.id = id;
        this.price = price;
        this.productName = productName;
        this.description = description;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        if(price == null || price <= 0){
            throw new ApiRequestException("Preço deve ser maior do que 0");
        }
        this.price = price;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        if(productName == null || productName.isEmpty()){
            throw new ApiRequestException("O Produto deve ter um nome");
        }
        this.productName = productName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        if(description == null || description.isEmpty()){
            throw new ApiRequestException("O Produto deve ter uma descrição");
        }
        this.description = description;
    }
}
