package com.example.demo.model.input;

import com.example.demo.domain.models.Status;
import com.example.demo.model.UsuarioResumoModel;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter     
public class TarefaInput {

    @NotNull
    private UsuarioResumoModel usuario;

    @NotBlank
    private String titulo;

    @NotBlank
    private String descricao;

    
    private Status status;
    
}
