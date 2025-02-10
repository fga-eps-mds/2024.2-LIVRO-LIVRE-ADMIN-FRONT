import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import Users from '../src/pages/Users/index.tsx';

// Mock do SideBar
jest.mock('../../components/SideBar', () => ({
  SideBar: () => <div data-testid="sidebar">SideBar</div>,
}));

// Mock do useApi
const mockGetUsers = jest.fn();
jest.mock('../../hooks/useApi', () => ({
  default: () => ({
    getUsers: mockGetUsers,
  }),
}));

// Mock do useAuth
jest.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    token: 'mockToken',
  }),
}));

describe('Users Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.skip('renders the sidebar and table', async () => {
    // Configura o mock para a API
    mockGetUsers.mockResolvedValue({
      data: {
        items: [
          {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            phone: '123-456-7890',
            email: 'john.doe@example.com',
            createdAt: '2022-01-01',
            updatedAt: '2022-01-02',
          },
        ],
        total: 1,
      },
    });

    render(
      <ChakraProvider>
        <Users />
      </ChakraProvider>
    );

    // Verifica se o SideBar foi renderizado
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();

    // Verifica se a tabela está renderizada com o cabeçalho correto
    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByText('Sobrenome')).toBeInTheDocument();

    // Espera que os dados sejam carregados e renderizados na tabela
    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Doe')).toBeInTheDocument();
      expect(screen.getByText('123-456-7890')).toBeInTheDocument();
      expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
      expect(screen.getByText('2022-01-01')).toBeInTheDocument();
      expect(screen.getByText('2022-01-02')).toBeInTheDocument();
    });
  });

  it.skip('calls the API when page changes', async () => {
    // Configura o mock para diferentes páginas
    mockGetUsers
      .mockResolvedValueOnce({
        data: {
          items: [
            {
              id: 1,
              firstName: 'John',
              lastName: 'Doe',
              phone: '123-456-7890',
              email: 'john.doe@example.com',
              createdAt: '2022-01-01',
              updatedAt: '2022-01-02',
            },
          ],
          total: 2,
        },
      })
      .mockResolvedValueOnce({
        data: {
          items: [
            {
              id: 2,
              firstName: 'Jane',
              lastName: 'Smith',
              phone: '987-654-3210',
              email: 'jane.smith@example.com',
              createdAt: '2022-01-03',
              updatedAt: '2022-01-04',
            },
          ],
          total: 2,
        },
      });

    render(
      <ChakraProvider>
        <Users />
      </ChakraProvider>
    );

    // Espera que a primeira página seja carregada
    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
    });

    // Simula a troca para a próxima página
    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);

    // Espera que a segunda página seja carregada
    await waitFor(() => {
      expect(screen.getByText('Jane')).toBeInTheDocument();
      expect(screen.getByText('Smith')).toBeInTheDocument();
    });

    // Verifica se a API foi chamada corretamente
    expect(mockGetUsers).toHaveBeenCalledTimes(2);
    expect(mockGetUsers).toHaveBeenCalledWith({ perPage: 10, page: 0 }, 'mockToken');
    expect(mockGetUsers).toHaveBeenCalledWith({ perPage: 10, page: 1 }, 'mockToken');
  });

  it.skip('handles no users scenario', async () => {
    // Configura o mock para retornar uma lista vazia
    mockGetUsers.mockResolvedValue({
      data: {
        items: [],
        total: 0,
      },
    });

    render(
      <ChakraProvider>
        <Users />
      </ChakraProvider>
    );

    // Verifica se uma mensagem ou estado vazio é renderizado
    await waitFor(() => {
      expect(screen.queryByText('Nome')).not.toBeInTheDocument();
      expect(screen.getByText('Nenhum usuário encontrado')).toBeInTheDocument();
    });
  });
});
