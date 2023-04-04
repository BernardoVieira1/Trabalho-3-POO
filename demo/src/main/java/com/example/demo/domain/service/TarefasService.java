package com.example.demo.domain.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.example.demo.domain.exeption.EntidadeNaoEncontradaExeption;
import com.example.demo.domain.models.Status;
import com.example.demo.domain.models.Tarefas;
import com.example.demo.domain.models.Usuario;
import com.example.demo.domain.repository.TarefaRepository;
import com.example.demo.domain.repository.UsuarioRepository;
import com.example.demo.model.TarefaModel;
import com.example.demo.model.input.TarefaInput;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.experimental.PackagePrivate;

@AllArgsConstructor
@Service
public class TarefasService {
    
    private TarefaRepository tarefaRepository;
    private UsuarioService usuarioService;
    private ModelMapper modelMapper;
    @PackagePrivate UsuarioRepository usuarioRepository;

    public Tarefas novaTarefa(Tarefas tarefas){
        Usuario usuario = usuarioService.buscar(tarefas.getUsuario().getId());
        tarefas.setStatus(Status.INICIAR);
        tarefas.setUsuario(usuario);

        return tarefaRepository.save(tarefas);

    }

    @Transactional
    public Tarefas editarStatus(Long tarefaId){
        Tarefas tarefas = tarefaRepository.findById(tarefaId).orElseThrow(()-> new EntidadeNaoEncontradaExeption("Tarefa não encontrada"));
        tarefas.setStatus(Status.FINALIZADO);
        return tarefaRepository.save(tarefas);
    }


    public TarefaModel editar(Long usuarioId, Long tarefaId, TarefaInput tarefaInput){
        Usuario usuario = usuarioRepository.findById(usuarioId).orElseThrow(()-> new EntidadeNaoEncontradaExeption("Usuario não encontrado"));
        Tarefas tarefas = tarefaRepository.findById(tarefaId).orElseThrow(()-> new EntidadeNaoEncontradaExeption("Tarefa não encontrada"));
        modelMapper.map(tarefaInput, tarefas);
        tarefas.setUsuario(usuario);
        tarefas = tarefaRepository.save(tarefas);
        return modelMapper.map(tarefas, TarefaModel.class);
    }

    
    public List<Tarefas> buscarTarefa(Long userId){
        return tarefaRepository.findByUsuarioId(userId);
    }

    @Transactional
    public void excluir(Long tarefaId){
        tarefaRepository.deleteById(tarefaId);
    }

    public void deletarTodasTarefasDoUsuario(Long userId){
        List<Tarefas> tarefas = tarefaRepository.findByUsuarioId(userId);
        if(tarefas.isEmpty()){
            throw new EntidadeNaoEncontradaExeption("Não há tarefas encontradas dese usuario");
        }
        tarefaRepository.deleteAll(tarefas);
    }


   

   

}
