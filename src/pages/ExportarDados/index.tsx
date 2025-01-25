import { Box, Flex, Text } from '@chakra-ui/react';
import { SideBar } from '../../components/SideBar';

function Home() {
  return (
    <Box height='100vh'>
      <Flex height='100%'>
        <SideBar />
        <Text>Teste</Text>
      </Flex>
    </Box>
  );
}

export default Home
