import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getParsedStorage, setStorage, storageKeys } from '../utils/storage';

const SESSION_DURATION_MS = 5 * 60 * 1000;
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [sessionExpiresAt, setSessionExpiresAt] = useState(null);

  useEffect(() => {
    const session = getParsedStorage(storageKeys.session, null);
    if (!session?.user || !session?.expiresAt) return;

    if (Date.now() >= session.expiresAt) {
      localStorage.removeItem(storageKeys.session);
      return;
    }

    setCurrentUser(session.user);
    setSessionExpiresAt(session.expiresAt);
  }, []);

  useEffect(() => {
    if (!sessionExpiresAt) return;
    const timer = setInterval(() => {
      if (Date.now() >= sessionExpiresAt) logout();
    }, 1000);

    return () => clearInterval(timer);
  }, [sessionExpiresAt]);

  const register = ({ name, email, password }) => {
    const users = getParsedStorage(storageKeys.users, []);
    const duplicate = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (duplicate) {
      return { ok: false, message: 'Email already registered.' };
    }

    const newUser = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    };

    setStorage(storageKeys.users, [...users, newUser]);
    return { ok: true };
  };

  const login = ({ email, password }) => {
    const users = getParsedStorage(storageKeys.users, []);
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
    );

    if (!user) {
      return { ok: false, message: 'Invalid email or password.' };
    }

    const expiresAt = Date.now() + SESSION_DURATION_MS;
    const session = { user, expiresAt };
    setStorage(storageKeys.session, session);
    setCurrentUser(user);
    setSessionExpiresAt(expiresAt);
    return { ok: true };
  };

  const logout = () => {
    setCurrentUser(null);
    setSessionExpiresAt(null);
    localStorage.removeItem(storageKeys.session);
    localStorage.removeItem(storageKeys.cart);
  };

  const updateProfile = ({ name, email, password }) => {
    if (!currentUser) return { ok: false, message: 'No logged in user.' };

    const users = getParsedStorage(storageKeys.users, []);
    const normalizedEmail = email.trim().toLowerCase();

    const duplicate = users.find(
      (u) => u.id !== currentUser.id && u.email.toLowerCase() === normalizedEmail,
    );

    if (duplicate) {
      return { ok: false, message: 'Email already in use.' };
    }

    const updatedUser = {
      ...currentUser,
      name: name.trim(),
      email: normalizedEmail,
      password,
    };

    const updatedUsers = users.map((u) => (u.id === currentUser.id ? updatedUser : u));
    setStorage(storageKeys.users, updatedUsers);

    if (sessionExpiresAt) {
      setStorage(storageKeys.session, { user: updatedUser, expiresAt: sessionExpiresAt });
    }

    setCurrentUser(updatedUser);
    return { ok: true };
  };

  const getSessionTimeLeft = () => {
    if (!sessionExpiresAt) return '00:00';
    const diff = Math.max(0, sessionExpiresAt - Date.now());
    const minutes = Math.floor(diff / 60000)
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor((diff % 60000) / 1000)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const value = useMemo(
    () => ({
      currentUser,
      isAuthenticated: Boolean(currentUser),
      register,
      login,
      logout,
      updateProfile,
      getSessionTimeLeft,
    }),
    [currentUser, sessionExpiresAt],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
};
