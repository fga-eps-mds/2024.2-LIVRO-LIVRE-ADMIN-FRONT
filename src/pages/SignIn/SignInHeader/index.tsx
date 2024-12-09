import { Stack, Text } from '@chakra-ui/react';

function SignUpHeader() {
  return (
    <Stack gap={'5px'}>
      <Text textStyle={'3xl'} fontWeight={'semibold'} color={'blue.100'}>Bem vindo ao Livro Livre Admin</Text>
      <Text color={'blue.100'}>Insira seus dados para fazer o login e começar a ajudar utilizar o Livro Livre Admin</Text>
    </Stack>
  );
}

export default SignUpHeader
