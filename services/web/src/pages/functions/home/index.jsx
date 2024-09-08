import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  debounce,
  useTheme,
} from '@mui/material';
import {
  Add,
  Search,
  TrendingUp,
  Code,
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { listFunctions } from '@app/store/functions';
import ListView from './ListView';
import { useNavigate } from 'react-router-dom';

function FunctionsDashboard() {
  const theme = useTheme();
  const [selectedFilter, setSelectedFilter] = useState('trending');
  const [searchText, setSearchtext] = useState('');
  const [page] = useState(0);

  const dispatch = useDispatch();

  const debouncedSetSearchText = useCallback(debounce((value) => setSearchtext(value), 300), []);
  const navigate = useNavigate();

  useEffect(() => {
    const filters = [];
    filters.push({ type: selectedFilter, value: true });
    if (searchText.length > 0) {
      filters.push({ type: 'keyword_search', value: searchText });
    }
    dispatch(listFunctions(filters, page, 25, true));
  }, [dispatch, searchText, page, selectedFilter]);

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default', py: 3 }}>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'flex-start', md: 'center' },
            }}
          >
            <Typography variant="h4" fontWeight="bold">Functions Dashboard</Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              size="large"
              sx={{
                borderRadius: '20px',
                px: 3,
                py: 1,
                my: { xs: 2, md: 0 },
                boxShadow: theme.shadows[4],
              }}
              onClick={() => navigate('/functions/new/')}
            >
              Create Function
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: 2,
                borderRadius: '12px',
              }}
            >
              <Chip
                icon={<TrendingUp />}
                label="Trending"
                clickable
                color={selectedFilter === 'trending' ? 'primary' : 'default'}
                onClick={() => setSelectedFilter('trending')}
              />
              <Chip
                icon={<Code />}
                label="My Functions"
                clickable
                color={selectedFilter === 'my_functions' ? 'primary' : 'default'}
                onClick={() => setSelectedFilter('my_functions')}
              />

              <TextField
                variant="outlined"
                size="small"
                placeholder="Search functions..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  flexGrow: 1,
                  maxWidth: { md: '400px', sx: '100%' },
                  marginLeft: { md: 'auto', sx: null },
                }}
                onChange={(e) => debouncedSetSearchText(e.target.value)}
              />
            </Paper>
          </Grid>

          <ListView />
        </Grid>
      </Container>
    </Box>
  );
}

export default FunctionsDashboard;
