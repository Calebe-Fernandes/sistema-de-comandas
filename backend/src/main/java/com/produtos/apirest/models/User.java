package com.produtos.apirest.models;

import com.produtos.apirest.exceptions.ApiRequestException;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.*;

@Entity
@Table(name = "TB_USERS")
public class User implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String username;
    private String password;
    private String role;
    private String token;
    private String email;
    private String endereco;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private boolean isActive;

    public User() {
    }

    public User(long id, String username, String password, String role, String token, String email, String endereco,
            Boolean isActive) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
        this.token = token;
        this.email = email;
        this.endereco = endereco;
        this.isActive = isActive;

        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        if (role.equals("manager") || role.equals("admin") || role.equals("waiter") || role.equals("cashier")) {
            this.role = role;
        } else {
            throw new ApiRequestException("Role inválida. Só é aceito 'waiter', 'cashier', 'manager', 'admin'.");
        }
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

}
