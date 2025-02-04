import { Box, Flex, HStack, Stack, Table, Input, Button } from '@chakra-ui/react';
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
import { mockBooks } from "../BookTitlePopup";

interface BooksPopupProps {
    onSelectionChange: (selectedBooks: string[]) => void;
    selectedBooks: string[];
}

function BookAuthorPopup(props: Readonly<BooksPopupProps>) {
    const { onSelectionChange, selectedBooks } = props;
        const [inputValue, setInputValue] = useState('');
        const [filteredThemes, setFilteredThemes] = useState(mockBooks);
    
        const [showMockBooks, setShowMockBooks] = useState<Book[]>([]);
        const [mockPage, setMockPage] = useState(1);
    
        const [selection, setSelection] = useState<string[]>(selectedBooks);
        const hasSelection = selection.length > 0;
        const indeterminate = hasSelection && selection.length < showMockBooks.length;
    
        useEffect(() => {
            const startIndex = (mockPage - 1) * 5;
            const endIndex = startIndex + 5;
            const paginatedBooks = filteredThemes.slice(startIndex, endIndex);
            setShowMockBooks(paginatedBooks);
        }, [filteredThemes, mockPage]);
    
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
            setFilteredThemes(filtered);
            setMockPage(1);
        }, [inputValue]);
    

    const rows = showMockBooks.map((mockBooks) => (
        <Table.Row key={mockBooks.autor}>
            <Table.Cell>
                <Checkbox
                    top="1"
                    aria-label="Select author"
                    checked={selection.includes(mockBooks.autor)}
                    onCheckedChange={(changes) => {
                        setSelection((prev) =>
                            changes.checked
                                ? [...prev, mockBooks.autor]
                                : selection.filter((a) => a !== mockBooks.autor),
                        );
                    }}
                />
            </Table.Cell>
            <Table.Cell>{mockBooks.autor}</Table.Cell>
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
                                                    changes.checked ? filteredThemes.map((mockBooks) => mockBooks.autor) : [],
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

                        <PaginationRoot count={filteredThemes.length} pageSize={10} page={mockPage} onPageChange={(v) => handlePageChange(v.page)}>
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

export default BookAuthorPopup;
