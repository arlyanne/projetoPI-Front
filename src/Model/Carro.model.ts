export  class CarroModel{
    
    marca:string;
    modelo:string;
    anoFabricacao:Date;
    anoModelo:Date;
    valor:number;
    id:number;
    image:string;

    constructor(
        marca: string,
        modelo: string,
        anoFabricacao: Date,
        anoModelo: Date,
        valor: number,
        id: number,
        image: string
      ) {
        this.marca = marca;
        this.modelo = modelo;
        this.anoFabricacao = anoFabricacao;
        this.anoModelo = anoModelo;
        this.valor = valor;
        this.id = id;
        this.image = image;
      }
    }