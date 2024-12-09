import { Box, Flex } from '@chakra-ui/react';
import { SideBar } from '../../components/SideBar';

function Home() {
  return (
    <Box height='100vh'>
      <Flex height='100%'>
        <SideBar />
      </Flex>
    </Box>
  );
}

export default Home
