import { list } from '@app/api/runtimes';

const LOAD_RUNTIME_INIT = 'runtime/LOAD_RUNTIME_INIT';
const LOAD_RUNTIME_DONE = 'runtime/LOAD_RUNTIME_DONE';
const LOAD_RUNTIME_FAIL = 'runtime/LOAD_RUNTIME_FAIL';

const initialState = {
  isLoading: false,
  data: null,
  error: null,
};

export const loadRuntimes = () => async (dispatch, getState) => {
  const { isLoading, data } = getState().runtimes;

  if (isLoading || data) {
    return;
  }

  dispatch({ type: LOAD_RUNTIME_INIT });
  try {
    const response = await list();
    dispatch({ type: LOAD_RUNTIME_DONE, payload: response });
  } catch (e) {
    dispatch({ type: LOAD_RUNTIME_FAIL, payload: e.responseJson });
  }
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case LOAD_RUNTIME_INIT:
      return { ...initialState, isLoading: true };
    case LOAD_RUNTIME_DONE:
      return { ...state, isLoading: false, data: payload.data };
    case LOAD_RUNTIME_FAIL:
      return { ...state, isLoading: false, data: payload };
    default:
      return { ...state };
  }
}
