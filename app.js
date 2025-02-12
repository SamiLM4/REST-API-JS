// Importa o módulo 'express', que é um framework web para criar e configurar servidores HTTP.
const express = require('express');
// Importa os roteadores 'AlunoRouter' e 'ProfessorRouter', que definem as rotas e a lógica relacionadas a "Aluno" e "Professor".
const AlunoRouter = require('./router/AlunoRouter');
const ProfessorRouter = require('./router/ProfessorRouter');
const CursoRouter = require('./router/CursoRouter');

// Cria uma instância do servidor Express.
const app = express();
// Define a porta na qual o servidor vai escutar.
const portaServico = 8080;

// Adiciona um middleware que faz o parse das requisições com conteúdo JSON.
app.use(express.json());

// Cria instâncias dos roteadores 'AlunoRouter' e 'ProfessorRouter'.
const alunoRoteador = new AlunoRouter();
const professorRoteador = new ProfessorRouter(); 
const cursoRoteador = new CursoRouter(); 

// Adiciona os roteadores, vinculando as rotas definidas para 'aluno' e 'professor'.
app.use('/aluno', alunoRoteador.criarRotasAluno());
app.use('/professor', professorRoteador.criarRotasProfessor());
app.use('/curso', cursoRoteador.criarRotasCurso());

// Inicia o servidor e exibe uma mensagem no console com a URL onde o servidor está rodando.
app.listen(portaServico, () => {
    console.log(`API rodando no endereço: http://localhost:${portaServico}/`);
});
