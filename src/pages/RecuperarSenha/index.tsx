import { Button, Input } from '@chakra-ui/react';
import { useState } from 'react'

function RecuperarSenha() {
  
  const [login, setLogin] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  
  return (
    <div>
        <label>Login</label>
        <Input mb={5} value={login}  onChange={(e) => setLogin(e.target.value)} />

        <label>Data Nascimento</label>
        <Input value={dataNascimento} type="datetime-local"  onChange={(e) => setDataNascimento(e.target.value)} />

        <Button type="button" width={'100%'} mt={5}>Recuperar Senha</Button>
    </div>
  )
}

export default RecuperarSenha;