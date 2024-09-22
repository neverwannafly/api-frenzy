import apiRequest from '@app/lib/api';

export const list = async (filters, page, limit) => (
  apiRequest('POST', '/api/functions/1/list', { function: { filters, page, limit } })
);

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
  apiRequest('POST', `/exec/fn/${fnSlug}`, payload, {}, { allowAllFormats: true })
);
