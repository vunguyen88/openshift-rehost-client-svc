// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SoftBox from "../components/SoftBox";
import SoftTypography from "../components/SoftTypography";
import SoftButton from "../components/SoftButton";

// Soft UI Dashboard PRO React example components
import DefaultNavbar from "../components/Navbar";
import PageLayout from "../components/Layout";

// Soft UI Dashboard PRO React base styles
import typography from "../assets/theme/base/typography";

// Authentication layout components
//import Footer from "layouts/authentication/components/Footer";

// Images
import error404 from "../assets/images/error-404.png";

function AboutPage() {
  const { d1, d3, d4, d5 } = typography;

  return (
    <PageLayout white>
      <DefaultNavbar
        // routes={pageRoutes}
        transparent
        action={{
          type: "external",
          route: "https://creative-tim.com/product/soft-ui-dashboard-pro-react",
          label: "buy now",
          color: "dark",
        }}
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
                <SoftTypography variant="inherit" color="warning" textGradient fontWeight="bold">
                  About Page
                </SoftTypography>
              </SoftBox>
              <SoftTypography variant="h2" color="dark" textGradient fontWeight="bold">
                Page is under construction
              </SoftTypography>
              <SoftBox mt={1} mb={2}>
                <SoftTypography variant="body1" color="text">
                  We suggest you to come back later.
                </SoftTypography>
              </SoftBox>
              <SoftBox mt={4} mb={2}>
                <SoftButton component={Link} to="/" variant="gradient" color="dark">
                  go to homepage
                </SoftButton>
              </SoftBox>
            </Grid>
            <Grid item xs={12} lg={6}>
              <SoftBox component="img" src={error404} alt="error-404" width="100%" />
            </Grid>
          </Grid>
        </Grid>
      </SoftBox>
      {/* <Footer /> */}
    </PageLayout>
  );
}

export default AboutPage;
