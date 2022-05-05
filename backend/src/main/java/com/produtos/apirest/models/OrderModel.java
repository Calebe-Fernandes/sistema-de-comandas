package com.produtos.apirest.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="TB_ORDER_MODEL")
public class OrderModel {
    private static final long serialVersionUID =1L;

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;
    private Integer table;
    private Boolean isOpen;
    private Date openingTime;
    private Date closingTime;
    private Float orderTotal;


    @OneToMany(mappedBy = "comanda")
    @JsonIgnoreProperties("order")
    private List<DrinkWithdrawal> drinkWithdrawalList;

    @OneToMany(mappedBy = "comanda")
    private List<ReturnDrink> returnedDrinksList;

    public OrderModel() {}

    public OrderModel(long id, Integer table, Boolean isOpen, Date openingTime, Date closingTime, List<DrinkWithdrawal> drinkWithdrawalList, List<ReturnDrink> returnedDrinksList) {
        this.id = id;
        this.table = table;
        this.isOpen = isOpen;
        this.openingTime = openingTime;
        this.closingTime = closingTime;
        this.drinkWithdrawalList = drinkWithdrawalList;
        this.returnedDrinksList = returnedDrinksList;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Integer getTable() {
        return table;
    }

    public void setTable(Integer table) {
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

    public List<ReturnDrink> getReturnedDrinksList() {
        return returnedDrinksList;
    }

    public void setReturnedDrinksList(List<ReturnDrink> returnedDrinksList) {
        this.returnedDrinksList = returnedDrinksList;
    }

    public Float getOrderTotal() {
        return orderTotal;
    }

    public void setOrderTotal(Float orderTotal) {
        this.orderTotal = orderTotal;
    }
}
