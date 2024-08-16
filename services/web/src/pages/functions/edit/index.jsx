import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { loadFunction } from '@app/store/functions';
import { update as updateFunction, testCode } from '@app/api/functions';

import CodeEditor from './codeEditor';
import Settings from './settings';

function CreateFunction() {
  const [heading, setHeading] = useState('');
  const [code, setCode] = useState('// Your code here');
  const [params, setParams] = useState('{\n    \n}');
  const [output, setOutput] = useState('Output will be displayed here');
  const [memoryAllocation, setMemoryAllocation] = useState(16);
  const [cpuAllocation, setCpuAllocation] = useState(200);
  const [time, setTime] = useState(500);
  const [environment, setEnvironment] = useState([]);
  const { slug } = useParams();

  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((state) => state.functions);

  useEffect(() => {
    dispatch(loadFunction(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    if (data) {
      const { name: functionName, code: userCode } = data.data.attributes;
      const { name: runtimeName, placeholder } = data.included[0].attributes;
      setHeading(`${functionName} (${runtimeName})`);
      setCode(userCode || placeholder);
    }
  }, [data]);

  const handleSaveCode = async () => {
    const response = await updateFunction(slug, {
      code,
      env_vars: environment,
      limits: { cpu: cpuAllocation, memory: memoryAllocation, timeout: time },
    });
    console.log(response);
  };

  const handleTestCode = async () => {
    const response = await testCode(slug, {
      params: (() => { try { return JSON.parse(params); } catch (e) { return {}; } })(),
    });
    setOutput(JSON.stringify(response, null, 2));
  };

  const handleSaveFunction = () => {
    // Implement save function logic
  };

  if (isLoading) {
    return (
      <CircularProgress
        color="secondary"
        sx={{ marginRight: 'auto', marginLeft: 'auto', display: 'block' }}
      />
    );
  }

  return (
    <Box sx={{ maxWidth: '100%', margin: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {heading}
        </Typography>

        <Box sx={{ my: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSaveCode} sx={{ mr: 1 }}>
            Save Code
          </Button>
          <Button variant="contained" color="secondary" onClick={handleTestCode}>
            Test Code
          </Button>
        </Box>

        <CodeEditor
          code={code}
          setCode={setCode}
          params={params}
          setParams={setParams}
          output={output}
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
