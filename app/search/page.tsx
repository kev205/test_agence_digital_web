import SearchResults from "@/components/ui/SearchResults";
import { ListProductsSkeleton } from "@/components/ui/skeletons";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 0;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Suspense fallback={<ListProductsSkeleton />}>
        <SearchResults query={query} skip={currentPage} />
      </Suspense>
    </main>
  );
}
