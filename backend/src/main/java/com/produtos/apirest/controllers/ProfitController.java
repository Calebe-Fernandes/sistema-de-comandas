package com.produtos.apirest.controllers;

import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import com.produtos.apirest.models.ProfitPerDay;
import com.produtos.apirest.repository.ProfitPerDayRepository;
import com.produtos.apirest.validators.ProfitPerDayValidator;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(value = "/api")
@Api(value = "API REST Lucro por dia(PPD)")
@CrossOrigin(origins = "*")
public class ProfitController {
    @Autowired
    ProfitPerDayRepository profitPerDayRepository;

    @Autowired
    ProfitPerDayValidator profitPerDayValidator;

    // PPD operations
    @GetMapping("/ppd")
    @Transactional
    @ApiOperation(value = "Retorna uma lista de lucros por dia")
    public List<ProfitPerDay> listPPD() {
        return profitPerDayRepository.findAll();
    }

    @GetMapping("/ppd/{id}")
    @ApiOperation(value = "Retorna o lucro de um dia específico (busca por id)")
    public ProfitPerDay listPPDById(@PathVariable(value = "id") long id) {
        return profitPerDayRepository.findById(id);
    }

    @PostMapping("/ppd")
    @ApiOperation(value = "Envia um body para filtro de data")
    public ProfitPerDay filterPPD(@RequestBody PostBody postBody) {

        ProfitPerDay ppd = new ProfitPerDay();

        Date date1 = stringToDate(postBody.initialDate);
        Date date2 = stringToDate(postBody.finalDate);
        ppd.setInitialDate(date1);
        ppd.setFinalDate(date2);

        return ppd;
    }
    public static class PostBody {
        public String initialDate;
        public String finalDate;
    }
    public Date stringToDate(String string){
        ParsePosition pp = new ParsePosition(0);
        Date date=new SimpleDateFormat("dd/MM/yyyy").parse(string, pp);
        return date;
    }

}
