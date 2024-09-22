import React from 'react';

import {
  Container,
  Box,
  Divider,
} from '@mui/material';
import withLogout from '@app/hoc/withLogout';

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
    </Box>
  );
}

export default withLogout(LandingPage);
