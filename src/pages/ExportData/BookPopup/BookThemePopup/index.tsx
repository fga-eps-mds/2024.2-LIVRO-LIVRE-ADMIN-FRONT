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
    autor: `Autor ${i%28 + 1}`,
    tema: `Tema ${i%28 + 1}`,
    rating: Math.random() * 5,
    imageUrl: 'https://plus.unsplash.com/premium_photo-1682125773446-259ce64f9dd7?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
}));

function BookThemePopup() {
    const [showMockBooks, setShowMockBooks] = useState<string[]>([]); 
    const [mockPage, setMockPage] = useState(1);

    const [selection, setSelection] = useState<string[]>([]);
    const hasSelection = selection.length > 0;
    const indeterminate = hasSelection && selection.length < showMockBooks.length;

    const filteredMockBooks = mockBooks
        .map((book) => book.tema)
        .filter((value, index, self) => self.indexOf(value) === index);

    const MockfetchBooks = () => {
        const startIndex = (mockPage - 1) * 5;
        const endIndex = startIndex + 5;
        const paginatedBooks = filteredMockBooks.slice(startIndex, endIndex);
        setShowMockBooks(paginatedBooks);
    };

    useEffect(() => {
        MockfetchBooks();
    }, [mockPage]);

    const rows = showMockBooks.map((tema) => (
        <Table.Row key={tema}>
            <Table.Cell>
                <Checkbox
                    top="1"
                    aria-label="Select theme"
                    checked={selection.includes(tema)}
                    onCheckedChange={(changes) => {
                        setSelection((prev) =>
                            changes.checked
                                ? [...prev, tema]
                                : selection.filter((a) => a !== tema),
                        );
                    }}
                />
            </Table.Cell>
            <Table.Cell>{tema}</Table.Cell>
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
                                placeholder="Digite o gênero do livro."
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
                                    <Table.ColumnHeader>Gênero</Table.ColumnHeader>
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

export default BookThemePopup;
