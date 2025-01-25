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
import ExportarDados from "./pages/ExportData"

function App() {
  return (
    <ChakraProvider value={system}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/inicio" element={<Home />} />
            {/* <PrivateRoute><Home /></PrivateRoute> <PrivateRoute><Users /></PrivateRoute>*/}
            <Route path="/usuarios" element={<Users />} /> 
            <Route path="/exportar-dados" element={<ExportarDados />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      <Toaster />
    </ChakraProvider>
  )
}

export default App
