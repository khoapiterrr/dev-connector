import Action from '../actionType';
export const RegisterSuccess = (payload) => ({
  type: Action.REGISTER_SUCCESS,
  payload: payload,
});

export const LoginSuccess = (payload) => ({
  type: Action.LOGIN_SUCCESS,
  payload: payload,
});
// Logout
export const logout = () => (dispatch) => {
  dispatch({ type: Action.LOGOUT });
};
