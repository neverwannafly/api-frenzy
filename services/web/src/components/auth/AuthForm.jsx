import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

function AuthForm({
  handleUpdate,
  handleSubmit,
  formActionLabel,
  formFields,
  formErrors,
}) {
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ flexGrow: 1 }}>
      {formFields.map(({ key, label }) => (
        <TextField
          type={key === 'password' ? key : 'text'}
          key={key}
          margin="normal"
          label={label}
          onChange={handleUpdate(key)}
          error={Boolean(formErrors[key])}
          helperText={formErrors[key]}
          required
          fullWidth
          autoComplete={key}
          variant="outlined"
          sx={{ mb: 1 }}
        />
      ))}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        sx={{
          mt: 3,
          mb: 2,
          height: 56,
          textTransform: 'none',
          fontSize: '1rem',
        }}
      >
        {formActionLabel}
      </Button>
    </Box>
  );
}

export default AuthForm;
