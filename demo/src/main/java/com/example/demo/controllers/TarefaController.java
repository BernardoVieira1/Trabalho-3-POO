package com.example.demo.controllers;

import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.assembler.TarefaAssembler;
import com.example.demo.domain.models.Tarefas;
import com.example.demo.domain.models.Usuario;
import com.example.demo.domain.repository.TarefaRepository;
import com.example.demo.domain.repository.UsuarioRepository;
import com.example.demo.domain.service.TarefasService;
import com.example.demo.model.TarefaModel;
import com.example.demo.model.input.TarefaInput;

import ch.qos.logback.core.status.Status;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/tarefas")
public class TarefaController {
    
    private TarefaRepository tarefaRepository;
    private UsuarioRepository usuarioRepository;
    private TarefaAssembler tarefaAssembler;
    private TarefasService tarefasService;

    //Listar Todas as tarefas
    @GetMapping
    public List<Tarefas> listar(){
        return tarefaRepository.findAll();
    }

    //Busca uma tarefa por ID
    @GetMapping("/{tarefaId}")
    public ResponseEntity<Tarefas> buscar(@PathVariable Long tarefaId){
        return tarefaRepository.findById(tarefaId)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    //Criar nova tarefa
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TarefaModel criar(@Valid @RequestBody TarefaInput tarefaInput ){
        Tarefas novaTarefa = tarefaAssembler.toEntity(tarefaInput);
        Tarefas tarefaCriada = tarefasService.novaTarefa(novaTarefa);

        return tarefaAssembler.toModel(tarefaCriada);

    }


    @PutMapping("/editar/{tarefaId}")
    public TarefaModel editarTarefa(@PathVariable Long tarefaId, @RequestBody TarefaInput tarefaInput){
        Long usuarioId = tarefaInput.getUsuario().getId();
        return tarefasService.editar(usuarioId, tarefaId, tarefaInput);
    }

    //Deletar uma tarefa pelo ID de tarefa
    @DeleteMapping("/{tarefaId}")
    public ResponseEntity<Void> deletar(@PathVariable Long tarefaId){
        if(!tarefaRepository.existsById(tarefaId)){
            return ResponseEntity.notFound().build();
        }
        tarefaRepository.deleteById(tarefaId);
        return ResponseEntity.noContent().build();
    }

    //Listar todas as tarefas de um usuario
    @GetMapping("/user/{userId}")
    public List<TarefaModel> tarefasDeUmUsuario(@Valid @PathVariable Long userId){
        return tarefaAssembler.toCollectionModel(tarefaRepository.findByUsuarioId(userId));
    }


//88888888888888888888888888888888888888888888888888888888888888888888888888888

    @PutMapping("/editar/{tarefaId}/status")
    public Tarefas editarStatusTarefa(@PathVariable Long tarefaId){
        return tarefasService.editarStatus(tarefaId);
    }


//88888888888888888888888888888888888888888888888888888888888888888888888888888



     //Deleta todas as tarefas de um usuario
    @DeleteMapping("/user/{userId}")
    public void deletarTodasTarefasUser(@PathVariable Long userId){
        tarefasService.deletarTodasTarefasDoUsuario(userId);
    }



}


//Listar todas as tarefas de um usuario
    // @GetMapping("/user/{userId}")
    // public List<Tarefas> tarefaDeUmUsuario(@Valid @PathVariable Long userId){
    //     return tarefaRepository.findByUsuarioId(userId);
    // }