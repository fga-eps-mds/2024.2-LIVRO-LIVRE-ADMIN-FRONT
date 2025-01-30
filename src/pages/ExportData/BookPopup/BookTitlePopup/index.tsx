import { Box, Flex, HStack, Stack, Table, Input, Image, Button } from '@chakra-ui/react';
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
import { toaster } from '../../../../components/ui/toaster';
import { Book } from '../../../../interfaces/user';

export const mockBooks = Array.from({ length: 120 }, (_, i) => ({
    id: `${i + 1}`,
    titulo: `Título do Livro ${i + 1}`,
    autor: `Autor ${i + 1}`,
    tema: `Tema ${i + 1}`,
    rating: parseFloat((Math.random() * 5).toFixed(2)),
    imageUrl: 'https://plus.unsplash.com/premium_photo-1682125773446-259ce64f9dd7?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
}));

interface BooksPopupProps {
    onSelectionChange: (selectedBooks: string[]) => void;
    selectedBooks: string[];
}

function BookTitlePopup(props: Readonly<BooksPopupProps>) {
    const { onSelectionChange, selectedBooks } = props;
    const [showMockBooks, setShowMockBooks] = useState<Book[]>([]);
    const [mockPage, setMockPage] = useState(1);
    const [inputValue, setInputValue] = useState('');
    const [filteredBooks, setFilteredBooks] = useState(mockBooks);

    const [selection, setSelection] = useState<string[]>(selectedBooks)
    const hasSelection = selection.length > 0
    const indeterminate = hasSelection && selection.length < mockBooks.length

    useEffect(() => {
        const startIndex = (mockPage - 1) * 5;
        const endIndex = startIndex + 5;
        const paginatedBooks = filteredBooks.slice(startIndex, endIndex);
        setShowMockBooks(paginatedBooks);
    }, [filteredBooks, mockPage]);

    const handlePageChange = (mockPage: number) => {
        setMockPage(mockPage);
    };

    const handleSaveSelection = () => {
        setSelection((prevSelection) => [...prevSelection]);
        onSelectionChange(selection);
        toaster.create({
            description: "Arquivo salvo com sucesso.",
            type: "success",
        })
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    useEffect(() => {
        const lowerCaseInput = inputValue.toLowerCase();
        const filtered = mockBooks.filter(
            mockBooks =>
                mockBooks.titulo.toLowerCase().includes(lowerCaseInput)
        );
        setFilteredBooks(filtered);
        setMockPage(1);
    }, [inputValue]);

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
            <Table.Cell>{mockBooks.tema}</Table.Cell>
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
                                                    changes.checked ? filteredBooks.map((mockBooks) => mockBooks.id) : [],
                                                )
                                            }}
                                        />
                                    </Table.ColumnHeader>
                                    <Table.ColumnHeader>Título</Table.ColumnHeader>
                                    <Table.ColumnHeader>Autor</Table.ColumnHeader>
                                    <Table.ColumnHeader>Tema</Table.ColumnHeader>
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

                        <PaginationRoot count={filteredBooks.length} pageSize={10} page={mockPage} onPageChange={(v) => handlePageChange(v.page)}>
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
                </Box>
            </Flex>
        </Box>
    );
}

export default BookTitlePopup
