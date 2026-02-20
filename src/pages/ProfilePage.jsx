import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { currentUser, updateProfile } = useAuth();

  const [form, setForm] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    password: currentUser?.password || '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const response = updateProfile(form);
    if (!response.ok) {
      setError(response.message);
      return;
    }

    setMessage('Profile updated successfully.');
  };

  return (
    <section className="mx-auto max-w-xl rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-xl font-semibold">My Profile</h2>
      <p className="mt-1 text-sm text-slate-600">Update your account details.</p>

      {error && <p className="mt-4 rounded-md bg-rose-50 p-2 text-sm text-rose-700">{error}</p>}
      {message && <p className="mt-4 rounded-md bg-emerald-50 p-2 text-sm text-emerald-700">{message}</p>}

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
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

        <button
          type="submit"
          className="w-full rounded-md bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
        >
          Save Changes
        </button>
      </form>
    </section>
  );
};

export default ProfilePage;
