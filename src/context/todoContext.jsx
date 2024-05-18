// Auth context using disspatch and session storage for user auth

import { createContext, useEffect, useReducer } from "react";
import { todoReducer } from "../reducers/todoReducer";
import PropTypes from 'prop-types';

const iniTialTodoList = [];

const TodoContext = createContext({
  todoContext: iniTialTodoList,
});

export function TodoContextProvider(props) {
  const [todoContext, todoDispatch] = useReducer(todoReducer, iniTialTodoList);

  // useEffect(() => {
  //   sessionStorage.setItem("auth", JSON.stringify(auth))
  // }, [auth])

  return (
    <TodoContext.Provider value={{ todoContext, todoDispatch }}>
      {props.children}
    </TodoContext.Provider>
  )
}

TodoContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TodoContext;
