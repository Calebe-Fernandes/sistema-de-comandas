package com.produtos.apirest.models;

import javax.persistence.*;

@Entity
@Table(name = "TB_TABLES")
public class AvaliableTable {

    @Id
    private Integer number;

    public AvaliableTable() {
    }

    public AvaliableTable(Integer number) {
        this.number = number;
    }

    public Integer getTableNumber() {
        return number;
    }

    public void setTableNumber(Integer tableNumber) {
        this.number = tableNumber;
    }
}
