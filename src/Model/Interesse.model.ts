import { CarroModel } from "./Carro.model";

export  class InteresseModel{
    
    ativo: boolean;
    carro:CarroModel;
    dataInteresse:string;
    id:number;
    nome:string;
    telefone:string;

    constructor(ativo: boolean, carro: CarroModel, dataInteresse: string, id: number, nome: string, telefone: string) {
        this.ativo = ativo;
        this.carro = carro;
        this.dataInteresse = dataInteresse;
        this.id = id;
        this.nome = nome;
        this.telefone = telefone;
      }
    }