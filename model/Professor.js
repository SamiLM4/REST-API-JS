// Importa o módulo Banco para realizar conexões com o banco de dados.
const Banco = require('./Banco');

// Define a classe Cargo para representar a entidade Cargo.
class Professor {
    // Construtor da classe Cargo que inicializa as propriedades.
    constructor() {
        this._id_prof = null; // ID do cargo, inicialmente nulo.
        this._nome = ''; // Nome do cargo, inicialmente uma string vazia.
        this._email = '';
        this._data_nascimento = '';
        this._senha = '';
    }

    // Método assíncrono para criar um novo cargo no banco de dados.
   // Método assíncrono para criar um novo aluno no banco de dados.
async create() {
    const banco = new Banco(); // Cria uma nova instância da classe Banco
    const conexao = banco.getConexao(); // Obtém a conexão com o banco de dados

    const SQL = 'INSERT INTO professor(nome, email, data_nascimento, senha) VALUES (?, ?, ?, ?);'; // Query SQL para inserir o aluno

    try {
        // Passa os valores como um array no segundo argumento.
        const [result] = await conexao.promise().execute(SQL, [this._nome, this._email, this._data_nascimento, this._senha]);
        
        this._id_prof = result.insertId; // Armazena o ID gerado pelo banco de dados
        return result.affectedRows > 0; // Retorna true se a inserção afetou alguma linha
    } catch (error) {
        console.error('Erro ao criar o professor:', error); // Exibe erro no console se houver falha
        return false; // Retorna false caso ocorra um erro
    }
}

    // Método assíncrono para excluir um cargo do banco de dados.
    async delete() {
        const banco = new Banco(); // Cria uma nova instância da classe Banco
        banco.conectar(); // Estabelece a conexão com o banco de dados
        const conexao = banco.getConexao(); // Obtém a conexão com o banco de dados

        const SQL = 'DELETE FROM professor WHERE id_prof = ?;'; // Query SQL para deletar um cargo pelo ID.
        try {
            const [result] = await conexao.promise().execute(SQL, [this._id_prof]); // Executa a query de exclusão.
            return result.affectedRows > 0; // Retorna true se alguma linha foi afetada (cargo deletado).
        } catch (error) {
            console.error('Erro ao excluir o professor:', error); // Exibe erro no console se houver falha.
            return false; // Retorna false caso ocorra um erro.
        }
    }

    // Método assíncrono para atualizar os dados de um cargo no banco de dados.
    async update() {
        const banco = new Banco(); // Cria uma nova instância da classe Banco
        banco.conectar(); // Estabelece a conexão com o banco de dados
        const conexao = banco.getConexao(); // Obtém a conexão com o banco de dados

        const SQL = 'UPDATE professor SET nome = ?, email= ?, data_nascimento=?, senha=?  WHERE id_prof = ?;'; // Query SQL para atualizar o nome de um cargo.
        try {
            const [result] = await conexao.promise().execute(SQL, [this._nome,this._email,this._data_nascimento,this._senha, this._id_prof]); // Executa a query de atualização.
            return result.affectedRows > 0; // Retorna true se a atualização afetou alguma linha.
        } catch (error) {
            console.error('Erro ao atualizar o professor:', error); // Exibe erro no console se houver falha.
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

    async isEmail2() {
        const banco = new Banco(); // Cria uma nova instância da classe Banco
        banco.conectar(); // Estabelece a conexão com o banco de dados
        const conexao = banco.getConexao(); // Obtém a conexão com o banco de dados

        const SQL = 'SELECT COUNT(*) AS qtd FROM professor WHERE email = ? AND id_prof=?;';
        // Query SQL para contar cargos com o mesmo nome.
        try {
            const [rows] = await conexao.promise().execute(SQL, [this._email, this._id_prof]); // Executa a query.
            return rows[0].qtd > 0;
             // Retorna true se houver algum cargo com o mesmo nome.
        } catch (error) {
            console.error('Erro ao verificar o email:', error); // Exibe erro no console se houver falha.
            return false; // Retorna false caso ocorra um erro.
        }
    }


   


    async login() {
        const banco = new Banco(); // Cria uma nova instância da classe Banco
        banco.conectar(); // Estabelece a conexão com o banco de dados
        const conexao = banco.getConexao(); // Obtém a conexão com o banco de dados

        const SQL = 'SELECT COUNT(*) AS qtd FROM professor WHERE email = ? AND senha = ?;'; // Query SQL para contar cargos com o mesmo nome.
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

        const SQL = 'SELECT id_prof, nome, email,data_nascimento FROM professor ORDER BY nome;'; // Query SQL para selecionar todos os cargos ordenados pelo nome.
        try {
            const [rows] = await conexao.promise().execute(SQL); // Executa a query de seleção.
            
            return rows; // Retorna a lista de cargos.
        } catch (error) {
            console.error('Erro ao ler professores:', error); // Exibe erro no console se houver falha.
            return []; // Retorna uma lista vazia caso ocorra um erro.
        }
    }

    // Método assíncrono para ler um cargo pelo seu ID.
    async readByID() {
        const banco = new Banco(); // Cria uma nova instância da classe Banco
        banco.conectar(); // Estabelece a conexão com o banco de dados
        const conexao = banco.getConexao(); // Obtém a conexão com o banco de dados
       
        const SQL = 'SELECT * FROM professor WHERE id_prof = ?;'; // Query SQL para selecionar um cargo pelo ID.
        try {
            const [rows] = await conexao.promise().execute(SQL, [this._id_prof]); // Executa a query de seleção.
            return rows; // Retorna o cargo correspondente ao ID.
        } catch (error) {
            console.error('Erro ao ler professor pelo ID:', error); // Exibe erro no console se houver falha.
            return null; // Retorna null caso ocorra um erro.
        }
    }

    // Getter para obter o valor de idCargo.
    get id_prof() {
        return this._id_prof;
    }

    // Setter para definir o valor de idCargo.
    set id_prof(id_prof) {
        this._id_prof = id_prof;
    }

    // Getter para obter o valor de nomeCargo.
    get nome() {
        return this._nome;
    }

    // Setter para definir o valor de nomeCargo.
    set nome(nome) {
        this._nome = nome;
    }


    get email() {
        return this._email;
    }

    // Setter para definir o valor de nomeCargo.
    set email(email) {
        this._email = email;
    }


    get data_nascimento() {
        return this._data_nascimento;
    }

    // Setter para definir o valor de nomeCargo.
    set data_nascimento(data_nascimento) {
        this._data_nascimento = data_nascimento;
    }


    get senha() {
        return this._senha;
    }

    // Setter para definir o valor de nomeCargo.
    set senha(senha) {
        this._senha = senha;
    }
}

// Exporta a classe Cargo para que possa ser utilizada em outros módulos.
module.exports = Professor;
