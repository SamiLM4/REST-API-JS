// Importa o módulo 'express', necessário para criar o roteador.
const express = require('express');
// Importa a classe 'ProfessorControl', que contém a lógica de controle para as operações relacionadas a professores.
const ProfessorControl = require('../control/ProfessorControl');
// Importa a classe 'ProfessorMiddleware', que contém validações e verificações antes das operações de controle.
const ProfessorMiddleware = require('../middleware/ProfessorMiddleware');

// Exporta a classe 'ProfessorRouter', que define as rotas relacionadas ao recurso "Professor".
module.exports = class ProfessorRouter {
    // O construtor inicializa o roteador, o controle e o middleware de professores.
    constructor() {
        // Cria uma instância do roteador do Express para definir as rotas.
        this._router = express.Router();
        // Cria uma instância de 'ProfessorControl', que gerencia a lógica de negócios para professores.
        this._professorControl = new ProfessorControl();
        // Cria uma instância de 'ProfessorMiddleware', que valida e executa verificações antes das ações principais.
        this._professorMiddleware = new ProfessorMiddleware();
    }

    // Método para criar e configurar as rotas relacionadas ao recurso "Professor".
    criarRotasProfessor() {
        // Define uma rota HTTP GET para listar todos os professores.
        this._router.get('/',
            this._professorControl.professor_read_all_control
        );
        
        // Define uma rota HTTP GET para buscar um professor específico pelo ID.
        this._router.get('/:id_prof',
            this._professorControl.professor_read_by_id_control
        );

        // Define uma rota HTTP POST para criar um novo professor.
        this._router.post('/',
            // Middleware para validar o nome do professor no corpo da requisição.
            
            // Middleware para validar o email do professor.
            this._professorMiddleware.validar_NomeProfessor,
            this._professorMiddleware.validar_EmailProfessor,
            // Método para criar um novo professor.
            this._professorControl.professor_create_control
        );

        // Define uma rota HTTP POST para login do professor.
        this._router.post('/login',
            this._professorControl.professor_login_control
        );

        // Define uma rota HTTP DELETE para remover um professor pelo ID.
        this._router.delete('/:id_prof',
            this._professorControl.professor_delete_control
        );

        // Define uma rota HTTP PUT para atualizar um professor pelo ID.
        this._router.put('/:id_prof',
            this._professorMiddleware.validar_NomeProfessor,
            this._professorMiddleware.validar_EmailProfessor2,
            this._professorMiddleware.validar_EmailProfessor,
            this._professorControl.professor_update_control
        );

        // Retorna o roteador configurado com todas as rotas para professores.
        return this._router;
    }
}
