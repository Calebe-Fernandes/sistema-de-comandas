package com.produtos.apirest.models;

import javax.persistence.*;

@Entity
@Table(name="TB_DRINKS_WITHDRAWS")
public class DrinkWithdrawal {
    private static final long serialVersionUID =1L;

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Drink drink;

    @ManyToOne
    @JoinColumn(name="comanda_id")
    private OrderModel comanda;

    @Column(nullable = false)
    private Integer quantity;


    public DrinkWithdrawal(){}

    public DrinkWithdrawal(Drink drink, Integer quantity) {
        this.drink = drink;
        this.quantity = quantity;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Drink getDrink() {
        return drink;
    }

    public void setDrink(Drink drink) {
        this.drink = drink;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public OrderModel getOrder() {
        return comanda;
    }

    public void setOrder(OrderModel order) {
        this.comanda = order;
    }
}
