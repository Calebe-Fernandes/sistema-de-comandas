package com.produtos.apirest.controllers;

import java.time.LocalDateTime;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.produtos.apirest.models.User;
import com.produtos.apirest.repository.UserRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value = "/api")
@Api(value = "API REST Users")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    UserRepository userRepository;

    // User operations
    @GetMapping("/users")
    @ApiOperation(value = "Retorna uma lista com todos os usuários cadastrados")
    public List<User> listUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/user")
    @Transactional
    @ApiOperation(value = "Cria um novo usuário")
    public ResponseEntity<String> createUser(@RequestBody @Validated User newUser){
        newUser.setCreatedAt(LocalDateTime.now());
        newUser.setUpdatedAt(LocalDateTime.now());
        userRepository.save(newUser);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Deu certo porra");
    }
}
