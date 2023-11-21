export  class CarroModel{
    
    marca:string;
    modelo:string;
    anoFabricacao:string;
    descricao: string;
    anoModelo:string;
    valor:number;
    id:number;
    image:string;

    constructor(
        marca: string,
        modelo: string,
        anoFabricacao: string,
        descricao: string,
        anoModelo: string,
        valor: number,
        id: number,
        image: string
      ) {
        this.marca = marca;
        this.modelo = modelo;
        this.anoFabricacao = anoFabricacao;
        this.descricao = descricao
        this.anoModelo = anoModelo;
        this.valor = valor;
        this.id = id;
        this.image = image;
      }
    }