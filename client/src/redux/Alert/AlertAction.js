import { v4 as uuidv4 } from 'uuid';
import Action from '../actionType';
export const SetAlert = (msg, alertType, timeOut = 5000) => (dispatch) => {
  const id = uuidv4();
  dispatch({ type: Action.SET_ALERT, payload: { id, msg, alertType } });
  setTimeout(
    () => dispatch({ type: Action.REMOVE_ALERT, payload: id }),
    timeOut,
  );
};
