package com.produtos.apirest.controllers;

import com.produtos.apirest.exceptions.ApiRequestException;
import com.produtos.apirest.models.Drink;
import com.produtos.apirest.models.FoodStuff;
import com.produtos.apirest.repository.DrinkRepository;
import com.produtos.apirest.repository.FoodStuffRepository;
import com.produtos.apirest.validators.DrinkValidator;
import com.produtos.apirest.validators.FoodValidator;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api")
@Api(value = "API REST Produtos")
@CrossOrigin(origins = "*")
public class ProductController {
    @Autowired
    FoodStuffRepository foodStuffRepository;
    @Autowired
    DrinkRepository drinkRepository;
    @Autowired
    DrinkValidator drinkValidator;
    @Autowired
    FoodValidator foodValidator;

    // Drinks operations
    @GetMapping("/drinks")
    @ApiOperation(value = "Retorna uma lista de todos as bebidas cadastradas")
    public List<Drink> listDrinks() {
        return drinkRepository.findAll();
    }

    @GetMapping("/drinks/{id}")
    @ApiOperation(value = "Retorna uma bebida única (busca por id)")
    public Drink listDrinkById(@PathVariable(value = "id") long id) {
        return drinkRepository.findById(id);
    }

    @PostMapping("/drinks")
    @ApiOperation(value = "Cadastra uma nova bebida. Ao cadastrar, omitir o campo 'id' do payload, pois este é gerado automaticamente pelo banco")
    public Drink registerNewDrink(@RequestBody Drink drink) {
        drinkValidator.valdiateDrink(drink);
        return drinkRepository.save(drink);
    }

    @PostMapping("/drinks/disable")
    @ApiOperation(value = "Desabilita um item do cardapio nao podendo adicionar em uma nova comanda")
    public Drink disableDrink(@RequestBody Drink drink) {
        drinkValidator.valdiateDrink(drink);
        drink.setActive(false);
        return drinkRepository.save(drink);
    }

    @DeleteMapping("/drinks")
    @ApiOperation(value = "Deleta uma bebida (de acordo com id)")
    public void deleteDrink(@RequestBody Drink drink) {
        try {
            drinkRepository.delete(drink);
        } catch (ApiRequestException e) {
            throw new ApiRequestException("Erro ao deletar produto");
        }
    }

    @PutMapping("/drinks")
    @ApiOperation(value = "Atualiza as informações de uma bebida. Ao atualizar, enviar a nova payload do item com o campo 'id'")
    public Drink updateDrink(@RequestBody Drink drink) {
        drinkValidator.valdiateDrink(drink);
        return drinkRepository.save(drink);
    }

    // FoodStuff operations
    @GetMapping("/food")
    @ApiOperation(value = "Retorna uma lista de todos os alimentos cadastrados")
    public List<FoodStuff> listFood() {
        return foodStuffRepository.findAll();
    }

    @GetMapping("/food/{id}")
    @ApiOperation(value = "Retorna um aliemnto único (busca por id)")
    public FoodStuff listFoodById(@PathVariable(value = "id") long id) {
        return foodStuffRepository.findById(id);
    }

    @PostMapping("/food")
    @ApiOperation(value = "Cadastra um novo alimento. Ao cadastrar, omitir o campo 'id' do payload, pois este é gerado automaticamente pelo banco")
    public FoodStuff registerNewFoodStuff(@RequestBody FoodStuff food) {
        foodValidator.validateFood(food);
        return foodStuffRepository.save(food);
    }

    @PostMapping("/food/disable")
    @ApiOperation(value = "Desabilita um item do cardapio nao podendo adicionar em uma nova commanda")
    public FoodStuff disableFoodStuff(@RequestBody FoodStuff food) {
        foodValidator.validateFood(food);
        food.setActive(false);
        return foodStuffRepository.save(food);
    }

    @DeleteMapping("/food")
    @ApiOperation(value = "Deleta um alimento (de acordo com id)")
    public void deleteFood(@RequestBody FoodStuff food) {
        try {
            foodStuffRepository.delete(food);
        } catch (ApiRequestException e) {
            throw new ApiRequestException("Erro ao deletar produto");
        }

    }

    @PutMapping("/food")
    @ApiOperation(value = "Atualiza as informações de um alimento. Ao atualizar, enviar a nova payload do item com o campo 'id' ")
    public FoodStuff updateFood(@RequestBody FoodStuff food) {
        foodValidator.validateFood(food);
        return foodStuffRepository.save(food);
    }
}
