import { Box, Flex, Stack, Table } from '@chakra-ui/react';
import { SideBar } from '../../components/SideBar';
import UserPopup from './UserPopup';

function Users() {;
  return (
    <Box height='100vh'>
      <Flex height='100%'>
        <SideBar />
        <Box padding='40px'>
          <Stack>
            <UserPopup />
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
}

export default Users
