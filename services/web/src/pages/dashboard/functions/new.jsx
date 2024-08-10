import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Typography, Paper, Grid, TextField, Select, MenuItem,
  FormControl, InputLabel, Button,
  Slider, Accordion, AccordionSummary, AccordionDetails,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  ExpandMore as ExpandMoreIcon,
  CodeRounded as CodeIcon,
  SettingsRounded as SettingsIcon,
  SecurityRounded as SecurityIcon,
} from '@mui/icons-material';
import Editor from '@monaco-editor/react';

import { loadRuntimes } from '@app/store/runtimes';
import { create as createFunction } from '@app/api/functions';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
}));

function FunctionCreation() {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((state) => state.runtimes);

  useEffect(() => {
    dispatch(loadRuntimes());
  }, [dispatch]);

  const [functionName, setFunctionName] = useState('');
  // const [functionDescription, setFunctionDescription] = useState('');
  const [runtime, setRuntime] = useState(1);
  const [code, setCode] = useState();
  const [memoryAllocation, setMemoryAllocation] = useState(16);
  const [cpuAllocation, setCpuAllocation] = useState(0.2);
  const [timeout, setTimeout] = useState(500);
  const [environment, setEnvironment] = useState([]);

  const handleAddEnvironmentVariable = () => {
    setEnvironment([...environment, { id: Math.random(), key: '', value: '' }]);
  };

  const handleEnvironmentChange = (index, field, value) => {
    const newEnvironment = [...environment];
    newEnvironment[index][field] = value;
    setEnvironment(newEnvironment);
  };

  useEffect(() => {
    if (data) {
      setRuntime(data[0].id);
      setCode(data[0].attributes.placeholder);
    }
  }, [data]);

  const handleSubmit = async () => {
    const payload = {
      name: functionName,
      description: '',
      limits: { memory: memoryAllocation, cpu: cpuAllocation, timeout },
      env_vars: environment,
      runtime_id: runtime,
      code,
    };
    const response = await createFunction(payload);
    console.log(response);
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ px: 3 }}>Create New Function</Typography>
      {isLoading && (
        <CircularProgress
          color="secondary"
          sx={{ marginRight: 'auto', marginLeft: 'auto', display: 'block' }}
        />
      )}
      {data && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <StyledPaper>
              <SectionTitle variant="h6">
                <CodeIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Function Code
              </SectionTitle>
              <TextField
                fullWidth
                label="Function Name"
                value={functionName}
                onChange={(e) => setFunctionName(e.target.value)}
                sx={{ mb: 2 }}
              />
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
              <Editor
                height="400px"
                defaultLanguage="javascript"
                defaultValue={code}
                onChange={setCode}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                }}
              />
            </StyledPaper>
          </Grid>
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <SettingsIcon sx={{ mr: 1 }} />
                <Typography>Limits</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography gutterBottom>Memory Allocation (MB)</Typography>
                    <Slider
                      value={memoryAllocation}
                      onChange={(e, newValue) => setMemoryAllocation(newValue)}
                      valueLabelDisplay="auto"
                      step={16}
                      marks
                      min={16}
                      max={512}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography gutterBottom>CPU (vcpu)</Typography>
                    <Slider
                      value={cpuAllocation}
                      onChange={(e, newValue) => setCpuAllocation(newValue)}
                      valueLabelDisplay="auto"
                      step={0.2}
                      marks
                      min={0.2}
                      max={2}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography gutterBottom>Timeout (ms)</Typography>
                    <Slider
                      value={timeout}
                      onChange={(e, newValue) => setTimeout(newValue)}
                      valueLabelDisplay="auto"
                      step={500}
                      marks
                      min={500}
                      max={5000}
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <SecurityIcon sx={{ mr: 1 }} />
                <Typography>Environment Variables</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {environment.map((env, index) => (
                  <Grid container spacing={2} key={env.id} sx={{ mb: 2 }}>
                    <Grid item xs={5}>
                      <TextField
                        fullWidth
                        label="Key"
                        value={env.key}
                        onChange={(e) => handleEnvironmentChange(index, 'key', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        fullWidth
                        label="Value"
                        value={env.value}
                        onChange={(e) => handleEnvironmentChange(index, 'value', e.target.value)}
                      />
                    </Grid>
                  </Grid>
                ))}
                <Button variant="outlined" onClick={handleAddEnvironmentVariable}>
                  Add Environment Variable
                </Button>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleSubmit}
              >
                Create Function
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default FunctionCreation;
