import { useState, useContext } from "react";
import axios from 'axios';

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

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

import AuthContext from "../../context/authContext";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [registerStatus, setRegisterStatus] = useState(false);
  const {dispatch} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleOnLoginSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) return setError('Email not valid');

    try {
      // const response = await axios.post(`${process.env.REACT_APP_AUTH_SERVICE_DOMAIN}login`, {email, password});
      // const response = await axios.post(`/auth/login`, {email, password});
      
      const response = await axios.post(`http://localhost:8000/auth/register`, {email, password});
      if (response.status === 200 && response.data?.token) {
        sessionStorage.setItem("auth", JSON.stringify({token: response.data.token, isSignedIn: true}))
        dispatch({type: 'SIGN_IN_SUCCESS', auth: response.data});
        setRegisterStatus('success');
        setEmail('');
        setPassword('');
        setError('');
        return;
      }

    } catch(error){
      console.error(error)
      setError(error.message)
      return;
    }
  }

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
              <SoftInput type="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
            </SoftBox>
            {
              registerStatus !== 'success' &&
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
            }
            
            {
              registerStatus === 'success' &&
              <SoftBox display="flex" pt={1.5} pl={1}>
                  <SoftTypography variant="caption" fontWeight="bold" color="info" >
                      Success. Click &nbsp; 
                  </SoftTypography>
                  <SoftTypography variant="caption" fontWeight="bold" sx={{cursor: "pointer"}} color="dark" onClick={() => navigate(`/todo`)}>
                      here &nbsp; 
                  </SoftTypography>
                  <SoftTypography variant="caption" fontWeight="bold" color="info">
                      to create your todo list
                  </SoftTypography>
              </SoftBox>
            }

            {
              <SoftBox mt={4} mb={1}>
                <SoftButton variant="gradient" color="info" fullWidth onClick={ handleOnLoginSubmit } disabled={registerStatus ? true : false}>
                  Sign up
                </SoftButton>
              </SoftBox>
            }
            
            {
              registerStatus !== 'success' &&
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
            }
          </SoftBox>
        </SoftBox>
      </Card>
    </AuthLayout>
  );
}

export default RegisterPage;
