import React from 'react';
import {
  Container, Typography, Button, Box,
} from '@mui/material';
import { SearchOff } from '@mui/icons-material'; // MUI icon for no results

function EmptyList({ onRetry }) {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: 2,
        mt: 4,
      }}
    >
      <Box sx={{
        mb: 2,
        p: 3,
        borderRadius: '50%',
        backgroundColor: '#e8eaf6', // Light background color
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 120,
        height: 120,
      }}
      >
        <SearchOff sx={{ fontSize: 80, color: '#1976d2' }} />
        {' '}
        {/* Purple color */}
      </Box>
      <Typography variant="h4" component="h1" gutterBottom>
        No Results Found
      </Typography>
      <Typography variant="body1" component="p" gutterBottom>
        We couldn&apos;t find any results matching your search.&nbsp;
        Try adjusting your filters or search criteria.
      </Typography>
      {onRetry && (
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={onRetry} // Call a retry function if provided
        >
          Retry
        </Button>
      )}
    </Container>
  );
}

export default EmptyList;
