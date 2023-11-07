import {
  Button,
  Container,
  Flex,
  IconButton,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../util/api";
import { CarroModel } from "../../Model/Carro.model";
import { MdDelete, MdEditSquare } from "react-icons/md";

export default function Carro() {

  const navigate = useNavigate();

  const [listaCarro, setListaCarro] = useState([]);

  const toast = useToast();


  function handleNovoCarro () {
    navigate("/cadastrocarro");

  } 

  useEffect(() => {
    api
      .get("/cars")
      .then((resp) => {
        setListaCarro(resp.data.content);
      })
      .catch((error) => {
        toast({
          title: "Erro",
          description: "Problema na API",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      });
  }, []);

  function formatarData(dt: string) {
    const data = new Date(dt),
      dia = data.getDate().toString().padStart(2, "0"),
      mes = (data.getMonth() + 1).toString().padStart(2, "0"), //+1 pois no getMonth Janeiro começa com zero.
      ano = data.getFullYear();
    return dia + "/" + mes + "/" + ano;
  }

  return (
    <>
      <Header />
      <Container maxW='90%' >
        <Flex>
        <Text fontSize="2xl" mt={5}>
          Carros
        </Text>
        <Spacer/>
          <Button onClick={handleNovoCarro} mt={5}>
            Novo Carro
          </Button>
          </Flex>
        <TableContainer mt={10}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Marca</Th>
                <Th>Modelo</Th>
                <Th>Ano Fabricação</Th>
                <Th>Ano Modelo</Th>
                <Th>Valor</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
            {listaCarro.map((car: CarroModel) => (

              <Tr key={car.id}>
                <Td>{car.marca}</Td>
                <Td>{car.modelo}</Td>
                <Td>{formatarData(car.anoFabricacao.toString())}</Td>
                <Td>{formatarData(car.anoModelo.toString())}</Td>
                <Td>{car.valor}</Td>
                <Td>
                  <IconButton mr={2} aria-label="Botão Deletar" icon={<MdDelete/>} />
                  <IconButton aria-label="Botão Editar" icon={<MdEditSquare/>} />
                </Td>
              </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
