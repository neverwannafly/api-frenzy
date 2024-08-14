import React from 'react';
import {
  Typography, Grid, TextField, Button,
  Slider, Accordion, AccordionSummary, AccordionDetails,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  SettingsRounded as SettingsIcon,
  SecurityRounded as SecurityIcon,
} from '@mui/icons-material';

function Settings({
  memoryAllocation,
  setMemoryAllocation,
  cpuAllocation,
  setCpuAllocation,
  time,
  setTime,
  environment,
  setEnvironment,
}) {
  const handleAddEnvironmentVariable = () => {
    setEnvironment([...environment, { id: Math.random(), key: '', value: '' }]);
  };

  const handleEnvironmentChange = (index, field, value) => {
    const newEnvironment = [...environment];
    newEnvironment[index][field] = value;
    setEnvironment(newEnvironment);
  };

  return (
    <Grid container spacing={3}>
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
                  step={200}
                  marks
                  min={200}
                  max={1000}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography gutterBottom>Timeout (ms)</Typography>
                <Slider
                  value={time}
                  onChange={(e, newValue) => setTime(newValue)}
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
    </Grid>
  );
}

export default Settings;
