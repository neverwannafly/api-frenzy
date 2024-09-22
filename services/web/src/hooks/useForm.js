import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import apiRequest from '@app/lib/api';
import { setToast } from '@app/store/toast';

function useForm({
  baseUrl,
  formFields = {},
  formValidators = {},
  handleSuccess = () => {},
}) {
  const [formState, setFormState] = useState(formFields);
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();

    let isFormValid = true;
    const errors = {};

    Object.keys(formFields).forEach((key) => {
      if (formValidators[key]) {
        const { isError, error } = formValidators[key](formState[key]);
        if (isError) {
          errors[key] = error;
          isFormValid = false;
        }
      }
    });

    if (!isFormValid) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await apiRequest('POST', baseUrl, formState);
      if (Object.keys(response).includes('error')) {
        dispatch(setToast({
          message: response.error || 'Something went wrong! Please try again later!',
          type: 'error',
        }));
        return;
      }
      handleSuccess(response);
    } catch (err) {
      console.log(err);
      if (err.isFromServer) {
        const { error } = err.responseJson || {};
        dispatch(setToast({
          message: error || 'Something went wrong! Please try later',
          type: 'error',
        }));
      } else {
        dispatch(setToast({
          message: 'Something went wrong! Please try later',
          type: 'error',
        }));
      }
    }
  }, [
    dispatch, formState, handleSuccess,
    baseUrl, formFields, formValidators,
  ]);

  const handleFieldUpdate = useCallback((key) => (event) => {
    setFormState({ ...formState, [key]: event.target.value });
  }, [formState]);

  return {
    handleFieldUpdate,
    handleSubmit,
    formErrors,
  };
}

export default useForm;
