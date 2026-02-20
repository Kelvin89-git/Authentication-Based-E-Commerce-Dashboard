import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getParsedStorage, setStorage, storageKeys } from '../utils/storage';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      setCartItems([]);
      return;
    }

    const stored = getParsedStorage(storageKeys.cart, []);
    setCartItems(stored);
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;
    setStorage(storageKeys.cart, cartItems);
  }, [cartItems, isAuthenticated]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      if (prev.some((item) => item.id === product.id)) {
        return prev;
      }

      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ];
    });
  };

  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
    );
  };

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = (item) => item.price * item.quantity;
  const total = cartItems.reduce((sum, item) => sum + subtotal(item), 0);

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      increaseQty,
      decreaseQty,
      removeFromCart,
      subtotal,
      total,
    }),
    [cartItems, total],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }
  return context;
};
