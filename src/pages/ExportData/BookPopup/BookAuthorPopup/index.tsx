import { Box, Flex, HStack, Stack, Table, Input } from '@chakra-ui/react';
import { Checkbox } from "../../../../components/ui/checkbox"
import { useEffect, useState } from 'react';
import {
    PaginationItems,
    PaginationNextTrigger,
    PaginationPrevTrigger,
    PaginationRoot,
} from "../../../../components/ui/pagination";
import { InputGroup } from '../../../../components/ui/input-group';
import { IoSearchOutline } from "react-icons/io5";

const mockBooks = Array.from({ length: 30 }, (_, i) => ({
    id: `${i + 1}`,
    titulo: `Título ${Math.floor(i / 2) + 1}`,
    autor: `Autor ${i+1}`,
    rating: Math.random() * 5,
    imageUrl: 'https://plus.unsplash.com/premium_photo-1682125773446-259ce64f9dd7?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
}));

function BookAuthorPopup() {
    const [showMockBooks, setShowMockBooks] = useState<string[]>([]); // Agora é uma lista de autores (strings)
    const [mockPage, setMockPage] = useState(1);

    const [selection, setSelection] = useState<string[]>([]);
    const hasSelection = selection.length > 0;
    const indeterminate = hasSelection && selection.length < showMockBooks.length;

    // Filtrando os autores únicos
    const filteredMockBooks = mockBooks
        .map((book) => book.autor)
        .filter((value, index, self) => self.indexOf(value) === index);

    // Função para obter livros filtrados por página
    const MockfetchBooks = () => {
        const startIndex = (mockPage - 1) * 10;
        const endIndex = startIndex + 10;
        const paginatedBooks = filteredMockBooks.slice(startIndex, endIndex);
        setShowMockBooks(paginatedBooks);
    };

    useEffect(() => {
        MockfetchBooks();
    }, [mockPage]);

    const rows = showMockBooks.map((author) => (
        <Table.Row key={author}>
            <Table.Cell>
                <Checkbox
                    top="1"
                    aria-label="Select author"
                    checked={selection.includes(author)}
                    onCheckedChange={(changes) => {
                        setSelection((prev) =>
                            changes.checked
                                ? [...prev, author]
                                : selection.filter((a) => a !== author),
                        );
                    }}
                />
            </Table.Cell>
            <Table.Cell>{author}</Table.Cell>
        </Table.Row>
    ));

    return (
        <Box height='100vh'>
            <Flex height='100%'>
                <Box padding='40px'>
                    <Stack>
                        <InputGroup flex="0.85" startElement={<IoSearchOutline />}>
                            <Input
                                type="text"
                                placeholder="Digite o nome do Autor."
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
                                                    changes.checked ? filteredMockBooks : [],
                                                );
                                            }}
                                        />
                                    </Table.ColumnHeader>
                                    <Table.ColumnHeader>Autor</Table.ColumnHeader>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {rows}
                                <Table.Row>
                                    <Table.Cell colSpan={2}>
                                        {selection.length > 1
                                            ? `${selection.length} Selecionados`
                                            : `${selection.length} Selecionado`}
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table.Root>

                        <PaginationRoot count={filteredMockBooks.length} pageSize={10} page={mockPage} onPageChange={(v) => setMockPage(v.page)}>
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

export default BookAuthorPopup;
