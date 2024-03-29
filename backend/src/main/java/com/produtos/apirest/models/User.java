package com.produtos.apirest.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.produtos.apirest.exceptions.ApiRequestException;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Table(name = "TB_USERS")
public class User implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    
    @Column(unique = true)
    private String username;
    private String password;
    private String role;
    private String email;
    private String endereco;

    private String token;

    private Date createdAt;
    private Date updatedAt;

    private boolean isActive;

    public User() {
    }

    public User(long id, String username, String password, String role, String email, String endereco,
            boolean isActive, Date createdAt, Date updatedAt, String token) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
        this.email = email;
        this.endereco = endereco;
        this.isActive = isActive;

        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.token = token;
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

    public String getToken() {return token;}

    public void setRole(String role) {
        if (role.equals("manager") || role.equals("admin") || role.equals("waiter") || role.equals("cashier")) {
            this.role = role;
        } else {
            throw new ApiRequestException("Role inválida. Só é aceito 'waiter', 'cashier', 'manager', 'admin'.");
        }
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

    public boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(boolean isActive) {
        this.isActive = isActive;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setToken(String token){this.token = token ;}
}
