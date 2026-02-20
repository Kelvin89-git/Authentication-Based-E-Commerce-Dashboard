import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const cards = [
  {
    title: 'Browse Products',
    description: 'Explore product catalog and add items to your cart.',
    to: '/products',
  },
  {
    title: 'View Cart',
    description: 'Adjust quantity, remove items, and review your total.',
    to: '/cart',
  },
  {
    title: 'Edit Profile',
    description: 'Manage your personal details and account credentials.',
    to: '/profile',
  },
];

const DashboardPage = () => {
  const { currentUser, getSessionTimeLeft } = useAuth();

  return (
    <section className="space-y-6">
      <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-2xl font-semibold">Hello, {currentUser?.name} 👋</h2>
        <p className="mt-2 text-slate-600">Your secure dashboard is active.</p>
        <p className="mt-3 inline-block rounded-md bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700">
          Session time left: {getSessionTimeLeft()}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.title}
            to={card.to}
            className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:ring-indigo-200"
          >
            <h3 className="font-semibold text-slate-800">{card.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{card.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default DashboardPage;
