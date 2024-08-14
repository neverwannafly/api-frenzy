import { show } from '@app/api/functions';

const LOAD_FUNCTION_INIT = 'function/LOAD_FUNCTION_INIT';
const LOAD_FUNCTION_DONE = 'function/LOAD_FUNCTION_DONE';
const LOAD_FUNCTION_FAIL = 'function/LOAD_FUNCTION_FAIL';

const initialState = {
  isLoading: false,
  data: null,
  error: null,
};

export const loadFunction = (functionSlug) => async (dispatch, getState) => {
  const { isLoading, data } = getState().functions;

  if (isLoading || data) {
    return;
  }

  dispatch({ type: LOAD_FUNCTION_INIT });
  try {
    const response = await show(functionSlug);
    dispatch({ type: LOAD_FUNCTION_DONE, payload: response });
  } catch (e) {
    dispatch({ type: LOAD_FUNCTION_FAIL, payload: e.responseJson });
  }
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case LOAD_FUNCTION_INIT:
      return { ...initialState, isLoading: true };
    case LOAD_FUNCTION_DONE:
      return { ...state, isLoading: false, data: payload };
    case LOAD_FUNCTION_FAIL:
      return { ...state, isLoading: false, data: payload };
    default:
      return { ...state };
  }
}
