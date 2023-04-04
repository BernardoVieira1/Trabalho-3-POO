package com.example.demo.domain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.domain.models.Tarefas;

@Repository
public interface TarefaRepository extends JpaRepository<Tarefas,Long> {
    
    List<Tarefas> findByUsuarioId(Long userId);
    


}
