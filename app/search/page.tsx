import SearchResults from "@/components/ui/SearchResults";

export default function Page({
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
      <SearchResults query={query} skip={currentPage} />
    </main>
  );
}
