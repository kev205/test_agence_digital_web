"use client";

import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import Cart from "../ui/cart/CartItems";

export const CartContext = createContext<{
  products: any[];
  open?: boolean;
  total: number;
  amount: number;
  addProduct?: (element: any) => void;
  removeProduct?: (id: number) => void;
  setProducts?: (elements: any[]) => void;
  setOpen?: (element: boolean) => void;
  saveCart?: () => void;
}>({ products: [], total: 0, amount: 0 });

export function useCart() {
  const value = useContext(CartContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useCart must be wrapped in a <CartProvider />");
    }
  }

  return value;
}

export default function CartProvider({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);

  const addProduct = (element: any) => {
    setProducts((prev) => {
      const tmp = prev.filter((el) => el.id != element.id);
      return [...tmp, element];
    });
  };

  const removeProduct = (id: number) =>
    setProducts((prev) => prev.filter((el) => el.id != id));

  const amount = useMemo(() => {
    const value = products.reduce((acc, product) => {
      return (
        acc +
        (product.price - (product.price * product.discountPercentage) / 100)
      );
    }, 0);

    return value.toFixed(2);
  }, [products]);

  const saveCart = useCallback(async () => {
    return fetch("https://dummyjson.com/carts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: 1,
        products: products.map((product) => ({ id: product.id, quantity: 1 })),
      }),
    }).then((res) => res.json());
  }, [products]);

  const updateCart = useCallback(
    async (id: number) => {
      return fetch(`https://dummyjson.com/carts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          //   merge: true,
          products: products.map((product) => ({
            id: product.id,
            quantity: 1,
          })),
        }),
      }).then((res) => res.json());
    },
    [products]
  );

  const getCart = useCallback(async (id: number) => {
    return fetch(`https://dummyjson.com/carts/${id}`).then((res) => res.json());
  }, []);

  const getCarts = useCallback(async () => {
    return fetch("https://dummyjson.com/carts/user/5")
      .then((res) => res.json())
      .then(console.log);
  }, []);

  return (
    <CartContext.Provider
      value={{
        products,
        open,
        total: products.length,
        amount,
        setOpen,
        setProducts,
        addProduct,
        removeProduct,
        saveCart,
      }}
    >
      <Cart />
      {children}
    </CartContext.Provider>
  );
}
