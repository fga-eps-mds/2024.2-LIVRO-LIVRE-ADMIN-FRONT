import { Card, Text, Image, Flex } from '@chakra-ui/react';
const livro = {
  capa: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80', // Simulação de uma imagem de capa
  titulo: 'Livro Exemplo',
  autor: 'Autor Exemplo',
  status: 'Disponível'
};

function CardLivro() {
  return (
    <Flex>
      <Card.Root maxW="xs" maxH={'400px'} p={'20px'} m={'40px 0 0 50px'}>
        <Card.Title alignSelf={'center'} fontSize={'2xl'} mb={'5px'}>
          {livro.titulo}
        </Card.Title>
        <Image
          src={livro.capa}
          alt="Capa Livro"
        />
        <Card.Body gap="0">
          <Text textStyle="xl" fontWeight="medium" letterSpacing="tight" mt="1">
             {"Autor: "+ livro.autor}
          </Text>
          <Text textStyle="xl" fontWeight="medium" letterSpacing="tight" mt="1">
            {"Status: "+livro.status} 
          </Text>
        </Card.Body>
      </Card.Root>
      <Card.Root maxW="xs" maxH={'160px'} p={'20px'} m={'40px 0 0 25px'}>
        <Card.Title alignSelf={'center'} fontSize={'3xl'} mt={'10px'}>
          123
        </Card.Title>
        <Card.Description marginTop={'20px'}>Total de usuários que pegaram o livro</Card.Description>
      </Card.Root>
    </Flex>
  );
}

export default CardLivro;
