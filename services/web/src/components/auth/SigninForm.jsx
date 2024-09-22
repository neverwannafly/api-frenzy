import React from 'react';
import { batch, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useForm from '@app/hooks/useForm';
import {
  signinFormFields,
  signinFormKeys,
  formValidators,
} from '@app/constants/auth';
import { setToast } from '@app/store/toast';
import { setUser } from '@app/store/user';
import { unsetForm } from '@app/store/forms';

import AuthForm from './AuthForm';

function SignupForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSuccess = (response) => {
    dispatch(setUser(response, () => {
      batch(() => {
        dispatch(unsetForm({ form: 'auth' }));
        dispatch(setToast({
          message: `Welcome ${response.data.attributes.username}!`,
          type: 'success',
        }));
        navigate('/dashboard');
      });
    }));
  };
  const {
    handleFieldUpdate,
    handleSubmit,
    formErrors,
  } = useForm({
    baseUrl: '/api/auth/sessions',
    formFields: signinFormKeys,
    formValidators,
    handleSuccess,
  });

  return (
    <AuthForm
      handleUpdate={handleFieldUpdate}
      handleSubmit={handleSubmit}
      formActionLabel="Log in"
      formFields={signinFormFields}
      formErrors={formErrors}
    />
  );
}

export default SignupForm;
