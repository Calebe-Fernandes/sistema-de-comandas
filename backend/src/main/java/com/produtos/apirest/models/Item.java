package com.produtos.apirest.models;

import com.produtos.apirest.exceptions.ApiRequestException;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class Item implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private int sales;
    private Float price;
    private String productName;
    private String description;
    private boolean isActive;

    public Item() {
    }

    public Item(long id, int sales, Float price, String productName, String description, boolean isActive) {
        this.id = id;
        this.price = price;
        this.productName = productName;
        this.description = description;
        this.isActive = isActive;
        this.sales = sales;
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
        if (price == null || price <= 0) {
            throw new ApiRequestException("Preço deve ser maior do que 0");
        }
        this.price = price;
    }

    public int getSales(){
        return sales;
    }

    public void setSales(int sales){
        this.sales = sales;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        if (productName == null || productName.isEmpty()) {
            throw new ApiRequestException("O Produto deve ter um nome");
        }
        this.productName = productName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        if (description == null || description.isEmpty()) {
            throw new ApiRequestException("O Produto deve ter uma descrição");
        }
        this.description = description;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean isActive) {
        this.isActive = isActive;
    }
}
