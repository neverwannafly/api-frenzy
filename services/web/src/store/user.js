import userApi from '@app/api/user';

const SET_USER = 'user/SET_USER';
const UNSET_USER = 'user/UNSET_USER';

const initialState = {
  isLoggedin: false,
  username: '',
  name: '',
};

export const setUser = (payload) => (dispatch) => {
  dispatch({ type: SET_USER, payload });
};

export const unsetUser = () => (dispatch) => {
  userApi.logout();
  dispatch({ type: UNSET_USER });
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case SET_USER:
      return { ...state, isLoggedin: true, ...payload };
    case UNSET_USER:
      return { isLoggedin: false, username: '', name: '' };
    default:
      return { ...state };
  }
}
