import { Box, Flex, HStack, Stack, Table } from '@chakra-ui/react';
import { Checkbox } from "../../components/ui/checkbox"
import { SideBar } from '../../components/SideBar';
import useApi from '../../hooks/useApi';
import { useEffect, useState } from 'react';
import { User } from '../../interfaces/user';
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../components/ui/pagination";
import { useAuth } from '../../hooks/useAuth';

const MockUsers = [
  {
    id: 1,
    firstName: "João",
    lastName: "Silva",
    phone: "(11) 98765-4321",
    email: "joao.silva@example.com",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-15",
  },
  {
    id: 2,
    firstName: "Maria",
    lastName: "Santos",
    phone: "(21) 91234-5678",
    email: "maria.santos@example.com",
    createdAt: "2024-12-20",
    updatedAt: "2025-01-10",
  },
  {
    id: 3,
    firstName: "Carlos",
    lastName: "Oliveira",
    phone: "(31) 99876-5432",
    email: "carlos.oliveira@example.com",
    createdAt: "2024-11-05",
    updatedAt: "2024-12-15",
  },
  {
    id: 4,
    firstName: "Ana",
    lastName: "Costa",
    phone: "(41) 92345-6789",
    email: "ana.costa@example.com",
    createdAt: "2024-10-30",
    updatedAt: "2024-11-20",
  },
  {
    id: 5,
    firstName: "Pedro",
    lastName: "Mendes",
    phone: "(51) 98765-1234",
    email: "pedro.mendes@example.com",
    createdAt: "2024-09-25",
    updatedAt: "2024-10-05",
  },
  {
    id: 6,
    firstName: "Pedro",
    lastName: "Almeida",
    phone: "(61) 91234-5678",
    email: "fernanda.almeida@example.com",
    createdAt: "2024-08-15",
    updatedAt: "2024-09-10",
  },
];

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [usersCount, setUsersCount] = useState(0);
  const [page, setPage] = useState(1);

  const { getUsers } = useApi();
  const { token } = useAuth();

  const [selection, setSelection] = useState<string[]>([])
  const hasSelection = selection.length > 0
  const indeterminate = hasSelection && selection.length < MockUsers.length

  const fetchUsers = async () => {
    const { data } = await getUsers({ perPage: 10, page: page - 1 }, token);
    setUsers(data.items);
    setUsersCount(data.total);
  }

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const rows = MockUsers.map((MockUsers) => (
    <Table.Row
      key={MockUsers.id}
      data-selected={selection.includes(MockUsers.email) ? "" : undefined}
    >
      <Table.Cell>
        <Checkbox
          top="1"
          aria-label="Select row"
          checked={selection.includes(MockUsers.email)}
          onCheckedChange={(changes) => {
            setSelection((prev) =>
              changes.checked
                ? [...prev, MockUsers.email]
                : selection.filter((email) => email !== MockUsers.email),
            )
          }}
        />
      </Table.Cell>
      <Table.Cell>{MockUsers.firstName}</Table.Cell>
      <Table.Cell>{MockUsers.lastName}</Table.Cell>
      <Table.Cell>{MockUsers.phone}</Table.Cell>
      <Table.Cell>{MockUsers.email}</Table.Cell>
      <Table.Cell>{MockUsers.createdAt}</Table.Cell>
      <Table.Cell>{MockUsers.updatedAt}</Table.Cell>
    </Table.Row>
  ))

  return (
    <Box height='100vh'>
      <Flex height='100%'>
        <SideBar />
        <Box padding='40px'>
          <Stack>
            <Table.Root size="lg" variant='outline' striped showColumnBorder>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>
                    <Checkbox
                      top="1"
                      aria-label="Select all rows"
                      checked={indeterminate ? "indeterminate" : selection.length > 0}
                      onCheckedChange={(changes) => {
                        setSelection(
                          changes.checked ? MockUsers.map((MockUsers) => MockUsers.email) : [],
                        )
                      }}
                    />
                  </Table.ColumnHeader>
                  <Table.ColumnHeader>Nome</Table.ColumnHeader>
                  <Table.ColumnHeader>Sobrenome</Table.ColumnHeader>
                  <Table.ColumnHeader>Telefone</Table.ColumnHeader>
                  <Table.ColumnHeader>Email</Table.ColumnHeader>
                  <Table.ColumnHeader>Data de criação</Table.ColumnHeader>
                  <Table.ColumnHeader>Data de atualização</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {rows}
                <Table.Row cell-span={1}>
                  <Table.Cell> {selection.length} selected </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>

            <PaginationRoot count={usersCount} pageSize={10} page={page} onPageChange={(v) => setPage(v.page)}>
              <HStack wrap="wrap">
                <PaginationPrevTrigger />
                <PaginationItems />
                <PaginationNextTrigger />
              </HStack>
            </PaginationRoot>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
}

export default Users
