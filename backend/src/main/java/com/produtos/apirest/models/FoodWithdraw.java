package com.produtos.apirest.models;

import javax.persistence.*;

import org.hibernate.annotations.OnDelete;

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

    private Integer quantity;

    public FoodWithdraw() {
    }

    public FoodWithdraw(FoodStuff food, int quantity) {
        this.food = food;
        this.quantity = quantity;
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

    public OrderModel getOrder() {
        return comanda;
    }

    public void setOrder(OrderModel order) {
        this.comanda = order;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
