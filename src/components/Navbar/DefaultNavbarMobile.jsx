/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.2
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Menu from "@mui/material/Menu";
// import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SoftBox from "../SoftBox";

// Soft UI Dashboard PRO React example components
import DefaultNavbarLink from "./DefaultNavbarLink";

function DefaultNavbarMobile({ open, close, isSignInPage, auth, dispatch }) {
  const { width } = open && open.getBoundingClientRect();
  const [openCollapse, setOpenCollapse] = useState(false);

  const handleSepOpenCollapse = (name) =>
    openCollapse === name ? setOpenCollapse(false) : setOpenCollapse(name);

  console.log('auth in mobile ', auth)
  return (
    <Menu
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      anchorEl={open}
      open={Boolean(open)}
      onClose={close}
      MenuListProps={{ style: { width: `calc(${width}px - 4rem)` } }}
    >
      <SoftBox px={0.5}>
        <DefaultNavbarLink
          name="home"
          route={'/'}
        >
          <SoftBox maxHeight="16rem" overflow="auto"></SoftBox>
        </DefaultNavbarLink>
        <DefaultNavbarLink
          name="about"
          route={'/about'}
          onClick={() => handleSepOpenCollapse("authentication")}
        >
          <SoftBox maxHeight="16rem" overflow="auto"></SoftBox>
        </DefaultNavbarLink>
        <DefaultNavbarLink
          name="version"
          route={'/version'}
        >
          <SoftBox maxHeight="16rem" overflow="auto"></SoftBox>
        </DefaultNavbarLink>
        <DefaultNavbarLink
          name="todo"
          route={'/todo'}
          onClick={() => handleSepOpenCollapse("ecommerce")}
        >
          <SoftBox maxHeight="16rem" overflow="auto">
            {/* <EcommerceMenu routes={routes} mobileMenu /> */}
          </SoftBox>
        </DefaultNavbarLink>
        { 
         auth && auth.isSignedIn 
          ? <DefaultNavbarLink
              name="Sign out"
              route={'/auth/register'}
              onClick={() => dispatch({type: 'SIGN_OUT'})}
            />
          : isSignInPage
            ? <DefaultNavbarLink
                name="register"
                route={'/auth/register'}
              >
                <SoftBox maxHeight="16rem" overflow="auto"></SoftBox>
              </DefaultNavbarLink>
            : <DefaultNavbarLink
                name="login"
                route={'/auth/login'}
              >
                <SoftBox maxHeight="16rem" overflow="auto"></SoftBox>
              </DefaultNavbarLink>
        }
      </SoftBox>
    </Menu>
  );
}

// Typechecking props for the DefaultNavbarMenu
DefaultNavbarMobile.propTypes = {
  //routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  open: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  close: PropTypes.oneOfType([PropTypes.func, PropTypes.bool, PropTypes.object]).isRequired,
};

export default DefaultNavbarMobile;
