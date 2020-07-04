import Action from '../actionType';
const initialState = {
  myProfile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case Action.GET_MY_PROFILE:
      return { ...state, myProfile: payload, loading: false };
    case Action.GET_PROFILES:
      return { ...state, profiles: payload, loading: false };
    case Action.GET_PROFILE:
      return { ...state, myProfile: payload, loading: false };
    case Action.UPDATE_PROFILE:
      return { ...state, myProfile: payload, loading: false };
    case Action.GET_REPOS:
      return { ...state, repos: payload, loading: false };
    case Action.NO_REPOS:
      return { ...state, repos: [], loading: false };
    case Action.PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        myProfile: null,
      };

    case Action.CLEAR_PROFILE:
      return {
        ...state,
        myProfile: null,
        repos: [],
      };

    default:
      return state;
  }
};
