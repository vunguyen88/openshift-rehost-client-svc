import { useState, useContext } from "react";
import axios from 'axios';

// react-router-dom components
import { useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import { Grid } from "@mui/material";

// Soft UI Dashboard PRO React components
import SoftBox from "../../components/SoftBox/index";
import SoftTypography from "../../components/SoftTypography";
import SoftInput from "../../components/SoftInput";
import SoftButton from "../../components/SoftButton";

// Authentication layout components
import AuthLayout from "./AuthLayout";
import AuthContext from "../../context/authContext";

// Images
import curved9 from "../../assets/images/curved9.jpg";
import SpaceShip from "../../assets/icons/SpaceShip.jsx";

function AuthVerificationPage() {
  const [error, setError] = useState("");
  const {dispatch} = useContext(AuthContext);
  const [loginStatus, setLoginStatus] = useState(false);
  const [verificationCode, setVerificationCode] = useState(['', '', '', ''])
  const navigate = useNavigate();

  const onDigitChange = e => {
    if (e.target.name === 'firstDigit') {
      const newAuthCode = [...verificationCode];
      newAuthCode[0] = e.target.value;
      setVerificationCode(newAuthCode)
    }
    if (e.target.name === 'secondDigit') {
      const newAuthCode = [...verificationCode];
      newAuthCode[1] = e.target.value;
      setVerificationCode(newAuthCode)
    }
    if (e.target.name === 'thirdDigit') {
      const newAuthCode = [...verificationCode];
      newAuthCode[2] = e.target.value;
      setVerificationCode(newAuthCode)
    }
    if (e.target.name === 'fourthDigit') {
      const newAuthCode = [...verificationCode];
      newAuthCode[3] = e.target.value;
      setVerificationCode(newAuthCode)
    }
  }

  const onSubmitAuthCode = async (e) => {
    e.preventDefault();
    const authCode = verificationCode.join('');
    if (authCode.length !== 4) return setError('Code not valid');
    const email = sessionStorage.getItem("email");
    try {
      const response = await axios.post(`http://localhost:8000/auth/verify`, {authCode, email});
      // const response = await axios.post(`/auth/verify`, {authCode, email}); 
      if (response?.data?.status === 'success' && response?.data?.token) {
        sessionStorage.setItem("auth", JSON.stringify({token: response.data.token, isSignedIn: true}))
        dispatch({type: 'SIGN_IN_SUCCESS', auth: response.data});
        setLoginStatus('success');
        setError('');
        return;
      }

    } catch(error){
      console.error('Erorr in verify', error)
      if (error.response?.data?.message) return setError(error.response?.data?.message) 
      return setError('Something wrong')
    }
  }

  return (
    <AuthLayout
      title="Welcome!"
      description="Use our code to continue the login process."
      image={curved9}
    >
      <Card>
        <SoftBox textAlign="center" p={6}>
          <SoftBox
            display="grid"
            justifyContent="center"
            alignItems="center"
            width="6.25rem"
            height="6.25rem"
            borderRadius="50%"
            shadow="md"
            fontSize="3rem"
            color="white"
            bgColor="warning"
            variant="gradient"
            mx="auto"
            mb={3}
          >
            <SpaceShip color="white" size="35px" />
          </SoftBox>
          <SoftBox mb={3} px={1}>
            <SoftTypography variant="h2" fontWeight="bold">
              2-Step Verification
            </SoftTypography>
          </SoftBox>
          <SoftBox mb={2}>
            <Grid container spacing={2}>
              <Grid item xs>
                <SoftInput size="large" inputProps={{ maxLength: 1 }} name="firstDigit" onChange={onDigitChange}/>
              </Grid>
              <Grid item xs>
                <SoftInput size="large" inputProps={{ maxLength: 1 }} name="secondDigit" onChange={onDigitChange}/>
              </Grid>
              <Grid item xs>
                <SoftInput size="large" inputProps={{ maxLength: 1 }} name="thirdDigit" onChange={onDigitChange}/>
              </Grid>
              <Grid item xs>
                <SoftInput size="large" inputProps={{ maxLength: 1 }} name="fourthDigit" onChange={onDigitChange}/>
              </Grid>
            </Grid>
          </SoftBox>

          {
            error &&
            <SoftBox display="flex" mb={2} pl={.5}>
              <SoftTypography variant="caption" fontWeight="bold" color="error" >
                {error ? error : 'Error in register'} 
              </SoftTypography>
            </SoftBox>
          }

          <SoftBox mb={2}>
            <SoftButton variant="gradient" color="warning" fullWidth onClick={onSubmitAuthCode} disabled={loginStatus ? true : false}>
              send code
            </SoftButton>
          </SoftBox>

          {
            loginStatus === 'success' 
              ? <SoftBox display="flex" pt={1.5} pl={.5}>
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
              : <SoftTypography variant="button" color="text" fontWeight="regular">
                  Haven&apos;t received it?{" "}
                  <SoftTypography component="a" href="#verification" variant="button">
                    Resend a new code
                  </SoftTypography>
                  .
                </SoftTypography>
          }
        </SoftBox>
      </Card>
    </AuthLayout>
  );
}

export default AuthVerificationPage;
