import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter  } from 'react-router-dom';
import theme from '../assets/theme';
import HomePage from '../pages/Home';
import { SoftUIControllerProvider } from "../context/index";
import '@testing-library/jest-dom';

describe('HomePage', () => {

  let renderComponent; // Declare renderComponent variable

  beforeEach(() => {
    // Set up the render function to render the component
    renderComponent = () => render(
      <SoftUIControllerProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <HomePage />
          </ThemeProvider>
        </BrowserRouter>
      </SoftUIControllerProvider>
    );
  });

  test('renders the main heading', () => {
    renderComponent();

    const mainHeading = screen.getByText(/HOME PAGE/i);
    expect(mainHeading).toBeInTheDocument();
  });

  test('renders the devops project description', () => {
    renderComponent();

    const projectDescription = screen.getByText(/A devops demo project using AWS as a Cloud Provider/i);
    expect(projectDescription).toBeInTheDocument();
  });

  test('renders the AWS services list', () => {
    renderComponent();

    const awsServices = screen.getByText(/AWS Services: EKS, ECR, SQS, SES, Lambda, RDS \(Postgres\), DynamoDB, Cloud Formation, S3/i);
    expect(awsServices).toBeInTheDocument();
  });

  test('renders the tools list', () => {
    renderComponent();
    
    const toolsList = screen.getByText(/Tools: Github, Github Actions, Terraform, Helm, Docker, Kubernetes, Helm, Jenkins, Automation/i);
    expect(toolsList).toBeInTheDocument();
  });

  test('renders the rocket image', () => {
    renderComponent();
    
    const rocketImage = screen.getByAltText(/rocket-img/i);
    expect(rocketImage).toBeInTheDocument();
  });
});