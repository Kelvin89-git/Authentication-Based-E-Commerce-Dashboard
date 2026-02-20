export const storageKeys = {
  users: 'auth_users',
  session: 'auth_session',
  cart: 'auth_cart',
};

export const getParsedStorage = (key, fallback) => {
  const value = localStorage.getItem(key);
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

export const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
