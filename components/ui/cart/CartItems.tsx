"use client";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/components/context/CartContext";
import Link from "next/link";
import PriceView from "../PriceView";
import { useRouter } from "next/navigation";

export default function Cart() {
  const { open, products, amount, setOpen, removeProduct, saveCart } =
    useCart();

  const { replace } = useRouter();

  const close = () => setOpen && setOpen(false);

  const goToCarts = () => {
    setOpen && setOpen(false);
    replace("/carts");
  };

  const remove = (id: number) => removeProduct && removeProduct(id);

  return (
    <Transition appear show={open}>
      <Dialog className="relative z-10" onClose={close}>
        <TransitionChild
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <DialogTitle className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </DialogTitle>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={close}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          {!products.length && (
                            <div className="flex items-center mt-6 text-center border rounded-lg h-96 dark:border-gray-700">
                              <div className="flex flex-col w-full max-w-sm px-4 mx-auto">
                                <h1 className="mt-3 text-lg text-gray-800 dark:text-white">
                                  No items found
                                </h1>
                                <p className="mt-2 text-gray-500 dark:text-gray-400">
                                  Start shopping
                                </p>
                              </div>
                            </div>
                          )}
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {products.map((product) => (
                              <li key={product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>
                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <p className="text-xs leading-3 text-gray-800 dark:text-white md:pt-0 pt-4">
                                      {product.sku}
                                    </p>
                                    <div className="flex justify-between text-base font-medium text-gray-900 pt-1">
                                      <h3>
                                        <Link
                                          href={`/category/${product.category}/${product.id}`}
                                          className="text-base font-black leading-none text-gray-800 dark:text-white"
                                        >
                                          {product.title}
                                        </Link>
                                      </h3>
                                      <PriceView
                                        price={product.price}
                                        discountPercentage={
                                          product.discountPercentage
                                        }
                                        textClass="ml-4"
                                        hidebadge
                                      />
                                    </div>
                                    <p className="text-xs leading-3 text-gray-600 dark:text-white pt-1">
                                      {product.brand}
                                    </p>
                                    <p className="text-xs leading-3 text-gray-600 dark:text-white pt-2">
                                      {product.warrantyInformation}
                                    </p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm pt-2">
                                    <div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                        onClick={() => remove(product.id)}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${amount}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <button
                          onClick={saveCart}
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Save Cart
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{" "}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={goToCarts}
                          >
                            See all your carts
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
