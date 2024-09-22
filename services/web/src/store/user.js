import { logout } from '@app/api/user';
import { getUserDetails } from '@app/api/user';
import { deleteAuthToken } from '@app/lib/auth';

import { setToast } from './toast';
import { batch } from 'react-redux';

const PROCESS_USER = 'user/PROCESS_USER';
const SET_USER = 'user/SET_USER';
const UNSET_USER = 'user/UNSET_USER';

const initialState = {
  isLoggedin: false,
  data: null,
  isProcessing: false,
  isSet: false,
};

export const setUser = (payload, afterSuccess) => (dispatch) => {
  dispatch({ type: SET_USER, payload });
  if (afterSuccess) afterSuccess();
};

export const unsetUser = (afterSuccess) => async (dispatch, getState) => {
  const { isProcessing } = getState().user;
  if (isProcessing) return;

  dispatch({ type: PROCESS_USER });
  await logout();
  batch(() => {
    dispatch({ type: UNSET_USER });

    if (afterSuccess) afterSuccess();
  });
};

export const loadUser = () => async (dispatch, getState) => {
  const { isProcessing } = getState().user;
  if (isProcessing) return;

  dispatch({ type: PROCESS_USER });
  try {
    const response = await getUserDetails();
    dispatch({ type: SET_USER, payload: response });
  } catch (e) {
    deleteAuthToken();
    dispatch(setToast({ type: 'error', message: 'Your auth token is expired or invalid' }));
  }
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case SET_USER:
      return {
        ...state, isLoggedin: true, data: payload.data, isProcessing: false, isSet: true,
      };
    case UNSET_USER:
      return { isLoggedin: false, data: null, isProcessing: false };
    case PROCESS_USER:
      return { ...state, isProcessing: true };
    default:
      return { ...state };
  }
}
