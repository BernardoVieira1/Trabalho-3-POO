package com.example.demo.domain.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.domain.models.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario,Long> {

    Optional<Usuario> findByEmail(String email);
    Optional<Usuario> findBySenha(String senha);
    Optional<Usuario> findByEmailAndSenha(String email, String senha);

    
}
