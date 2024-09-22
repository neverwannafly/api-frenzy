import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  Box,
  Button,
  Typography,
  Paper,
  Divider,
  Checkbox,
  FormControlLabel,
} from '@mui/material';

import { loadFunction } from '@app/store/functions';
import { update as updateFunction } from '@app/api/functions';
import EmptyList from '@app/components/EmptyList';
import Loader from '@app/components/Loader';
import CodeEditor from '@app/pages/functions/components/CodeEditor';
import useCodeOutputHandler from '@app/hooks/useCodeOutputHandler';

import Settings from './settings';

function CreateFunction() {
  const [heading, setHeading] = useState('');
  const [code, setCode] = useState('// Your code here');
  const [params, setParams] = useState('{\n    \n}');
  const [memoryAllocation, setMemoryAllocation] = useState(16);
  const [cpuAllocation, setCpuAllocation] = useState(200);
  const [time, setTime] = useState(500);
  const [environment, setEnvironment] = useState([]);
  const { slug } = useParams();
  const [checked, setChecked] = useState(false);

  const dispatch = useDispatch();
  const { isLoading, data, error } = useSelector((state) => state.functions[slug]) || {};

  useEffect(() => {
    dispatch(loadFunction(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    if (data) {
      const {
        name: functionName,
        code: userCode,
        limits,
        env_vars: envVars,
        default_params: defaultParams,
      } = data.data.attributes;
      const { name: runtimeName, placeholder } = data.included[0].attributes;
      const { cpu, memory, timeout } = limits || {};

      setHeading(`${functionName} (${runtimeName})`);
      setCode(userCode || placeholder);

      if (cpu) setCpuAllocation(cpu);
      if (memory) setMemoryAllocation(memory / (1024 * 1024));
      if (timeout) setTime(timeout);
      if (envVars) setEnvironment(envVars);
      if (defaultParams) setParams(JSON.stringify(defaultParams, null, 4));
    }
  }, [data]);

  const {
    output, outputLoading, handleCodeRun, toggleRawOutput,
  } = useCodeOutputHandler(slug, params);

  const handleRawOutputClick = () => {
    setParams(toggleRawOutput(params));
    setChecked((prevChecked) => !prevChecked);
  };

  const handleSaveCode = async () => {
    const jsonParams = (() => { try { return JSON.parse(params); } catch (e) { return {}; } })();
    await updateFunction(slug, {
      code,
      env_vars: environment,
      limits: { cpu: cpuAllocation, memory: memoryAllocation, timeout: time },
      default_params: jsonParams,
    });
  };

  const handleSaveFunction = async () => {
    const jsonParams = (() => { try { return JSON.parse(params); } catch (e) { return {}; } })();
    await updateFunction(slug, {
      code,
      env_vars: environment,
      limits: { cpu: cpuAllocation, memory: memoryAllocation, timeout: time },
      default_params: jsonParams,
      publish: true,
    });
  };

  if (error) {
    return <EmptyList />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box sx={{ maxWidth: '100%', margin: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {heading}
        </Typography>

        <Divider />

        <Box sx={{ my: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSaveCode} sx={{ mr: 1 }}>
            Save Code
          </Button>
          <Button variant="outlined" color="primary" onClick={handleCodeRun}>
            Test Code
          </Button>
        </Box>

        <FormControlLabel
          control={(
            <Checkbox
              checked={checked}
              onChange={handleRawOutputClick}
              color="primary"
            />
        )}
          label="Toggle Raw Output"
        />

        <CodeEditor
          code={code}
          setCode={setCode}
          params={params}
          setParams={setParams}
          output={output}
          isOutputLoading={outputLoading}
        />

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Function Settings
        </Typography>

        <Settings
          environment={environment}
          setEnvironment={setEnvironment}
          cpuAllocation={cpuAllocation}
          setCpuAllocation={setCpuAllocation}
          time={time}
          setTime={setTime}
          memoryAllocation={memoryAllocation}
          setMemoryAllocation={setMemoryAllocation}
        />

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary" size="large" onClick={handleSaveFunction}>
            Save Function
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default CreateFunction;
