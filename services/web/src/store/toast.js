const SET_TOAST = 'toast/SET_TOAST';
const UNSET_TOAST = 'toast/UNSET_TOAST';

const initialState = {
  message: '',
  type: '',
  open: false,
};

export const setToast = (payload) => (dispatch) => {
  dispatch({ type: SET_TOAST, payload });
};

export const unsetToast = () => (dispatch) => {
  dispatch({ type: UNSET_TOAST });
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case SET_TOAST:
      return { ...payload, open: true };
    case UNSET_TOAST:
      return { ...initialState };
    default:
      return { ...state };
  }
}
