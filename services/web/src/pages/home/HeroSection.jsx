import React from 'react';
import { useDispatch } from 'react-redux';

import {
  Box, Button, Container, Typography, Grid,
} from '@mui/material';
import { styled } from '@mui/system';
import { CodeRounded, CloudUploadRounded, SpeedRounded } from '@mui/icons-material';

import { setForm } from '@app/store/forms';

const HeroBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  position: 'relative',
  padding: theme.spacing(8, 0, 6),
  // backgroundImage: 'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)',
  overflow: 'hidden',
}));

const CircleDecoration = styled(Box)(() => ({
  position: 'absolute',
  borderRadius: '50%',
  background: 'rgba(255, 255, 255, 0.1)',
}));

const FeatureItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

function HeroSection() {
  const dispatch = useDispatch();
  const showAuthForm = () => {
    dispatch(setForm({ form: 'auth' }));
  };

  return (
    <HeroBox>
      <CircleDecoration sx={{
        width: 300, height: 300, top: -100, left: -100,
      }}
      />
      <CircleDecoration sx={{
        width: 200, height: 200, bottom: -50, right: -50,
      }}
      />
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              component="h1"
              variant="h2"
              color="text.primary"
              gutterBottom
              sx={{ fontWeight: 500, textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}
            >
              Unleash the Power of APIs
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              Create, share, and monetize your APIs on the ultimate marketplace.
              Join the API revolution and transform the way we build software.
            </Typography>
            <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: 'primary.main',
                  '&:hover': { backgroundColor: 'primary.dark' },
                  boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
                }}
                onClick={showAuthForm}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  '&:hover': { borderColor: 'primary.dark', color: 'primary.dark' },
                }}
              >
                Learn More
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{
              p: 4, backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 4, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            }}
            >
              <FeatureItem>
                <CodeRounded sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Box>
                  <Typography variant="h6" gutterBottom>Easy Integration</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Seamlessly integrate APIs into your projects with our intuitive platform.
                  </Typography>
                </Box>
              </FeatureItem>
              <FeatureItem>
                <CloudUploadRounded sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Box>
                  <Typography variant="h6" gutterBottom>Instant Deployment</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Deploy your APIs with a single click and scale effortlessly.
                  </Typography>
                </Box>
              </FeatureItem>
              <FeatureItem>
                <SpeedRounded sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Box>
                  <Typography variant="h6" gutterBottom>Lightning Fast</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Experience unparalleled speed with our optimized infrastructure.
                  </Typography>
                </Box>
              </FeatureItem>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </HeroBox>
  );
}

export default HeroSection;
