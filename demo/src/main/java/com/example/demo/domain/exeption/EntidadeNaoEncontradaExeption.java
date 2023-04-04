package com.example.demo.domain.exeption;

public class EntidadeNaoEncontradaExeption extends NegocioException{
    private static final long serialVersionUID = 1L;

    public EntidadeNaoEncontradaExeption(String message){
        super(message);
    }


}
