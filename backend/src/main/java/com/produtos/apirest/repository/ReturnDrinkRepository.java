package com.produtos.apirest.repository;

import com.produtos.apirest.models.ReturnDrink;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReturnDrinkRepository extends JpaRepository<ReturnDrink,Long> {
    ReturnDrink findById(long id);
}
