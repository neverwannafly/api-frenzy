import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Card, CardContent, Typography, Button, Box, Grid,
} from '@mui/material';

import { setForm } from '@app/store/forms';

function PricingCard({
  title, price, features, isComingSoon, isPopular, onClick,
}) {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'visible',
        boxShadow: isPopular
          ? '0 8px 32px rgba(0, 123, 255, 0.1)'
          : '0 4px 16px rgba(0, 0, 0, 0.1)',
        borderRadius: '16px',
        border: isPopular ? '2px solid #0077ff' : 'none',
      }}
    >
      {isPopular && (
      <Box
        sx={{
          position: 'absolute',
          top: '-12px',
          right: '24px',
          backgroundColor: '#0077ff',
          color: 'white',
          padding: '4px 12px',
          borderRadius: '12px',
          fontSize: '0.75rem',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
      >
        Most Popular
      </Box>
      )}
      <CardContent sx={{ flexGrow: 1, p: 4 }}>
        <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h3" component="span" fontWeight="bold">
            $
            {price}
          </Typography>
          <Typography variant="h6" component="span" color="text.secondary">
            /mo
          </Typography>
        </Box>
        <Box sx={{ mb: 3 }}>
          {features.map((feature) => (
            <Box key={feature} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box
                component="span"
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  backgroundColor: '#e6f3ff',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                }}
              >
                <Typography color="#0077ff" fontSize="0.8rem">✓</Typography>
              </Box>
              <Typography variant="body1">{feature}</Typography>
            </Box>
          ))}
        </Box>
        <Button
          variant={isPopular ? 'contained' : 'outlined'}
          color={isPopular ? 'primary' : 'inherit'}
          size="large"
          fullWidth
          sx={{
            mt: 'auto',
            py: 1.5,
            borderRadius: '8px',
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 'bold',
            opacity: isComingSoon ? 0.7 : 1,
          }}
          disabled={isComingSoon}
          onClick={onClick}
        >
          {isComingSoon ? 'Coming Soon' : 'Get Started'}
        </Button>
      </CardContent>
    </Card>
  );
}

function PricingSection() {
  const tiers = [
    {
      title: 'Free',
      price: '0',
      features: [
        '1000 API calls per month',
        '5 functions',
        '1 function scheduling',
        '1 pipeline',
        'Basic analytics',
        'Community support',
      ],
      isComingSoon: false,
      isPopular: true,
    }, {
      title: 'Hobbyist',
      price: '29',
      features: [
        '10000 API calls',
        '50 functions',
        '10 function scheduling',
        '10 pipelines',
        'Advanced analytics',
        'Priority support',
      ],
      isComingSoon: true,
      isPopular: false,
    }, {
      title: 'Professional',
      price: '79',
      features: [
        'Unlimited API calls',
        '500 functions',
        '300 function scheduling',
        'Advanced analytics',
        'Dedicated support',
      ],
      isComingSoon: true,
      isPopular: false,
    },
  ];

  const dispatch = useDispatch();
  const showAuthForm = () => {
    dispatch(setForm({ form: 'auth' }));
  };

  return (
    <Box sx={{ py: 5, px: 2 }}>
      <Typography
        variant="h2"
        align="left"
        sx={{ mb: 2, fontWeight: 500 }}
      >
        Simple, Transparent Pricing
      </Typography>
      <Typography variant="h5" align="left" color="text.secondary" sx={{ mb: 6 }}>
        Choose the plan that&apos;s right for you
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {tiers.map((tier) => (
          <Grid
            item
            key={tier.title}
            xs={12}
            sm={6}
            md={4}
          >
            <PricingCard {...tier} onClick={showAuthForm} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default PricingSection;
