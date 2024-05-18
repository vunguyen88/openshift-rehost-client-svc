// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SoftBox from "../../components/SoftBox/index";
import SoftTypography from "../../components/SoftTypography/index";

// Soft UI Dashboard PRO React example components
import Navbar from "../../components/Navbar";
import PageLayout from "../../components/Layout/index";

// Authentication layout components
// import Footer from "../../components/Footer";

// Soft UI Dashboard PRO React page layout routes
// import pageRoutes from "page.routes";

function AuthLayout({ title="", description="", image, children }) {
  return (
    <PageLayout>
      <Navbar
        // routes={pageRoutes}
        action={{
          type: "external",
          // route: "https://creative-tim.com/product/soft-ui-dashboard-pro-react",
          label: "buy now",
        }}
        transparent
        light
      />
      <SoftBox
        width="calc(100% - 2rem)"
        minHeight="25vh"
        borderRadius="lg"
        mx={2}
        my={2}
        pt={6}
        pb={28}
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            image &&
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Grid container spacing={3} justifyContent="center" sx={{ textAlign: "center" }}>
          <Grid item xs={10} lg={4}>
            <SoftBox mt={6} mb={1}>
              <SoftTypography variant="h1" color="white" fontWeight="bold">
                {title}
              </SoftTypography>
            </SoftBox>
            <SoftBox mb={2}>
              <SoftTypography variant="body2" color="white" fontWeight="regular">
                {description}
              </SoftTypography>
            </SoftBox>
          </Grid>
        </Grid>
      </SoftBox>
      <SoftBox mt={{ xs: -26, lg: -24 }} px={1} width="calc(100% - 2rem)" mx="auto">
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            {children}
          </Grid>
        </Grid>
      </SoftBox>
      {/* <Footer /> */}
    </PageLayout>
  );
}

// Typechecking props for the AuthLayout
AuthLayout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
