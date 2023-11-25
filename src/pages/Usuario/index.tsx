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
import { UsuarioModel } from "../../Model/Usuario.model";
import { MdDelete } from "react-icons/md";

export default function Usuario() {
  const navigate = useNavigate();

  const toast = useToast();

  const [listaUsuario, setListaUsuario] = useState([]);

  function handleNovoUsuario() {
    navigate("cadastrousuario");
  }

  const listarUsuario = useCallback(
    () =>
      api
        .get("/users")
        .then((resp) => {
          setListaUsuario(resp.data.content);
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
    listarUsuario();
    return () => {};
  }, [listarUsuario]);

  function formatarData(dt: string) {
    const data = new Date(dt),
      dia = data.getDate().toString().padStart(2, "0"),
      mes = (data.getMonth() + 1).toString().padStart(2, "0"), //+1 pois no getMonth Janeiro começa com zero.
      ano = data.getFullYear();
    return dia + "/" + mes + "/" + ano;
  }

  function deletarUsuario(id: number) {
    api.delete(`users/${id}`).then(() => {
      toast({
        title: "Sucesso",
        description: "Deletado com sucesso!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      listarUsuario();
    });
  }

  return (
    <div>
      <Header />
      <Container maxW="90%">
        <Flex>
          <Text fontSize="2xl" mt={5}>
            Usuários
          </Text>
          <Spacer />
          <Button
            onClick={handleNovoUsuario}
            mt={5}
            size={"sm"}
          >
            Novo Usuário
          </Button>
        </Flex>
        <TableContainer mt={10}>
          <Table>
            <Thead>
              <Tr>
                <Th>Login</Th>
                <Th>Nome</Th>
                <Th>Ativo</Th>
                <Th>Data Nascimento</Th>
                <Th>Data Cadastro</Th>
                <Th>Excluir</Th>
              </Tr>
            </Thead>
            <Tbody>
              {listaUsuario.map((user: UsuarioModel) => (
                <Tr key={user.id}>
                  <Td>{user.login}</Td>

                  <Td>{user.nome}</Td>
                  <Td>{user.ativo == true ? "Sim" : "Não"}</Td>
                  <Td>{formatarData(user.dataNascimento.toString())}</Td>
                  <Td>{formatarData(user.dataCadastro.toString())}</Td>
                  <Td>
                    <IconButton
                      onClick={() => deletarUsuario(user.id)}
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
    </div>
  );
}
