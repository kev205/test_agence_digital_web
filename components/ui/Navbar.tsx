"use client";

import Link from "next/link";
import Search from "./Search";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useCart } from "../context/CartContext";

const Label: React.FC<{ item: number }> = ({ item }) => {
  if (item === 0) return <></>;

  return (
    <span className="absolute top-0 right-0 w-4 h-4 bg-red-400 text-white font-semibold text-xs rounded-full grid place-content-center">
      {item}
    </span>
  );
};

export default function Navbar() {
  const { setOpen, total } = useCart();

  const openCart = () => {
    setOpen && setOpen(true);
  };

  return (
    <nav className="bg-gray-900 py-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-white font-bold text-xl hover:text-gray-400 transition-colors duration-300"
        >
          <img src="logo.svg" alt="" className="h-8 w-auto mr-2 inline-block" />
          QuickShop
        </Link>
        <Search placeholder="Find anything..." />
        <div className="flex space-x-4">
          <Link
            href="/login"
            className="text-white hover:text-gray-400 transition-colors duration-300 font-medium"
          >
            Sign In
          </Link>
          <Link
            href="#"
            className="text-white hover:text-gray-400 transition-colors duration-300"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </Link>
          <button
            onClick={openCart}
            className="p-1 rounded-md hover:bg-slate-900 text-slate-700 hover:text-slate-300 relative transition duration-200 ease-in-out"
          >
            <ShoppingCartIcon className="h-6 w-6" strokeWidth={2} />
            <Label item={total} />
          </button>
        </div>
      </div>
    </nav>
  );
}
