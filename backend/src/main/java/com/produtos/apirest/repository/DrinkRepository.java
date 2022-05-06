package com.produtos.apirest.repository;

import com.produtos.apirest.models.Drink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface DrinkRepository extends JpaRepository<Drink,Long> {

    Drink findById(long id);

}
