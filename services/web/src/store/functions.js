import { show, list } from '@app/api/functions';
import { setToast } from './toast';

const LOAD_FUNCTION_INIT = 'function/LOAD_FUNCTION_INIT';
const LOAD_FUNCTION_DONE = 'function/LOAD_FUNCTION_DONE';
const LOAD_FUNCTION_FAIL = 'function/LOAD_FUNCTION_FAIL';

const LOAD_FUNCTIONS_INIT = 'function/LOAD_FUNCTIONS_INIT';
const LOAD_FUNCTIONS_DONE = 'function/LOAD_FUNCTIONS_DONE';
const LOAD_FUNCTIONS_FAIL = 'function/LOAD_FUNCTIONS_FAIL';

const initialState = {
  isLoading: false,
  data: null,
  error: null,
};

export const listFunctions = (
  filters,
  page = 0,
  limit = 25,
  force = false,
) => async (dispatch, getState) => {
  const { isLoading, data } = getState().functions;
  if ((isLoading || data) && !force) {
    return;
  }

  dispatch({ type: LOAD_FUNCTIONS_INIT });
  try {
    const response = await list(filters, page, limit);
    dispatch({ type: LOAD_FUNCTIONS_DONE, payload: { response } });
  } catch (e) {
    dispatch({ type: LOAD_FUNCTIONS_FAIL, payload: { error: e.responseJson } });
  }
};

export const loadFunction = (functionSlug) => async (dispatch, getState) => {
  const { isLoading, data } = getState().functions[functionSlug] || {};

  if (isLoading || data) {
    return;
  }

  dispatch({ type: LOAD_FUNCTION_INIT, payload: functionSlug });
  try {
    const response = await show(functionSlug);
    dispatch({ type: LOAD_FUNCTION_DONE, payload: { functionSlug, response } });
  } catch (e) {
    dispatch(setToast({ type: 'error', message: e.message }));
    dispatch({ type: LOAD_FUNCTION_FAIL, payload: { functionSlug, error: e.message } });
  }
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case LOAD_FUNCTION_INIT:
      return { ...initialState, [payload]: { isLoading: true } };
    case LOAD_FUNCTION_DONE:
      return { ...state, isLoading: false, [payload.functionSlug]: { data: payload.response } };
    case LOAD_FUNCTION_FAIL:
      return { ...state, isLoading: false, [payload.functionSlug]: { error: payload.error } };
    case LOAD_FUNCTIONS_INIT:
      return { ...initialState, isLoading: true };
    case LOAD_FUNCTIONS_DONE:
      return { ...state, isLoading: false, data: payload.response };
    case LOAD_FUNCTIONS_FAIL:
      return { ...state, isLoading: false, error: payload.error };
    default:
      return { ...state };
  }
}
