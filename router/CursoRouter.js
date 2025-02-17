// Importa o módulo 'express', necessário para criar o roteador.
const express = require('express');
// Importa a classe 'ProfessorControl', que contém a lógica de controle para as operações relacionadas a professores.
const CursoControl = require('../control/CursoControl');
// Importa a classe 'ProfessorMiddleware', que contém validações e verificações antes das operações de controle.
const CursoMiddleware = require('../middleware/CursoMiddleware');

// Exporta a classe 'ProfessorRouter', que define as rotas relacionadas ao recurso "Professor".
module.exports = class CursoRouter {
    // O construtor inicializa o roteador, o controle e o middleware de professores.
    constructor() {
        // Cria uma instância do roteador do Express para definir as rotas.
        this._router = express.Router();
        // Cria uma instância de 'ProfessorControl', que gerencia a lógica de negócios para professores.
        this._cursoControl = new CursoControl();
        // Cria uma instância de 'ProfessorMiddleware', que valida e executa verificações antes das ações principais.
        this._cursoMiddleware = new CursoMiddleware();
    }

    // Método para criar e configurar as rotas relacionadas ao recurso "Professor".
    criarRotasCurso() {
        // Define uma rota HTTP GET para listar todos os professores.
        this._router.get('/',
            this._cursoControl.curso_read_all_control
        );
        
        // Define uma rota HTTP GET para buscar um professor específico pelo ID.
        this._router.get('/:id_curso',
            this._cursoControl.curso_read_by_id_control
        );

        // Define uma rota HTTP POST para criar um novo professor.
        this._router.post('/',
            // Middleware para validar o nome do professor no corpo da requisição.
            
            // Middleware para validar o email do professor.
            this._cursoMiddleware.validar_NomeCurso,
            this._cursoMiddleware.existe_Id_professor,
            // Método para criar um novo professor.
            this._cursoControl.curso_create_control
        );

        // Define uma rota HTTP DELETE para remover um professor pelo ID.
        this._router.delete('/:id_curso',
            this._cursoControl.curso_delete_control
        );

        // Define uma rota HTTP PUT para atualizar um professor pelo ID.
        this._router.put('/:id_curso',
            this._cursoMiddleware.validar_NomeCurso,
            this._cursoMiddleware.existe_Id_professor,
            this._cursoControl.curso_update_control
        );

        // Retorna o roteador configurado com todas as rotas para professores.
        return this._router;
    }
}
