import ProductDetails from "@/components/ui/ProductDetails";
import { ProductDetailsSkeleton } from "@/components/ui/skeletons";
import React, { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: { product: string };
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductDetails id={params.product} />
      </Suspense>
    </main>
  );
}
