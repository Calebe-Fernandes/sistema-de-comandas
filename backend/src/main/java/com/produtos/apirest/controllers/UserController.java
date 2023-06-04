package com.produtos.apirest.controllers;

import java.security.Key;
import java.util.Date;
import java.util.List;

import javax.crypto.spec.SecretKeySpec;
import javax.transaction.Transactional;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
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
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.produtos.apirest.exceptions.ApiRequestException;
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

    static Key UserControllerKey = new SecretKeySpec("tokenKEY12345678910tokenKEY12345678910".getBytes(),
            SignatureAlgorithm.HS256.getJcaName());

    private static String generateToken(User user) {
        // expiration time for the token (1 day = 1000(ms) * 60(s) * 60(min) * 24(h))
        Date expiration = new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24);

        String token = Jwts.builder()
                .setSubject(String.valueOf(user.getId()))
                .setExpiration(expiration)
                .signWith(UserControllerKey)
                .compact();

        return token;
    }

    private static long BearerTokenGetUserId(String bearerToken) {
        if (bearerToken == null || !bearerToken.startsWith("Bearer ")) {
            throw new ApiRequestException("Não foi enviado Bearer");
        }
        System.out.println("token: " + bearerToken);

        try {
            String token = bearerToken.substring(7); // Extract the token from the Authorization header

            // Validate and parse the token
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(UserControllerKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            return Integer.parseInt(claims.getSubject());
        } catch (ExpiredJwtException exp) {
            throw new ApiRequestException("Token expired: " + exp.getMessage());
        } catch (MalformedJwtException inv) {
            throw new ApiRequestException("Invalid token: " + inv.getMessage());
        } catch (Exception e) {
            throw new ApiRequestException("Error while processing token: " + e.getMessage());
        }
    }

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
        String token = generateToken(user);
        System.out.println("token out? " + token);
        return ResponseEntity.status(HttpStatus.OK).body(token);
    }

    // User operations
    @GetMapping("/users")
    @ApiOperation(value = "Retorna uma lista com todos os usuários cadastrados")
    public ResponseEntity<List<User>> listUsers(@RequestHeader("Authorization") String bearerToken) {
        // gambiara, só pra ver ser o login teve sucesso
        long a = BearerTokenGetUserId(bearerToken);
        return ResponseEntity.status(HttpStatus.OK).body(userRepository.findAll());
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
