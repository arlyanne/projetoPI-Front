import {
  Button,
  Card,
  CardBody,
  Container,
  Grid,
  GridItem,
  Img,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Header } from "../../components/Header";
import api from "../../util/api";
import { useNavigate } from "react-router-dom";
import Resizer from "react-image-file-resizer";

export default function CadastroCarro() {
  const [marca, setMarca] = useState("");
  const [descricao, setDescricao] = useState("");
  const [modelo, setModelo] = useState("");
  const [anoModelo, setAnoModelo] = useState("");
  const [anoFabricacao, setAnoFabricaco] = useState("");
  const [valor, setValor] = useState("");
  const [imagem, setImagem] = useState<any>();
  const toast = useToast();
  const navigate = useNavigate();

  async function handleSelecionarImagem(e: any) {
    e.preventDefault();    
    try {
        Resizer.imageFileResizer(
          e.target.files[0],
          200,
          200,
          "JPEG",
          50,
          0,
          (uri) => {
            console.log(uri);
            setImagem(uri);
          },
          "base64",
          200,
          200
        );
      } catch (err) {
        console.log(err);
      }

      
    
  }

  function formatarData(dt:any): string {
    const dataCorrente = new Date(dt);
    const ano = dataCorrente.getFullYear();
    const mes = String(dataCorrente.getMonth() + 1).padStart(2, '0'); // Os meses são base 0, então adicionamos 1 e formatamos com dois dígitos.
    const dia = String(dataCorrente.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  }


  function handleSalvar() {
    const body = {
      marca: marca,
      modelo: modelo,
      descricao: descricao,
      anoFabricacao: formatarData(anoFabricacao),
      anoModelo: formatarData(anoModelo),
      valor: parseInt( valor),
      image: imagem,
    };

    api
      .post("/cars", body)
      .then(() => {
        toast({
          title: "Sucesso.",
          description: "Carro salvo com sucesso.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setTimeout(() => {
          navigate("/carro");
        }, 2000);
      })
      .catch(() => {
        toast({
          title: "Error.",
          description: "Problema ao salvar carro.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }

  return (
    <div>
      <Header />
      <Container maxW="90%" mt={5}>
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          <GridItem colSpan={1}>
            <label>Marca</label>
            <Input
              mb={5}
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <label>Modelo</label>
            <Input
              mb={5}
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
            />
          </GridItem>
          <GridItem colSpan={2}>
            <label>Descrição</label>
            <Input
              mb={5}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </GridItem>
        </Grid>

        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
          <GridItem colSpan={2}>
            <label>Ano Fabricação</label>
            <Input
              mb={5}
              type="date"
              value={anoFabricacao}
              onChange={(e) => setAnoFabricaco(e.target.value)}
            />
          </GridItem>
          <GridItem colSpan={2}>
            <label>Ano Modelo</label>
            <Input
              mb={5}
              type="date"
              value={anoModelo}
              onChange={(e) => setAnoModelo(e.target.value)}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <label>Valor</label>
            <Input
              mb={5}
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
            />
          </GridItem>
        </Grid>
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
          <GridItem colSpan={2}>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                handleSelecionarImagem(e);
              }}
            />
          </GridItem>
          <GridItem colSpan={1}>
            {imagem && (
              <Card>
                <CardBody>
                  <Img
                    src={imagem}
                    alt="Imagem selecionada"
                    style={{ maxWidth: "200px" }}
                  />
                </CardBody>
              </Card>
            )}
          </GridItem>
        </Grid>
        <Button mt={5} onClick={handleSalvar} width={"18%"}>
          Salvar
        </Button>
      </Container>
    </div>
  );
}
