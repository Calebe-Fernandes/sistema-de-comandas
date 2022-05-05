package com.produtos.apirest.repository;

import com.produtos.apirest.models.AvaliableTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OpenTables extends JpaRepository<AvaliableTable,Integer> {
    AvaliableTable findTableByNumber(Integer number);
}
