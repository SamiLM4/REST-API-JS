const express = require('express');
const Curso = require('../model/Curso');
const MeuTokenJWT = require('../model/MeuTokenJWT');
const meutoken = new MeuTokenJWT();

module.exports = class CursoControl {



    async curso_login_control(request, response) {
        var curso = new Curso();
       
        curso.email = request.body.professor.email;
        curso.senha = request.body.professor.senha;
        
        

        
        const resultado = await curso.login();
        
        // Verifica o login antes de gerar o token
        if (resultado==true & request.body.curso.papel=="curso") {
            const objectClaimsToken = new Object();
            objectClaimsToken.email = professor.email;
            objectClaimsToken.senha = professor.senha;
            objectClaimsToken.papel = professor.papel;
    
            const novoToken = meutoken.gerarToken(objectClaimsToken);
    
            // Envia a resposta com o novo token
            response.status(200).send({
                cod: 1,
                status: true,
                msg: 'Login realizado com sucesso',
                token: novoToken
            });
        } else {
            // Se o login falhar, envia uma resposta de erro
            response.status(401).send({
                cod: 0,
                status: false,
                msg: 'Falha no login: credenciais inválidas'
            });
        }
    }
    
    

    // Método assíncrono para criar um novo aluno.
    async curso_create_control(request, response) {
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
        curso.nome_curso = request.body.curso.nome_curso;
        curso.preco_curso = request.body.curso.preco_curso;
        curso.anos_conclusao = request.body.curso.anos_conclusao;
        curso.id_professor = request.body.curso.id_professor;
        curso.email = request.body.curso.email;
        curso.senha = request.body.curso.senha;
        

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
        const payloadRecuperado=meutoken.getPayload();
       const novoToken=meutoken.gerarToken(payloadRecuperado);
        const objResposta = {
            cod: 1,
            status: isDeleted,
            msg: isDeleted ? 'Curso excluído com sucesso' : 'Erro ao excluir o Curso',
            novotoken: novoToken
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
        curso.email = request.body.curso.email;
        curso.senha = request.body.curso.senha;

        const isUpdated = await curso.update();
        const payloadRecuperado=meutoken.getPayload();
        const  novoToken=meutoken.gerarToken(payloadRecuperado);
        const objResposta = {
            cod: 1,
            status: true,
            msg: isUpdated ? 'Curso atualizado com sucesso' : 'Erro ao atualizar o Curso',
            novotoken: novoToken
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
        const payloadRecuperado=meutoken.getPayload();
        const  novoToken=meutoken.gerarToken(payloadRecuperado);
        const objResposta = {
            cod: 1,
            status: true,
            msg: 'Executado com sucesso',
            cursos: resultado,
            novotoken: novoToken
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
        const payloadRecuperado=meutoken.getPayload();
        const novoToken=meutoken.gerarToken(payloadRecuperado);
        const cursoEncontrado = resultado.length > 0;


        // Define a resposta com base no resultado encontrado
        const objResposta = {
            cod: cursoEncontrado ? 1 : 0,  // Usa código 0 se não encontrar o professor
            status: cursoEncontrado,       // Define status como true ou false baseado no resultado
            msg: cursoEncontrado ? 'Curso encontrado' : 'Curso não encontrado',
            curso: cursoEncontrado ? resultado : null,
            novoToken:cursoEncontrado ? novoToken : "sem token"  // Retorna null para o professor se não encontrado
        };
    
        // Define o código de resposta como 200 se encontrado, 404 se não encontrado
        response.status(cursoEncontrado ? 200 : 404).send(objResposta);
    }
};
