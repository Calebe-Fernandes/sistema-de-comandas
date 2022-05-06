package com.produtos.apirest.validators;

import com.produtos.apirest.exceptions.ApiRequestException;
import com.produtos.apirest.models.AvaliableTable;
import com.produtos.apirest.models.OrderModel;
import com.produtos.apirest.repository.OpenTables;
import org.springframework.beans.factory.annotation.Autowired;

public class TableValidator {
    @Autowired
    OpenTables openTables;

    public TableValidator(){}

    public void validateTable (OrderModel order){
        Integer tableNumber = order.getTable();
        if(openTables.findTableByNumber(tableNumber) != null){
            throw new ApiRequestException("A mesa já está aberta");
        }else{
            registerTable(order);
        }
    }

    public void registerTable(OrderModel order){
        Integer tableNumber = order.getTable();
        AvaliableTable table = new AvaliableTable(tableNumber);
        openTables.save(table);
    }
}
