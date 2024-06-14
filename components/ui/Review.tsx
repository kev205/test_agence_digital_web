import { classNames } from "@/lib/classUtils";
import { StarIcon } from "@heroicons/react/24/outline";

export default function Review({ review }: { review: any }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300 mr-4"></div>
          <h3 className="text-lg font-bold">{review.reviewerName}</h3>
        </div>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((rating) => (
            <StarIcon
              key={rating}
              className={classNames(
                review.rating > rating ? "text-gray-900" : "text-gray-200",
                "h-5 w-5 flex-shrink-0"
              )}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between mt-2">
        <p>{review.comment}</p>
        <p className="text-gray-500 text-sm">{review.creadtedAt}</p>
      </div>
    </div>
  );
}
