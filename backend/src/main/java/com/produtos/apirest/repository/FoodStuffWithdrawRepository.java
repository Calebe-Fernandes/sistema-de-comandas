package com.produtos.apirest.repository;

import com.produtos.apirest.models.FoodWithdraw;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FoodStuffWithdrawRepository extends JpaRepository<FoodWithdraw, Long> {
    List<FoodWithdraw> findById(long id);

    FoodWithdraw findOneById(long id);

}
