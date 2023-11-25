import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import axios from "axios";
import { CarroModel } from "../../Model/Carro.model";
import { useNavigate } from "react-router-dom";

export default function ExibirCarros() {
  const [listaDeCarros, setListaDeCarros] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/cars").then((resp) => {
      setListaDeCarros(resp.data.content);
    });
  }, []);

  function selecionarCarro(idCar: number) {
    navigate(`/exibircarros/detalhe/${idCar}`);
  }

  return (
    <div>
      <Header />
      <Container maxW="90%" mt={10}>
        <Text mb={10} fontSize="2xl" >
          Carros Disponiveis
        </Text>
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
          {listaDeCarros.map((car: CarroModel) => (
            <GridItem colSpan={1} key={car.id}>
              <Card shadow={"xl"}>
                <CardBody>
                  <Box rounded={"md"}>
                    <Badge
                      position={"relative"}
                      top={5}
                      left={"90%"}
                      variant={"subtle"}
                      rounded={"xl"}
                      colorScheme="green"
                    >
                      {car.anoModelo}
                    </Badge>
                    <Image
                      src={car.image}
                      alt="Foto Carros"
                      width={"200px"}
                      height={"100px"}
                    />
                  </Box>

                  <Flex
                    width={"100%"}
                    justify={"center"}
                    direction={"column"}
                    alignItems={"center"}
                  >
                    <Text>{car.modelo}</Text>
                    <Text fontSize={"2xl"}>{car.marca}</Text>
                  </Flex>
                  <Flex width={"100%"} direction={"column"}>
                    <Button
                      mt={5}
                      colorScheme={"green"}
                      onClick={() => selecionarCarro(car.id)}
                    >
                      + Detalhes
                    </Button>
                  </Flex>
                </CardBody>
              </Card>
            </GridItem>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
