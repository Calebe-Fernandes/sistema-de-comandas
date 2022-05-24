package com.produtos.apirest.repository;

import java.util.Date;
import java.util.List;

import com.produtos.apirest.models.OrderModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrderRepository extends JpaRepository<OrderModel, Long> {

    OrderModel findById(long id);

    OrderModel findByTable(int table);

    @Query("SELECT o FROM OrderModel o where  date(o.openingTime) = '2022-05-12'")
    List<OrderModel> getCommandsByWorkday(String openingTime);

    List<OrderModel> findByIsOpen(Boolean isOpen);

    Boolean existsById(long id);
}
