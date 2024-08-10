import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Divider, Drawer, Typography, useTheme, useMediaQuery,
  Box,
  IconButton,
} from '@mui/material';

import {
  Close as CloseIcon,
} from '@mui/icons-material';

import { unsetForm } from '@app/store/forms';

import SigninForm from './SigninForm';
import SignupForm from './SignupForm';

function AuthForm() {
  const [formType, setFormType] = useState('signin');
  const { auth } = useSelector((state) => state.forms);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => {
    dispatch(unsetForm({ form: 'auth' }));
  };
  const toggleAuthMode = () => {
    setFormType((currFormType) => {
      if (currFormType === 'signin') return 'signup';
      return 'signin';
    });
  };

  return (
    <Drawer
      anchor="right"
      open={auth}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: isMobile ? '100%' : '450px',
          backgroundColor: theme.palette.background.default,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          p: 4,
        }}
      >
        <Box sx={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4,
        }}
        >
          <Typography variant="h4" component="h2" fontWeight="bold">
            {formType === 'signin' ? 'Welcome Back' : 'Join API Frenzy'}
          </Typography>
          <IconButton onClick={handleClose} aria-label="close" sx={{ color: theme.palette.text.secondary }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Typography variant="body1" color="text.secondary" mb={2}>
          {formType === 'signin'
            ? 'Sign in to access your account and unleash the power of API Frenzy.'
            : 'Create an account to start building and managing your APIs with ease.'}
        </Typography>

        {formType === 'signin' && (
          <SigninForm />
        )}
        {formType === 'signup' && (
          <SignupForm />
        )}

        <Divider sx={{ my: 3 }} />

        <Typography variant="body2" color="text.secondary" align="center">
          {formType === 'signin' ? "Don't have an account?" : 'Already have an account?'}
          {' '}
          <Button
            onClick={toggleAuthMode}
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              color: theme.palette.primary.main,
            }}
          >
            {formType === 'signin' ? 'Sign Up' : 'Sign In'}
          </Button>
        </Typography>
      </Box>
    </Drawer>
  );
}

export default AuthForm;
