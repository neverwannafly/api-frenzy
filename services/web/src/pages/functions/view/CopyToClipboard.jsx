import React, { useState } from 'react';
import { TextField, IconButton, Box } from '@mui/material';
import { ContentCopy, CheckCircle } from '@mui/icons-material';

function hashToQueryParams(hash, prefix = '') {
  if (hash === null || hash === undefined || hash.length === 0) return '';

  const params = new URLSearchParams();
  let jsonHash = hash;

  try {
    if (typeof jsonHash === 'string') {
      jsonHash = JSON.parse(jsonHash);
    }
  } catch (e) {
    return '';
  }

  Object.entries(jsonHash).forEach(([key, value]) => {
    const paramKey = prefix ? `${prefix}[${key}]` : key;

    if (typeof value === 'object' && value !== null) {
      params.append(paramKey, hashToQueryParams(value));
    } else {
      params.append(paramKey, value);
    }
  });

  return params.toString();
}

function CopyToClickboard({ url, query }) {
  const [copied, setCopied] = useState(false);
  const fullUrl = `${url}?${hashToQueryParams(query)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <Box sx={{
      display: 'flex', mt: 2,
    }}
    >
      <TextField
        value={fullUrl}
        variant="outlined"
        fullWidth
        InputProps={{
          readOnly: true,
          endAdornment: (
            <IconButton onClick={handleCopy} edge="end">
              {copied ? <CheckCircle sx={{ color: 'green' }} /> : <ContentCopy />}
            </IconButton>
          ),
        }}
        sx={{ marginRight: 1 }}
      />
    </Box>
  );
}

export default CopyToClickboard;
