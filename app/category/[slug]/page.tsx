import ListProducts from "@/components/ui/home/ListProducts";
import { ListProductsSkeleton } from "@/components/ui/skeletons";
import React, { Suspense } from "react";

export default async function Page({ params }: { params: { slug: string } }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Suspense fallback={<ListProductsSkeleton />}>
        <ListProducts categorySlug={params.slug} />
      </Suspense>
    </main>
  );
}
