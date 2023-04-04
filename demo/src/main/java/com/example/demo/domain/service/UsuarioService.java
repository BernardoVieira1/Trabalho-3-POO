package com.example.demo.domain.service;

import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.example.demo.domain.exeption.NegocioException;
import com.example.demo.domain.models.Usuario;
import com.example.demo.domain.repository.UsuarioRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class UsuarioService {
    
    private UsuarioRepository usuarioRepository;

    
    public Usuario buscar(Long userId){
        return usuarioRepository.findById(userId)
            .orElseThrow(() -> new NegocioException("cliente não encontrado"));
    }


    @Transactional
    public Usuario salvar(Usuario usuario){
        boolean emailExistente = usuarioRepository.findByEmail(usuario.getEmail())
            .stream()
            .anyMatch(usuarioRepository -> !usuarioRepository.equals(usuario));
        if(emailExistente){
           throw new NegocioException("Email já está em uso!");
        }
        return usuarioRepository.save(usuario);
    }



    @Transactional
    public void excluir(Long userId){
        usuarioRepository.deleteById(userId);;
    }


}