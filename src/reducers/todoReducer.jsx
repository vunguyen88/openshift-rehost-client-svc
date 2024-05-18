// Reducer function to handle state updates
export const todoReducer = (state, action) => {
  
  switch (action.type) {
    case 'FETCH_TODO':
      console.log('update todos context with fetch request');
      return [action.todos]
    case 'ADD_TODO':
      console.log('action todo', action)
      return [
        ...state,
        action.newTodo
      ];
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    default:
      return state;
  }
};