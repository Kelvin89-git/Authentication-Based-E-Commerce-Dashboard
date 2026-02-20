import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/products', label: 'Products' },
  { to: '/cart', label: 'Cart' },
  { to: '/profile', label: 'Profile' },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const { getSessionTimeLeft, logout } = useAuth();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <h1 className="text-lg font-semibold text-indigo-700">ShopSecure</h1>

        <nav className="hidden gap-4 md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                pathname === link.to
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
            Session: {getSessionTimeLeft()}
          </span>
          <button
            onClick={logout}
            className="rounded-md bg-rose-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-rose-700"
          >
            Logout
          </button>
        </div>
      </div>

      <nav className="flex gap-2 overflow-x-auto px-4 pb-3 md:hidden">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium ${
              pathname === link.to ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Navbar;
