import { Box, Text } from "@chakra-ui/react";
import "./styles.scss"; // Importe o arquivo SCSS aqui
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <Box className="header" display="flex">
      <Text  fontSize='2xl' p={5}>Speedy Drive</Text>
      <Link to={'/carro'} style={{padding: "28px"}}>Carros</Link>
      <Link to={'/usuario'} style={{padding: "28px"}}>Usuarios</Link>
    </Box>
  );
};
