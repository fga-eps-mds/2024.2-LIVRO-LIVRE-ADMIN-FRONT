import { Box, HStack, Stack, Table, Input, Button } from '@chakra-ui/react';
import { toaster } from "../../../components/ui/toaster";
import { Checkbox } from "../../../components/ui/checkbox";
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

interface UserPopupProps {
    onSelectionChange: (selectedUsers: string[]) => void;
    selectedUsers: string[];
}

function UserPopup(props: Readonly<UserPopupProps>) {
    const { onSelectionChange, selectedUsers } = props;
    const [inputValue, setInputValue] = useState('');
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

    const [selection, setSelection] = useState<string[]>(selectedUsers);
    const hasSelection = selection.length > 0;
    const indeterminate = hasSelection && selection.length < usersCount;

    const handleSaveSelection = () => {
        setSelection((prevSelection) => [...prevSelection]);
        onSelectionChange(selection);
        toaster.create({
            description: "Arquivo salvo com sucesso.",
            type: "success",
        });
    };

    const handlePageChange = (page: number) => {
        setPage(page);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        setPage(1); 
    };

    const filteredUsers = users.filter(user =>
        user.firstName.toLowerCase().includes(inputValue.toLowerCase()) ||
        user.lastName.toLowerCase().includes(inputValue.toLowerCase()) ||
        user.email.toLowerCase().includes(inputValue.toLowerCase())
    );

    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    const showUsers = filteredUsers.slice(startIndex, endIndex);

    const rows = showUsers.map((user) => (
        <Table.Row
            key={user.id}
            data-selected={selection.includes(user.id) ? "" : undefined}
        >
            <Table.Cell>
                <Checkbox
                    top="1"
                    aria-label="Select row"
                    checked={selection.includes(user.id)}
                    onCheckedChange={(changes) => {
                        setSelection((prev) =>
                            changes.checked
                                ? [...prev, user.id]
                                : prev.filter((id) => id !== user.id),
                        );
                    }}
                />
            </Table.Cell>
            <Table.Cell>{user.firstName}</Table.Cell>
            <Table.Cell>{user.lastName}</Table.Cell>
            <Table.Cell>{user.phone}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
        </Table.Row>
    ));

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
                                                changes.checked ? filteredUsers.map((user) => user.id) : [],
                                            );
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
                        <Button colorScheme="blue" onClick={handleSaveSelection}>
                            Salvar
                        </Button>
                    </HStack>

                </Stack>
            </HStack>
        </Box>
    );
}

export default UserPopup;
