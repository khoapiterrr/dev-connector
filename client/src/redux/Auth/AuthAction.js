import Action from '../actionType';
import Api from '../../networking/api';
export const RegisterSuccess = (payload) => ({
  type: Action.REGISTER_SUCCESS,
  payload: payload,
});

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await Api.get('/auth');

    dispatch({
      type: Action.USER_LOADED,
      payload: res,
    });
  } catch (err) {
    console.log(err);
  }
};
export const updateUser = (payload) => async (dispatch) => {
  try {
    const res = await Api.put('/user/update', payload);

    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

export const LoginSuccess = (payload) => ({
  type: Action.LOGIN_SUCCESS,
  payload: payload,
});
// Logout
export const logout = () => (dispatch) => {
  dispatch({ type: Action.LOGOUT });
};
