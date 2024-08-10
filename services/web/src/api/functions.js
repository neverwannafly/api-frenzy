import apiRequest from '@app/lib/api';

// eslint-disable-next-line import/prefer-default-export
export const create = async (payload) => (
  apiRequest('POST', '/api/functions', payload)
);
