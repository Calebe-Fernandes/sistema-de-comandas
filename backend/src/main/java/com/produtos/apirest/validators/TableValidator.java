package com.produtos.apirest.validators;

import com.produtos.apirest.exceptions.ApiRequestException;
import com.produtos.apirest.models.AvaliableTable;
import com.produtos.apirest.models.OrderModel;
import com.produtos.apirest.repository.OpenTablesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TableValidator {
    @Autowired
    OpenTablesRepository openTablesRepository;

    public TableValidator(){}

    public TableValidator(OpenTablesRepository openTablesRepository) {
        this.openTablesRepository = openTablesRepository;
    }

    public void validateTable (OrderModel order){
        Integer tableNumber = order.getTable();
        if(openTablesRepository.existsByNumber(tableNumber)){
            throw new ApiRequestException("A mesa já está aberta");
        }
    }

    public void registerTable(OrderModel order){
        Integer tableNumber = order.getTable();
        AvaliableTable table = new AvaliableTable(tableNumber);
        openTablesRepository.save(table);
    }
}
