import {
  Container,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Header } from "../../components/Header";

export default function Carro() {
  return (
    <>
      <Header />
      <Container maxW='90%' >
        <Text fontSize="2xl" mt={5}>Carros</Text>
        <TableContainer mt={10}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Marca</Th>
                <Th>Modelo</Th>
                <Th>Ano Fabricação</Th>
                <Th>Ano Modelo</Th>
                <Th>Valor</Th>
                <Th>Descrição</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>

              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
