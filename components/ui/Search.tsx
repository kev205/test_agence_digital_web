"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [query, setQuery] = useState(searchParams.get("query")?.toString());

  const onChange = (e: any) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = useCallback(
    (event: { key: any }) => {
      if (event.key === "Enter") {
        const params = new URLSearchParams(searchParams);
        params.set("page", "0");
        if (query) {
          params.set("query", query);
        } else {
          params.delete("query");
        }
        replace(`/search?${params.toString()}`);
      }
    },
    [query]
  );

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white sm:text-sm"
        placeholder={placeholder}
        value={query}
        onChange={onChange}
        onKeyDown={handleKeyPress}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
