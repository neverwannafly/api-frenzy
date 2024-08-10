import React from 'react';

import {
  Typography,
  Container,
  Grid,
  IconButton,
  Divider,
  Box,
  useTheme,
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
} from '@mui/icons-material';

function Footer() {
  const theme = useTheme();

  return (
    <Box sx={{
      py: 4,
      mt: 8,
      bgcolor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>API Frenzy</Typography>
            <Typography variant="body2">Empowering developers with simple, powerful API management solutions.</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Quick Links</Typography>
            <Typography variant="body2" component="div">
              <Box component="span" sx={{ display: 'block', mb: 1 }}>Documentation</Box>
              <Box component="span" sx={{ display: 'block', mb: 1 }}>Pricing</Box>
              <Box component="span" sx={{ display: 'block', mb: 1 }}>Blog</Box>
              <Box component="span" sx={{ display: 'block' }}>Contact Us</Box>
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Connect With Us</Typography>
            <IconButton color="inherit"><GitHubIcon /></IconButton>
            <IconButton color="inherit"><TwitterIcon /></IconButton>
            <IconButton color="inherit"><LinkedInIcon /></IconButton>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3, bgcolor: 'rgba(255,255,255,0.2)' }} />
        <Typography variant="body2" align="center">
          ©
          {' '}
          {new Date().getFullYear()}
          {' '}
          API Frenzy. All rights reserved.
        </Typography>
        <Typography variant="body2" align="center">
          Made by
          {' '}
          Shubham Anand ^.^
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
