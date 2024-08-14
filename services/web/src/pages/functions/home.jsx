import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
} from 'recharts';
import { useNavigate } from 'react-router-dom';

import {
  Box, Typography, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, Chip, IconButton, Menu, MenuItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  PlayArrow as PlayIcon,
  Stop as StopIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  backgroundColor: status === 'Active' ? theme.palette.success.main : theme.palette.error.main,
  color: theme.palette.common.white,
}));

function FunctionsDashboard() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFunction, setSelectedFunction] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event, func) => {
    setAnchorEl(event.currentTarget);
    setSelectedFunction(func);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedFunction(null);
  };

  const mockFunctions = [
    {
      id: 1, name: 'Data Processing', runtime: 'Node.js 14.x', status: 'Active', lastInvoked: '2 minutes ago', invocations: 1234, errors: 12, avgDuration: 234,
    },
    {
      id: 2, name: 'Image Resizing', runtime: 'Python 3.9', status: 'Inactive', lastInvoked: '1 hour ago', invocations: 567, errors: 3, avgDuration: 456,
    },
    {
      id: 3, name: 'User Authentication', runtime: 'Java 11', status: 'Active', lastInvoked: '5 minutes ago', invocations: 8901, errors: 45, avgDuration: 123,
    },
  ];

  const chartData = [
    { name: 'Data Processing', invocations: 1234, errors: 12 },
    { name: 'Image Resizing', invocations: 567, errors: 3 },
    { name: 'User Authentication', invocations: 8901, errors: 45 },
  ];

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', mt: 4 }}>
      <Box sx={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3,
      }}
      >
        <Typography variant="h4">Functions Dashboard</Typography>
        <Box>
          <Button variant="contained" startIcon={<RefreshIcon />} sx={{ mr: 2 }}>
            Refresh
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => navigate('/functions/new')}
          >
            Create Function
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>Function Overview</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Runtime</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Last Invoked</TableCell>
                    <TableCell>Invocations</TableCell>
                    <TableCell>Errors</TableCell>
                    <TableCell>Avg. Duration</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockFunctions.map((func) => (
                    <TableRow key={func.id}>
                      <TableCell>{func.name}</TableCell>
                      <TableCell>{func.runtime}</TableCell>
                      <TableCell>
                        <StatusChip label={func.status} status={func.status} />
                      </TableCell>
                      <TableCell>{func.lastInvoked}</TableCell>
                      <TableCell>{func.invocations.toLocaleString()}</TableCell>
                      <TableCell>{func.errors}</TableCell>
                      <TableCell>
                        {func.avgDuration}
                        {' '}
                        ms
                      </TableCell>
                      <TableCell>
                        <IconButton size="small" onClick={(event) => handleMenuOpen(event, func)}>
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={8} sx={{ mt: 5 }}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>Invocations Overview</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Bar dataKey="invocations" fill="#8884d8" />
                <Bar dataKey="errors" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={4} sx={{ mt: 5 }}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>Quick Stats</Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1">Total Functions</Typography>
              <Typography variant="h4">{mockFunctions.length}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1">Active Functions</Typography>
              <Typography variant="h4">
                {mockFunctions.filter((f) => f.status === 'Active').length}
                {' '}
                /
                {mockFunctions.length}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1">Total Invocations (24h)</Typography>
              <Typography variant="h4">
                {mockFunctions.reduce((sum, func) => sum + func.invocations, 0).toLocaleString()}
              </Typography>
            </Box>
          </StyledPaper>
        </Grid>
      </Grid>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <PlayIcon fontSize="small" sx={{ mr: 1 }} />
          {' '}
          Invoke
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          {' '}
          Edit
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          {selectedFunction?.status === 'Active' ? (
            <>
              <StopIcon fontSize="small" sx={{ mr: 1 }} />
              {' '}
              Deactivate
            </>
          ) : (
            <>
              <PlayIcon fontSize="small" sx={{ mr: 1 }} />
              {' '}
              Activate
            </>
          )}
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          {' '}
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default FunctionsDashboard;
