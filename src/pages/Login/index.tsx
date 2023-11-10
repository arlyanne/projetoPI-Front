import { Input, Button, Container, Text } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function Login() {

 const navigate = useNavigate();

 const [login, setLogin] = useState ('');
 const [senha, setSenha] = useState('');


 function handleLogin (){
  axios
    .post('http://localhost:8080/login',
      {
        login: login,
        senha: senha
      }).then((resp) => {
        const token = resp.data.token;
        localStorage.setItem('token', token);
        navigate('/carros');
      })
 }

    return (
      <Container width={'50%'} mt={10}>
      
        <Text mb={10} fontSize='2xl'>Speedy Drive Login</Text>
        <label>Login</label>
        <Input  mb={5} value={login}  onChange={(e) => setLogin(e.target.value)} />

        <label>Senha</label>
        <Input  type="password" value={senha}  onChange={(e) => setSenha(e.target.value)} />

        <Link to={'/recuperarsenha'} >Esqueceu Senha</Link>

        <Button type="button" onClick={handleLogin} width={'100%'} mt={5}>Entrar</Button>
        
      


    </Container>
  )
}

export default Login