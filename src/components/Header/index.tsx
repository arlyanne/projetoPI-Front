import { Box, Button, IconButton, Spacer, Text } from "@chakra-ui/react";
import "./styles.scss"; // Importe o arquivo SCSS aqui
import { Link, useNavigate } from "react-router-dom";
import { MdInput } from "react-icons/md";

export const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token") != undefined ? true : false;

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <Box className="header" display="flex">
      <Text fontSize="2xl" p={5}>
        Speedy Drive
      </Text>
      {token && (
        <>
          <Link to={"/carro"} style={{ padding: "28px" }}>
            Carros
          </Link>
          <Link to={"/usuario"} style={{ padding: "28px" }}>
            Usuários
          </Link>
        </>
      )}
      <Spacer />
      {token &&
           <IconButton
           onClick={handleLogout}
           aria-label="Search database"
           mr={5}
           mt={5}
           icon={<MdInput />}
         />   }
           {!token &&
           <Button
           onClick={() => navigate('/login')}
           aria-label="Search database"
           mr={5}
           mt={5}>
            Login
           </Button>   }
    </Box>
  );
};
