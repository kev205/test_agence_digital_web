import Image from "next/image";
import Link from "next/link";
import PriceView from "./PriceView";
import AddToCartButton from "./AddToCartButton";
import ListReviews from "./ListReviews";

export default async function ProductDetails({ id }: { id: string }) {
  const product: void | any = await fetch(
    `https://dummyjson.com/products/${id}`
  ).then((res) => res.json());

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {product?.tags?.map((tag: string) => (
              <li key={tag}>
                <div className="flex items-center">
                  <Link
                    className="mr-2 text-sm font-medium text-gray-900"
                    href={`/category/${tag}`}
                  >
                    {tag}
                  </Link>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <span
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.title}
              </span>
            </li>
          </ol>
        </nav>

        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          {product?.images
            ?.slice(0, Math.min(3, product.images.length))
            .map((image: string) => (
              <div
                key={image}
                className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block"
              >
                <Image
                  src={image}
                  alt={image}
                  className="h-full w-full object-cover object-center"
                  width={600}
                  height={400}
                  priority
                />
              </div>
            ))}
        </div>

        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product.title}
            </h1>
          </div>

          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <PriceView
              price={product.price}
              discountPercentage={product.discountPercentage}
            />
            <ListReviews product={product} />
            <AddToCartButton product={product} />
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  <li className="text-gray-400">
                    <span className="text-gray-600">
                      {product.warrantyInformation}
                    </span>
                  </li>
                  <li className="text-gray-400">
                    <span className="text-gray-600">
                      {product.shippingInformation}
                    </span>
                  </li>
                  <li className="text-gray-400">
                    <span className="text-gray-600">
                      {product.availabilityStatus}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
