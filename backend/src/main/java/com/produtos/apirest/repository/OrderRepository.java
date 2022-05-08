package com.produtos.apirest.repository;

import com.produtos.apirest.models.OrderModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<OrderModel, Long> {

    OrderModel findById(long id);

    Boolean existsById(long id);
}
