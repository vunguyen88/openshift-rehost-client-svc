// Reducer function to handle state updates
const todoReducer = (state, action) => {
  
  switch (action.type) {
    case 'ADD_TODO':
      console.log('action ', action)
      return [
        ...state,
        action.data
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