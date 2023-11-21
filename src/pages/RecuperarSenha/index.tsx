import { Button, Container, Input, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { Header } from "../../components/Header";
import axios from "axios";

function RecuperarSenha() {
  const [login, setLogin] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [senha, setSenha] = useState("");
  const toast = useToast();

  function novaSenha() {
    axios
      .put("http://localhost:8080/users", {
        login: login,
        dataNascimento: dataNascimento,
        senha: senha,
      })
      .then((resp) => {
        toast({
          title: "Sucesso",
          description: "Alterado com Sucesso",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      }).catch((error) => {
        toast({
          title: "Erro",
          description: error.message,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      });
  }

  return (
    <div>
      <Header />
      <Container width={"50%"} mt={10}>
        <Text mb={10} fontSize="2xl">
          Recuperar Senha
        </Text>
        <label>Login</label>
        <Input
          mb={5}
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />

        <label>Data Nascimento</label>
        <Input
          value={dataNascimento}
          mb={5}
          type="date"
          onChange={(e) => setDataNascimento(e.target.value)}
        />

        <label>Senha</label>
        <Input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <Button type="button" width={"100%"} mt={5} onClick={novaSenha}>
          Recuperar Senha
        </Button>
        <Text />
      </Container>
    </div>
  );
}

export default RecuperarSenha;
