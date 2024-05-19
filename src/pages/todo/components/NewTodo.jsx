import { useState, useEffect, useContext } from "react";

import axios from "axios";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import SoftBox from "../../../components/SoftBox";
import SoftButton from "../../../components/SoftButton";
import SoftTypography from "../../../components/SoftTypography";
import SoftSelect from "../../../components/SoftSelect";
import SoftInput from "../../../components/SoftInput";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from "moment";
import AuthContext from "../../../context/authContext";
import TodoContext from "../../../context/todoContext";
import Notification from "../../../components/Notification";


function NewTodo() {
  const [ targetDate, setTargetDate ] = useState("");
  const [ title, setTitle ] = useState("");
  const [ reminder, setReminder ] = useState(false);
  const { auth, dispatch } = useContext(AuthContext);
  const { todoContext, todoDispatch } = useContext(TodoContext);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  const handleReminderChange = (e) => {
    setReminder(e.value);
  };

  const onSubmit = async () => {
    try {
      let reqBody = {
        title: title,
        completed: false,
        set_reminder: reminder,
        target_date: targetDate
      };

      let config = {
        headers: {
          'Authorization': `Bearer ${auth.accessToken}`
        }
      };

      let res = await axios.post(`http://localhost:8001/todos`, reqBody, config)
      if (res.status === 201 && res.data?.status === "success") {
        // trigger alert
        setAlertMessage('Add new todo successful!');
        setAlertSeverity('success');
        setAlertVisible(true);
        todoDispatch({type: 'ADD_TODO', newTodo: res.data.data});
      }
    } catch(err) {
      setAlertMessage(err.message);
      setAlertSeverity('error');
      setAlertVisible(true);
      console.error(err);
    }
  }

  return (
    <SoftBox  
      sx={{position: "absolute", top:"50%", left: "50%", transform: 'translate(-50%, -50%)', width: "100%"}}
    >
      <Notification 
        visible={alertVisible} 
        message={alertMessage} 
        severity={alertSeverity}
        position="top"
      />
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} lg={8}>
          <Card sx={{ overflow: "visible" }}>
            <SoftBox p={4} my={4}>
              {/* <SoftBox> */}
                <SoftBox my={2} width="100%" display="flex" flexDirection="column">
                  <SoftBox>
                    <SoftTypography variant="h5" id="modal-title">Todo Information</SoftTypography>
                  </SoftBox>
                  
                  <SoftBox mt={3} mb={2}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <Grid container spacing={3} direction="row" justifyContent="flex-start" alignItems="flex-start">
                        <Grid item xs={12} sm={6}>
                          <SoftBox mb={1} ml={0.5} lineHeight={0} display="flex">
                            <SoftTypography
                              component="label"
                              variant="caption"
                              fontWeight="bold"
                              textTransform="capitalize"
                            >
                              Title
                            </SoftTypography>
                          </SoftBox>
                          <SoftInput onChange={e => setTitle(e.target.value)}/>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                          <SoftBox mb={1} ml={0.5} lineHeight={0} display="flex">
                            <SoftTypography
                              component="label"
                              variant="caption"
                              fontWeight="bold"
                              textTransform="capitalize"
                            >
                              Set Reminder
                            </SoftTypography>
                          </SoftBox>
                          <SoftSelect
                            placeHolder="set reminder" 
                            options={[
                              { value: true, label: "Yes"},
                              { value: false, label: "No"}
                            ]}  
                            onChange={handleReminderChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                          <SoftBox mb={1} ml={0.5} lineHeight={0} display="flex">
                            <SoftTypography
                              component="label"
                              variant="caption"
                              fontWeight="bold"
                              textTransform="capitalize"
                            >
                              Target Date
                            </SoftTypography>
                          </SoftBox>
                          <DatePicker onChange={(value) => setTargetDate(moment(value).format('MM/DD/YYYY'))}/>
                        </Grid>
                      </Grid>
                    </LocalizationProvider>
                  </SoftBox>
                </SoftBox>
                <SoftButton
                  variant="gradient"
                  color="dark"
                  onClick={onSubmit}
                >
                  Submit
                </SoftButton>
              {/* </SoftBox> */}
            </SoftBox>
          </Card>
        </Grid>
      </Grid>
    </SoftBox>
  );
}

export default NewTodo;