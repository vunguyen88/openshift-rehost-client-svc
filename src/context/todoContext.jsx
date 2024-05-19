// Auth context using disspatch and session storage for user auth

import { createContext, useReducer } from "react";
import { todoReducer } from "../reducers/todoReducer";
import PropTypes from 'prop-types';

const iniTialTodoList = [];

const TodoContext = createContext({
  todos: iniTialTodoList,
});

export function TodoContextProvider(props) {
  const [todos, todoDispatch] = useReducer(todoReducer, iniTialTodoList);

  // useEffect(() => {
  //   sessionStorage.setItem("auth", JSON.stringify(auth))
  // }, [auth])

  return (
    <TodoContext.Provider value={{ todos, todoDispatch }}>
      {props.children}
    </TodoContext.Provider>
  )
}

TodoContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TodoContext;
