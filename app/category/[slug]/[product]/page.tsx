import ProductDetails from "@/components/ui/ProductDetails";
import React from "react";

export default async function Page({
  params,
}: {
  params: { product: string };
}) {
  const product: void | any = await fetch(
    `https://dummyjson.com/products/${params.product}`
  ).then((res) => res.json());

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ProductDetails product={product} />
    </main>
  );
}
