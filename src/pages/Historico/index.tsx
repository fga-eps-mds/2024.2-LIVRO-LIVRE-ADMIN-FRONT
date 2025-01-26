import { Box, Flex, HStack, Text, Table, Stack, Center} from '@chakra-ui/react';
import { SideBar } from '../../components/SideBar';
import TableBooks from './TableBooks';


function Historico() {
  return (
    <Box height='100vh'>
      <Flex height='100%'>
      <SideBar />
      <Text>Todos os livros</Text>
        <Center>
        <Stack>
        <TableBooks/> 
        </Stack>
        </Center>

      </Flex>
    </Box>
  );
}

export default Historico
