import { Box, Flex, HStack, Stack, Table, Input } from '@chakra-ui/react';
import { Checkbox } from "../../../components/ui/checkbox"
import useApi from '../../../hooks/useApi';
import { useEffect, useState } from 'react';
import { User } from '../../../interfaces/user';
import {
    PaginationItems,
    PaginationNextTrigger,
    PaginationPrevTrigger,
    PaginationRoot,
} from "../../../components/ui/pagination";
import { useAuth } from '../../../hooks/useAuth';
import { InputGroup } from '../../../components/ui/input-group';
import { IoSearchOutline } from "react-icons/io5";

const MockUsers = Array.from({ length: 30 }, (_, i) => ({
    id: `${i + 1}`,
    firstName: `Nome ${i + 1}`,
    lastName: `Sobrenome ${i + 1}`,
    phone: `Telefone ${i + 1}`,
    email: `email${i + 1}@email.com`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
}));

function UserPopup() {
    const [users, setUsers] = useState<User[]>([]);
    const [usersCount, setUsersCount] = useState(0);
    const [page, setPage] = useState(1);

    const [showMockUsers, setShowMockUsers] = useState<User[]>([]);
    const [mockUsersCount] = useState(MockUsers.length);
    const [mockPage, setMockPage] = useState(1);

    const { getUsers } = useApi();
    const { token } = useAuth();

    const [selection, setSelection] = useState<string[]>([])
    const hasSelection = selection.length > 0
    const indeterminate = hasSelection && selection.length < MockUsers.length

    // const fetchUsers = async () => {
    //   const { data } = await getUsers({ perPage: 10, page: page - 1 }, token);
    //   setUsers(data.items);
    //   setUsersCount(data.total);
    // }

    // useEffect(() => {
    //   fetchUsers();
    // }, [page]);

    const MockfetchUsers = () => {
        const startIndex = (mockPage - 1) * 10;
        const endIndex = startIndex + 10;
        const paginatedUsers = MockUsers.slice(startIndex, endIndex);
        setShowMockUsers(paginatedUsers);
    };

    useEffect(() => {
        MockfetchUsers();
    }, [mockPage]);

    const rows = showMockUsers.map((MockUsers) => (
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
                <Box padding='40px'>
                    <Stack>
                        <InputGroup flex="0.85" startElement={<IoSearchOutline />}>
                            <Input
                                type="text"
                                placeholder="Digite o nome do usuário."
                            />
                        </InputGroup>
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
                                <Table.Row>
                                    <Table.Cell colSpan={7}>
                                        {selection.length > 1
                                            ? `${selection.length} Selecionados`
                                            : `${selection.length} Selecionado`}
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table.Root>

                        <PaginationRoot count={mockUsersCount} pageSize={10} page={mockPage} onPageChange={(v) => setMockPage(v.page)}>
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

export default UserPopup
