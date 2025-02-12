// Importa o modelo Cargo para verificar se o nome já existe no banco de dados.
const Aluno = require('../model/Aluno');
// Exporta a classe CargoMiddleware, que contém funções de validação para as requisições.
module.exports = class AlunoMiddleware {
// Método para validar o nome do cargo antes de prosseguir com a criação ou atualização.
validar_NomeAluno(request, response, next) {
// Recupera o nome do cargo enviado no corpo da requisição (request body).
const nome = request.body.aluno.nome;

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

async validar_EmailAluno2(request, response, next) {
    const email = request.body.aluno.email;
    const id=request.params.id;
    const objAluno = new Aluno();
    objAluno.email = email;
    objAluno.id = id;

    const emailExiste = await objAluno.isEmail2();

    if (emailExiste== true) {
        // Define uma flag para pular o próximo middleware
        request.skipValidarEmailAluno = true;
    }
    
    // Continua para o próximo middleware ou controlador
    next();
}



async validar_EmailAluno(request, response, next) {

    if (request.skipValidarEmailAluno==true) {

        return next();
    }
    // Recupera o nome do cargo enviado no corpo da requisição (request body).
    const email = request.body.aluno.email;
    // Cria uma nova instância do modelo Cargo.
    const objAluno = new Aluno();
    // Define o nome do cargo na instância do modelo.
    objAluno.email = email;
    // Verifica se o cargo já existe no banco de dados chamando o método isCargo().
    const emailExiste = await objAluno.isEmail();
    // Se o cargo já existir no banco de dados, cria um objeto de resposta com o status falso e uma mensagem de erro.
    if (emailExiste == true) {
    const objResposta = {
    status: false,
    msg: "Não é possível cadastrar um aluno com o mesmo nome de um email ja cadastrado"
    }
    // Envia a resposta com status HTTP 200 e a mensagem de erro.
    response.status(200).send(objResposta);
    } else {
    // Caso o nome do cargo seja único, chama o próximo middleware ou rota.
    next(); // Chama o próximo middleware ou rota
    }
    }


// Método assíncrono para verificar se já existe um cargo com o mesmo nome cadastrado.
async existe_Id_curso(request, response, next) {
    // Recupera o nome do cargo enviado no corpo da requisição (request body).
    const Idcurso = request.body.aluno.idcurso;
    // Cria uma nova instância do modelo Cargo.
    const objAluno = new Aluno();
    // Define o nome do cargo na instância do modelo.
    objAluno.idcurso = Idcurso;
    // Verifica se o cargo já existe no banco de dados chamando o método isCargo().
    const cursoExiste = await objAluno.isId_curso();
    // Se o cargo já existir no banco de dados, cria um objeto de resposta com o status falso e uma mensagem de erro.
    if (cursoExiste == false) {
    const objResposta = {
    status: false,
    msg: "Não é possível cadastrar um aluno sem um curso existente"
    }
    // Envia a resposta com status HTTP 200 e a mensagem de erro.
    response.status(200).send(objResposta);
    } else {
    // Caso o nome do cargo seja único, chama o próximo middleware ou rota.
    next(); // Chama o próximo middleware ou rota
    }
    }
    }