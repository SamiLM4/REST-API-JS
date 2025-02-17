const express = require('express');
const Curso = require('../model/Curso');
const MeuTokenJWT = require('../model/MeuTokenJWT');
const meutoken = new MeuTokenJWT();

module.exports = class CursoControl {    

    // Método assíncrono para criar um novo aluno.
    async curso_create_control(request, response) {
        var curso = new Curso();
        curso.nome_curso = request.body.curso.nome_curso;
        curso.preco_curso = request.body.curso.preco_curso;
        curso.anos_conclusao = request.body.curso.anos_conclusao;
        curso.id_professor = request.body.curso.id_professor;

        const isCreated = await curso.create();
        const objResposta = {
            cod: 1,
            status: isCreated,
            msg: isCreated ? 'Curso criado com sucesso' : 'Erro ao criar o Curso'
        };
        response.status(200).send(objResposta);
    }

    // Método assíncrono para excluir um aluno existente.
    async curso_delete_control(request, response) {
        const authorization = request.headers['authorization'];
        
        // Valida o token antes de continuar
        if (meutoken.validarToken(authorization) == false) {
            return response.status(401).send({
                cod: 1,
                status: false,
                msg: 'Token inválido'
            });
        }

        var curso = new Curso();
        curso.id_curso = request.params.id_curso;
        const isDeleted = await curso.delete();

        const objResposta = {
            cod: 1,
            status: isDeleted,
            msg: isDeleted ? 'Curso excluído com sucesso' : 'Erro ao excluir o Curso'

        };
        response.status(200).send(objResposta);
    }

    // Método assíncrono para atualizar um aluno existente.
    async curso_update_control(request, response) {
        const authorization = request.headers['authorization'];
        
        // Valida o token antes de continuar
        if (meutoken.validarToken(authorization) == false) {
            return response.status(401).send({
                cod: 1,
                status: false,
                msg: 'Token inválido'
            });
        }

        var curso = new Curso();
        curso.id_curso = request.params.id_curso;
        curso.nome_curso = request.body.curso.nome_curso;
        curso.preco_curso = request.body.curso.preco_curso;
        curso.anos_conclusao = request.body.curso.anos_conclusao;
        curso.id_professor = request.body.curso.id_professor;   

        const isUpdated = await curso.update();

        const objResposta = {
            cod: 1,
            status: true,
            msg: isUpdated ? 'Curso atualizado com sucesso' : 'Erro ao atualizar o Curso'

        };
        response.status(200).send(objResposta);
    }

    // Método assíncrono para buscar todos os alunos.
    async curso_read_all_control(request, response) {
        const authorization = request.headers['authorization'];
        // Valida o token antes de continuar
        if (meutoken.validarToken(authorization) == false) {
            return response.status(401).send({
                cod: 1,
                status: false,
                msg: 'Token inválido'
            });
        }

        var curso = new Curso();

        const resultado = await curso.readAll();

        const objResposta = {
            cod: 1,
            status: true,
            msg: 'Executado com sucesso',
            cursos: resultado

        };
        response.status(200).send(objResposta);
    }

    // Método assíncrono para obter um aluno pelo ID.
    async curso_read_by_id_control(request, response) {
        const authorization = request.headers['authorization'];
        
        // Valida o token antes de continuar
        if (meutoken.validarToken(authorization) == false) {
            return response.status(401).send({
                cod: 1,
                status: false,
                msg: 'Token inválido'
            });
        }

        var curso = new Curso();
        curso.id_curso = request.params.id_curso;
        const resultado = await curso.readByID();

        const cursoEncontrado = resultado.length > 0;


        // Define a resposta com base no resultado encontrado
        const objResposta = {
            cod: cursoEncontrado ? 1 : 0,  // Usa código 0 se não encontrar o professor
            status: cursoEncontrado,       // Define status como true ou false baseado no resultado
            msg: cursoEncontrado ? 'Curso encontrado' : 'Curso não encontrado',
            curso: cursoEncontrado ? resultado : null
        };
    
        // Define o código de resposta como 200 se encontrado, 404 se não encontrado
        response.status(cursoEncontrado ? 200 : 404).send(objResposta);
    }
};
