// Reducer function to handle state updates
export const todoReducer = (state, action) => {
  
  switch (action.type) {
    case 'FETCH_TODO':
      return { todos: [...action.todoList] }

    case 'ADD_TODO':
      return {
        todos: [...state.todos, action.newTodo]
      };

    case 'UPDATE_TODO_STATUS': {
      let updateTodos = state.todos.map(todo => todo.id === action.todoId ? {...todo, completed: true} : {...todo})
      return {
        todos: [...updateTodos]
      };
    }

    case 'DELETE_TODO': {
      let updateTodos = state.todos.filter(todo => todo.id !== action.todoId)
      return {
        todos: [...updateTodos]
      };
    }
    
    default:
      return state;
  }
};