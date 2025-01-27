import { Box, HStack, Stack, Table, Input, Button } from '@chakra-ui/react';
import { toaster } from "../../../components/ui/toaster"
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

function UserPopup({ onSelectionChange, selectedUsers }: { onSelectionChange: (selectedUsers: string[]) => void, selectedUsers: string[] }) {
    const [inputValue, setInputValue] = useState(''); //~ variavel que guard o valor do input

    const [users, setUsers] = useState<User[]>([]);
    const [usersCount, setUsersCount] = useState(0);
    const [page, setPage] = useState(1);
    const [showUsers, setShowUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState(users);

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

    const [selection, setSelection] = useState<string[]>(selectedUsers);
    const hasSelection = selection.length > 0
    const indeterminate = hasSelection && selection.length < usersCount

    const handleSaveSelection = () => {
        setSelection(selection);
        onSelectionChange(selection);
        toaster.create({
            description: "Arquivo salvo com sucesso.",
            type: "success",
        })
    };

    const handlePageChange = (page: number) => {
        setPage(page);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };


    useEffect(() => {
        const startIndex = (page - 1) * 5;
        const endIndex = startIndex + 5;
        const paginatedUsers = users.slice(startIndex, endIndex);
        setShowUsers(paginatedUsers);
    }, [filteredUsers, page]);

    useEffect(() => {
        const lowerCaseInput = inputValue.toLowerCase();
        const filtered = users.filter(
            user =>
                user.firstName.toLowerCase().includes(lowerCaseInput) ||
                user.lastName.toLowerCase().includes(lowerCaseInput) ||
                user.email.toLowerCase().includes(lowerCaseInput)
        );
        setFilteredUsers(filtered);
        setPage(1);
    }, [inputValue]);

    const rows = showUsers.map((users) => (
        <Table.Row
            key={users.id}
            data-selected={selection.includes(users.email) ? "" : undefined}
        >
            <Table.Cell>
                <Checkbox
                    top="1"
                    aria-label="Select row"
                    checked={selection.includes(users.email)}
                    onCheckedChange={(changes) => {
                        setSelection((prev) =>
                            changes.checked
                                ? [...prev, users.email]
                                : prev.filter((email) => email !== users.email),
                        )
                    }}
                />
            </Table.Cell>
            <Table.Cell>{users.firstName}</Table.Cell>
            <Table.Cell>{users.lastName}</Table.Cell>
            <Table.Cell>{users.phone}</Table.Cell>
            <Table.Cell>{users.email}</Table.Cell>
        </Table.Row>
    ))

    return (
        <Box padding='40px' overflowX="auto">
            <HStack>
                <Stack>
                    <InputGroup flex="0.85" startElement={<IoSearchOutline />}>
                        <Input
                            type="text"
                            placeholder="Digite o nome do usuário."
                            value={inputValue}
                            onChange={handleInputChange}
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
                                                changes.checked ? filteredUsers.map((user) => user.email) : [],
                                            )
                                        }}
                                    />
                                </Table.ColumnHeader>
                                <Table.ColumnHeader>Nome</Table.ColumnHeader>
                                <Table.ColumnHeader>Sobrenome</Table.ColumnHeader>
                                <Table.ColumnHeader>Telefone</Table.ColumnHeader>
                                <Table.ColumnHeader>Email</Table.ColumnHeader>
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
                    <PaginationRoot count={filteredUsers.length} pageSize={10} page={page} onPageChange={(v) => handlePageChange(v.page)}>
                        <HStack wrap="wrap">
                            <PaginationPrevTrigger />
                            <PaginationItems />
                            <PaginationNextTrigger />
                        </HStack>
                    </PaginationRoot>
                    <HStack justify="flex-end" mt={4}>
                        <Button colorScheme="blue" disabled={!hasSelection} onClick={handleSaveSelection}>
                            Salvar
                        </Button>
                    </HStack>

                </Stack>
            </HStack>
        </Box>
    );
}

export default UserPopup
