import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter  } from 'react-router-dom';
import theme from '../assets/theme';
import { SoftUIControllerProvider } from "../context/index";
import '@testing-library/jest-dom';
import AboutPage from '../pages/About';

describe('AboutPage', () => {

  let renderComponent; // Declare renderComponent variable

  beforeEach(() => {
    // Set up the render function to render the component
    renderComponent = () => render(
      <SoftUIControllerProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <AboutPage />
          </ThemeProvider>
        </BrowserRouter>
      </SoftUIControllerProvider>
    );
  });

  test('renders page elements', () => {
    renderComponent();

    // Assert that the "About Page" text is rendered
    expect(screen.getByText(/About Page/i)).toBeInTheDocument();

    // Assert that the "Page is under construction" text is rendered
    expect(screen.getByText(/Page is under construction/i)).toBeInTheDocument();

    // Assert that the "go to homepage" button is rendered and is a link to "/"
    const goToHomepageButton = screen.getByRole('link', { name: /go to homepage/i });
    expect(goToHomepageButton).toBeInTheDocument();
    expect(goToHomepageButton).toHaveAttribute('href', '/');
  });
});
