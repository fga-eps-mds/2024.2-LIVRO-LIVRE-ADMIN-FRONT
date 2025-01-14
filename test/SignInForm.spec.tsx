import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
//import { BrowserRouter } from 'react-router-dom';
import SignInForm from '../src/pages/SignIn/SignInForm';

// Mock do hook useAuth
jest.mock('../../../hooks/useAuth', () => ({
  useAuth: jest.fn(() => ({
    signIn: jest.fn(),
    isAuthenticated: false,
  })),
}));

// Mock do useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

describe('SignInForm', () => {
  it.skip('renders form inputs and submit button', () => {
    render(
      <ChakraProvider>
        <BrowserRouter>
          <SignInForm />
        </BrowserRouter>
      </ChakraProvider>
    );

    // Verifica se os campos de input estão renderizados
    expect(screen.getByPlaceholderText('E-mail')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument();

    // Verifica se o botão está renderizado
    expect(screen.getByText('Entrar')).toBeInTheDocument();
  });

  it.skip('validates required fields and email format', async () => {
    render(
      <ChakraProvider>
        <BrowserRouter>
          <SignInForm />
        </BrowserRouter>
      </ChakraProvider>
    );

    // Submete o formulário sem preencher os campos
    fireEvent.click(screen.getByText('Entrar'));

    // Verifica as mensagens de erro
    await waitFor(() => {
      expect(screen.getByText('Campo obrigatório.')).toBeInTheDocument();
    });

    // Preenche o campo de e-mail com um valor inválido
    fireEvent.change(screen.getByPlaceholderText('E-mail'), { target: { value: 'invalid-email' } });
    fireEvent.click(screen.getByText('Entrar'));

    // Verifica a mensagem de erro de e-mail inválido
    await waitFor(() => {
      expect(screen.getByText('E-mail inválido.')).toBeInTheDocument();
    });
  });

  it.skip('submits the form with valid inputs', async () => {
    const mockSignIn = jest.fn();
    jest.mock('../../../hooks/useAuth', () => ({
      useAuth: jest.fn(() => ({
        signIn: mockSignIn,
        isAuthenticated: false,
      })),
    }));

    render(
      <ChakraProvider>
        <BrowserRouter>
          <SignInForm />
        </BrowserRouter>
      </ChakraProvider>
    );

    // Preenche os campos de e-mail e senha com valores válidos
    fireEvent.change(screen.getByPlaceholderText('E-mail'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: 'password123' } });

    // Submete o formulário
    fireEvent.click(screen.getByText('Entrar'));

    // Verifica se a função signIn foi chamada com os valores corretos
    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it.skip('redirects to "/inicio" when authenticated', () => {
    jest.mock('../../../hooks/useAuth', () => ({
      useAuth: jest.fn(() => ({
        signIn: jest.fn(),
        isAuthenticated: true,
      })),
    }));

    render(
      <ChakraProvider>
        <BrowserRouter>
          <SignInForm />
        </BrowserRouter>
      </ChakraProvider>
    );

    // Verifica se o usuário foi redirecionado para "/inicio"
    expect(mockNavigate).toHaveBeenCalledWith('/inicio');
  });
});
