import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';

const ProductsPage = () => {
  const { addToCart, cartItems } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    const loadProducts = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Unable to fetch products.');
        }

        const data = await response.json();
        if (!ignore) setProducts(data);
      } catch (err) {
        if (!ignore) setError(err.message || 'Something went wrong.');
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadProducts();
    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return <p className="rounded-lg bg-white p-6 text-center shadow-sm">Loading products...</p>;
  }

  if (error) {
    return <p className="rounded-lg bg-rose-50 p-6 text-center text-rose-700">{error}</p>;
  }

  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold">Products</h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => {
          const inCart = cartItems.some((item) => item.id === product.id);

          return (
            <article key={product.id} className="flex flex-col rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <img
                src={product.image}
                alt={product.title}
                className="h-44 w-full rounded-md object-contain bg-white"
              />
              <h3 className="mt-3 line-clamp-2 min-h-12 text-sm font-medium">{product.title}</h3>
              <p className="mt-1 text-lg font-semibold text-indigo-700">${product.price.toFixed(2)}</p>

              <button
                onClick={() => addToCart(product)}
                disabled={inCart}
                className={`mt-auto rounded-md px-3 py-2 text-sm font-medium text-white ${
                  inCart ? 'bg-slate-400' : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {inCart ? 'Added' : 'Add to Cart'}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default ProductsPage;
