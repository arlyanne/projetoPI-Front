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
  Tooltip,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import api from "../../util/api";
import React, { useEffect, useState } from "react";
import { InteresseModel } from "../../Model/Interesse.model";
import { Header } from "../../components/Header";
import { MdOutlineDone } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Interesses() {
  const [listaInteresses, setListaInteresses] = useState<InteresseModel[]>([]);


  const toast = useToast();
  const navigate = useNavigate();

  function listarInteresses() {
    api
      .get("/interests")
      .then((resp) => {
        setListaInteresses(resp.data.content);
      })
      .catch(() => {
        toast({
          title: "Erro",
          description: "Problema na API",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      });
  }

  function visualizarImpressao() {
    navigate('/document');
  }

  function liberarCarro (id: number) {
    const body ={
      ativo : false
    }
    api.put(`/interests/${id}`, body)
    .then (() => {
      listarInteresses()
      toast({
        title: "Sucesso",
        description: "Carro Liberado com Sucesso!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    })
  }

  useEffect(() => {
    listarInteresses();
  }, []);

  return (
    <>
      <Header />
      <Container maxW="90%">
        <Flex>
          <Text fontSize="2xl" mt={5}>
            Interesses
          </Text>
          <Spacer />
          <Button onClick={visualizarImpressao} mt={5}>
            Imprimir Interesses
          </Button>
        </Flex>
        <TableContainer mt={10}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>Telefone</Th>
                <Th>Data de Interesse</Th>
                <Th>Carro</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {listaInteresses.map((inters: InteresseModel) => (
                <Tr key={inters.id}>
                  <Td>{inters.nome}</Td>
                  <Td>{inters.telefone}</Td>
                  <Td>{inters.dataInteresse}</Td>
                  <Td>
                    {inters.carro.marca} {inters.carro.modelo}
                  </Td>
                  <Td>
                    <Tooltip label="Liberar carro" aria-label="A tooltip">
                      <IconButton
                          onClick={() => liberarCarro(inters.id)}
                        isDisabled={inters.ativo == false}
                        mr={2}
                        aria-label="Liberar"
                        icon={<MdOutlineDone />}
                      />
                    </Tooltip>
                   
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
