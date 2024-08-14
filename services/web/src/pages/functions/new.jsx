import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Select,
  MenuItem,
  Button,
  Paper,
  Typography,
  Alert,
  Divider,
  CircularProgress,
  FormControl,
  InputLabel,
} from '@mui/material';

import { loadRuntimes } from '@app/store/runtimes';
import { create as createFunction } from '@app/api/functions';
import { setToast } from '@app/store/toast';

function AddFunctionPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, data } = useSelector((state) => state.runtimes);

  useEffect(() => {
    dispatch(loadRuntimes());
  }, [dispatch]);

  const [functionName, setFunctionName] = useState('');
  const [description, setDescription] = useState('');
  const [runtime, setRuntime] = useState('');

  useEffect(() => {
    if (data) {
      setRuntime(data[0].id);
    }
  }, [data]);

  const handleSubmit = async () => {
    const payload = {
      name: functionName,
      description,
      runtime_id: runtime,
    };
    const response = await createFunction(payload);
    if (response.success) {
      const { data: { data: { attributes: { slug } } } } = response;
      navigate(`/functions/${slug}/edit`);
    } else {
      dispatch(setToast({
        message: response.error,
        type: 'error',
      }));
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
        <Typography variant="h4" gutterBottom align="center">
          Add New Function
        </Typography>

        <Alert severity="info">
          You&apos;ll be able to configure code and other settings once you create the function
        </Alert>

        <Divider sx={{ my: 2 }} />

        <TextField
          fullWidth
          label="Function Name"
          variant="outlined"
          value={functionName}
          onChange={(e) => setFunctionName(e.target.value)}
          style={{ marginBottom: '1rem' }}
        />
        <TextField
          fullWidth
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginBottom: '1rem' }}
        />
        {isLoading ? (
          <CircularProgress
            color="secondary"
            sx={{ marginRight: 'auto', marginLeft: 'auto', display: 'block' }}
          />
        ) : (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Runtime</InputLabel>
            <Select
              value={runtime}
              label="Runtime"
              onChange={(e) => setRuntime(e.target.value)}
            >
              {data?.map(({ id, attributes }) => (
                <MenuItem key={id} value={id}>{attributes.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Create Function
        </Button>
      </Paper>
    </Container>
  );
}

export default AddFunctionPage;
