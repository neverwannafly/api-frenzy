import { unsetUser } from '@app/store/user';
import { deleteAuthToken } from '@app/lib/auth';

// eslint-disable-next-line import/prefer-default-export
export const MENU_ITEMS = [{
  label: 'Profile',
  onClick: ({ navigate }) => {
    navigate('/profile');
  },
},
{
  label: 'Logout',
  onClick: ({ navigate, dispatch }) => {
    dispatch(unsetUser());
    deleteAuthToken();
    navigate('/');
  },
}];
