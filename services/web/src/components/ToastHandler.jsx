import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import { unsetToast } from '@app/store/toast';

function ToastHandler() {
  const dispatch = useDispatch();
  const { message, type, open } = useSelector((state) => state.toast);

  const handleClose = useCallback(() => {
    dispatch(unsetToast());
  }, [dispatch]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <MuiAlert
        elevation={6}
        onClose={handleClose}
        severity={type}
        sx={{ width: '100%' }}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
}

export default ToastHandler;
