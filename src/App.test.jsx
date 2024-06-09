import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from 'react-router-dom';
import theme from './assets/theme';
import App from './App';
import { SoftUIControllerProvider } from "./context/index";
import '@testing-library/jest-dom';

describe('App', () => {
  test('renders routes correctly', () => {
    render(
      <SoftUIControllerProvider>
        <BrowserRouter initialEntries={['/']} initialIndex={0}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </SoftUIControllerProvider>
    );

    // Assert that the homepage route is rendered
    expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
  });
});
