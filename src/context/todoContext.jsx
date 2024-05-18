// Auth context using disspatch and session storage for user auth

import { createContext, useEffect, useReducer } from "react";
import { todoReducer } from "../reducers/todoReducer";
import PropTypes from 'prop-types';

const iniTialTodoList = [];

const TodoContext = createContext({
  todos: todoList,
});

export function TodoContextProvider(props) {
  const [todos, dispatch] = useReducer(todoReducer, iniTialTodoList);

  // useEffect(() => {
  //   sessionStorage.setItem("auth", JSON.stringify(auth))
  // }, [auth])

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {props.children}
    </TodoContext.Provider>
  )
}

TodoContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TodoContext;
