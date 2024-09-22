import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ListView from '@app/pages/functions/components/ListView';
import { listFunctions } from '@app/store/functions';

import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
  Card,
  CardContent,
  CardActions,
  List,
  Button,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  TrendingUp,
  AccessTime,
  Code,
  Speed,
  AddCircleOutline as AddIcon,
  FunctionsTwoTone as FunctionsIcon,
  WorkTwoTone as JobsIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Mock data for charts and metrics
const apiCallsData = [
  { name: 'Mon', calls: 4000 },
  { name: 'Tue', calls: 3000 },
  { name: 'Wed', calls: 2000 },
  { name: 'Thu', calls: 2780 },
  { name: 'Fri', calls: 1890 },
  { name: 'Sat', calls: 2390 },
  { name: 'Sun', calls: 3490 },
];

const apiUsageData = [
  { name: 'API 1', value: 400 },
  { name: 'API 2', value: 300 },
  { name: 'API 3', value: 300 },
  { name: 'API 4', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const recentActivity = [
  { id: 1, action: 'Created new API: User Authentication', time: '2 hours ago' },
  { id: 2, action: 'Updated API: Payment Gateway', time: '5 hours ago' },
  { id: 3, action: 'Deleted API: Test Endpoint', time: '1 day ago' },
  { id: 4, action: 'Added new collaborator to: Data Analytics API', time: '2 days ago' },
];

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
];

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
}));

function ComingSoonOverlay({ children }) {
  return (
    <Box position="relative" display="inline-block">
      {children}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        sx={{
          background: 'rgba(255, 255, 255, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
          backdropFilter: 'blur(1.5px)',
          borderRadius: '12px',
        }}
      >
        <Typography
          variant="h3"
          color="rgba(0, 0, 0, 0.7)"
          fontWeight="700"
          sx={{
            textTransform: 'capitalize',
            letterSpacing: '1px',
            textShadow: '1px 1px 8px rgba(255, 255, 255, 0.8)',
          }}
        >
          Coming Soon
        </Typography>
      </Box>
    </Box>
  );
}

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

function MetricCard({ title, value, icon }) {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {icon}
          <Typography variant="h6" component="div" sx={{ ml: 1 }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" component="div" color="primary">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

function Dashboard() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const filters = [];
    filters.push({ type: 'my_functions', value: true });
    dispatch(listFunctions(filters, 0, 5, true));
  }, [dispatch]);

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default', py: 3 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 4 }}>
          Dashboard
        </Typography>
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
        <Divider sx={{ my: 4 }} />
        <div>
          <Typography variant="h5" sx={{ mb: 4 }}>
            My Functions
          </Typography>
          <ListView />
          <Button
            sx={{ mt: 4 }}
            onClick={() => navigate('/functions/')}
            variant="contained"
          >
            Expolore More
          </Button>
        </div>
        <Divider sx={{ my: 4 }} />
        <ComingSoonOverlay>
          <Grid container spacing={3}>
            {/* Metric Cards */}
            <Grid item xs={12} sm={6} md={3}>
              <MetricCard title="Total API Calls" value="28,550" icon={<TrendingUp color="primary" />} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCard title="Avg. Response Time" value="235ms" icon={<AccessTime color="primary" />} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCard title="Active APIs" value="12" icon={<Code color="primary" />} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCard title="Uptime" value="99.99%" icon={<Speed color="primary" />} />
            </Grid>

            {/* API Calls Chart */}
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>API Calls (Last 7 Days)</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={apiCallsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="calls" fill={theme.palette.primary.main} />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* API Usage Pie Chart */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>API Usage Distribution</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={apiUsageData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {apiUsageData.map((entry, index) => (
                        <Cell key={entry} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Recent Activity */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>Recent Activity</Typography>
                <List>
                  {recentActivity.map((activity, index) => (
                    <React.Fragment key={activity.id}>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={activity.action}
                          secondary={activity.time}
                        />
                      </ListItem>
                      {index < recentActivity.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </ComingSoonOverlay>
      </Container>
    </Box>
  );
}

export default Dashboard;
