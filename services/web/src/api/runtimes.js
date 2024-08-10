import apiRequest from '@app/lib/api';

// eslint-disable-next-line import/prefer-default-export
export const list = async () => (
  apiRequest('GET', '/api/runtimes')
);
