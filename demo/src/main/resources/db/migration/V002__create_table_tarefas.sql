create table tarefas(
    id bigint not null auto_increment,
    usuario_id bigint not null,
    titulo varchar(255) not null,
    descricao text not null,
    status varchar(20) not null,
    
    primary key (id)
);

alter table tarefas add constraint fk_tarefas_usuario
foreign key (usuario_id) references usuario (id);
