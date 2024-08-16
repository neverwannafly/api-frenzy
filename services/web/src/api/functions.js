import apiRequest from '@app/lib/api';

// eslint-disable-next-line import/prefer-default-export
export const create = async (payload) => (
  apiRequest('POST', '/api/functions', payload)
);

export const show = async (slug) => (
  apiRequest('GET', `/api/functions/${slug}`)
);

export const update = async (slug, payload) => (
  apiRequest('PATCH', `/api/functions/${slug}`, payload)
);

export const testCode = async (fnSlug, payload) => (
  apiRequest('POST', `/exec/fn/${fnSlug}`, payload)
);
