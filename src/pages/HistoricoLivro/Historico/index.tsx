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
    email: `usuario${i + 1}@teste.com`,
    createdAt: `data de criação ${i + 1}`,
    updatedAt: ` data de update${i + 1}`,
    loanDate: new Date(2025, 0, (i % 30) + 1).toISOString().split('T')[0], // Simula datas no mês de janeiro
    returnDate: new Date(2025, 0, (i % 30) + 5).toISOString().split('T')[0], // 5 dias depois
    loanDuration: (i % 30) + 1, // Duração entre 1 e 30 dias
  }));
  const [inputValue, setInputValue] = useState('');
  const [dateFilter, setDateFilter] = useState(''); //~ variaveis para os inputs e filtros
  const [loanDuration, setLoanDuration] = useState<number | null>(null);

  // const [users, setUsers] = useState<User[]>([]);
  // const [usersCount, setUsersCount] = useState(0);
  const [page, setPage] = useState(1);
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [showUsers, setShowUsers] = useState<typeof mockUsers>([]);

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

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateFilter(e.target.value);
  };

  const handleLoanDurationChange = (details: { value: string }) => {
    setLoanDuration(details.value ? parseInt(details.value, 10) : null);
  };

  //~ atualiza o pagination
  useEffect(() => {
    const startIndex = (page - 1) * 20;
    const endIndex = startIndex + 20;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
    setShowUsers(paginatedUsers);
  }, [filteredUsers, page]);

  //~ autaliza o array filtrado
  useEffect(() => {
    const lowerCaseInput = inputValue.toLowerCase();
    let filtered = mockUsers.filter(
      (user) =>
        user.firstName.toLowerCase().includes(lowerCaseInput) ||
        user.lastName.toLowerCase().includes(lowerCaseInput) ||
        user.email.toLowerCase().includes(lowerCaseInput),
    );
    if (dateFilter) {
      filtered = filtered.filter((user) => user.loanDate === dateFilter);
    }
    if (loanDuration !== null) {
      filtered = filtered.filter((user) => user.loanDuration === loanDuration);
    }
    setFilteredUsers(filtered);
    setPage(1);
  }, [inputValue, dateFilter, loanDuration]);

  const rows = showUsers.map((users) => (
    <Table.Row key={users.id}>
      <Table.Cell>{users.firstName}</Table.Cell>
      <Table.Cell>{users.lastName}</Table.Cell>
      <Table.Cell>{users.email}</Table.Cell>
      <Table.Cell>{users.loanDate}</Table.Cell>
      <Table.Cell>{users.returnDate}</Table.Cell>
      <Table.Cell>{users.loanDuration}</Table.Cell>
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
              <Field.Label>Data do Empréstimo</Field.Label>
              <InputGroup>
                <Input type="date" width={'100%'} value={dateFilter} onChange={handleDateChange} />
              </InputGroup>
            </Field.Root>
            <Field.Root>
              <Field.Label>Duração de empréstimo</Field.Label>
              <InputGroup flex="0.5" endElement={'Dias'} width={'70%'}>
                <NumberInputRoot
                  min={0}
                  max={360}
                  allowMouseWheel
                  value={loanDuration?.toString() || ''}
                  onValueChange={handleLoanDurationChange}
                >
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
                <Table.ColumnHeader>Data do Empréstimo</Table.ColumnHeader>
                <Table.ColumnHeader>Data de Devolução</Table.ColumnHeader>
                <Table.ColumnHeader>Duração do Emrpréstimo</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>{rows}</Table.Body>
          </Table.Root>
          <PaginationRoot
            count={filteredUsers.length}
            pageSize={20}
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
