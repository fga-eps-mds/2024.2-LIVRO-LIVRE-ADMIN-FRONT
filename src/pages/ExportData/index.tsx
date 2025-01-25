import { Box, Flex, Text, Stack } from '@chakra-ui/react';
import { SideBar } from '../../components/SideBar';
import SelectFilters from './Selects';

function Users() {
  ;
  return (
    <Box height='100vh'>
      <Flex height='100%'>
        <SideBar />
        <Box padding='40px'>
          <Stack>
            <SelectFilters />
            <Text>Falta desmockar os dados, salvar os dados marcados, colocar o botao para visualizar dados escolhidos e exportar dados, </Text>
            <Text>  deixar os inputs dos livros funcinais e tambem colocar para filtrar por datas. 😁😁</Text>
            <Text>  Não esquecer de privar as rotas novamente </Text>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
}

export default Users
