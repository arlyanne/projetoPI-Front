import { useEffect, useState } from "react";
import { Header } from "../../../components/Header";
import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  FormLabel,
  Grid,
  GridItem,
  Img,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CarroModel } from "../../../Model/Carro.model";
import { maskPhone } from "../../../util/mask_telefone";

export default function DetalheCarro() {
  const [detalheCarro, setDetalheCarro] = useState<CarroModel>();
  const [telefone, setTelefone] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const toast = useToast();
  const [desabilitarBotao, setDesabilitarBotao] = useState<boolean>(false);

  const params = useParams();

  function enviarDados() {
    if (nome.length < 3) {
      toast({
        title: "Erro.",
        description: "Nome inválido.",
        status: "error",
      });
      return;
    }

    if (telefone.length < 10) {
      toast({
        title: "Erro.",
        description: "Telefone inválido.",
        status: "error",
      });
      return;
    }
    const body = {
      telefone: telefone,
      carId: params.id,
      nome: nome,
    };
    axios.post("http://localhost:8080/interests", body).then(() => {
      toast({
        title: "Sucesso.",
        description: "Dados Enviados.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setDesabilitarBotao(true);
    });
  }

  useEffect(() => {
    axios.get(`http://localhost:8080/cars/${params.id}`).then((resp) => {
      setDetalheCarro(resp.data);
    });
  }, []);

  return (
    <div>
      <Header />
      <Container maxW="90%" mt={10}>
        {detalheCarro && (
          <>
            <Text fontSize="25px" fontWeight={"bold"}>
              {detalheCarro.marca} {detalheCarro.modelo} -{" "}
              {detalheCarro.descricao}
            </Text>
            <p>
              {detalheCarro.anoFabricacao} - {detalheCarro.anoModelo}
            </p>
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
              <GridItem colSpan={3}>
                <Box boxSize="md" shadow={"2xl"} rounded={"xl"}>
                  <Img src={detalheCarro.image} width={"400px"} />
                </Box>
              </GridItem>
              <GridItem colSpan={2}>
                <Card>
                  <CardBody>
                    <Text fontSize="25px" fontWeight={"bold"}>
                      {detalheCarro.valor.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </Text>
                    <p>preço à vista</p>
                    <p>
                      Ficou interessado? Preencha seus dados e envie sua
                      proposta para o vendedor
                    </p>
                    <FormLabel mt={5}>Nome</FormLabel>
                    <Input
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                    <FormLabel mt={5}>Telefone</FormLabel>
                    <Input
                      value={telefone}
                      onChange={(e) => setTelefone(maskPhone(e.target.value))}
                    />
                    <Button
                      isDisabled={desabilitarBotao}
                      onClick={enviarDados}
                      mt={5}
                      width={"100%"}
                      colorScheme="green"
                      variant={"outline"}
                    >
                      Enviar dados
                    </Button>
                  </CardBody>
                </Card>
              </GridItem>
            </Grid>
          </>
        )}
      </Container>
    </div>
  );
}
