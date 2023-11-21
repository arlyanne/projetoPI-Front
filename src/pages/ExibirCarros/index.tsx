import { Button, Card, CardBody, Container, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import axios from "axios";
import { CarroModel } from "../../Model/Carro.model";
import { useNavigate } from "react-router-dom";


export default function ExibirCarros() {
  
const [listaDeCarros, setListaDeCarros] = useState([]);

const navigate = useNavigate();

useEffect(() => {
    axios
    .get('http://localhost:8080/cars')
    .then((resp) => {
        setListaDeCarros(resp.data.content)
    });
},[])

  function selecionarCarro (idCar: number) {
   navigate(`/exibircarros/detalhe/${idCar}`);
  }

  
    return (
    <div>
        <Header/>
      <Container maxW="90%" mt={10}>
        <Text mb={10} fontSize="2xl">
          Carros Disponiveis
        </Text>
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        {listaDeCarros.map((car: CarroModel) => (
            <GridItem colSpan={1} key={car.id}>
            <Card>
                <CardBody>
                <Image src={car.image} alt='Foto Carros' width={'200px'} height={'100px'} />
                <p>Marca: {car.marca}</p>
                <p>Modelo: {car.modelo}</p>
                <Button 
                  mt={5}
                  onClick={() => selecionarCarro(car.id)}>
                    + Detalhes
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