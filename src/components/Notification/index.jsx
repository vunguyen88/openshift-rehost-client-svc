import { useState, useEffect } from 'react';
import { Alert, Fade } from '@mui/material';
import SoftBox from '../SoftBox';

const AlertComponent = ({ visible, message, severity, position }) => {
  const [show, setShow] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
      }, 4000); // set notification for 5 seconds

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const alertStyle = {
    position: 'fixed',
    //top: '5px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1000,
    width: '80%', // Adjust width as needed
    maxWidth: '600px' // Adjust max-width as needed
  };

  return (
    // <div style={getPositionStyle()}>
    <Fade in={show} timeout={1000}>
    <div style={alertStyle}>
      <Alert severity={severity}>
        {message}
      </Alert>
    </div>
    </Fade>
    // </div>
  );
};

export default AlertComponent;