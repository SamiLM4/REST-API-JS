const express = require('express');
const Aluno = require('../model/Aluno');
const MeuTokenJWT = require('../model/MeuTokenJWT');
const meutoken = new MeuTokenJWT();

module.exports = class AlunoControl {



    async aluno_login_control(request, response) {
        var aluno = new Aluno();
       
        aluno.email = request.body.aluno.email;
        aluno.senha = request.body.aluno.senha;
       
        const resultado = await aluno.login();
        // Verifica o login antes de gerar o token
        if (resultado==true) {
            const objectClaimsToken = new Object();
            objectClaimsToken.email = aluno.email;
            objectClaimsToken.senha = aluno.senha;
            objectClaimsToken.papel = request.body.aluno.papel;
    
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
    async aluno_create_control(request, response) {
        const authorization = request.headers['authorization'];
        
        // Valida o token antes de continuar
        if (meutoken.validarToken(authorization) == false) {
            return response.status(401).send({
                cod: 1,
                status: false,
                msg: 'Token inválido'
            });
        }

        var aluno = new Aluno();
        aluno.nome = request.body.aluno.nome;
        aluno.email = request.body.aluno.email;
        aluno.idcurso = request.body.aluno.idcurso;
        aluno.senha = request.body.aluno.senha;

        const isCreated = await aluno.create();
        const objResposta = {
            cod: 1,
            status: isCreated,
            msg: isCreated ? 'Aluno criado com sucesso' : 'Erro ao criar o aluno'
        };
        response.status(200).send(objResposta);
    }

    // Método assíncrono para excluir um aluno existente.
    async aluno_delete_control(request, response) {
        const authorization = request.headers['authorization'];
        
        // Valida o token antes de continuar
        if (meutoken.validarToken(authorization) == false) {
            return response.status(401).send({
                cod: 1,
                status: false,
                msg: 'Token inválido'
            });
        }

        var aluno = new Aluno();
        aluno.id = request.params.id;
        const isDeleted = await aluno.delete();
       const payloadRecuperado=meutoken.getPayload();
       const novoToken=meutoken.gerarToken(payloadRecuperado);
        const objResposta = {
            cod: 1,
            status: isDeleted,
            msg: isDeleted ? 'Aluno excluído com sucesso' : 'Erro ao excluir o aluno',
            novotoken: novoToken
        };
        response.status(200).send(objResposta);
    }

    // Método assíncrono para atualizar um aluno existente.
    async aluno_update_control(request, response) {
        const authorization = request.headers['authorization'];
        
        // Valida o token antes de continuar
        if (meutoken.validarToken(authorization) == false) {
            return response.status(401).send({
                cod: 1,
                status: false,
                msg: 'Token inválido'
            });
        }

        var aluno = new Aluno();
        aluno.id = request.params.id;
        aluno.nome = request.body.aluno.nome;
        aluno.email = request.body.aluno.email;
        aluno.idcurso = request.body.aluno.idcurso;
        aluno.senha = request.body.aluno.senha;

        const isUpdated = await aluno.update();
        const payloadRecuperado=meutoken.getPayload();
       const  novoToken=meutoken.gerarToken(payloadRecuperado);
        const objResposta = {
            cod: 1,
            status: true,
            msg: isUpdated ? 'Aluno atualizado com sucesso' : 'Erro ao atualizar o aluno',
            novotoken: novoToken
        };
        response.status(200).send(objResposta);
    }

    // Método assíncrono para buscar todos os alunos.
    async aluno_read_all_control(request, response) {
        const authorization = request.headers['authorization'];
        
        // Valida o token antes de continuar
        if (meutoken.validarToken(authorization) == false) {
            return response.status(401).send({
                cod: 1,
                status: false,
                msg: 'Token inválido'
            });
        }

        var aluno = new Aluno();
        const resultado = await aluno.readAll();
       const payloadRecuperado=meutoken.getPayload();
       const novoToken=meutoken.gerarToken(payloadRecuperado);
        const objResposta = {
            cod: 1,
            status: true,
            msg: 'Executado com sucesso',
            alunos: resultado,
            novotoken: novoToken
        };
        response.status(200).send(objResposta);
    }

    // Método assíncrono para obter um aluno pelo ID.
    async aluno_read_by_id_control(request, response) {
        const authorization = request.headers['authorization'];
        
        // Valida o token antes de continuar
        if (meutoken.validarToken(authorization) == false) {
            return response.status(401).send({
                cod: 1,
                status: false,
                msg: 'Token inválido'
            });
        }

        var aluno = new Aluno();
        aluno.id = request.params.id;
        const resultado = await aluno.readByID();
       const payloadRecuperado=meutoken.getPayload();
       const novoToken=meutoken.gerarToken(payloadRecuperado);
       const alunoEncontrado =  resultado.length > 0;

       // Define a resposta com base no resultado encontrado
       const objResposta = {
           cod:alunoEncontrado ? 1 : 0,  // Usa código 0 se não encontrar o professor
           status:alunoEncontrado,       // Define status como true ou false baseado no resultado
           msg: alunoEncontrado ? 'Aluno encontrado' : 'Aluno não encontrado',
           aluno: alunoEncontrado ? resultado : null,
           novoToken:alunoEncontrado ? novoToken : "sem token"  // Retorna null para o professor se não encontrado
       };
   
       // Define o código de resposta como 200 se encontrado, 404 se não encontrado
       response.status(alunoEncontrado ? 200 : 404).send(objResposta);
    }
};
