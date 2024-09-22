import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Chip,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import {
  Refresh,
  Edit,
  Delete,
} from '@mui/icons-material';

import EmptyList from '@app/components/EmptyList';
import Loader from '@app/components/Loader';

const formatDate = (timestamp) => {
  const date = new Date(timestamp);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return date.toLocaleString(undefined, options);
};

function extractDetails({ data, included }) {
  return data.map((row) => {
    const {
      attributes: {
        name,
        status,
        visibility,
        slug,
        updated_at: updatedAt,
      },
      relationships,
    } = row;

    const associatedRuntime = relationships.runtime.data;
    const runtime = included.filter((rn) => (
      rn.id === associatedRuntime.id && rn.type === associatedRuntime.type
    ))[0].attributes.name;

    return {
      name, status, visibility, slug, updatedAt: formatDate(updatedAt), runtime,
    };
  });
}

function ListView() {
  const theme = useTheme();
  const { isLoading, data } = useSelector((state) => state.functions);
  const navigate = useNavigate();

  if (isLoading) {
    return <Loader />;
  }

  if (!data?.data?.length || data?.data?.length === 0) {
    return <EmptyList />;
  }

  return (
    <Grid item xs={12}>
      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: '12px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="functions table">
          <TableHead>
            <TableRow>
              <TableCell>Function Name</TableCell>
              <TableCell align="right">Runtime</TableCell>
              <TableCell align="right">Invocations</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Last Updated</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {extractDetails(data).map(({
              name, status, slug, updatedAt, runtime,
            }) => (
              <TableRow
                key={slug}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                    '& .row-actions': { opacity: 1 },
                  },
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/functions/${slug}/`)}
                >
                  {name}
                </TableCell>
                <TableCell align="right">{runtime}</TableCell>
                <TableCell align="right">N/A</TableCell>
                <TableCell align="right">
                  <Chip
                    label={status}
                    color={status === 'active' ? 'success' : 'warning'}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">{updatedAt}</TableCell>
                <TableCell align="right">
                  <Box
                    className="row-actions"
                    sx={{
                      opacity: 0,
                      transition: 'opacity 0.2s',
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <IconButton size="small">
                      <Edit fontSize="small" onClick={() => navigate(`/functions/${slug}/edit/`)} />
                    </IconButton>
                    <IconButton size="small" disabled>
                      <Delete fontSize="small" />
                    </IconButton>
                    <IconButton size="small" disabled>
                      <Refresh fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default ListView;
