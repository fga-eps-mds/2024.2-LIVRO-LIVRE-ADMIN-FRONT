import { Box, Flex, HStack, Stack, Table, Input, Image } from '@chakra-ui/react';
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

interface Book {
    id: string;
    titulo: string;
    autor: string;
    rating: number;
    imageUrl: string;
}

const mockBooks = Array.from({ length: 32 }, (_, i) => ({
    id: `${i + 1}`,
    titulo: `Título do Livro ${i + 1}`,
    autor: `Autor ${i + 1}`,
    rating: Math.random() * 5,
    imageUrl: 'https://plus.unsplash.com/premium_photo-1682125773446-259ce64f9dd7?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
}));

function BookTitlePopup() {
    const [showMockBooks, setShowMockBooks] = useState<Book[]>([]);
    const [mockBooksCount] = useState(mockBooks.length);
    const [mockPage, setMockPage] = useState(1);

    const [selection, setSelection] = useState<string[]>([])
    const hasSelection = selection.length > 0
    const indeterminate = hasSelection && selection.length < mockBooks.length

    const MockfetchBooks = () => {
        const startIndex = (mockPage - 1) * 5;
        const endIndex = startIndex + 5;
        const paginatedBooks = mockBooks.slice(startIndex, endIndex);
        setShowMockBooks(paginatedBooks);
    };

    useEffect(() => {
        MockfetchBooks();
    }, [mockPage]);

    const rows = showMockBooks.map((mockBooks) => (
        <Table.Row
            key={mockBooks.id}
            data-selected={selection.includes(mockBooks.id) ? "" : undefined}
        >
            <Table.Cell>
                <Checkbox
                    top="1"
                    aria-label="Select row"
                    checked={selection.includes(mockBooks.id)}
                    onCheckedChange={(changes) => {
                        setSelection((prev) =>
                            changes.checked
                                ? [...prev, mockBooks.id]
                                : selection.filter((id) => id !== mockBooks.id),
                        )
                    }}
                />
            </Table.Cell>
            <Table.Cell>{mockBooks.titulo}</Table.Cell>
            <Table.Cell>{mockBooks.autor}</Table.Cell>
            <Table.Cell>{mockBooks.rating.toFixed(2)}</Table.Cell>
            <Table.Cell>
                <Flex justify="center" align="center" height="100%">
                    <Image
                        src={mockBooks.imageUrl}
                        alt={`Capa do livro ${mockBooks.titulo}`}
                        boxSize="50px"
                        objectFit="cover"
                        borderRadius="md"
                    />
                </Flex>
            </Table.Cell>
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
                                placeholder="Digite o título do livro."
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
                                                    changes.checked ? mockBooks.map((mockBooks) => mockBooks.id) : [],
                                                )
                                            }}
                                        />
                                    </Table.ColumnHeader>
                                    <Table.ColumnHeader>Título</Table.ColumnHeader>
                                    <Table.ColumnHeader>Autor</Table.ColumnHeader>
                                    <Table.ColumnHeader>Avaliação</Table.ColumnHeader>
                                    <Table.ColumnHeader>Capa do Livro</Table.ColumnHeader>
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

                        <PaginationRoot count={mockBooksCount} pageSize={10} page={mockPage} onPageChange={(v) => setMockPage(v.page)}>
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

export default BookTitlePopup
