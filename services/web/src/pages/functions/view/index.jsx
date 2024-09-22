import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Box, Button, Divider, Paper, Typography, Alert,
  Checkbox, FormControlLabel,
} from '@mui/material';

import CodeEditor from '@app/pages/functions/components/CodeEditor';
import { loadFunction } from '@app/store/functions';
import EmptyList from '@app/components/EmptyList';
import Loader from '@app/components/Loader';
import useCodeOutputHandler from '@app/hooks/useCodeOutputHandler';

import CopyToClickboard from './CopyToClipboard';

function ViewFunctionComponent() {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { isLoading, data, error } = useSelector((state) => state.functions[slug]) || {};
  const {
    name: functionName,
    code: userCode,
    description,
    // created_at: createdAt,
    default_params: defaultParams = '',
  } = data?.data?.attributes || {};
  const { name: runtimeName } = data?.included[0]?.attributes || {};
  const [params, setParams] = useState('');
  const {
    output, outputLoading, handleCodeRun, toggleRawOutput,
  } = useCodeOutputHandler(slug, params);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    dispatch(loadFunction(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    if (defaultParams) {
      setParams(JSON.stringify(defaultParams, null, 4));
    }
  }, [defaultParams]);

  const handleRawOutputClick = () => {
    setParams(toggleRawOutput(params));
    setChecked((prevChecked) => !prevChecked);
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
          {functionName}
          {' | '}
          {runtimeName}
        </Typography>

        <Typography gutterBottom>
          {description}
        </Typography>

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

        <Box sx={{ my: 2 }}>
          <Button variant="contained" color="primary" onClick={handleCodeRun}>
            Run Code
          </Button>
        </Box>

        <Box sx={{ my: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography>
            Copy the URL to invoke function!
            <Alert severity="info">
              Function must be published before you can use URL
            </Alert>
          </Typography>
          <CopyToClickboard
            url={`${window.location.host}/exec/fn/${slug}/`}
            query={params}
          />
        </Box>

        <CodeEditor
          code={userCode}
          setCode={() => {}}
          params={params}
          setParams={setParams}
          output={output}
          isOutputLoading={outputLoading}
          readOnly
        />

        <Divider sx={{ my: 4 }} />

        <Box>
          <Typography variant="h5">Function Invocations</Typography>
        </Box>
      </Paper>
    </Box>
  );
}

export default ViewFunctionComponent;
