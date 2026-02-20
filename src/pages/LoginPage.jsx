import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const response = login(form);

    if (!response.ok) {
      setError(response.message);
      return;
    }

    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-100 to-white p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h2 className="mb-1 text-2xl font-semibold">Welcome back</h2>
        <p className="mb-6 text-sm text-slate-500">Log in to continue</p>

        {error && <p className="mb-4 rounded-md bg-rose-50 p-2 text-sm text-rose-700">{error}</p>}

        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">
            Email
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 outline-none ring-indigo-300 focus:ring"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Password
            <input
              required
              type="password"
              value={form.password}
              onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 outline-none ring-indigo-300 focus:ring"
            />
          </label>
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-md bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm text-slate-600">
          New user?{' '}
          <Link to="/register" className="font-medium text-indigo-600">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
