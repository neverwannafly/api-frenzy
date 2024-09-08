import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import Menu from './Menu';

const LOGGEDIN_TABS = [
  { id: 1, label: 'Functions', url: '/functions' },
  { id: 2, label: 'Jobs', url: '/jobs' },
];

const LOGGEDOUT_TABS = [
  { id: 1, label: 'Pricing', url: '#pricing' },
  { id: 2, label: 'Features', url: '#features' },
];

function Header() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {
    isLoggedin,
  } = useSelector((state) => state.user);
  const handleClick = (url) => () => {
    navigate(url);
  };

  return (
    <Box sx={{ zIndex: 101 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { sm: 'block' } }}
          >
            <div
              className="pointer"
              role="presentation"
              onClick={() => (isLoggedin ? navigate('/dashboard') : navigate('/'))}
            >
              API Frenzy
            </div>
          </Typography>
          {!isMobile && isLoggedin && (
            LOGGEDIN_TABS.map(({ id, label, url }) => (
              <Button key={id} color="inherit" onClick={handleClick(url)}>{label}</Button>
            ))
          )}
          {!isMobile && !isLoggedin && (
            LOGGEDOUT_TABS.map(({ id, label, url }) => (
              <Button key={id} color="inherit" onClick={handleClick(url)}>{label}</Button>
            ))
          )}
          <Menu />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
