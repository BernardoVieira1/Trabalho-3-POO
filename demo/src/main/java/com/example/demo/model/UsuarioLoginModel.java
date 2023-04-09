package com.example.demo.model;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioLoginModel {
    
    @NotBlank
    private Long id;

    @NotBlank
    private String nome;

    @NotBlank
    private String email;
    
}
