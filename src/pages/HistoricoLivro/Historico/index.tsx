import {
  Box,
  HStack,
  Stack,
  Table,
  Input,
  Button,
  Flex,
  Field,
  NativeSelectRoot,
  NativeSelectField,
} from '@chakra-ui/react';
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from '../../../components/ui/pagination';

import { useEffect, useState } from 'react';
import useApi from '../../../hooks/useApi';
import { User } from '../../../interfaces/user';
import { useAuth } from '../../../hooks/useAuth';
import { InputGroup } from '../../../components/ui/input-group';
import { IoSearchOutline } from 'react-icons/io5';


function Historico() {
  const mockUsers = Array.from({ length: 120 }, (_, i) => ({
    id: `${i + 1}`,
    firstName: `Nome`,
    lastName: `Sobrenome ${i + 1}`,
    phone: `Telefone ${i + 1}`,
    email: `usuario${i + 1}@teste.com`,
    createdAt: `data de criação ${i + 1}`,
    updatedAt: ` data de update${i + 1}`,
    loanDate: new Date(2025, 0, (i % 15) + 1).toISOString().split('T')[0], // Simula datas no mês de janeiro
    returnDate: i % 2 === 0 ? new Date(2025, (i % 3), (i % 30) + 3).toISOString().split('T')[0] : '', // 5 dias depois
  }));
  const [inputValue, setInputValue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState(''); //~ variaveis para os inputs e filtros

  // const [users, setUsers] = useState<User[]>([]);
  // const [usersCount, setUsersCount] = useState(0);
  const [page, setPage] = useState(1);
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [showUsers, setShowUsers] = useState<typeof mockUsers>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); //~ state para ordenar a lista ascendente ou descendente
  const [loanDurationCategory, setLoanDurationCategory] = useState<string | null>(null);

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
  
  function calculateLoanDuration(loanDate: string, returnDate: string): number {
    if (!returnDate) return 0; // Sem data de devolução, retorna 0
    const loanDateObj = new Date(loanDate);
    const returnDateObj = new Date(returnDate);
    const diffInMs = returnDateObj.getTime() - loanDateObj.getTime();
    return Math.ceil(diffInMs / (1000 * 60 * 60 * 24)); // Converte milissegundos para dias
  }

  const handleSort = () => {
    //~ função para ordenar a lista
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setFilteredUsers(
      [...filteredUsers].sort((a, b) =>
        sortOrder === 'asc'
          ? new Date(a.loanDate).getTime() - new Date(b.loanDate).getTime()
          : new Date(b.loanDate).getTime() - new Date(a.loanDate).getTime(),
      ),
    );
  };

  const handlePageChange = (page: number) => {
    setPage(page);
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
    if (startDate && endDate) {
      filtered = filtered.filter((user) => user.loanDate >= startDate && user.loanDate <= endDate);
    }
    if (loanDurationCategory) {
      filtered = filtered.filter((user) => {
        if (!user.returnDate) return false;
        const timePeriod = calculateLoanDuration(user.loanDate, user.returnDate)
        if (loanDurationCategory === 'curto') return timePeriod <= 7;
        if (loanDurationCategory === 'medio') return timePeriod >= 8 && timePeriod <= 20;
        if (loanDurationCategory === 'longo') return timePeriod > 20;
        return true;
      });
    }

    setFilteredUsers(filtered);
    setPage(1);
  }, [inputValue, startDate, endDate, loanDurationCategory]);

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
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </InputGroup>
            </Field.Root>
            <Field.Root>
              <Field.Label> Data Inicial </Field.Label>
              <Input type="date" width={'85%'} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </Field.Root>
            <Field.Root>
              <Field.Label>Data Final</Field.Label>
              <Input type="date" width={'85%'} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </Field.Root>
            <Field.Root>
              <Field.Label>Filtrar por Duração</Field.Label>
              <NativeSelectRoot size="md" width="85%">
                <NativeSelectField
                  value={loanDurationCategory || ''}
                  onChange={(e) => setLoanDurationCategory(e.target.value)}
                >
                  <option value="">Todas</option>
                  <option value="curto">Curto prazo (até 7 dias)</option>
                  <option value="medio">Médio prazo (8 a 20 dias)</option>
                  <option value="longo">Longo prazo (mais de 20 dias)</option>
                </NativeSelectField>
              </NativeSelectRoot>
            </Field.Root>
            <Button size={'sm'} colorPalette={'gray'} variant={'subtle'} alignSelf={'center'} onClick={handleSort}>
              Ordenar por Data
            </Button>
          </Flex>
          <Table.Root size="lg" variant="outline" striped showColumnBorder>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Nome</Table.ColumnHeader>
                <Table.ColumnHeader>Sobrenome</Table.ColumnHeader>
                <Table.ColumnHeader>Email</Table.ColumnHeader>
                <Table.ColumnHeader>Data do Empréstimo</Table.ColumnHeader>
                <Table.ColumnHeader>Data de Devolução</Table.ColumnHeader>
                <Table.ColumnHeader>Status</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {showUsers.map((user) => (
                <Table.Row key={user.id}>
                  <Table.Cell>{user.firstName}</Table.Cell>
                  <Table.Cell>{user.lastName}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.loanDate}</Table.Cell>
                  <Table.Cell>{user.returnDate || `Em posse de ${user.firstName + ' ' + user.lastName}`}</Table.Cell>
                  <Table.Cell>{user.returnDate ? 'Devolvido' : 'Em posse'}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
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
