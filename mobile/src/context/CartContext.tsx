import React, { createContext, useState, ReactNode } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  qty: number;
  image: string;
}

interface CartContextType {
  items: Product[];
  add: (p: Product) => void;
  remove: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  clear: () => void;
  total: number;
}

export const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Product[]>([]);

  const add = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const remove = (id: number) =>
    setItems((prev) => prev.filter((p) => p.id !== id));

  const updateQty = (id: number, qty: number) =>
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty } : p))
    );

  const clear = () => setItems([]);

  const total = items.reduce((sum, p) => sum + p.price * p.qty, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, updateQty, clear, total }}>
      {children}
    </CartContext.Provider>
  );
};
