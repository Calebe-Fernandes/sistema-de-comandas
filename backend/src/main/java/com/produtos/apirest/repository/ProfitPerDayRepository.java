package com.produtos.apirest.repository;

import com.produtos.apirest.models.ProfitPerDay;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfitPerDayRepository extends JpaRepository<ProfitPerDay, Long> {

    ProfitPerDay findById(long id);


    Boolean existsById(long id);

}
