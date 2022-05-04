package com.produtos.apirest.models;

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
        this.price = price;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
