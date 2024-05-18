// Auth context using disspatch and session storage for user auth

import { createContext, useEffect, useReducer } from "react";
import { authReducer } from "../reducers/authReducer";
import PropTypes from 'prop-types';

const initialAuth = null;

const AuthContext = createContext({
  auth: initialAuth,
});

export function AuthContextProvider(props) {
  const [auth, dispatch] = useReducer(authReducer, initialAuth, () => {

    const sessionData = typeof window !== "undefined" ? sessionStorage.getItem("auth") : null;
    return sessionData && typeof window !== "undefined" ? JSON.parse(sessionData) : null
  });

  useEffect(() => {
    sessionStorage.setItem("auth", JSON.stringify(auth))
  }, [auth])

  return (
    <AuthContext.Provider value={{ auth, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
