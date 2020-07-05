import Action from '../actionType';
import swal from 'sweetalert';
import Api from '../../networking/api';
import Path from '../../networking/Path';
import { SetAlert } from '../Alert/AlertAction';
export const GetMyProfile = () => async (dispatch) => {
  try {
    const response = await Api.get(Path.MY_PROFILE);
    dispatch({ type: Action.GET_MY_PROFILE, payload: response });
  } catch (error) {
    console.log(error.response.data, 'lôix');
    dispatch({ type: Action.GET_MY_PROFILE, payload: null });
  }
};

export const getProfileById = (id) => async (dispatch) => {
  try {
    const response = await Api.get(`/profile/user/${id}`);
    dispatch({
      type: Action.GET_PROFILE,
      payload: response,
    });
    return response;
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: Action.PROFILE_ERROR,
    //   payload: { msg: err.response.statusText, status: err.response.status },
    // });
  }
};
export const getProfiles = () => async (dispatch) => {
  try {
    const response = await Api.get(Path.PROFILES);
    dispatch({
      type: Action.GET_PROFILES,
      payload: response,
    });
  } catch (error) {
    console.log(error, 'lôix');
  }
};

export const updateProfile = (payload) => async (dispatch) => {
  try {
    const response = await Api.post(Path.PROFILES, payload);
    dispatch({ type: Action.UPDATE_PROFILE, payload: response });
    swal('Good job!', 'Cập nhật profile thành công!', 'success');

    return response;
  } catch (error) {
    if (error.response.data && error.response.data.errors.length > 0) {
      error.response.data.errors.forEach((error) =>
        dispatch(SetAlert(error.msg, 'danger')),
      );
    }
    console.log('updateProfile -> error', error);
  }
};

export const clearProfile = () => ({
  type: Action.CLEAR_PROFILE,
});

// Add Experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const res = await Api.put('/profile/experience', formData);
    debugger;
    dispatch({
      type: Action.UPDATE_PROFILE,
      payload: res,
    });

    swal('Good job!', 'Thêm mới experience thành công!', 'success');

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(SetAlert(error.msg, 'danger')));
    }

    dispatch({
      type: Action.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const res = await Api.put('/profile/education', formData);

    dispatch({
      type: Action.UPDATE_PROFILE,
      payload: res,
    });
    swal('Good job!', 'Thêm mới education thành công!', 'success');
    history.push('/dashboard');
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(SetAlert(error.msg, 'danger')));
    }

    dispatch({
      type: Action.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await Api.delete(`/profile/experience/${id}`);

    dispatch({
      type: Action.UPDATE_PROFILE,
      payload: res,
    });
    swal('Good job!', 'Xoá experience thành công!', 'success');
  } catch (err) {
    dispatch({
      type: Action.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Github repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await Api.get(`/profile/github/${username}`);
    console.log('getGithubRepos ' + res);
    dispatch({
      type: Action.GET_REPOS,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: Action.NO_REPOS,
    });
  }
};

// Delete education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await Api.delete(`/profile/education/${id}`);

    dispatch({
      type: Action.UPDATE_PROFILE,
      payload: res,
    });
    swal('Good job!', 'Xoá education thành công!', 'success');
  } catch (err) {
    dispatch({
      type: Action.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// export const deleteAccount = () => (dispatch) => {
//   try {
//     const response = await Api.get(Path.PROFILES);
//     console.log(Action.GET_PROFILES);
//     dispatch({
//       type: Action.ACCOUNT_DELETED,
//       payload: response.data,
//     });
//   } catch (error) {
//     console.log(error, 'lôix');
//   }
// }
