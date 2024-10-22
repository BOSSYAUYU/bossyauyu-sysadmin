// store/userReducer.js
const initialState = {
  user: null,
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default userReducer;
