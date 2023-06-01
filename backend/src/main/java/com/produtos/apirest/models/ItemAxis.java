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
    private long id;
    private String name;
    private int sales;

    public ItemAxis() {
    }

    public ItemAxis(long id, String name, int sales) {
        this.id = id;
        this.name = name;
        this.sales = sales;
    }

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getName(){ return name; }
    public void setName(String name){ this.name = name;};
    public int getSales(){ return sales;}
    public void setSales(int sales){ this.sales = sales;}
}
