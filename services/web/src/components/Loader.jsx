import React from 'react';
import {
  Container, Typography, CircularProgress, Box,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

function Loader() {
  const theme = useTheme();

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        px: 2,
        mt: 4,
      }}
    >
      <Box
        sx={{
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress size={60} color="primary" />
      </Box>
      <Typography variant="h6" component="p" sx={{ color: theme.palette.text.primary }}>
        Loading...
      </Typography>
    </Container>
  );
}

export default Loader;
