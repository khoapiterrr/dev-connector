import Action from '../actionType';
const initialState = [];
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case Action.SET_ALERT:
      return [...state, payload];
    case Action.REMOVE_ALERT:
      return state.filter((e) => e.id !== payload);
    default:
      return state;
  }
};
