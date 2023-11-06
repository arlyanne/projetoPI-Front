export  class UsuarioModel{
    
    ativo:boolean;
    dataCadastro:Date;
    dataNascimento:Date;
    id:number;
    login:string;
    nome:string;
    role:string;
    senha:string;

    constructor(
        ativo = true,
        dataCadastro = new Date(),
        dataNascimento = new Date(),
        id = 0,
        login = '',
        nome = '',
        role = '',
        senha = ''
      ) {
        this.ativo = ativo;
        this.dataCadastro = dataCadastro;
        this.dataNascimento = dataNascimento;
        this.id = id;
        this.login = login;
        this.nome = nome;
        this.role = role;
        this.senha = senha;
      }
}