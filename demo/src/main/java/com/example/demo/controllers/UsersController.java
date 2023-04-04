package com.example.demo.controllers;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.domain.models.Usuario;
import com.example.demo.domain.repository.UsuarioRepository;
import com.example.demo.domain.service.TarefasService;
import com.example.demo.domain.service.UsuarioService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/usuario")
public class UsersController {
    
    private UsuarioRepository usuarioRepository;
    private TarefasService tarefasService;
    private UsuarioService usuarioService;

    //Listar todos os Usuario
    @GetMapping
    public List<Usuario> listar(){
        return usuarioRepository.findAll();
    }

    //Listar Usuario por ID
    @GetMapping("/{userId}")
    public ResponseEntity<Usuario> buscar(@PathVariable Long userId){
        return usuarioRepository.findById(userId)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    //Criar um novo usuario
    @PostMapping
    public Usuario criar(@Valid @RequestBody Usuario usuario){
        return usuarioService.salvar(usuario);
    }

    //Edita um usuario existente
    @PutMapping("/{userId}")
    public ResponseEntity<Usuario> atualizar(@Valid @PathVariable Long userId,@RequestBody Usuario usuario){
        if(!usuarioRepository.existsById(userId)){
            return ResponseEntity.notFound().build();
        }
        usuario.setId(userId);
        usuario = usuarioService.salvar(usuario);
        return ResponseEntity.ok(usuario);
    }

    //Deleta usuario pelo ID de usuario
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deletar(@PathVariable Long userId){
        if(!usuarioRepository.existsById(userId)){
            return ResponseEntity.notFound().build();
        }
        tarefasService.deletarTodasTarefasDoUsuario(userId);
        usuarioService.excluir(userId);
        return ResponseEntity.noContent().build();

    }
    


}