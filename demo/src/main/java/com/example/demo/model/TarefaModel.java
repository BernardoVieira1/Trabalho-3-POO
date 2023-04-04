package com.example.demo.model;

import com.example.demo.domain.models.Status;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TarefaModel {

    private Long id;
    //private UsuarioResumoModel usuario;
    private String titulo;
    private String descricao;
    private Status status;
}
