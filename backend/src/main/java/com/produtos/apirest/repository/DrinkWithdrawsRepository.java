package com.produtos.apirest.repository;

import com.produtos.apirest.models.DrinkWithdrawal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DrinkWithdrawsRepository extends JpaRepository<DrinkWithdrawal,Long> {
    List<DrinkWithdrawal> findById(long id);
}
