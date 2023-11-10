import { useEffect, useState } from "react";
import { Header } from "../../../components/Header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CarroModel } from "../../../Model/Carro.model";

export default function DetalheCarro() {
  const [detalheCarro, setDetalheCarro] = useState<CarroModel>();
  const params = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8080/cars/${params.id}`).then((resp) => {
      setDetalheCarro(resp.data);
    });
  }, []);

  return (
    <div>
      <Header />
      <Container maxW="90%" mt={10}>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/exibircarros">Carros</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <Text>Detalhe Carro</Text>
          </BreadcrumbItem>
        </Breadcrumb>

        {detalheCarro && (
          <>
            <p>Marca: {detalheCarro.marca}</p>
            <p>Modelo: {detalheCarro.modelo}</p>
            <p>Ano Fabricação: {new Date(detalheCarro.anoFabricacao).getFullYear().toString()}</p>
            <p>Ano Modelo: {new Date(detalheCarro.anoModelo).getFullYear().toString()}</p>
            <p>Valor: R$ {detalheCarro.valor.toFixed(2).replace('.', ',')}</p>
            <p>Descrição: {detalheCarro.descricao}</p>
          </>
        )}
      </Container>
    </div>
  );
}
