// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SoftBox from "../components/SoftBox";
import SoftTypography from "../components/SoftTypography";

// Soft UI Dashboard PRO React example components
import DefaultNavbar from "../components/Navbar";
import PageLayout from "../components/Layout";

// Soft UI Dashboard PRO React base styles
import typography from "../assets/theme/base/typography";

// Authentication layout components
//import Footer from "layouts/authentication/components/Footer";

// Images
import rocket from "../assets/images/rocket.png";

function HomePage() {
  const { d1, d3, d4, d5 } = typography;

  return (
    <PageLayout white>
      <DefaultNavbar
        // routes={pageRoutes}
        transparent
        // action={{
        //   type: "external",
        //   route: "https://creative-tim.com/product/soft-ui-dashboard-pro-react",
        //   label: "buy now",
        //   color: "dark",
        // }}
      />
      <SoftBox my={24} height="calc(100vh - 24rem)">
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100%" }}
        >
          <Grid item xs={11} sm={9} container alignItems="center">
            <Grid item xs={12} lg={6}>
              <SoftBox
                fontSize={{ xs: d5.fontSize, sm: d4.fontSize, md: d3.fontSize, lg: d1.fontSize }}
                lineHeight={1.2}
              >
                <SoftTypography variant="inherit" color="info" textGradient fontWeight="bold" mb={4}>
                  TODO EKS
                </SoftTypography>
              </SoftBox>
              <SoftTypography variant="h2" color="dark" textGradient fontWeight="bold">
                HOME PAGE
              </SoftTypography>
              <SoftBox mt={1} mb={2}>
                <SoftTypography variant="body1" color="text">
                  A devops demo project using AWS as a Cloud Provider
                </SoftTypography>
              </SoftBox>
              <SoftBox mt={1} mb={2}>
                <SoftTypography variant="body1" color="text">
                  AWS Services: EKS, ECR, SQS, SES, Lambda, RDS (Postgres), DynamoDB, Cloud Formation, S3 
                </SoftTypography>
              </SoftBox>
              <SoftBox mt={1} mb={2}>
                <SoftTypography variant="body1" color="text">
                  Tools: Github, Github Actions, Terraform, Helm, Docker, Kubernetes, Helm, Jenkins, Automation
                </SoftTypography>
              </SoftBox>
              {/* <SoftBox mt={4} mb={2}>
                <SoftButton component={Link} to="/" variant="gradient" color="dark">
                  go to homepage
                </SoftButton>
              </SoftBox> */}
            </Grid>
            <Grid item xs={12} lg={6}>
              <SoftBox component="img" src={rocket} alt="rocket-img" width="100%" />
            </Grid>
          </Grid>
        </Grid>
      </SoftBox>
      {/* <Footer /> */}
    </PageLayout>
  );
}

export default HomePage;
