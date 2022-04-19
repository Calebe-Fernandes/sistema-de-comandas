package com.produtos.apirest.controllers;

import com.produtos.apirest.models.Produto;
import com.produtos.apirest.repository.ProdutoRepository;
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
    @Autowired
    ProdutoRepository produtoRepository;

    @GetMapping("/produtos")
    @ApiOperation(value="Retorna uma lista de todos os produtos cadastrados")
    public List<Produto> listarProdutos(){
        return produtoRepository.findAll();
    }

    @GetMapping("/produtos/{id}")
    @ApiOperation(value="Retorna um produto unico (busca por id)")
    public Produto listarProdutoPorId(@PathVariable(value="id") long id){
        return produtoRepository.findById(id);
    }

    @PostMapping ("/produtos")
    @ApiOperation(value="Cadastra um novo produto")
    public Produto salvarProduto(@RequestBody Produto produto){
        return produtoRepository.save(produto);
    }

    @DeleteMapping ("/produtos")
    @ApiOperation(value="Deleta um produto (de acordo com id)")
    public void deletarProduto(@RequestBody Produto produto){
        produtoRepository.delete(produto);
    }

    @PutMapping("/produtos")
    @ApiOperation(value="Atualiza as informações de um produto")
    public Produto atualizarProduto(@RequestBody Produto produto){
       return  produtoRepository.save(produto);
    }
}
