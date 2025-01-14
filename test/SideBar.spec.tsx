import { render, screen, fireEvent } from '@testing-library/react';
//import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { SideBar } from '../src/components/SideBar/index.tsx';

// Mock do hook useAuth
jest.mock('../../hooks/useAuth', () => ({
  useAuth: jest.fn(() => ({
    signOut: jest.fn(),
  })),
}));

// Mock do useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({ pathname: '/inicio' }),
}));

describe('SideBar', () => {
  it.skip('renders all tabs and sign-out button', () => {
    render(
      <ChakraProvider value={system}>
        <BrowserRouter>
          <SideBar />
        </BrowserRouter>
      </ChakraProvider>
    );

    // Verifica se os botões das abas estão renderizados
    const homeTab = screen.getByText('Início');
    const usersTab = screen.getByText('Usuários');
    expect(homeTab).toBeInTheDocument();
    expect(usersTab).toBeInTheDocument();

    // Verifica se o botão "Sair" está renderizado
    const logoutButton = screen.getByText('Sair');
    expect(logoutButton).toBeInTheDocument();
  });

  it.skip('navigates to the correct tab on click', () => {
    render(
      <ChakraProvider>
        <BrowserRouter>
          <SideBar />
        </BrowserRouter>
      </ChakraProvider>
    );

    // Clica no botão "Usuários" e verifica se o navigate foi chamado corretamente
    const usersTab = screen.getByText('Usuários');
    fireEvent.click(usersTab);
    expect(mockNavigate).toHaveBeenCalledWith('/usuarios');
  });

  it.skip('calls signOut and navigates to login on sign-out button click', () => {
    const mockSignOut = jest.fn();
    jest.mock('../../hooks/useAuth', () => ({
      useAuth: () => ({
        signOut: mockSignOut,
      }),
    }));

    render(
      <ChakraProvider>
        <BrowserRouter>
          <SideBar />
        </BrowserRouter>
      </ChakraProvider>
    );

    // Clica no botão "Sair" e verifica os efeitos
    const logoutButton = screen.getByText('Sair');
    fireEvent.click(logoutButton);

    expect(mockSignOut).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});
