import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setForm } from '@app/store/forms';

function withLogin(Component) {
  return function (props) {
    const { isLoggedin, isSet } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
      if (isSet && !isLoggedin) {
        dispatch(setForm({ form: 'auth' }));
      }
    }, [dispatch, isLoggedin, isSet]);

    return <Component {...props} />;
  };
}

export default withLogin;
