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
import { useAtom } from "jotai";
import { authAtom } from "../../atom";

export const Header = () => {
  const navigate = useNavigate();
  const [{ isAuth }, setValue] = useAtom(authAtom);

  function handleLogout() {
    setValue({ isAuth: false, token: undefined });
    navigate("/login");
  }

  return (
    <Flex className="header" minH={55} alignItems={"center"} shadow={"md"}>
      <Text
        fontSize="2xl"
        as={Link}
        to={"/"}
        color={"#000"}
        fontFamily={"fantasy"}
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
        fontWeight="extrabold"
        sx={{
          transition: "all .2s ease-in-out",
          "&:hover": {
            color: "#00000084",
          },
        }}
        mx={5}
      >
        Speedy Drive
      </Text>
      {isAuth && (
        <Flex
          sx={{
            "& a": {
              transition: "all .2s",
              transitionTimingFunction: "cubic-bezier(0,.84,1,1.02)",
              color: "black",
            },
            "& *:hover": {
              transform: "scale(1.1)",
              fontWeight: "bolder",
              bgGradient: "linear(to-l, #5e5a61, #FF0080)",
              bgClip: "text",
            },
          }}
          justifyContent={"space-evenly"}
          alignItems={"center"}
          width={"30%"}
        >
          <Link
            to={"/carros"}
            style={{ padding: 10, paddingInline: 10, width: 100 }}
          >
            Carros
          </Link>
          <Link
            to={"/usuario"}
            style={{ padding: 10, paddingInline: 10, width: 100 }}
          >
            Usuários
          </Link>
          <Link
            to={"/interesses"}
            style={{ padding: 10, paddingInline: 10, width: 100 }}
          >
            Interesses
          </Link>
        </Flex>
      )}
      <Spacer />
      {isAuth && (
        <Tooltip label="Sair">
          <IconButton
            onClick={handleLogout}
            aria-label="Search database"
            variant={"ghost"}
            colorScheme={"red"}
            mx={5}
            icon={<MdInput />}
          />
        </Tooltip>
      )}
      {!isAuth && (
        <Button
          onClick={() => navigate("/login")}
          aria-label="Login"
          colorScheme="green"
          variant={"outline"}
          mx={5}
          size={"sm"}
        >
          <MdLogin />
        </Button>
      )}
    </Flex>
  );
};
