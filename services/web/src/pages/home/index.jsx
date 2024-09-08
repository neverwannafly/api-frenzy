import React from 'react';

import {
  Container,
  Box,
  Divider,
} from '@mui/material';
import AuthForm from '@app/components/auth';

import HeroSection from './HeroSection';
import FeaturesSection from './FeatureSection';
import PricingSection from './PricingSection';
import CTASection from './CtaSection';

function LandingPage() {
  return (
    <Box>
      <Container maxWidth="lg">
        <HeroSection />
        <Divider />
        <FeaturesSection />
        <Divider />
        <PricingSection />
        <Divider />
        <CTASection />
      </Container>
      <AuthForm />
    </Box>
  );
}

export default LandingPage;
