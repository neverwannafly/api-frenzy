import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Close as CloseIcon,
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
  Lock as LockIcon,
} from '@mui/icons-material';

function AuthDrawer({ open, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted');
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
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
            {isLogin ? 'Welcome Back' : 'Join API Frenzy'}
          </Typography>
          <IconButton onClick={onClose} aria-label="close" sx={{ color: theme.palette.text.secondary }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Typography variant="body1" color="text.secondary" mb={4}>
          {isLogin
            ? 'Sign in to access your account and unleash the power of API Frenzy.'
            : 'Create an account to start building and managing your APIs with ease.'}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ flexGrow: 1 }}>
          {!isLogin && (
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              variant="outlined"
              sx={{ mb: 3 }}
            />
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus={isLogin}
            variant="outlined"
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            variant="outlined"
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {!isLogin && (
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              variant="outlined"
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{
              mt: 3,
              mb: 2,
              height: 56,
              textTransform: 'none',
              fontSize: '1rem',
            }}
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body2" color="text.secondary" align="center">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          {' '}
          <Button
            onClick={toggleAuthMode}
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              color: theme.palette.primary.main,
            }}
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </Button>
        </Typography>
      </Box>
    </Drawer>
  );
}

export default AuthDrawer;
