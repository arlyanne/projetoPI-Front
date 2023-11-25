import {
  Button,
  Flex,
  IconButton,
  Spacer,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import "./styles.scss"; // Importe o arquivo SCSS aqui
import { Link, useNavigate } from "react-router-dom";
import { MdInput, MdLogin } from "react-icons/md";

export const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  function handleLogout() {
    localStorage.removeItem('token')
    navigate("/login");
  }

  return (
    <Flex className="header" minH={55} alignItems={"center"} shadow={"md"}>
      <Text
        fontSize="2xl"
        as={Link}
        to={"/"}      
        mx={5}
      >
        Speedy Drive
      </Text>
      {token && (
        <Flex
          sx={{
           
            "& *:hover": {
              transform: "scale(1.1)",
              fontWeight: "bolder",
              bgGradient: "linear(to-l, #b8edf2, #b8edf2)",
              bgClip: "text",
            },
          }}
          justifyContent={"space-evenly"}
          alignItems={"center"}
          width={"30%"}
        >
          <Link
            to={"/carros"}
          >
            Carros
          </Link>
          <Link
            to={"/usuario"}
          >
            Usuários
          </Link>
          <Link
            to={"/interesses"}
          >
            Interesses
          </Link>
        </Flex>
      )}
      <Spacer />
      {token && (
        <Tooltip label="Sair">
          <IconButton
            onClick={handleLogout}
            aria-label="Search database"
            mx={5}
            icon={<MdInput />}
          />
        </Tooltip>
      )}
      {!token && (
        <Button
          onClick={() => navigate("/login")}
          aria-label="Login"
          mx={5}
          size={"sm"}
        >
          <MdLogin />
        </Button>
      )}
    </Flex>
  );
};
