// Importa o modelo Cargo para verificar se o nome já existe no banco de dados.
const Professor = require('../model/Professor');
// Exporta a classe CargoMiddleware, que contém funções de validação para as requisições.
module.exports = class ProfessorMiddleware {
// Método para validar o nome do cargo antes de prosseguir com a criação ou atualização.
validar_NomeProfessor(request, response, next) {
// Recupera o nome do cargo enviado no corpo da requisição (request body).
const nome = request.body.professor.nome;

// Verifica se o nome do cargo tem menos de 3 caracteres.
if (nome.length < 3) {
// Se o nome for inválido, cria um objeto de resposta com o status falso e a mensagem de erro.
const objResposta = {
status: false,
msg: "O nome deve ter mais do que 3 letras"
}
// Envia a resposta com status HTTP 200 e a mensagem de erro.
response.status(200).send(objResposta);
} else {
// Caso o nome seja válido, chama o próximo middleware ou a rota definida.
next(); // Chama o próximo middleware ou rota
}
}

async validar_EmailProfessor2(request, response, next) {
    const email = request.body.professor.email;
    const id_prof=request.params.id_prof;
    const objProfessor = new Professor();
    objProfessor.email = email;
    objProfessor.id_prof = id_prof;

    const emailExiste = await objProfessor.isEmail2();

    if (emailExiste== true) {
        // Define uma flag para pular o próximo middleware
        request.skipValidarEmailProfessor = true;
    }
    
    // Continua para o próximo middleware ou controlador
    next();
}

// Middleware validar_EmailProfessor
async validar_EmailProfessor(request, response, next) {
    // Se a flag `skipValidarEmailProfessor` estiver definida, pula este middleware
    if (request.skipValidarEmailProfessor==true) {

        return next();
    }

    const email = request.body.professor.email;
    const objProfessor = new Professor();
    objProfessor.email = email;

    const emailExiste = await objProfessor.isEmail();

    if (emailExiste === true) {
        const objResposta = {
            status: false,
            msg: "Não é possível cadastrar um professor com um email já existente"
        };
        // Interrompe o fluxo, pois o email já existe
        return response.status(200).send(objResposta);
    }
    
    // Continua para o próximo middleware ou controlador se o email for único
    next();
}


    
// Método assíncrono para verificar se já existe um cargo com o mesmo nome cadastrado.

    }