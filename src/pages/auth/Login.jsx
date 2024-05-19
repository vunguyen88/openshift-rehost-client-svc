import { useState, useContext } from "react";
import axios from 'axios';

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Soft UI Dashboard PRO React components
import SoftBox from "../../components/SoftBox/index";
import SoftTypography from "../../components/SoftTypography";
import SoftInput from "../../components/SoftInput";
import SoftButton from "../../components/SoftButton";

// Authentication layout components
import AuthLayout from "./AuthLayout";
// import Socials from "layouts/authentication/components/Socials";
import Separator from "../../components/Separator";

import AuthContext from "../../context/authContext";

// Images
import curved9 from "../../assets/images/curved9.jpg";

function LoginPage() {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const {dispatch} = useContext(AuthContext);
  const navigate = useNavigate();

  // const location = useLocation();
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleOnLoginSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) return setError('Email not valid');

    try {
      // const response = await axios.post(`${process.env.REACT_APP_AUTH_SERVICE_DOMAIN}login`, {email, password});
      // const response = await axios.post(`/auth/login`, {email, password});
      
      const response = await axios.post(`http://localhost:8000/auth/login`, {email, password});
      if (response.status === 200 && response.data?.token) {
        sessionStorage.setItem("auth", JSON.stringify({token: response.data.token, isSignedIn: true}))
        dispatch({type: 'SIGN_IN_SUCCESS', auth: response.data});
        setLoginStatus('success');
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
      description="Use our form to login to view and manage your todo list."
      image={curved9}
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Sign in
          </SoftTypography>
        </SoftBox>
        {/* <SoftBox mb={2}>
          <Socials />
        </SoftBox> */}
        <SoftBox p={3}>
          <SoftBox component="form" role="form">
            <SoftBox mb={2}>
              <SoftInput type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            </SoftBox>
            <SoftBox display="flex" alignItems="center">
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;Remember me
              </SoftTypography>
            </SoftBox>
            {
              loginStatus === 'success' &&
              <SoftBox display="flex" pt={1.5} pl={.5}>
                  <SoftTypography variant="caption" fontWeight="bold" color="info" >
                      Success. Click &nbsp; 
                  </SoftTypography>
                  <SoftTypography variant="caption" fontWeight="bold" color="dark" sx={{cursor: "pointer"}} onClick={() => navigate(`/todo`)}>
                      here &nbsp; 
                  </SoftTypography>
                  <SoftTypography variant="caption" fontWeight="bold" color="info">
                      to view your todo list
                  </SoftTypography>
              </SoftBox>
            }
            {
              error &&
              <SoftBox display="flex" pt={1.5} pl={.5}>
                <SoftTypography variant="caption" fontWeight="bold" color="error" >
                  {error === "Email not valid" ? error : 'Error login'} 
                </SoftTypography>
              </SoftBox>
            }
            <SoftBox mt={4} mb={1}>
              <SoftButton variant="gradient" color="info" fullWidth onClick={ handleOnLoginSubmit } disabled={loginStatus ? true : false}>
                Login
              </SoftButton>
            </SoftBox>
            <Separator />
            <SoftBox mt={1} mb={3}>
              <SoftButton
                component={Link}
                to="/auth/register"
                variant="gradient"
                color="dark"
                fullWidth
              >
                Register
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </AuthLayout>
  );
}

export default LoginPage;
