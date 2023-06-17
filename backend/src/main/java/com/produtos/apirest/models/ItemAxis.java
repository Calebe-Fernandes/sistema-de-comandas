package com.produtos.apirest.models;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class ItemAxis implements Serializable {
    private static final long serialVersionUID = 1L;

    @ManyToOne
    @JoinColumn(name = "comanda_id")
    private OrderModel comanda;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private float price;
    private String name;
    private int sales;

    public ItemAxis() {
    }

    public ItemAxis(float price, String name, int sales) {
        this.price = price;
        this.name = name;
        this.sales = sales;
    }

    public float getPrice() {
        return price;
    }
    public void setPrice(float price) {
        this.price = price;
    }
    public String getName(){ return name; }
    public void setName(String name){ this.name = name;};
    public int getSales(){ return sales;}
    public void setSales(int sales){ this.sales = sales;}
}
