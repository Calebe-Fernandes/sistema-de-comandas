package com.produtos.apirest.controllers;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.produtos.apirest.models.User;
import com.produtos.apirest.auth.AuthJjwt;
import com.produtos.apirest.exceptions.ApiRequestException;
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

    private static boolean validatePassword(String pass1, String pass2) {
        return pass1.equals(pass2);
    }

    @PostMapping("/login")
    @ApiOperation(value = "Autentica Usuário e retorna seu token")
    public ResponseEntity<String> login(@RequestBody User loginUser) {
        // Retrieve user from the database based on the provided username
        User user = userRepository.findByUsername(loginUser.getUsername());

        if (user == null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials (user)");

        if (!validatePassword(loginUser.getPassword(), user.getPassword()))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials (password)");

        // Generate and return a token
        String token = AuthJjwt.generateToken(user.getId());
        System.out.println("token out? " + token);
        return ResponseEntity.status(HttpStatus.OK).body(token);
    }

    // User operations
    @GetMapping("/users")
    @ApiOperation(value = "Retorna uma lista com todos os usuários cadastrados")
    public ResponseEntity<List<User>> listUsers(@RequestHeader("Authorization") String bearerToken) {
        // gambiara, só pra ver ser o login teve sucesso
        //AuthJjwt.tokenAuth(bearerToken);
        return ResponseEntity.status(HttpStatus.OK).body(userRepository.findAll());
    }

    @PostMapping("/user")
    @Transactional
    @ApiOperation(value = "Cria um novo usuário")
    public ResponseEntity<User> createUser(@RequestBody @Validated User newUser) {
        //AuthJjwt.tokenAuth(bearerToken, List.of("manager", "admin"));
        Date dateNow = new Date();
        newUser.setCreatedAt(dateNow);
        newUser.setUpdatedAt(dateNow);
        userRepository.save(newUser);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(newUser);
    }

    @PostMapping("/user-recovery")
    @Transactional
    @ApiOperation(value = "Recupera os dados de um usuário")
    public ResponseEntity<User> recoveryPassword(@RequestBody User newUser,
            @RequestHeader("Authorization") String bearerToken) {
        AuthJjwt.tokenAuth(bearerToken, List.of("manager", "admin"));
        User user = userRepository.findByUsername(newUser.getUsername());

        if (user == null)
            throw new ApiRequestException("username não existe");
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(user);
    }

    @PutMapping("/user")
    @Transactional
    @ApiOperation(value = "Atualiza as informações de um usuário.")
    public ResponseEntity<User> updateUser(@RequestBody @Validated User updatedUser,
            @RequestHeader("Authorization") String bearerToken) {
        AuthJjwt.tokenAuth(bearerToken, List.of("manager", "admin"));

        try {
            User newUser = userRepository.save(updatedUser);
            newUser.setUpdatedAt(new Date());
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(newUser);
        } catch (ApiRequestException e) {
            throw new ApiRequestException("Erro ao atualizar o usuário: " + e.getMessage());
        }
    }
}
