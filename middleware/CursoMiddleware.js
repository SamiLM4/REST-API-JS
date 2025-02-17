// Importa o modelo Cargo para verificar se o nome já existe no banco de dados.
const Curso = require('../model/Curso');
// Exporta a classe CargoMiddleware, que contém funções de validação para as requisições.
module.exports = class CursoMiddleware {
// Método para validar o nome do cargo antes de prosseguir com a criação ou atualização.
validar_NomeCurso(request, response, next) {
// Recupera o nome do cargo enviado no corpo da requisição (request body).
const nome_curso = request.body.curso.nome_curso;

// Verifica se o nome do cargo tem menos de 3 caracteres.
if (nome_curso.length < 2) {
// Se o nome for inválido, cria um objeto de resposta com o status falso e a mensagem de erro.
const objResposta = {
status: false,
msg: "O nome do curso deve ter mais do que 2 letras"
}
// Envia a resposta com status HTTP 200 e a mensagem de erro.
response.status(200).send(objResposta);
} else {
// Caso o nome seja válido, chama o próximo middleware ou a rota definida.
next(); // Chama o próximo middleware ou rota
}
}

async existe_Id_professor(request, response, next) {
    // Recupera o nome do cargo enviado no corpo da requisição (request body).
    const id_professor = request.body.curso.id_professor;
    // Cria uma nova instância do modelo Cargo.
    const objCurso = new Curso();
    // Define o nome do cargo na instância do modelo.
    objCurso.id_professor = id_professor;
    // Verifica se o cargo já existe no banco de dados chamando o método isCargo().
    const professorExiste = await objCurso.isId_professor();
    // Se o cargo já existir no banco de dados, cria um objeto de resposta com o status falso e uma mensagem de erro.
    if (professorExiste == false) {
    const objResposta = {
    status: false,
    msg: "Não é possível cadastrar um curso sem um professor existente"
    }
    // Envia a resposta com status HTTP 200 e a mensagem de erro.
    response.status(200).send(objResposta);
    } else {
    // Caso o nome do cargo seja único, chama o próximo middleware ou rota.
    next(); // Chama o próximo middleware ou rota
    }
    }

    
// Método assíncrono para verificar se já existe um cargo com o mesmo nome cadastrado.

    }