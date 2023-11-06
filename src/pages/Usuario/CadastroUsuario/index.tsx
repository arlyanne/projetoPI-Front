import {
  Button,
  Checkbox,
  Container,
  Grid,
  GridItem,
  Input,
  useToast,
} from "@chakra-ui/react";
import { Header } from "../../../components/Header";
import { useState } from "react";
import api from "../../../util/api";
import { useNavigate } from "react-router-dom";


export default function CadastroUsuario() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [ativo, setAtivo] = useState(true);
  const [dataNascimento, setDataNascimento] = useState("");

  const toast = useToast()

  const navigate = useNavigate();

  function formatarData(): string {
    const dataCorrente = new Date();
    const ano = dataCorrente.getFullYear();
    const mes = String(dataCorrente.getMonth() + 1).padStart(2, '0'); // Os meses são base 0, então adicionamos 1 e formatamos com dois dígitos.
    const dia = String(dataCorrente.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  }

  function handleSalvar () {

    const body ={
        senha: senha,
        ativo: ativo,
        nome: nome,
        login: login,
        dataNascimento:dataNascimento,
        dataCadastro: formatarData(),
        role: "ADMIN"
    }

    api
    .post('/users', body)
    .then((resp) => {
        toast({
            title: 'Sucesso.',
            description: "Usuário salvo com sucesso.",
            status: 'success',
            duration: 2000,
            isClosable: true,
          })
          setTimeout(() => {
            navigate("/usuario")
          }, 2000);
    })
    .catch((error) => {
        toast({
            title: 'Error.',
            description: "Problema ao salvar usuário.",
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
    })
  }

  return (
    <div>
      <Header />
      <Container maxW="90%" mt={5}>
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          <GridItem colSpan={2}>
            <label>Login</label>
            <Input
              mb={5}
              value={login}
              placeholder="Digite seu e-mail"
              onChange={(e) => setLogin(e.target.value)}
            />
          </GridItem>
          <GridItem colSpan={2}>
            <label>Senha</label>
            <Input
              mb={5}
              value={senha}
              type={"password"}
              placeholder={"Senha 8 digitos"}
              onChange={(e) => setSenha(e.target.value)}
            />
          </GridItem>
        </Grid>

        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
          <GridItem colSpan={2}>
            <label>Nome</label>
            <Input 
                value={nome} 
                placeholder={"Digite seu nome completo"} 
                onChange={(e) => setNome(e.target.value)} />
          </GridItem>
          <GridItem colSpan={2}>
            <label>Data Nascimento</label>
            <Input
              mb={5}
              type="date"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <Checkbox
              mt={8}
              isChecked={ativo}
              onChange={(e) => setAtivo(e.target.checked)}
            >
              Ativo
            </Checkbox>
          </GridItem>
        </Grid>
        <Button onClick={handleSalvar} width={'18%'}>Salvar</Button>
      </Container>
    </div>
  );
}
