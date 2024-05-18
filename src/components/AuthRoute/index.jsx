// AuthRoute.js
import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/authContext';

const AuthRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  return (
    auth ? children
         : <Navigate to="/auth/login"/>
  );
};

export default AuthRoute;

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
