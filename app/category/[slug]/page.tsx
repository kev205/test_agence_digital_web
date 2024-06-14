import ListProducts from "@/components/ui/home/ListProducts";
import React from "react";

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ListProducts categorySlug={params.slug} />
    </main>
  );
}
