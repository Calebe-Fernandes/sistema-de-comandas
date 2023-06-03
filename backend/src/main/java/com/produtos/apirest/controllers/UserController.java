package com.produtos.apirest.controllers;

import java.security.Key;
import java.util.Date;
import java.util.List;

import javax.crypto.spec.SecretKeySpec;
import javax.transaction.Transactional;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    private static String generateToken(User user) {
        // Set the expiration time for the token (e.g., 1 day)
        Date expiration = new Date(System.currentTimeMillis() + 24 * 60 * 60 * 1000);

        // Build the token with the user's ID as the subject
        Key key = new SecretKeySpec("tokenKEY123".getBytes(), SignatureAlgorithm.HS256.getJcaName());
        String token = Jwts.builder()
                .setSubject(String.valueOf(user.getId()))
                .setExpiration(expiration)
                .signWith(key)
                .compact();

        return token;
    }

    private static boolean validatePassword(String pass1, String pass2) {
        return pass1.equals(pass2);
    }

    @PostMapping("/login")
    @ApiOperation(value = "Autentica Usuário e retorna seu token")
    public ResponseEntity<String> login(@RequestBody User loginUser) {
        // Retrieve user from the database based on the provided username or email
        User user = userRepository.findById(loginUser.getId());

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        // Verify the provided password against the stored password hash
        boolean isPasswordValid = validatePassword(loginUser.getPassword(), user.getPassword());

        if (!isPasswordValid) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        // Generate and return a token (e.g., JWT)
        String token = generateToken(user);
        return ResponseEntity.status(HttpStatus.OK).body(token);
    }

    // User operations
    @GetMapping("/users")
    @ApiOperation(value = "Retorna uma lista com todos os usuários cadastrados")
    public List<User> listUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/user")
    @Transactional
    @ApiOperation(value = "Cria um novo usuário")
    public ResponseEntity<User> createUser(@RequestBody @Validated User newUser) {
        Date dateNow = new Date();
        newUser.setCreatedAt(dateNow);
        newUser.setUpdatedAt(dateNow);
        userRepository.save(newUser);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(newUser);
    }

    @PutMapping("/user")
    @Transactional
    @ApiOperation(value = "Atualiza as informações de um usuário.")
    public ResponseEntity<User> updateUser(@RequestBody @Validated User updatedUser) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(userRepository.save(updatedUser));
    }
}