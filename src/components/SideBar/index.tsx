import { Box, Stack, Text } from "@chakra-ui/react"
import { Button } from "../ui/button"
import { BsPerson, BsHouse } from 'react-icons/bs';
import { FaFileExport } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { IoBookOutline } from "react-icons/io5";

export const SideBar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { signOut } = useAuth();

  const selectedTab = location.pathname.replace('/', '');
  const tabs = [
    { label: 'Início', value: 'inicio', icon: <BsHouse /> },
    { label: 'Usuários', value: 'usuarios', icon: <BsPerson /> },
    { label: 'Exportar Dados', value: 'exportar-dados', icon: <FaFileExport /> },
    { label: 'Historico', value: 'historico', icon: <IoBookOutline /> },
  ]

  return (
    <Box height='100%' width="100px" boxShadow='2xl' padding={'20px'}>
      <Stack height='100%' justifyContent='space-between'>
        <Stack width={'100%'} gap='50px'>
          {tabs.map(tab => (
            <Button
              key={tab.value}
              variant='plain'
              onClick={() => navigate('/' + tab.value)}
              color={selectedTab === tab.value ? 'blue.100' : ''}
            >
              <Stack align='center'>
                {tab.icon}
                <Text textAlign='center' lineClamp="2">{tab.label}</Text>
              </Stack>
            </Button>
          ))}
        </Stack>
        <Button
          type="submit"
          width={'100%'}
          size={'2xl'}
          bg={'red.100'}
          fontWeight={'semibold'}
          onClick={() => {
            signOut();
            navigate('/login');
          }}
        >
          Sair
        </Button>
      </Stack>
    </Box>
  );
}