import React from 'react';
import {
  Box, Container, Grid, Typography, Card, CardContent, CardMedia, useTheme, useMediaQuery,
} from '@mui/material';
import {
  Code, Share, Schedule, Whatshot, Security, Extension,
} from '@mui/icons-material';

const featureData = [
  {
    title: 'Create & Share APIs',
    description: 'Develop your functions and share them with the global developer community. Showcase your innovation and creativity.',
    icon: Code,
    color: '#2196F3', // Blue
  },
  {
    title: 'Easy Integration',
    description: 'Seamlessly integrate APIs into your projects with our user-friendly interface and comprehensive documentation.',
    icon: Share,
    color: '#2196F3', // Green
  },
  {
    title: 'Advanced Scheduling',
    description: 'Schedule functions and create complex pipelines to automate your workflows and increase productivity.',
    icon: Schedule,
    color: '#2196F3', // Amber
  },
  {
    title: 'Trending APIs',
    description: 'Discover and utilize the most popular and innovative APIs from our ever-growing marketplace.',
    icon: Whatshot,
    color: '#2196F3', // Pink
  },
  {
    title: 'Secure Invocation',
    description: 'Rest easy knowing that all API invocations are secured with industry-standard encryption and authentication.',
    icon: Security,
    color: '#2196F3', // Purple
  },
  {
    title: 'Multiple Runtimes',
    description: 'Support for various programming languages and runtimes, allowing you to use the tools you love.',
    icon: Extension,
    color: '#2196F3', // Deep Orange
  },
];

function FeatureCard({
  title, description, icon: Icon, color,
}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card sx={{
      height: '100%', display: 'flex', flexDirection: 'column', transition: '0.3s', '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 },
    }}
    >
      <CardMedia
        sx={{
          pt: 2,
          pb: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: `${color}22`, // Using the color with 22 opacity for a light background
        }}
      >
        <Icon sx={{ fontSize: 60, color }} />
      </CardMedia>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant={isSmallScreen ? 'h6' : 'h5'} component="h2" align="center">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

function FeaturesSection() {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography variant="h2" align="left" color="text.primary" gutterBottom sx={{ fontWeight: 500 }}>
          Powerful Features
        </Typography>
        <Typography variant="h5" align="left" color="text.secondary" paragraph>
          Discover what makes API Frenzy the ultimate platform for API creation and management
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {featureData.map((feature) => (
            <Grid item key={feature.title} xs={12} sm={6} md={4}>
              <FeatureCard {...feature} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default FeaturesSection;
