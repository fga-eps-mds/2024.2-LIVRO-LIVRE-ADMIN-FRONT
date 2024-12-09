import { Box, Center, Stack } from '@chakra-ui/react';
import SignInForm from './SignInForm';
import SignInHeader from './SignInHeader';

function SignIn() {
  return (
    <Box padding='40px'>
      <Center>
        <Stack gap={'40px'}>
          <SignInHeader />
          <SignInForm />
        </Stack>
      </Center>
    </Box>
  );
}

export default SignIn
