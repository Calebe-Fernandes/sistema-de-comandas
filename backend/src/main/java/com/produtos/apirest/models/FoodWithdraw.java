package com.produtos.apirest.models;

import javax.persistence.*;

@Entity
@Table(name = "TB_FOOD_WITHDRAW")
public class FoodWithdraw {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne
    @JoinColumn(nullable = false)
    private FoodStuff food;

    @ManyToOne
    @JoinColumn(name = "comanda_id")
    private OrderModel comanda;

    public FoodWithdraw() {
    }

    public FoodWithdraw(FoodStuff food, OrderModel comanda) {
        this.food = food;
        this.comanda = comanda;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public FoodStuff getFood() {
        return food;
    }

    public void setFood(FoodStuff food) {
        this.food = food;
    }

    public OrderModel getComanda() {
        return comanda;
    }

    public void setComanda(OrderModel comanda) {
        this.comanda = comanda;
    }
}
