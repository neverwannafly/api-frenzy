const TOKEN_KEY = 'X-Session-Token';
const STORAGE_KEY = 'lib/auth/JWT_STORAGE';

export const getTokenKey = () => TOKEN_KEY;

export const setAuthToken = (token) => localStorage.setItem(STORAGE_KEY, token);
export const getAuthToken = () => localStorage.getItem(STORAGE_KEY);
export const deleteAuthToken = () => localStorage.removeItem(STORAGE_KEY);
