import { Box, Flex, HStack, Stack, Table, Input, Image, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from '../../../components/ui/pagination';
import { InputGroup } from '../../../components/ui/input-group';
import { IoSearchOutline } from 'react-icons/io5';

interface Book {
  id: string;
  titulo: string;
  autor: string;
  tema: string;
  rating: number;
  imageUrl: string;
}

const mockBooks = Array.from({ length: 32 }, (_, i) => ({
  id: `${i + 1}`,
  titulo: `Título do Livro ${i + 1}`,
  autor: `Autor ${i + 1}`,
  tema: `Tema ${i + 1}`,
  rating: Math.random() * 5,
  imageUrl:
    'https://plus.unsplash.com/premium_photo-1682125773446-259ce64f9dd7?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
}));

function TableBooks() {
  const [showMockBooks, setShowMockBooks] = useState<Book[]>([]);
  const [mockPage, setMockPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [loanDuration, setLoanDuration] = useState('');

  const filteredBooks = mockBooks.filter((book) =>
    book.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const MockfetchBooks = () => {
    const startIndex = (mockPage - 1) * 5;
    const endIndex = startIndex + 5;
    const paginatedBooks = filteredBooks.slice(startIndex, endIndex);
    setShowMockBooks(paginatedBooks);
  };

  useEffect(() => {
    MockfetchBooks();
  }, [mockPage, searchTerm]);

  const rows = showMockBooks.map((mockBooks) => (
    <Table.Row key={mockBooks.id}>
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
      <Table.Cell>{mockBooks.titulo}</Table.Cell>
      <Table.Cell>{mockBooks.autor}</Table.Cell>
      <Table.Cell>{mockBooks.tema}</Table.Cell>
      <Table.Cell>{mockBooks.rating.toFixed(2)}</Table.Cell>
    </Table.Row>
  ));

  return (
    <Box height="100vh">
      <Flex height="100%">
        <Box padding="40px">
          <Stack>
            <Heading size="md" mb={2}>
              Todos os livros
            </Heading>
            <HStack mb={4} >
              <Input
                placeholder="Buscar por título do livro"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Input
                placeholder="Período de tempo"
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
              />
              <Input
                placeholder="Duração do empréstimo"
                value={loanDuration}
                onChange={(e) => setLoanDuration(e.target.value)}
              />
            </HStack>
            <Table.Root size="lg" variant="outline" striped showColumnBorder>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Capa do livro</Table.ColumnHeader>
                  <Table.ColumnHeader>Titulo do livro </Table.ColumnHeader>
                  <Table.ColumnHeader>Data de empréstimo </Table.ColumnHeader>
                  <Table.ColumnHeader>Data de devolução </Table.ColumnHeader>
                  <Table.ColumnHeader>Duração do empréstimo </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>{rows}</Table.Body>
            </Table.Root>
            <PaginationRoot
              count={filteredBooks.length}
              pageSize={5}
              page={mockPage}
              onPageChange={(v) => setMockPage(v.page)}
            >
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

export default TableBooks;
