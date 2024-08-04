import React from 'react';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Box,
} from '@mui/material';
import {
  Code as CodeIcon,
  Schedule as ScheduleIcon,
  Storage as StorageIcon,
  Timeline as TimelineIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  GitHub as GitHubIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
} from '@mui/icons-material';

import AuthSidePanel from '@app/components/AuthDrawer';

function LandingPage() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            API Frenzy
          </Typography>
          <Button color="inherit">Features</Button>
          <Button color="inherit">Pricing</Button>
          <Button color="inherit">Documentation</Button>
          <Button color="inherit">Contact</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to API Frenzy
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Empower Your Development with Simplified API Management
          </Typography>
          <Button variant="contained" size="large" sx={{ mt: 2 }}>
            Get Started
          </Button>
        </Box>

        {/* Features Section */}
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h3" gutterBottom>
            Features
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <CodeIcon fontSize="large" color="primary" />
                  <Typography variant="h6" component="h4">
                    Function Invocation through URLs
                  </Typography>
                  <Typography variant="body1">
                    Define and execute your API functions with simple URL requests.
                    Our intuitive web interface allows you to create, manage,
                    and deploy your APIs effortlessly.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <ScheduleIcon fontSize="large" color="primary" />
                  <Typography variant="h6" component="h4">
                    Automated Background Jobs
                  </Typography>
                  <Typography variant="body1">
                    Schedule and manage background tasks with ease.
                    Set up cron jobs or trigger executions via URL, giving you full
                    control over your application&apos;s backend processes.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <StorageIcon fontSize="large" color="primary" />
                  <Typography variant="h6" component="h4">
                    Self Workspace with Port Exposing
                  </Typography>
                  <Typography variant="body1">
                    Get your own persistent development environment.
                    Expose ports for testing and integration, making it easier than ever
                    to develop and debug your applications.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <TimelineIcon fontSize="large" color="primary" />
                  <Typography variant="h6" component="h4">
                    Premade Templates
                  </Typography>
                  <Typography variant="body1">
                    Jumpstart your development with our collection of premade
                    templates. Easily set up databases, Redis instances,
                    and other common infrastructure components.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Why Choose Us Section */}
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h3" gutterBottom>
            Why Choose API Frenzy?
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircleOutlineIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Beginner-Friendly"
                secondary="Our platform is designed to be intuitive and easy to use, even for those new to API development."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleOutlineIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Cost-Effective"
                secondary="Enjoy powerful features at a fraction of the cost compared to AWS Lambda and other enterprise solutions."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleOutlineIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Versatile Runtimes"
                secondary="Choose from a variety of programming languages and runtimes to suit your project needs."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleOutlineIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Scalable Infrastructure"
                secondary="Our platform grows with your needs, ensuring your applications perform optimally at any scale."
              />
            </ListItem>
          </List>
        </Box>

        {/* Pricing Section */}
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h3" gutterBottom>
            Pricing
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h4" gutterBottom>
                    Basic
                  </Typography>
                  <Typography variant="h4" component="p" gutterBottom>
                    $9.99/month
                  </Typography>
                  <Typography variant="body1">
                    • 100,000 function invocations
                    • 10 GB bandwidth
                    • 5 concurrent executions
                    • Community support
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="outlined">Choose Plan</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h4" gutterBottom>
                    Pro
                  </Typography>
                  <Typography variant="h4" component="p" gutterBottom>
                    $29.99/month
                  </Typography>
                  <Typography variant="body1">
                    • 500,000 function invocations
                    • 50 GB bandwidth
                    • 20 concurrent executions
                    • Priority support
                    • Custom domains
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained">Choose Plan</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h4" gutterBottom>
                    Enterprise
                  </Typography>
                  <Typography variant="h4" component="p" gutterBottom>
                    Custom Pricing
                  </Typography>
                  <Typography variant="body1">
                    • Unlimited function invocations
                    • Unlimited bandwidth
                    • Dedicated support
                    • Custom integrations
                    • SLA guarantees
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="outlined">Contact Us</Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Call to Action */}
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h3" gutterBottom>
            Ready to Revolutionize Your API Development?
          </Typography>
          <Button variant="contained" size="large" sx={{ mt: 2 }}>
            Sign Up Now
          </Button>
        </Box>
      </Container>

      {/* Footer */}
      <Box bgcolor="primary.dark" sx={{ color: 'white', py: 4, mt: 8 }}>
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
        </Container>
      </Box>
      <AuthSidePanel open />
    </Box>
  );
}

export default LandingPage;
