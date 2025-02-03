import { Box, Flex, Stack } from '@chakra-ui/react';
import { SideBar } from '../../components/SideBar';
import CardLivro from './CardLivro';
import Historico from './Historico';

function HistoricoLivro() {
  return (
    <Box height="100vh">
      <Flex height="100%">
        <SideBar />  
        <Stack>
          <CardLivro/>
          <Historico/>
        </Stack>
      </Flex>
    </Box>
  );
}

export default HistoricoLivro;
