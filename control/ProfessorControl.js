const express = require('express');
const Professor = require('../model/Professor');
const MeuTokenJWT = require('../model/MeuTokenJWT');
const meutoken = new MeuTokenJWT();

module.exports = class ProfessorControl {



    async professor_login_control(request, response) {
        var professor = new Professor();
       
        professor.email = request.body.professor.email;
        professor.senha = request.body.professor.senha;
        
        

        
        const resultado = await professor.login();
        
        // Verifica o login antes de gerar o token
        if (resultado==true & request.body.professor.papel=="professor") {
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
    async professor_create_control(request, response) {
        const authorization = request.headers['authorization'];
        
        // Valida o token antes de continuar
        if (meutoken.validarToken(authorization) == false) {
            return response.status(401).send({
                cod: 1,
                status: false,
                msg: 'Token inválido'
            });
        }

        var professor = new Professor();
        professor.nome = request.body.professor.nome;
        professor.email = request.body.professor.email;
        professor.data_nascimento = request.body.professor.data_nascimento;
        professor.senha = request.body.professor.senha;

        const isCreated = await professor.create();
        const objResposta = {
            cod: 1,
            status: isCreated,
            msg: isCreated ? 'Professor criado com sucesso' : 'Erro ao criar o Professor'
        };
        response.status(200).send(objResposta);
    }

    // Método assíncrono para excluir um aluno existente.
    async professor_delete_control(request, response) {
        const authorization = request.headers['authorization'];
        
        // Valida o token antes de continuar
        if (meutoken.validarToken(authorization) == false) {
            return response.status(401).send({
                cod: 1,
                status: false,
                msg: 'Token inválido'
            });
        }

        var professor = new Professor();
        professor.id_prof = request.params.id_prof;
        const isDeleted = await professor.delete();
        const payloadRecuperado=meutoken.getPayload();
       const novoToken=meutoken.gerarToken(payloadRecuperado);
        const objResposta = {
            cod: 1,
            status: isDeleted,
            msg: isDeleted ? 'Professor excluído com sucesso' : 'Erro ao excluir o Professor',
            novotoken: novoToken
        };
        response.status(200).send(objResposta);
    }

    // Método assíncrono para atualizar um aluno existente.
    async professor_update_control(request, response) {
        const authorization = request.headers['authorization'];
        
        // Valida o token antes de continuar
        if (meutoken.validarToken(authorization) == false) {
            return response.status(401).send({
                cod: 1,
                status: false,
                msg: 'Token inválido'
            });
        }

        var professor= new Professor();
        professor.id_prof = request.params.id_prof;
        professor.nome = request.body.professor.nome;
        professor.email = request.body.professor.email;
        professor.data_nascimento = request.body.professor.data_nascimento;
        professor.senha = request.body.professor.senha;

        const isUpdated = await professor.update();
        const payloadRecuperado=meutoken.getPayload();
        const  novoToken=meutoken.gerarToken(payloadRecuperado);
        const objResposta = {
            cod: 1,
            status: true,
            msg: isUpdated ? 'Professor atualizado com sucesso' : 'Erro ao atualizar o Professor',
            novotoken: novoToken
        };
        response.status(200).send(objResposta);
    }

    // Método assíncrono para buscar todos os alunos.
    async professor_read_all_control(request, response) {
        const authorization = request.headers['authorization'];
        
        // Valida o token antes de continuar
        if (meutoken.validarToken(authorization) == false) {
            return response.status(401).send({
                cod: 1,
                status: false,
                msg: 'Token inválido'
            });
        }

        var professor = new Professor();
        const resultado = await professor.readAll();
        const payloadRecuperado=meutoken.getPayload();
        const  novoToken=meutoken.gerarToken(payloadRecuperado);
        const objResposta = {
            cod: 1,
            status: true,
            msg: 'Executado com sucesso',
            professores: resultado,
            novotoken: novoToken
        };
        response.status(200).send(objResposta);
    }

    // Método assíncrono para obter um aluno pelo ID.
    async professor_read_by_id_control(request, response) {
        const authorization = request.headers['authorization'];
        
        // Valida o token antes de continuar
        if (meutoken.validarToken(authorization) == false) {
            return response.status(401).send({
                cod: 1,
                status: false,
                msg: 'Token inválido'
            });
        }

        var professor = new Professor();
        professor.id_prof = request.params.id_prof;
        const resultado = await professor.readByID();
        const payloadRecuperado=meutoken.getPayload();
        const novoToken=meutoken.gerarToken(payloadRecuperado);
        const professorEncontrado =  resultado.length > 0;

        // Define a resposta com base no resultado encontrado
        const objResposta = {
            cod: professorEncontrado ? 1 : 0,  // Usa código 0 se não encontrar o professor
            status: professorEncontrado,       // Define status como true ou false baseado no resultado
            msg: professorEncontrado ? 'Professor encontrado' : 'Professor não encontrado',
            professor: professorEncontrado ? resultado : null,
            novoToken:professorEncontrado ? novoToken : "sem token"  // Retorna null para o professor se não encontrado
        };
    
        // Define o código de resposta como 200 se encontrado, 404 se não encontrado
        response.status(professorEncontrado ? 200 : 404).send(objResposta);
    }
};
