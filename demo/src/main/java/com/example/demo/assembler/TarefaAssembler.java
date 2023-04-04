package com.example.demo.assembler;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.example.demo.domain.models.Tarefas;
import com.example.demo.model.TarefaModel;
import com.example.demo.model.input.TarefaInput;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Component
public class TarefaAssembler {
    
    private ModelMapper modelMapper;

    public Tarefas toEntity(TarefaInput tarefaInput){
        return modelMapper.map(tarefaInput, Tarefas.class);
    }

    public TarefaModel toModel(Tarefas tarefas){
        return modelMapper.map(tarefas, TarefaModel.class);
    }


    public List<TarefaModel> toCollectionModel(List<Tarefas> tarefas){
        return tarefas.stream()
            .map(this::toModel)
            .collect(Collectors.toList());
    }


}