import { Button, Card, CardBody, Container, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import axios from "axios";
import { CarroModel } from "../../Model/Carro.model";


export default function ExibirCarros() {
  
const [listaDeCarros, setListaDeCarros] = useState([]);

useEffect(() => {
    axios
    .get('http://localhost:8080/cars')
    .then((resp) => {
        setListaDeCarros(resp.data.content)
    });
})

function formatarData(dt: string) {
    const data = new Date(dt),
      dia = data.getDate().toString().padStart(2, "0"),
      mes = (data.getMonth() + 1).toString().padStart(2, "0"), //+1 pois no getMonth Janeiro começa com zero.
      ano = data.getFullYear();
    return dia + "/" + mes + "/" + ano;
  }

  
    return (
    <div>
        <Header/>
      <Container maxW="90%" mt={10}>
        <Text mb={10} fontSize="2xl">
          Exibir Carros
        </Text>
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        {listaDeCarros.map((car: CarroModel) => (
            <GridItem colSpan={1} key={car.id}>
            <Card>
                <CardBody>
                <Image src={car.image} alt='Foto Carros' />
                <p>Marca:{car.marca}</p>
                <p>Modelo: {formatarData(car.anoModelo.toString())}</p>
                <p>Ano: {formatarData(car.anoFabricacao.toString())}</p>
                <p>Descrição: {car.descricao}</p>
                <Button>
            Interesse
          </Button>
            </CardBody>
           </Card>
           </GridItem>
            ))
        }
        </Grid>
      </Container>
    </div>
    )
}