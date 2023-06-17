package com.produtos.apirest.models;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class PPDAxis implements Serializable {
    private static final long serialVersionUID = 1L;

    @ManyToOne
    @JoinColumn(name = "comanda_id")
    private OrderModel comanda;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private Float profit;
    private String date;

    public PPDAxis() {
    }

    public PPDAxis(long id, Float profit, String date) {
        this.id = id;
        this.profit = profit;
        this.date = date;
    }

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public Float getProfit(){ return profit; }
    public void setProfit(Float profit){ this.profit = profit;};
    public String getDate(){ return date;}
    public void setDate(String date){ this.date = date;}
}
