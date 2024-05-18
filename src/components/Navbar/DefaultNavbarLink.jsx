// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Collapse from "@mui/material/Collapse";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SoftBox from "../SoftBox";
import SoftTypography from "../SoftTypography";

import StyledLink from "../CustomLink";

function DefaultNavbarLink({
  name,
  route,
  icon,
  // openHandler,
  // closeHandler,
  children=false,
  collapseStatus=false,
  light=false,
  ...rest
}) {
  return (
    <>
      <SoftBox
        {...rest}
        mx={1}
        p={.7}
        to={route}
        //onMouseEnter={children ? undefined : openHandler}
        //onMouseLeave={children ? undefined : closeHandler}
        display="flex"
        //alignItems="baseline"
        alignItems="center"
        color={light ? "white" : "dark"}
        sx={{ cursor: "pointer", userSelect: "none" }}
        component={StyledLink}
      >
        <Icon
          fontSize="small"
          sx={{
            color: ({ palette: { white, secondary } }) => (light ? white.main : secondary.main),
            verticalAlign: "middle",
          }}
        >
          {icon}
        </Icon>
        <SoftTypography
          variant="body2"
          fontWeight="regular"
          textTransform="capitalize"
          color="inherit"
          ml={1}
          sx={{ fontWeight: "100%" }}
        >
          {name}
        </SoftTypography>
      </SoftBox>
      {children && (
        <Collapse in={Boolean(collapseStatus)} timeout="auto" unmountOnExit>
          {children}
        </Collapse>
      )}
    </>
  );
}

// Typechecking props for the DefaultNavbarLink
DefaultNavbarLink.propTypes = {
  name: PropTypes.string.isRequired,
  // openHandler: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  // closeHandler: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  children: PropTypes.node,
  collapseStatus: PropTypes.bool,
  light: PropTypes.bool,
};

export default DefaultNavbarLink;