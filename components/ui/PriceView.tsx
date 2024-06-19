import { classNames } from "@/lib/classUtils";
import { computePrice } from "@/lib/price";

export default function PriceView({
  price,
  discountPercentage = 0,
  hidebadge = false,
  textClass,
}: {
  price: number;
  discountPercentage?: number;
  hidebadge?: boolean;
  textClass?: string;
}) {
  return (
    <div className="inline-flex items-center space-x-2">
      <span
        className={classNames(
          discountPercentage ? "line-through" : "",
          `text-red-500 font-bold ${textClass ? textClass : "text-lg"}`
        )}
      >
        ${price}
      </span>
      {!!discountPercentage && (
        <span
          className={`text-gray-900 font-bold ${
            textClass ? textClass : "text-lg"
          }`}
        >
          ${computePrice(price, discountPercentage)}
        </span>
      )}
      {!hidebadge && (
        <span className="bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
          {discountPercentage}% Off
        </span>
      )}
    </div>
  );
}
