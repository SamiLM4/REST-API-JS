const mysql = require('mysql2'); // ou use 'mysql' dependendo do pacote que você preferir

class Banco {
    constructor() {
        this.host = "127.0.0.1";
        this.usuario = "root";
        this.senha = "";
        this.banco = "projetoweb";
        this.porta = "3306";
        this.con = null;
    }

    conectar() {
        this.con = mysql.createConnection({
            host: this.host,
            user: this.usuario,
            password: this.senha,
            database: this.banco,
            port: this.porta
        });

        // Tentar estabelecer a conexão
        this.con.connect((err) => {
            if (err) {
                const arrayResposta = {
                    status: "erro",
                    cod: "1",
                    msg: `Erro ao estabelecer conexão: ${err.message}`
                };
                console.error(JSON.stringify(arrayResposta));
                throw new Error(arrayResposta.msg);
            } else {
                console.log('Conexão estabelecida com sucesso');
            }
        });
    }

    getConexao() {
        if (this.con == null) {
            this.conectar();
        }
        return this.con;
    }

    setConexao(conexao) {
        this.con = conexao;
        return this.con;
    }
}

module.exports = Banco;