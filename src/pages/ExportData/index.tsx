import { Box, Flex, Stack } from '@chakra-ui/react';
import { SideBar } from '../../components/SideBar';
import SelectFilters from './Selects';

function ExportData() {
  return (
    <Box height='100vh'>
      <Flex height='100%'>
        <SideBar />
        <Box padding='40px' w={'320px'}>
          <Stack>
            <SelectFilters />
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
}

export default ExportData
