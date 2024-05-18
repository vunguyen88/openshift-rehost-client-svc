import { useState, useEffect, useContext } from "react";

// react-router components
import { Link, useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

// Soft UI Dashboard PRO React components
import SoftBox from "../SoftBox";
import SoftTypography from "../SoftTypography";
import SoftButton from "../SoftButton";

// Soft UI Dashboard PRO React example components
import DefaultNavbarLink from "./DefaultNavbarLink";
import DefaultNavbarMobile from "./DefaultNavbarMobile";

// Soft UI Dashboard PRO React base styles
import breakpoints from "../../assets/theme/base/breakpoints";
import AuthContext from "../../context/authContext";

function DefaultNavbar({ routes, transparent=false, light=false }) {
  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const location = useLocation();
  let isSignInPage = location.pathname.split('/')[location.pathname.split('/').length -1] == 'login';
  const openMobileNavbar = ({ currentTarget }) => setMobileNavbar(currentTarget.parentNode);
  const closeMobileNavbar = () => setMobileNavbar(false);
  const {auth, dispatch} = useContext(AuthContext);

  useEffect(() => {
    // A function that sets the display state for the DefaultNavbarMobile.
    function displayMobileNavbar() {
      if (window.innerWidth < breakpoints.values.lg) {
        setMobileView(true);
        setMobileNavbar(false);
      } else {
        setMobileView(false);
        setMobileNavbar(false);
      }
    }
    /** 
     The event listener that's calling the displayMobileNavbar function when 
     resizing the window.
    */
    window.addEventListener("resize", displayMobileNavbar);

    // Call the displayMobileNavbar function to set the state with the initial value.
    displayMobileNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", displayMobileNavbar);
  }, []);

  return (
    <Container>
      <SoftBox
        py={1}
        px={{ xs: transparent ? 4 : 5, sm: transparent ? 2 : 5, lg: transparent ? 0 : 5 }}
        my={2}
        mx={mobileView ? 0 : 3}
        width="calc(100% - 48px)"
        borderRadius="section"
        shadow={transparent ? "none" : "md"}
        color={light ? "white" : "dark"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        position="absolute"
        left={0}
        zIndex={3}
        sx={({ palette: { transparent: transparentColor, white }, functions: { rgba } }) => ({
          backgroundColor: transparent ? transparentColor.main : rgba(white.main, 0.8),
          backdropFilter: transparent ? "none" : `saturate(200%) blur(30px)`,
        })}
      >
        <SoftBox component={Link} to="/" px={1} py={transparent ? 1.5 : 0.75} lineHeight={1}>
          <SoftTypography variant="button" fontWeight="bold" color={light ? "white" : "dark"}>
            Todo EKS
          </SoftTypography>
        </SoftBox>
        <SoftBox color="inherit" display={{ xs: "none", lg: "flex" }} m={0} p={0}>
          <DefaultNavbarLink
            name="home"
            light={light}
            route={'/'}
          />
          <DefaultNavbarLink
            name="about"
            light={light}
            route={'/about'}
          />

          <DefaultNavbarLink
            name="version"
            light={light}
            route={'/version'}
          />
          {
            auth && auth.isSignedIn && <DefaultNavbarLink
              name="todo"
              light={light}
              route={'/todo'}
            />
          }
        </SoftBox>
        {
          auth && auth.isSignedIn 
            ?  <SoftBox display={{ xs: "none", lg: "inline-block" }} pr={3}>
                <SoftButton
                  component={Link}
                  to="/"
                  variant="gradient"
                  color={"error"}
                  size="small"
                  circular
                  onClick={() => dispatch({type: 'SIGN_OUT'})}
                >
                  Sign out
                </SoftButton>
              </SoftBox>
            : isSignInPage  
                ? <SoftBox display={{ xs: "none", lg: "inline-block" }} pr={3}>
                    <SoftButton
                      component={Link}
                      to="/auth/register"
                      variant="gradient"
                      color={"info"}
                      size="small"
                      circular
                    >
                      Register
                    </SoftButton>
                  </SoftBox>
                : <SoftBox display={{ xs: "none", lg: "inline-block" }} pr={3}>
                    <SoftButton
                      component={Link}
                      to="/auth/login"
                      variant="gradient"
                      color={"info"}
                      size="small"
                      circular
                    >
                      Login
                    </SoftButton>
                  </SoftBox>
         
        }
         
        <SoftBox
          display={{ xs: "inline-block", lg: "none" }}
          lineHeight={0}
          py={1}
          pr={0}
          color="inherit"
          sx={{ cursor: "pointer" }}
          onClick={openMobileNavbar}
        >
          {mobileNavbar ? <CloseIcon fontSize="medium" /> : <MenuIcon fontSize="medium" />}
        </SoftBox>
      </SoftBox>

      {mobileView && (
        <DefaultNavbarMobile routes={routes} open={mobileNavbar} close={closeMobileNavbar}  isSignInPage={isSignInPage}/>
      )}
    </Container>
  );
}

// Typechecking props for the DefaultNavbar
DefaultNavbar.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object),
  transparent: PropTypes.bool,
  light: PropTypes.bool,
};

export default DefaultNavbar;
