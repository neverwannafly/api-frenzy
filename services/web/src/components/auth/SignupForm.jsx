import React from 'react';
import { batch, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useForm from '@app/hooks/useForm';
import {
  signupFormFields,
  signupFormKeys,
  formValidators,
} from '@app/constants/auth';
import { setToast } from '@app/store/toast';
import { setUser } from '@app/store/user';
import { setForm } from '@app/store/forms';

import AuthForm from './AuthForm';

function SignupForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSuccess = (response) => {
    batch(() => {
      dispatch(setUser(response));
      navigate('/dashboard');
      dispatch(setForm({ auth: false }));
      dispatch(setToast({
        message: `Welcome ${response.data.attributes.username}!`,
        type: 'success',
      }));
    });
  };

  const {
    handleFieldUpdate,
    handleSubmit,
    formErrors,
  } = useForm({
    baseUrl: '/api/auth/registrations',
    formFields: signupFormKeys,
    formValidators,
    handleSuccess,
  });

  return (
    <AuthForm
      handleUpdate={handleFieldUpdate}
      handleSubmit={handleSubmit}
      formActionLabel="Register"
      formFields={signupFormFields}
      formErrors={formErrors}
    />
  );
}

export default SignupForm;
