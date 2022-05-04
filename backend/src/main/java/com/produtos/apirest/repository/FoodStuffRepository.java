package com.produtos.apirest.repository;

import com.produtos.apirest.models.FoodStuff;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodStuffRepository extends JpaRepository<FoodStuff,Long> {
    FoodStuff findById(long id);
}
