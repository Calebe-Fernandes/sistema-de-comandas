package com.produtos.apirest.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.Date;
import java.util.List;

@Entity
@Component
@Table(name = "TB_ORDER_MODEL")
public class OrderModel {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private int table;
    private Boolean isOpen;
    private Date openingTime;
    private Date closingTime;
    private Float orderTotal;

    @OneToMany(mappedBy = "comanda")
    @JsonIgnoreProperties("order")
    private List<DrinkWithdrawal> drinkWithdrawalList;

    @OneToMany(mappedBy = "comanda")
    @JsonIgnoreProperties("order")
    private List<FoodWithdraw> foodWithdrawalList;

    public OrderModel() {
    }

    public OrderModel(long id, int table, Boolean isOpen, Date openingTime, Date closingTime,
            List<DrinkWithdrawal> drinkWithdrawalList, List<FoodWithdraw> foodWithdrawalList) {
        this.id = id;
        this.table = table;
        this.isOpen = isOpen;
        this.openingTime = openingTime;
        this.closingTime = closingTime;
        this.drinkWithdrawalList = drinkWithdrawalList;
        this.foodWithdrawalList = foodWithdrawalList;
    }

    public OrderModel setOrderAttrOnCreate() {
        this.setOpen(true);
        this.setOrderTotal((float) 0);
        this.setOpeningTime(Timestamp.from(Instant.now()));
        return this;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getTable() {
        return table;
    }

    public void setTable(int table) {
        this.table = table;
    }

    public Boolean getOpen() {
        return isOpen;
    }

    public void setOpen(Boolean open) {
        isOpen = open;
    }

    public Date getOpeningTime() {
        return openingTime;
    }

    public void setOpeningTime(Date openingTime) {
        this.openingTime = openingTime;
    }

    public Date getClosingTime() {
        return closingTime;
    }

    public void setClosingTime(Date closingTime) {
        this.closingTime = closingTime;
    }

    public List<DrinkWithdrawal> getDrinkWithdrawalList() {
        return drinkWithdrawalList;
    }

    public void setDrinkWithdrawalList(List<DrinkWithdrawal> drinkWithdrawalList) {
        this.drinkWithdrawalList = drinkWithdrawalList;
    }

    public Float getOrderTotal() {
        return orderTotal;
    }

    public void setOrderTotal(Float orderTotal) {
        this.orderTotal = orderTotal;
    }

    public List<FoodWithdraw> getFoodWithdrawalList() {
        return foodWithdrawalList;
    }

    public void setFoodWithdrawalList(List<FoodWithdraw> foodWithdrawalList) {
        this.foodWithdrawalList = foodWithdrawalList;
    }

}
