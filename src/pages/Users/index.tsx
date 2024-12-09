import { Box, Flex, HStack, Stack, Table } from '@chakra-ui/react';
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

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [usersCount, setUsersCount] = useState(0);
  const [page, setPage] = useState(1);

  const { getUsers } = useApi();
  const { token } = useAuth();

  const fetchUsers = async () => {
    const { data } = await getUsers({ perPage: 10, page: page - 1 }, token);
    setUsers(data.items);
    setUsersCount(data.total);
  }

  useEffect(() => {
    fetchUsers();
  }, [page]);

  return (
    <Box height='100vh'>
      <Flex height='100%'>
        <SideBar />
        <Box padding='40px'>
          <Stack>
            <Table.Root size="lg" variant='outline' striped showColumnBorder>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>id</Table.ColumnHeader>
                  <Table.ColumnHeader>Nome</Table.ColumnHeader>
                  <Table.ColumnHeader>Sobrenome</Table.ColumnHeader>
                  <Table.ColumnHeader>Telefone</Table.ColumnHeader>
                  <Table.ColumnHeader>Email</Table.ColumnHeader>
                  <Table.ColumnHeader>Data de criação</Table.ColumnHeader>
                  <Table.ColumnHeader>Data de atualização</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {users.map((user) => (
                  <Table.Row key={user.id}>
                    <Table.Cell>{user.id}</Table.Cell>
                    <Table.Cell>{user.firstName}</Table.Cell>
                    <Table.Cell>{user.lastName}</Table.Cell>
                    <Table.Cell>{user.phone}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.createdAt}</Table.Cell>
                    <Table.Cell>{user.updatedAt}</Table.Cell>
                  </Table.Row>
                ))}
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
