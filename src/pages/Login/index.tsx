import {
  Input,
  Button,
  Text,
  Flex,
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const toast = useToast();
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");

  function handleLogin() {
    axios
      .post("http://localhost:8080/login", {
        login: login,
        senha: senha,
      })
      .then((resp) => {
        const token = resp.data.token;
        localStorage.setItem('token', token );
        
          window.location.assign("/carros");
      })
      .catch((e) => {
        toast({
          title: "Erro",
          description: e.response.data.message + "",
          status: "error",
          position: "top-right",
        });
      });
  }

  return (
    <Flex width={"full"} justify={"center"} p={50}>
      <Flex width={"80%"}>
        <Box width={"50%"} mt={5} boxShadow={"2xl"} p={50}>
          <Text mb={10} fontSize="2xl">
            <Text
              fontSize="2xl"
              as={Link}
              to={"/"}
              color={"#000"}
              bgGradient="linear(to-l, #4682B4, #4682B4)"
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
              Login
            </Text>
          </Text>
          <FormControl mb={3}>
            <FormLabel>Login</FormLabel>
            <Input
              variant={"filled"}
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            <FormHelperText>Seu usuário de acesso.</FormHelperText>
          </FormControl>

          <FormControl mb={2}>
            <FormLabel>Senha</FormLabel>
            <Input
              type="password"
              value={senha}
              variant={"filled"}
              onChange={(e) => setSenha(e.target.value)}
            />
            <FormHelperText>Sua senha</FormHelperText>
          </FormControl>
          <Button
            type="button"
            onClick={handleLogin}
            width={"100%"}
            mt={5}
            sx={{
              color: "white",
              bgGradient: "linear(to-l, #4682B4, #4682B4)",
              "&:hover": {
                transform: "scale(1.05)",
                bgGradient: "linear(to-l, #4682B4, #4682B4)",
              },
            }}
          >
            Entrar
          </Button>
          <Flex justify={"center"} mt={2}>
            <Link to={"/recuperarsenha"}>Esqueceu Senha</Link>
          </Flex>
        </Box>
        <Flex
          width={"50%"}
          mt={10}
          boxShadow={"2xl"}
          p={50}
          bgGradient="linear(to-l, #4682B4, #4682B4)"
          justify={"center"}
          align={"center"}
        >
          <Text mb={10} fontSize="2xl" color={"white"} align={"center"}>
            Bem vindo! Desejo que tenha uma otima experiencia em nossa
            plataforma :)
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Login;
