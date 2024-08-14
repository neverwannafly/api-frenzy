import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography, Container, Grid, Paper,
  Box, Card, CardContent, CardActions, Button,
  List, ListItem, ListItemText, ListItemIcon,
  Tabs, Tab,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  AddCircleOutline as AddIcon,
  FunctionsTwoTone as FunctionsIcon,
  WorkTwoTone as JobsIcon,
  ComputerTwoTone as WorkspaceIcon,
  MemoryTwoTone as CPUIcon,
  StorageTwoTone as StorageIcon,
  TimerTwoTone as InvocationsIcon,
  AttachMoneyTwoTone as BillingIcon,
} from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
}));

function ActionCard({
  title, description, icon, action,
}) {
  const navigate = useNavigate();

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          {icon}
          <Typography variant="h6" component="div" ml={1}>
            {title}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" startIcon={<AddIcon />} onClick={() => navigate(action)}>
          Create New
        </Button>
      </CardActions>
    </Card>
  );
}

function StatItem({ icon, primary, secondary }) {
  return (
    <ListItem>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={primary} secondary={secondary} />
    </ListItem>
  );
}

function Dashboard() {
  const [currentTab, setCurrentTab] = useState(0);

  const actionCards = [
    {
      id: 1,
      title: 'Functions',
      description: 'Create and manage your serverless functions',
      icon: <FunctionsIcon fontSize="large" color="primary" />,
      action: '/functions/new',
    },
    {
      id: 2,
      title: 'Jobs',
      description: 'Set up and monitor background tasks',
      icon: <JobsIcon fontSize="large" color="primary" />,
      action: '/jobs/new',
    },
    {
      id: 3,
      title: 'Workspaces',
      description: 'Manage your development environments',
      icon: <WorkspaceIcon fontSize="large" color="primary" />,
      action: '/workspaces/new',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <StyledPaper>
            <Typography variant="h5" gutterBottom>Quick Actions</Typography>
            <Grid container spacing={3}>
              {actionCards.map((card) => (
                <Grid item xs={12} sm={6} md={4} key={card.id}>
                  <ActionCard {...card} />
                </Grid>
              ))}
            </Grid>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <Typography variant="h5" gutterBottom>Account Overview</Typography>
            <List>
              <StatItem
                icon={<CPUIcon color="primary" />}
                primary="CPU Usage"
                secondary="65%"
              />
              <StatItem
                icon={<StorageIcon color="primary" />}
                primary="Storage Used"
                secondary="2.3 GB"
              />
              <StatItem
                icon={<InvocationsIcon color="primary" />}
                primary="Total Invocations"
                secondary="1,234"
              />
              <StatItem
                icon={<BillingIcon color="primary" />}
                primary="Current Bill"
                secondary="$12.34"
              />
            </List>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} sx={{ mt: 5, mb: 5 }}>
          <StyledPaper>
            <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)}>
              <Tab label="Functions" icon={<FunctionsIcon />} iconPosition="start" />
              <Tab label="Background Jobs" icon={<JobsIcon />} iconPosition="start" />
              <Tab label="Workspaces" icon={<WorkspaceIcon />} iconPosition="start" />
            </Tabs>
            <Box mt={3}>
              {currentTab === 0 && (
              <Typography variant="body1">
                Function details and management interface goes here.
              </Typography>
              )}
              {currentTab === 1 && (
              <Typography variant="body1">
                Background job details and management interface goes here.
              </Typography>
              )}
              {currentTab === 2 && (
              <Typography variant="body1">
                Workspace details and management interface goes here.
              </Typography>
              )}
            </Box>
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
