// Importa o módulo 'express', que é necessário para criar o roteador.
const express = require('express');
// Importa a classe 'CargoControl', que contém a lógica de controle para as operações relacionadas a cargos.
const AlunoControl = require('../control/AlunoControl');
// Importa a classe 'CargoMiddleware', que contém validações e verificações antes das operações de controle.
const AlunoMiddleware = require('../middleware/AlunoMiddleware');
// Exporta a classe 'CargoRouter', que define as rotas relacionadas ao recurso "Cargo".
module.exports = class AlunoRouter {
// O construtor inicializa o roteador, o controle e o middleware de cargos.
constructor() {
// Cria uma instância do roteador do Express para definir as rotas.
this._router = express.Router();
// Cria uma instância de 'CargoControl', que gerencia a lógica de negócios para os cargos.
this._alunoControl = new AlunoControl();
// Cria uma instância de 'CargoMiddleware', que valida e executa verificações antes das ações principais.
this._alunoMiddleware = new AlunoMiddleware();
}
// Método para criar e configurar as rotas relacionadas ao recurso "Cargo".

criarRotasAluno() {
    // Define uma rota HTTP GET para listar todos os cargos.
    this._router.get('/',
    // Usa o método 'cargo_read_all_control' do controle para obter todos os cargos.
    this._alunoControl.aluno_read_all_control
    );
    // Define uma rota HTTP GET para buscar um cargo específico pelo ID.
    this._router.get('/:id',
    // Usa o método 'cargo_read_by_id_control' do controle para obter um cargo pelo seu ID.
    this._alunoControl.aluno_read_by_id_control
    );
    // Define uma rota HTTP POST para criar um novo cargo.
    this._router.post('/',
    // Middleware para validar o nome do cargo no corpo da requisição.
    this._alunoMiddleware.validar_NomeAluno,

    this._alunoMiddleware.validar_EmailAluno,
    // Middleware para verificar se o nome do cargo já existe no banco de dados.
    this._alunoMiddleware.existe_Id_curso,
    // Usa o método 'cargo_create_control' do controle para criar um novo cargo.
    this._alunoControl.aluno_create_control
    );
    this._router.post('/login',
        // Usa o método 'cargo_read_all_control' do controle para obter todos os cargos.
        this._alunoControl.aluno_login_control
        );
    // Define uma rota HTTP DELETE para remover um cargo pelo ID.
    this._router.delete('/:id',
    // Usa o método 'cargo_delete_control' do controle para deletar um cargo pelo seu ID.
    this._alunoControl.aluno_delete_control
    );
    // Define uma rota HTTP PUT para atualizar um cargo pelo ID.
    this._router.put('/:id',
    // Usa o método 'cargo_update_control' do controle para atualizar os dados de um cargo específico.
    this._alunoMiddleware.validar_NomeAluno,
    this._alunoMiddleware.validar_EmailAluno2,
    this._alunoMiddleware.validar_EmailAluno,
    this._alunoControl.aluno_update_control
    );
    // Retorna o roteador configurado com todas as rotas para cargos.
    return this._router;
    }
    }