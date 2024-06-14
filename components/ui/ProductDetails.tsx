"use client";

import { classNames } from "@/lib/classUtils";
import { StarIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import PriceView from "./PriceView";
import ListReviews from "./ListReviews";
import { useCart } from "../context/CartContext";
import { useCallback, useState } from "react";

const reviews = { href: "#", average: 4, totalCount: 117 };

export default function ProductDetails({ product }: { product: any }) {
  const { addProduct } = useCart();

  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  const add = useCallback(() => {
    addProduct && addProduct(product);
  }, [product]);

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

        {/* Product info */}
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

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        product.rating > rating
                          ? "text-gray-900"
                          : "text-gray-200",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <button
                  id="toggleReviewsModal"
                  onClick={() => setOpen(true)}
                  data-modal-target="default-modal"
                  data-modal-toggle="default-modal"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
                >
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    ></path>
                  </svg>
                  Reviews
                </button>
                <ListReviews
                  reviews={product.reviews}
                  open={open}
                  close={close}
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={add}
            >
              Add to cart
            </button>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
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
