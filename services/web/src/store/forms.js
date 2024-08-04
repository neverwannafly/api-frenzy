const SET_FORM = 'forms/SET_FORM';
const UNSET_FORM = 'forms/UNSET_FORM';

const initialState = {
  signupForm: false,
  signinForm: false,
};

export const setForm = (payload) => (dispatch) => {
  dispatch({ type: SET_FORM, payload });
};

export const unsetForm = (payload) => (dispatch) => {
  dispatch({ type: UNSET_FORM, payload });
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case SET_FORM:
      return { ...state, [payload.form]: true };
    case UNSET_FORM:
      return { ...state, [payload.form]: false };
    default:
      return { ...initialState };
  }
}
