import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "@mui/material/styles";
import theme from "./assets/theme";
import LoginPage from "./pages/auth/Login";
import ReigsterPage from "./pages/auth/Register";
import AuthVerificationPage from "./pages/auth/AuthVerification";
import TodoPage from "./pages/todo";
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import NotFound from "./pages/NotFound";
import VersionPage from "./pages/Version";

import { AuthContextProvider } from './context/authContext';
import { TodoContextProvider } from './context/todoContext';
// import AuthContext from './context/authContext';
import AuthRoute from './components/AuthRoute';

function App() {

  return (
    <AuthContextProvider>
      <TodoContextProvider>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<ReigsterPage />} />
          <Route path="/auth/verify" element={<AuthVerificationPage />} />
          <Route path="/version" element={<VersionPage />} />
          <Route path="/todo" element={<AuthRoute><TodoPage /></AuthRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
      </TodoContextProvider>
    </AuthContextProvider>
    
  )
}

export default App
