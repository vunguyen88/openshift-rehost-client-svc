import { useContext, useState } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
// import Tooltip from "@mui/material/Tooltip";
// import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';

// Soft UI Dashboard PRO React components
import SoftBox from "../SoftBox";
import SoftTypography from "../SoftTypography";
import AuthContext from '../../context/authContext';
import TodoContext from '../../context/todoContext';
import Notification from "../Notification";
function ActionCell({ todoId, completed }) {

  const { auth } = useContext(AuthContext);
  const { todoDispatch } = useContext(TodoContext);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  const onMarkComplete = async () => {
    try {
      let res = await axios.patch(`http://localhost:8001/todos/${todoId}`, {}, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`
        }
      })
      if (res.status === 200 && res.data.status === "success") {
        setAlertMessage('Update todo status successful!');
        setAlertSeverity('success');
        setAlertVisible(true);
        todoDispatch({ type: 'UPDATE_TODO_STATUS', todoId: todoId })
      }
    } catch(err) {
      console.error(err);
      setAlertMessage('Update failed');
      setAlertSeverity('error');
      setAlertVisible(true);
    }
  }

  const onDelete = async () => {
    try {
      let res = await axios.delete(`http://localhost:8001/todos/${todoId}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`
        }
      })
      if (res.status === 202 && res.data.status === "success") {
        setAlertMessage('Delete todo successful!');
        setAlertSeverity('success');
        setAlertVisible(true);
        todoDispatch({ type: 'DELETE_TODO', todoId: todoId })
      }
    } catch(err) {
      console.error(err);
      setAlertMessage('Delete failed!');
      setAlertSeverity('error');
      setAlertVisible(true);
    }
  }

  return (
    <SoftBox display="flex" alignItems="center">
      <Notification 
        visible={alertVisible} 
        message={alertMessage} 
        severity={alertSeverity}
        position="top"
      />
      {
        completed === false 
          ? <SoftBox sx={{ minWidth: '2.5rem'}}>
              <SoftTypography variant="body1" fontWeight='bold' sx={{ cursor: "pointer", lineHeight: 0, fontSize: '1.6rem' }}>
                <DoneIcon onClick={onMarkComplete} color="info"/>
              </SoftTypography>
            </SoftBox>
            
          : <SoftBox sx={{ minWidth: '2.5rem'}}></SoftBox>
      }
      <SoftTypography variant="body1" color="secondary" sx={{ cursor: "pointer", lineHeight: 0, fontSize: '1.6rem' }} ml={2}>
        <DeleteIcon  onClick={onDelete} color="error" />
      </SoftTypography>
    </SoftBox>
  );
}

ActionCell.propTypes = {
  todoId: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};

export default ActionCell;