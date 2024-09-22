import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function withLogout(Component) {
  return function (props) {
    const { isLoggedin } = useSelector((state) => state.user);
    const { location } = props;
    const navigate = useNavigate();

    useEffect(() => {
      if (isLoggedin) {
        navigate('/dashboard', { state: { from: location } });
      }
    }, [location, navigate, isLoggedin]);

    return <Component {...props} />;
  };
}

export default withLogout;
