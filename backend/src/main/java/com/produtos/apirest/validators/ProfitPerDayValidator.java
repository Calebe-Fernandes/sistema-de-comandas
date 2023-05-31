package com.produtos.apirest.validators;

import com.produtos.apirest.exceptions.ApiRequestException;
import com.produtos.apirest.models.ProfitPerDay;
import org.springframework.stereotype.Component;
import java.util.Date;

@Component
public class ProfitPerDayValidator {

    public ProfitPerDayValidator() {
    }

    /*public ProfitPerDay validatePPD(ProfitPerDay ppd) {
        Float profit = ppd.getProfit();
        Date date = ppd.getDate();

        if (profit == null || profit < 0) {
            throw new ApiRequestException("O lucro não pode ser negativo");
        } else if (date == null) {
            throw new ApiRequestException("Nenhuma data no análise de lucro");
        } else {
            return ppd;
        }
    }*/
}
