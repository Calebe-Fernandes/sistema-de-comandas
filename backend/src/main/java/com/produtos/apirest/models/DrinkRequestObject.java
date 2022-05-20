package com.produtos.apirest.models;

public class DrinkRequestObject {

    private Long orderId;
    private Long drinkId;
    private Integer drinkAmount;

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getDrinkId() {
        return drinkId;
    }

    public void setDrinkId(Long drinkId) {
        this.drinkId = drinkId;
    }

    public Integer getDrinkAmount() {
        return drinkAmount;
    }

    public void setDrinkAmount(Integer drinkAmount) {
        this.drinkAmount = drinkAmount;
    }

}
