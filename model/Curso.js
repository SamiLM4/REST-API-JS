// Importa o módulo Banco para realizar conexões com o banco de dados.
const Banco = require('./Banco');

// Define a classe Cargo para representar a entidade Cargo.
class Curso {
    // Construtor da classe Cargo que inicializa as propriedades.
    constructor() {
        this._id_curso = null; // ID do curso, inicialmente nulo.
        this._nome_curso = ''; // Nome do curso, inicialmente uma string vazia.
        this._preco_curso = null; // Preço do curso, inicialmente nulo.
        this._anos_conclusao = null; // Anos para conclusão, inicialmente nulo.
        this._id_professor = null; // ID do professor, inicialmente nulo.
        this._email = ''; // Email do professor, inicialmente uma string vazia.
        this._senha = ''; // Senha, inicialmente uma string vazia.
    }
    

    // Método assíncrono para criar um novo cargo no banco de dados.
   // Método assíncrono para criar um novo aluno no banco de dados.
async create() {
    const banco = new Banco(); // Cria uma nova instância da classe Banco
    const conexao = banco.getConexao(); // Obtém a conexão com o banco de dados

    const SQL = 'INSERT INTO curso (nome_curso, preco_curso, anos_conclusao, id_professor, email, senha) VALUES (?, ?, ?, ?, ?, ?);';
    // Query SQL para inserir o aluno

    try {
        // Passa os valores como um array no segundo argumento.
        const [result] = await conexao.promise().execute(SQL, [
            this._nome_curso,
            this._preco_curso,
            this._anos_conclusao,
            this._id_professor,
            this._email,
            this._senha
        ]);
        
        
        this._id_curso = result.insertId; // Armazena o ID gerado pelo banco de dados
        return result.affectedRows > 0; // Retorna true se a inserção afetou alguma linha
    } catch (error) {
        console.error('Erro ao criar o curso:', error); // Exibe erro no console se houver falha
        return false; // Retorna false caso ocorra um erro
    }
}

    // Método assíncrono para excluir um cargo do banco de dados.
    async delete() {
        const banco = new Banco(); // Cria uma nova instância da classe Banco
        banco.conectar(); // Estabelece a conexão com o banco de dados
        const conexao = banco.getConexao(); // Obtém a conexão com o banco de dados

        const SQL = 'DELETE FROM curso WHERE id_curso = ?;'; // Query SQL para deletar um cargo pelo ID.
        try {
            const [result] = await conexao.promise().execute(SQL, [this._id_curso]); // Executa a query de exclusão.
            return result.affectedRows > 0; // Retorna true se alguma linha foi afetada (cargo deletado).
        } catch (error) {
            console.error('Erro ao excluir o curso:', error); // Exibe erro no console se houver falha.
            return false; // Retorna false caso ocorra um erro.
        }
    }

    // Método assíncrono para atualizar os dados de um cargo no banco de dados.
    async update() {
        const banco = new Banco(); // Cria uma nova instância da classe Banco
        banco.conectar(); // Estabelece a conexão com o banco de dados
        const conexao = banco.getConexao(); // Obtém a conexão com o banco de dados

        const SQL = 'UPDATE curso SET nome_curso = ?, preco_curso = ?, anos_conclusao = ?, id_professor = ?, email = ?, senha = ? WHERE id_curso = ?;';
        // Query SQL para atualizar o nome de um cargo.
        try {
            const [result] = await conexao.promise().execute(SQL, [
                this._nome_curso,
                this._preco_curso,
                this._anos_conclusao,
                this._id_professor,
                this._email,
                this._senha,
                this._id_curso
            ]);
             // Executa a query de atualização.
            return result.affectedRows > 0; // Retorna true se a atualização afetou alguma linha.
        } catch (error) {
            console.error('Erro ao atualizar o Curso:', error); // Exibe erro no console se houver falha.
            return false; // Retorna false caso ocorra um erro.
        }
    }

    // Método assíncrono para verificar se um cargo já existe no banco de dados.
    async isEmail() {
        const banco = new Banco(); // Cria uma nova instância da classe Banco
        banco.conectar(); // Estabelece a conexão com o banco de dados
        const conexao = banco.getConexao(); // Obtém a conexão com o banco de dados

        const SQL = 'SELECT COUNT(*) AS qtd FROM professor WHERE email = ?;'; // Query SQL para contar cargos com o mesmo nome.
        try {
            const [rows] = await conexao.promise().execute(SQL, [this._email]); // Executa a query.
            return rows[0].qtd > 0; // Retorna true se houver algum cargo com o mesmo nome.
        } catch (error) {
            console.error('Erro ao verificar o email:', error); // Exibe erro no console se houver falha.
            return false; // Retorna false caso ocorra um erro.
        }
    }

    async isId_professor() {
        const banco = new Banco(); // Cria uma nova instância da classe Banco
        banco.conectar(); // Estabelece a conexão com o banco de dados
        const conexao = banco.getConexao(); // Obtém a conexão com o banco de dados

        const SQL = 'SELECT COUNT(*) AS qtd FROM professor WHERE id_prof = ?;'; // Query SQL para contar cargos com o mesmo nome.
        try {
            const [rows] = await conexao.promise().execute(SQL, [this._id_professor]); // Executa a query.
            return rows[0].qtd > 0; // Retorna true se houver algum cargo com o mesmo nome.
        } catch (error) {
            console.error('Erro ao verificar o id_professor:', error); // Exibe erro no console se houver falha.
            return false; // Retorna false caso ocorra um erro.
        }
    }
    
    



    async login() {
        const banco = new Banco(); // Cria uma nova instância da classe Banco
        banco.conectar(); // Estabelece a conexão com o banco de dados
        const conexao = banco.getConexao(); // Obtém a conexão com o banco de dados

        const SQL = 'SELECT COUNT(*) AS qtd FROM curso WHERE email = ? AND senha = ?;'; // Query SQL para contar cargos com o mesmo nome.
        try {
            const [rows] = await conexao.promise().execute(SQL, [this._email,this._senha]); // Executa a query.
            return rows[0].qtd > 0; // Retorna true se houver algum cargo com o mesmo nome.
        } catch (error) {
            console.error('Erro ao verificar ao logar:', error); // Exibe erro no console se houver falha.
            return false; // Retorna false caso ocorra um erro.
        }
    }



    // Método assíncrono para ler todos os cargos do banco de dados.
    async readAll() {
        const banco = new Banco(); // Cria uma nova instância da classe Banco
        banco.conectar(); // Estabelece a conexão com o banco de dados
        const conexao = banco.getConexao(); // Obtém a conexão com o banco de dados

        const SQL = 'SELECT id_curso, nome_curso, preco_curso, anos_conclusao, id_professor, email, senha FROM curso ORDER BY nome_curso;';
// Query SQL para selecionar todos os cargos ordenados pelo nome.
        try {
            const [rows] = await conexao.promise().execute(SQL); // Executa a query de seleção.
            
            return rows; // Retorna a lista de cargos.
        } catch (error) {
            console.error('Erro ao ler cursos:', error); // Exibe erro no console se houver falha.
            return []; // Retorna uma lista vazia caso ocorra um erro.
        }
    }

    // Método assíncrono para ler um cargo pelo seu ID.
    async readByID() {
        const banco = new Banco(); // Cria uma nova instância da classe Banco
        banco.conectar(); // Estabelece a conexão com o banco de dados
        const conexao = banco.getConexao(); // Obtém a conexão com o banco de dados
       
        const SQL = 'SELECT * FROM curso WHERE id_curso = ?;'; // Query SQL para selecionar um cargo pelo ID.
        try {
            const [rows] = await conexao.promise().execute(SQL, [this._id_curso]); // Executa a query de seleção.
            return rows; // Retorna o cargo correspondente ao ID.
        } catch (error) {
            console.error('Erro ao ler curso pelo ID:', error); // Exibe erro no console se houver falha.
            return null; // Retorna null caso ocorra um erro.
        }
    }

    // Getter e Setter para o campo id_curso
get id_curso() {
    return this._id_curso;
}
set id_curso(id_curso) {
    this._id_curso = id_curso;
}

// Getter e Setter para o campo nome_curso
get nome_curso() {
    return this._nome_curso;
}
set nome_curso(nome_curso) {
    this._nome_curso = nome_curso;
}

// Getter e Setter para o campo preco_curso
get preco_curso() {
    return this._preco_curso;
}
set preco_curso(preco_curso) {
    this._preco_curso = preco_curso;
}

// Getter e Setter para o campo anos_conclusao
get anos_conclusao() {
    return this._anos_conclusao;
}
set anos_conclusao(anos_conclusao) {
    this._anos_conclusao = anos_conclusao;
}

// Getter e Setter para o campo id_professor
get id_professor() {
    return this._id_professor;
}
set id_professor(id_professor) {
    this._id_professor = id_professor;
}

// Getter e Setter para o campo email
get email() {
    return this._email;
}
set email(email) {
    this._email = email;
}

// Getter e Setter para o campo senha
get senha() {
    return this._senha;
}
set senha(senha) {
    this._senha = senha;
}

}

// Exporta a classe Cargo para que possa ser utilizada em outros módulos.
module.exports = Curso;
