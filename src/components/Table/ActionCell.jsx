import { useContext } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
//import Tooltip from "@mui/material/Tooltip";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';

// Soft UI Dashboard PRO React components
import SoftBox from "../SoftBox";
import SoftTypography from "../SoftTypography";
import AuthContext from '../../context/authContext';


function ActionCell({ todoId, completed }) {

  const { auth } = useContext(AuthContext);

  console.log('token ...', auth.accessToken)
  const onMarkComplete = async () => {
    try {
      let res = await axios.patch(`http://localhost:8001/todos/${todoId}`, {}, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`
        }
      })
      console.log('res update ', res)
    } catch(err) {
      console.error(err)
    }
  }

  const onDelete = async () => {
    try {
      let res = await axios.delete(`http://localhost:8001/todos/${todoId}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`
        }
      })
      console.log('res update ', res)
    } catch(err) {
      console.error(err)
    }
  }

  return (
    <SoftBox display="flex" alignItems="center">
      {
        completed === false 
          ? <SoftTypography variant="body1" fontWeight='bold' sx={{ cursor: "pointer", lineHeight: 0, fontSize: '1.6rem' }}>
              <DoneIcon onClick={onMarkComplete} color="info"/>
            </SoftTypography>
          : null
      }
      {/* <SoftTypography variant="body1" color="secondary" sx={{ cursor: "pointer", lineHeight: 0 }} ml={2}>
        <EditIcon onClick={() => console.log('click edit with id', todoId)}/>
      </SoftTypography> */}
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