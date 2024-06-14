import Carousel from "@/components/ui/home/Carousel";
import ListProducts from "@/components/ui/home/ListProducts";
import ListProductsSkeleton from "@/components/ui/home/ListProductsSkeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Carousel />
      {/* <Suspense fallback={<ListProductsSkeleton />}> */}
      <ListProducts limit={8} />
      {/* </Suspense> */}
    </main>
  );
}
