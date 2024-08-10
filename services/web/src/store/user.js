import { logout } from '@app/api/user';
import { getUserDetails } from '@app/api/user';

const PROCESS_USER = 'user/PROCESS_USER';
const SET_USER = 'user/SET_USER';
const UNSET_USER = 'user/UNSET_USER';

const initialState = {
  isLoggedin: false,
  data: null,
  isProcessing: false,
};

export const setUser = (payload) => (dispatch) => {
  dispatch({ type: SET_USER, payload });
};

export const unsetUser = () => async (dispatch, getState) => {
  const { isProcessing } = getState().user;
  if (isProcessing) return;

  dispatch({ type: PROCESS_USER });
  await logout();
  dispatch({ type: UNSET_USER });
};

export const loadUser = () => async (dispatch, getState) => {
  const { isProcessing } = getState().user;
  if (isProcessing) return;

  dispatch({ type: PROCESS_USER });
  const response = await getUserDetails();
  dispatch({ type: SET_USER, payload: response });
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case SET_USER:
      return {
        ...state, isLoggedin: true, data: payload.data, isProcessing: false,
      };
    case UNSET_USER:
      return { isLoggedin: false, data: null, isProcessing: false };
    case PROCESS_USER:
      return { ...state, isProcessing: true };
    default:
      return { ...state };
  }
}
