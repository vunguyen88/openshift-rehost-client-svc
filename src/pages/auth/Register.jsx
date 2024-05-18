import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard PRO React components
import SoftBox from "../../components/SoftBox/index";
import SoftTypography from "../../components/SoftTypography";
import SoftInput from "../../components/SoftInput";
import SoftButton from "../../components/SoftButton";

// Authentication layout components
import AuthLayout from "./AuthLayout";
// import Socials from "layouts/authentication/components/Socials";
import Separator from "../../components/Separator";

// Images
import curved6 from "../../assets/images/curved6.jpg";

function RegisterPage() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <AuthLayout
      title="Welcome!"
      description="Use our form to create new account to manage your todo list."
      image={curved6}
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Register
          </SoftTypography>
        </SoftBox>
        {/* <SoftBox mb={2}>
          <Socials />
        </SoftBox> */}
        <SoftBox p={3}>
          <SoftBox component="form" role="form">
            <SoftBox mb={2}>
              <SoftInput type="email" placeholder="Email" />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput type="password" placeholder="Password" />
            </SoftBox>
            <SoftBox display="flex" alignItems="center">
          <Checkbox 
            //checked={agreement} 
            //onChange={handleSetAgremment}
            />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            //onClick={handleSetAgremment}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;I agree the&nbsp;
          </SoftTypography>
          <SoftTypography component="a" href="#" variant="button" fontWeight="bold" textGradient>
            Terms and Conditions
          </SoftTypography>
        </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton variant="gradient" color="info" fullWidth>
                Sign up
              </SoftButton>
            </SoftBox>
            
            <SoftBox mt={3} textAlign="center">
                <SoftTypography variant="button" color="text" fontWeight="regular">
                    Already have an account?&nbsp;
                    <SoftTypography
                    component={Link}
                    to="/auth/login"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    //textGradient
                    >
                    Sign in
                    </SoftTypography>
                </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </AuthLayout>
  );
}

export default RegisterPage;
