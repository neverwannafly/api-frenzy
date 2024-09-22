import { getAuthToken, getTokenKey, setAuthToken } from './auth';

function searchParams(params) {
  const paramsList = [];
  Object.keys(params).forEach((k) => {
    paramsList.push(`${k}=${params[k]}`);
  });
  return paramsList.join('&');
}

async function parseJsonResponse(response) {
  let json = null;
  try {
    json = await response.json();
  } catch (e) {
    // TODO Do something if response has no, or invalid JSON
  }

  if (response.ok) {
    const token = response.headers.get(getTokenKey());
    // Set auth token if its present from backend
    if (token) { setAuthToken(token); }
    return json;
  }

  const error = new Error(response.statusText);
  error.isFromServer = true;
  error.response = response;
  error.responseJson = json;

  throw error;
}

export default async function apiRequest(method, path, body = null, options = {}, settings = {}) {
  const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  };

  const token = getAuthToken();
  if (token) {
    defaultHeaders['X-Session-Token'] = token;
  }

  const defaultOptions = { method };
  if (body) {
    if (options.dataType === 'FormData') {
      delete defaultHeaders['Content-Type'];
      defaultOptions.body = body;
    } else {
      defaultOptions.body = JSON.stringify(body);
    }
  }

  const { headers, params, ...remainingOptions } = options;
  const finalOptions = Object.assign(
    defaultOptions,
    { headers: Object.assign(defaultHeaders, headers) },
    { credentials: 'same-origin' },
    remainingOptions,
  );

  let updatedPath = path;
  if (params) {
    updatedPath += `?${searchParams(params)}`;
  }

  const response = await fetch(updatedPath, finalOptions);

  if (settings.allowAllFormats) {
    return response;
  }

  return parseJsonResponse(response, settings);
}
