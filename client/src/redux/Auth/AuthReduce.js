import Action from '../actionType';
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: localStorage.getItem('token') ? true : false,
  loading: false,
  user: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case Action.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case Action.LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        user: payload,
        loading: false,
        isAuthenticated: true,
      };
    case Action.REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        user: payload,
        loading: false,
        isAuthenticated: true,
      };
    case Action.LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    case Action.ACCOUNT_DELETED:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
};
