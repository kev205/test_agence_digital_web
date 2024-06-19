"use client";

import { Carousel as MaterialCarousel } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";

export default function Carousel({ products }: { products: any[] }) {
  return (
    <MaterialCarousel
      className="rounded-xl max-h-90"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      {products?.map((product) => (
        <Link
          key={product.id}
          className="flex-row relative h-full w-full"
          href={`/category/${product.category}/product/${product.id}`}
        >
          <Image
            src={product.thumbnail}
            alt={product.title}
            className="h-full object-cover bg-red-50"
            width={600}
            height={800}
          />
          <div className="md:w-1/2">
            <p className="text-lg font-bold">{product.title}</p>
            <p className="text-sm mb-10 leading-none">{product.description}</p>
          </div>
        </Link>
      ))}
    </MaterialCarousel>
  );
}
