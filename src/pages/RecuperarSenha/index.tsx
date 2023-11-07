import { Button, Container, Input, Text } from '@chakra-ui/react';
import { useState } from 'react'

function RecuperarSenha() {
  
  const [login, setLogin] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  
  return (
    <div>
      <Container width={"50%"} mt={10}>
        <Text mb={10} fontSize="2xl">
          Recuperar Senha
        </Text>
        <label>Login</label>
        <Input
          mb={5}
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />

        <label>Data Nascimento</label>
        <Input
          value={dataNascimento}
          type="date"
          onChange={(e) => setDataNascimento(e.target.value)}
        />

        <Button type="button" width={"100%"} mt={5}>
          Recuperar Senha
        </Button>
        <Text />
      </Container>
    </div>
  );
}

export default RecuperarSenha;