package com.produtos.apirest.controllers;

import com.produtos.apirest.models.Drink;
import com.produtos.apirest.models.FoodStuff;
import com.produtos.apirest.repository.DrinkRepository;
import com.produtos.apirest.repository.FoodStuffRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/api")
@Api(value="API REST Produtos")
@CrossOrigin(origins = "*")
public class ProdutoController {
    //Drinks operations
    @Autowired
    DrinkRepository drinkRepository;

    @GetMapping("/drinks")
    @ApiOperation(value="Retorna uma lista de todos as bebidas cadastradas")
    public List<Drink> listDrinks(){
        return drinkRepository.findAll();
    }

    @GetMapping("/drinks/{id}")
    @ApiOperation(value="Retorna uma bebida única (busca por id)")
    public Drink listDrinkById(@PathVariable(value="id") long id){
        return drinkRepository.findById(id);
    }

    @PostMapping ("/drinks")
    @ApiOperation(value="Cadastra uma nova bebida. Ao cadastrar, omitir o campo 'id' do payload, pois este é gerado automaticamente pelo banco")
    public Drink registerNewDrink(@RequestBody Drink drink){return drinkRepository.save(drink);}

    @DeleteMapping ("/drinks")
    @ApiOperation(value="Deleta uma bebida (de acordo com id)")
    public void deleteDrink(@RequestBody Drink drink){
        drinkRepository.delete(drink);
    }

    @PutMapping("/drinks")
    @ApiOperation(value="Atualiza as informações de uma bebida. Ao atualizar, enviar a nova payload do item com o campo 'id'")
    public Drink updateDrink(@RequestBody Drink drink){ return drinkRepository.save(drink);}

    //FoodStuff operations
    @Autowired
    FoodStuffRepository foodStuffRepository;

    @GetMapping("/food")
    @ApiOperation(value="Retorna uma lista de todos os alimentos cadastrados")
    public List<FoodStuff> listFood(){
        return foodStuffRepository.findAll();
    }

    @GetMapping("/food/{id}")
    @ApiOperation(value="Retorna um aliemnto único (busca por id)")
    public FoodStuff listFoodById(@PathVariable(value="id") long id){return foodStuffRepository.findById(id);}

    @PostMapping ("/food")
    @ApiOperation(value="Cadastra um novo alimento. Ao cadastrar, omitir o campo 'id' do payload, pois este é gerado automaticamente pelo banco")
    public FoodStuff registerNewFoodStuff(@RequestBody FoodStuff food){
        return foodStuffRepository.save(food);
    }

    @DeleteMapping ("/food")
    @ApiOperation(value="Deleta um alimento (de acordo com id)")
    public void deleteFood(@RequestBody FoodStuff food){
        foodStuffRepository.delete(food);
    }

    @PutMapping("/food")
    @ApiOperation(value="Atualiza as informações de um alimento. Ao atualizar, enviar a nova payload do item com o campo 'id' ")
    public FoodStuff updateFood(@RequestBody FoodStuff food){ return foodStuffRepository.save(food);}

}
