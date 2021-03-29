import { ADD_TODO, DELETE_TODO } from '../actions/actionTypes';

const initialState = {
  todo_list: [
    { id: '99', task: 'test' },
    { id: '66', task: '1234' },
  ],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      const { id, task } = action.payload;
      return {
        ...state,
        todo_list: [...state.todo_list, { id, task }],
      };
    }
    case DELETE_TODO: {
      const { id } = action.payload;
      return {
        ...state,
        todo_list: state.todo_list.filter((todo) => todo.id != id),
      };
    }
    default:
      return state;
  }
}
