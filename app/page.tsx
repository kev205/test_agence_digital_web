import Carousel from "@/components/ui/home/Carousel";
import ListProducts from "@/components/ui/home/ListProducts";
import { ListProductsSkeleton } from "@/components/ui/skeletons";
import { API_BASE_URL } from "@/lib/api";
import { Suspense } from "react";

export default async function Home() {
  const products: void | any[] = await fetch(
    `${API_BASE_URL}/products?sortBy=meta.creadtedAt&order=desc&select=id,category,title,description,thumbnail&limit=5`
  )
    .then((res) => res.json())
    .then((data) => data.products);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Carousel products={products ?? []} />
      <Suspense fallback={<ListProductsSkeleton />}>
        <ListProducts limit={8} categorySlug={process.env.TOP_CATEGORY} />
      </Suspense>
    </main>
  );
}
