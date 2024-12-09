import { BrowserRouter, Route, Routes } from "react-router"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import { AuthProvider } from "./hooks/useAuth"
import { ChakraProvider } from "@chakra-ui/react"
import { system } from "./theme"
import { Toaster } from "./components/ui/toaster"
import PrivateRoute from './PrivateRoute';
import SignIn from "./pages/SignIn"
import Users from "./pages/Users"

function App() {
  return (
    <ChakraProvider value={system}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/inicio" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/usuarios" element={<PrivateRoute><Users /></PrivateRoute>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      <Toaster />
    </ChakraProvider>
  )
}

export default App
