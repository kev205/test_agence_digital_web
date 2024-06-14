import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/ui/Navbar";
import CategoriesNavbar from "@/components/ui/CategoriesNavbar";
import CartProvider from "@/components/context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Easely Shop",
  description: "Buy easely and safely",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <CartProvider>
          <Navbar />
          <CategoriesNavbar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
