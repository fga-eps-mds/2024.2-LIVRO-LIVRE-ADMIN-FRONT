import { Box, HStack, Stack, Table, Input } from '@chakra-ui/react';
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
    // const [users, setUsers] = useState<User[]>([]);
    // const [usersCount, setUsersCount] = useState(0);
    // const [page, setPage] = useState(1);

    const [filteredUsers, setFilteredUsers] = useState(MockUsers); //~ variavel que guarda o array dos usuários filtrados
    const [showMockUsers, setShowMockUsers] = useState<User[]>([]); //~ variavel que atualizará o array para mostrar somente 10 items por pagina
    const [mockPage, setMockPage] = useState(1);  //~ variavel que guarda o valor 1 que será a pagina 1 e depois sera atualizado quando trocar a pagina

    const [inputValue, setInputValue] = useState(''); //~ variavel que guard o valor do input

    const [selection, setSelection] = useState<string[]>([])
    const hasSelection = selection.length > 0
    const indeterminate = hasSelection && selection.length < showMockUsers.length


    // const { getUsers } = useApi();
    // const { token } = useAuth();


    // const fetchUsers = async () => {
    //   const { data } = await getUsers({ perPage: 10, page: page - 1 }, token);
    //   setUsers(data.items);
    //   setUsersCount(data.total);
    // }

    // useEffect(() => {
    //   fetchUsers();
    // }, [page]);



    const handlePageChange = (page: number) => { //~ funçõ que atualiza o mokpage quando o valor no pagination muda
        setMockPage(page);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {  //~ função que atualiza a variavel inputvalue quando o valor do input muda
        setInputValue(e.target.value);
    };


    useEffect(() => {  //~ calcula o indice de começo e de fim do array pela pagina que está 
        const startIndex = (mockPage - 1) * 10;
        const endIndex = startIndex + 10;
        const paginatedUsers = filteredUsers.slice(startIndex, endIndex); ///~ corta o array a partir do array filtrado 
        setShowMockUsers(paginatedUsers); //~ atualiza o array depois de cortar o que não pertence a pagina que está
    }, [filteredUsers, mockPage]);

    useEffect(() => {
        const lowerCaseInput = inputValue.toLowerCase(); //~ transforma em minusculo o input
        const filtered = MockUsers.filter(  //~ filtra o array de users de acordo com os valores do input
            user =>
                user.firstName.toLowerCase().includes(lowerCaseInput) ||
                user.lastName.toLowerCase().includes(lowerCaseInput) ||
                user.email.toLowerCase().includes(lowerCaseInput)
        );
        setFilteredUsers(filtered); //~ atualiza o valor do array que será renderizado
        setMockPage(1); //~ Voltar para a primeira página ao filtrar
        //^ if (filtered.length === 0) aviso nao encontrou a busca; 
    }, [inputValue]);
    const rows = showMockUsers.map((users) => (
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
            <Table.Cell>{users.createdAt}</Table.Cell>
            <Table.Cell>{users.updatedAt}</Table.Cell>
        </Table.Row>
    ))

    return (

        <Box padding='40px'>
            <Stack>
                <InputGroup flex="0.85" startElement={<IoSearchOutline />}>
                    <Input
                        type="text"
                        placeholder="Digite o nome do usuário."
                        value={inputValue}
                        onChange={handleInputChange}
                    // onKeyDown={handleKeyDown}
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
                                            changes.checked ? filteredUsers.map((MockUsers) => MockUsers.email) : [],
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
                <PaginationRoot count={filteredUsers.length} pageSize={10} page={mockPage} onPageChange={(v) => handlePageChange(v.page)}>
                    <HStack wrap="wrap">
                        <PaginationPrevTrigger />
                        <PaginationItems />
                        <PaginationNextTrigger />
                    </HStack>
                </PaginationRoot>
            </Stack>
        </Box>
    );
}

export default UserPopup
