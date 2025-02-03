import { Box, HStack, Stack, Table, Input, Button, Flex, Field, NumberInputRoot } from '@chakra-ui/react';
import { toaster } from '../../../components/ui/toaster';
import { Checkbox } from '../../../components/ui/checkbox';
import useApi from '../../../hooks/useApi';
import { useEffect, useState } from 'react';
import { User } from '../../../interfaces/user';
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from '../../../components/ui/pagination';
import { useAuth } from '../../../hooks/useAuth';
import { InputGroup } from '../../../components/ui/input-group';
import { IoSearchOutline } from 'react-icons/io5';
import { NumberInputField } from '../../../components/ui/number-input';

function Historico() {
  const mockUsers = Array.from({ length: 120 }, (_, i) => ({
    id: `${i + 1}`,
    firstName: `Nome`,
    lastName: `Sobrenome ${i + 1}`,
    phone: `Telefone ${i + 1}`,
    email: `email ${i + 1}`,
    createdAt: `data de criação ${i + 1}`,
    updatedAt: ` data de update${i + 1}`,
  }));
  const [inputValue, setInputValue] = useState('');
  // const [users, setUsers] = useState<User[]>([]);
  // const [usersCount, setUsersCount] = useState(0);
  const [page, setPage] = useState(1);
  const [showUsers, setShowUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);

  // const { getUsers } = useApi();  //~ pega dados da api
  // const { token } = useAuth();

  // const fetchUsers = async () => {
  //     const { data } = await getUsers({ perPage: 10, page: page - 1 }, token);
  //     setUsers(data.items);
  //     setUsersCount(data.total);
  // }

  // useEffect(() => {
  //     fetchUsers();
  // }, [page]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
    setShowUsers(paginatedUsers);
  }, [filteredUsers, page]);

  useEffect(() => {
    const lowerCaseInput = inputValue.toLowerCase();
    const filtered = mockUsers.filter(
      (user) =>
        user.firstName.toLowerCase().includes(lowerCaseInput) ||
        user.lastName.toLowerCase().includes(lowerCaseInput) ||
        user.email.toLowerCase().includes(lowerCaseInput),
    );
    setFilteredUsers(filtered);
    setPage(1);
  }, [inputValue]);

  const rows = showUsers.map((users) => (
    <Table.Row key={users.id}>
      <Table.Cell>{users.firstName}</Table.Cell>
      <Table.Cell>{users.lastName}</Table.Cell>
      <Table.Cell>{users.email}</Table.Cell>
      <Table.Cell>{users.createdAt}</Table.Cell>
      <Table.Cell>{users.updatedAt}</Table.Cell>
    </Table.Row>
  ));

  return (
    <Box padding="40px" overflowX="auto">
      <HStack>
        <Stack>
          <Flex justifyContent={'space-evenly'}>
            <Field.Root>
              <Field.Label>Nome do usuário</Field.Label>
              <InputGroup flex="0.85" startElement={<IoSearchOutline />}>
                <Input
                  width={'85%'}
                  type="text"
                  placeholder="Digite o nome do usuário."
                  value={inputValue}
                  onChange={handleInputChange}
                />
              </InputGroup>
            </Field.Root>
            <Field.Root>
              <Field.Label>Período de Tempo</Field.Label>
              <InputGroup >
                <Input type="date" width={'100%'} value={inputValue} onChange={handleInputChange} />
              </InputGroup>
            </Field.Root>
            <Field.Root>
              <Field.Label>Duração de empréstimo</Field.Label>
              <InputGroup flex="0.5" endElement={'Dias'} width={'70%'}>
              <NumberInputRoot defaultValue=""  min={0} max={360} allowMouseWheel>
                <NumberInputField />
              </NumberInputRoot>
              </InputGroup>
            </Field.Root>
          </Flex>
          <Table.Root size="lg" variant="outline" striped showColumnBorder>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Nome</Table.ColumnHeader>
                <Table.ColumnHeader>Sobrenome</Table.ColumnHeader>
                <Table.ColumnHeader>Email</Table.ColumnHeader>
                <Table.ColumnHeader>Create</Table.ColumnHeader>
                <Table.ColumnHeader>Uptade</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>{rows}</Table.Body>
          </Table.Root>
          <PaginationRoot
            count={filteredUsers.length}
            pageSize={10}
            page={page}
            onPageChange={(v) => handlePageChange(v.page)}
          >
            <HStack wrap="wrap">
              <PaginationPrevTrigger />
              <PaginationItems />
              <PaginationNextTrigger />
            </HStack>
          </PaginationRoot>
          <HStack justify="flex-end" mt={4}></HStack>
        </Stack>
      </HStack>
    </Box>
  );
}

export default Historico;
