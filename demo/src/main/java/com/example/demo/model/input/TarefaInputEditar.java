package com.example.demo.model.input;

import jakarta.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TarefaInputEditar {

    // @NotNull
    // private UsuarioResumoModel usuario;

    @NotBlank
    private String titulo;

    @NotBlank
    private String descricao;

    
    // private Status status;
    
}
