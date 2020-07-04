import api from '../../networking/api';
import { SetAlert } from '../Alert/AlertAction';
import swal from 'sweetalert';
import Action from '../actionType';

// Get posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await api.get('/posts');
    console.log(res, 'getPosts');
    dispatch({
      type: Action.GET_POSTS,
      payload: res,
    });
  } catch (err) {
    console.log(err, 'errrr');
    // dispatch({
    //   type: Action.POST_ERROR,
    //   payload: { msg: err.response.statusText, status: err.response.status },
    // });
  }
};

// Add like
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await api.put(`/posts/like/${id}`);

    dispatch({
      type: Action.UPDATE_LIKES,
      payload: { id, likes: res },
    });
  } catch (err) {
    dispatch({
      type: Action.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Remove like
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await api.put(`/posts/unlike/${id}`);

    dispatch({
      type: Action.UPDATE_LIKES,
      payload: { id, likes: res },
    });
  } catch (err) {
    dispatch({
      type: Action.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.delete(`/posts/${id}`);

    dispatch({
      type: Action.DELETE_POST,
      payload: id,
    });
    swal('Good job!', 'Xoá bình luận thành công!', 'success');
  } catch (err) {
    dispatch({
      type: Action.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add post
export const addPost = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/posts', formData);

    dispatch({
      type: Action.ADD_POST,
      payload: res,
    });
    swal('Good job!', 'Cập nhật bài viết thành công!', 'success');
  } catch (err) {
    dispatch({
      type: Action.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/posts/${id}`);

    dispatch({
      type: Action.GET_POST,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: Action.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add comment
export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const res = await api.post(`/posts/comment/${postId}`, formData);

    dispatch({
      type: Action.ADD_COMMENT,
      payload: res,
    });

    dispatch(SetAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: Action.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await api.delete(`/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: Action.REMOVE_COMMENT,
      payload: commentId,
    });
    swal('Good job!', 'Xoá bình luận thành công!', 'success');
  } catch (err) {
    dispatch({
      type: Action.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
