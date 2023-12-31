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
import { useEffect, useState, useCallback } from "react";
import api from "../../util/api";
import { CarroModel } from "../../Model/Carro.model";
import { MdDelete } from "react-icons/md";

export default function Carro() {
  const navigate = useNavigate();

  const [listaCarro, setListaCarro] = useState([]);

  const toast = useToast();

  function handleNovoCarro() {
    navigate("/carros/cadastrocarro");
  }

  const listarCarros = useCallback(
    () =>
      api
        .get("/cars")
        .then((resp) => {
          setListaCarro(resp.data.content);
        })
        .catch(() => {
          toast({
            title: "Erro",
            description: "Problema na API",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
        }),
    [toast]
  );

  useEffect(() => {
    listarCarros();
    return () => {};
  }, [listarCarros]);

  function deletarCarro(id: number) {
    api.delete(`cars/${id}`).then(() => {
      toast({
        title: "Sucesso",
        description: "Deletado com sucesso!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      listarCarros();
    });
  }

  return (
    <>
      <Header />
      <Container maxW="90%">
        <Flex>
          <Text fontSize="2xl" mt={5}>
            Carros
          </Text>
          <Spacer />
          <Button
            onClick={handleNovoCarro}
            mt={5}
            size={"sm"}
          >
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
                <Th>Ação</Th>
              </Tr>
            </Thead>
            <Tbody>
              {listaCarro.map((car: CarroModel) => (
                <Tr key={car.id}>
                  <Td>{car.marca}</Td>
                  <Td>{car.modelo}</Td>
                  <Td>
                    {new Date(car.anoFabricacao).getFullYear().toString()}
                  </Td>
                  <Td>{new Date(car.anoModelo).getFullYear().toString()}</Td>
                  <Td>
                    {car.valor.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Td>
                  <Td>
                    <IconButton
                      onClick={() => deletarCarro(car.id)}
                      mr={2}
                      aria-label="Botão Deletar"
                      icon={<MdDelete />}
                    />
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
