package com.produtos.apirest.repository;

import com.produtos.apirest.models.AvaliableTable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface OpenTablesRepository extends JpaRepository<AvaliableTable,Integer> {
    AvaliableTable findByNumber(Integer number);
    Boolean existsByNumber(Integer number);
}
