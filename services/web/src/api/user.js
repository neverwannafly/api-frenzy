import apiRequest from '@app/lib/api';

export const logout = async () => (
  apiRequest('DELETE', '/api/auth/sessions')
);

export const getUserDetails = async () => (
  apiRequest('GET', '/api/user')
);
