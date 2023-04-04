package com.example.demo.domain.exeption;

public class NegocioException extends RuntimeException {
    
    private static final long serialVersion = 1L;

    public NegocioException(String message){
        super(message);
    }

}