package com.produtos.apirest.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "TB_ProfitPerDay")
public class ProfitPerDay {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private float profit;
    @Temporal(TemporalType.DATE)
    Date initialDate;
    @Temporal(TemporalType.DATE)
    Date finalDate;

    @Column
    @ElementCollection(targetClass=Integer.class)
    private List<DrinkWithdrawal> drinkWithdrawalList;

    @Column
    @ElementCollection(targetClass=Integer.class)
    private List<FoodWithdraw> foodWithdrawalList;

    @Column
    @ElementCollection(targetClass=Integer.class)
    private List<Item> itemList;
    public ProfitPerDay(){}
    public ProfitPerDay(long id, Float profit, Date initialDate, Date finalDate,
                        List<DrinkWithdrawal> drinkWithdrawalList,
                        List<FoodWithdraw> foodWithdrawalList,
                        List<Item> itemList) {
        this.id = id;
        this.profit = profit;
        this.initialDate = initialDate;
        this.finalDate = finalDate;
        this.drinkWithdrawalList = drinkWithdrawalList;
        this.foodWithdrawalList = foodWithdrawalList;
        this.itemList = itemList;
    }

    public long getId(){
        return id;
    }
    public float getProfit(){
        return profit;
    }
    public Date getInitialDate(){
        return initialDate;
    }
    public Date getFinalDate(){
        return finalDate;
    }
    public void setId(long id) {
        this.id = id;
    }
    public void setProfit(float profit){
        this.profit = profit;
    }
    public void setInitialDate(Date initialDate){
        this.initialDate = initialDate;
    }
    public void setFinalDate(Date finalDate){
        this.finalDate = finalDate;
    }
    public List<DrinkWithdrawal> getDrinkWithdrawalList() {
        return drinkWithdrawalList;
    }
    public void setDrinkWithdrawalList(List<DrinkWithdrawal> drinkWithdrawalList) {
        this.drinkWithdrawalList = drinkWithdrawalList;
    }
    public List<FoodWithdraw> getFoodWithdrawalList() {
        return foodWithdrawalList;
    }
    public void setFoodWithdrawalList(List<FoodWithdraw> foodWithdrawalList) {
        this.foodWithdrawalList = foodWithdrawalList;
    }
    public List<Item> getItemList() {
        return itemList;
    }
    public void setItemList(List<Item> itemList) {
        this.itemList = itemList;
    }
}
