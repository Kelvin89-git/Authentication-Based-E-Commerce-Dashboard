import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, increaseQty, decreaseQty, removeFromCart, subtotal, total } = useCart();

  if (!cartItems.length) {
    return <p className="rounded-lg bg-white p-6 text-center shadow-sm">Your cart is empty.</p>;
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Cart</h2>

      <div className="space-y-3">
        {cartItems.map((item) => (
          <article
            key={item.id}
            className="grid items-center gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:grid-cols-[80px_1fr_auto]"
          >
            <img src={item.image} alt={item.title} className="h-20 w-20 rounded-md object-contain" />
            <div>
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm text-slate-500">${item.price.toFixed(2)} each</p>
              <p className="mt-1 text-sm font-medium text-indigo-700">
                Subtotal: ${subtotal(item).toFixed(2)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => decreaseQty(item.id)}
                className="h-8 w-8 rounded-md bg-slate-100 text-lg font-semibold"
              >
                -
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => increaseQty(item.id)}
                className="h-8 w-8 rounded-md bg-slate-100 text-lg font-semibold"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="ml-3 rounded-md bg-rose-100 px-3 py-1 text-sm font-medium text-rose-700"
              >
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="rounded-xl bg-indigo-600 p-4 text-right text-white shadow-sm">
        <p className="text-sm opacity-90">Cart Total</p>
        <p className="text-2xl font-semibold">${total.toFixed(2)}</p>
      </div>
    </section>
  );
};

export default CartPage;
