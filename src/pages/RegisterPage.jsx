import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const response = register(form);

    if (!response.ok) {
      setError(response.message);
      return;
    }

    navigate('/login');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-indigo-100 to-white p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h2 className="mb-1 text-2xl font-semibold">Create Account</h2>
        <p className="mb-6 text-sm text-slate-500">Register to access the dashboard</p>

        {error && <p className="mb-4 rounded-md bg-rose-50 p-2 text-sm text-rose-700">{error}</p>}

        <div className="space-y-4">
          {[
            { key: 'name', label: 'Name', type: 'text' },
            { key: 'email', label: 'Email', type: 'email' },
            { key: 'password', label: 'Password', type: 'password' },
          ].map((field) => (
            <label key={field.key} className="block text-sm font-medium text-slate-700">
              {field.label}
              <input
                required
                type={field.type}
                value={form[field.key]}
                onChange={(e) => setForm((prev) => ({ ...prev, [field.key]: e.target.value }))}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 outline-none ring-indigo-300 focus:ring"
              />
            </label>
          ))}
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-md bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
        >
          Register
        </button>

        <p className="mt-4 text-center text-sm text-slate-600">
          Already registered?{' '}
          <Link to="/login" className="font-medium text-indigo-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
