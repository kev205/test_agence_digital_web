import Image from "next/image";
import Link from "next/link";
import PriceView from "./PriceView";

export default async function SearchResults({
  query,
  skip,
  limit,
}: {
  query?: string;
  skip?: number;
  limit?: number;
}) {
  const products: void | any[] = await fetch(
    `https://dummyjson.com/products/search?select=id,title,thumbnail,category,brand,price,discountPercentage` +
      (query ? `&q=${query}` : "") +
      (limit ? `&limit=${limit}` : "") +
      (skip ? `&skip=${skip}` : "")
  )
    .then((res) => res.json())
    .then((data) => data.products);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products?.length ? (
          products.map((product) => (
            <Link
              key={product.id}
              className="group relative"
              href={`/category/${product.category}/${product.id}`}
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <Image
                  src={product.thumbnail}
                  alt="Front of men&#039;s Basic Tee in black."
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  width={800}
                  height={600}
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">{product.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
                </div>
              </div>
              <PriceView
                price={product.price}
                discountPercentage={product.discountPercentage}
                textClass="text-sm"
                hidebadge
              />
            </Link>
          ))
        ) : (
          <div className="flex items-center mt-6 text-center border rounded-lg h-96 dark:border-gray-700">
            <div className="flex flex-col w-full max-w-sm px-4 mx-auto">
              <div className="p-3 mx-auto text-blue-500 bg-blue-100 rounded-full dark:bg-gray-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </div>
              <h1 className="mt-3 text-lg text-gray-800 dark:text-white">
                No items found
              </h1>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Your search {query} did not match any products.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
