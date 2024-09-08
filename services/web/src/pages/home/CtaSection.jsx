import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Box, Typography, Button, Container, useTheme, useMediaQuery,
} from '@mui/material';

import { setForm } from '@app/store/forms';

function CTASection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const showAuthForm = () => {
    dispatch(setForm({ form: 'auth' }));
  };

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.primary',
        py: { xs: 3, md: 5 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h2"
            component="h2"
            fontWeight="bold"
            sx={{
              mb: 3,
              color: 'primary.main',
            }}
          >
            Revolutionize Your API Workflow
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 6,
              maxWidth: '800px',
              lineHeight: 1.6,
              color: 'text.secondary',
            }}
          >
            Join thousands of developers who are transforming the way they build,&nbsp;
            share, and monetize APIs. Unleash your creativity with API Frenzy.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: 3,
            }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                fontWeight: 'bold',
                fontSize: '1.1rem',
                py: 1.5,
                px: 4,
                borderRadius: '4px',
                textTransform: 'none',
              }}
              onClick={showAuthForm}
            >
              Start Building for Free
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default CTASection;
