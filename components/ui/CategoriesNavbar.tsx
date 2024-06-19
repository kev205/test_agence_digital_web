import { API_BASE_URL } from "@/lib/api";
import Link from "next/link";

export default async function CategoriesNavbar() {
  const categories: void | any[] = await fetch(
    `${API_BASE_URL}/products/categories`
  ).then((res) => res.json());

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-start space-x-4">
          {categories
            ?.slice(0, Math.min(20, categories.length))
            .map((category) => (
              <Link
                key={category.name}
                href={`/category/${category.slug}`}
                className="inline-flex items-center py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                {category.name}
              </Link>
            ))}
        </div>
      </div>
    </nav>
  );
}
