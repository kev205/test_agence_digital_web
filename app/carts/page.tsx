import { API_BASE_URL } from "@/lib/api";
import { classNames } from "@/lib/classUtils";
import { getSession } from "@/lib/session";

export default async function Page() {
  const session = await getSession();

  console.log(
    "`${API_BASE_URL}/carts/user/${session?.id}`",
    `${API_BASE_URL}/carts/user/${session?.id}`
  );

  const carts: void | any[] = await fetch(
    `${API_BASE_URL}/carts/user/${session?.id}`
  )
    .then((res) => res.json())
    .then((res) => res.carts);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full bg-white shadow-md rounded-md p-6">
        <h2 className="text-2xl font-bold mb-4">Your Carts</h2>
        <div className="space-y-4">
          {carts?.map((cart) => (
            <div className="bg-gray-100 p-4 rounded-md flex space-x-4 items-center justify-between">
              <div key={cart.id}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Cart #{cart.id}</h3>
                </div>
                <div className="mt-2">
                  <p className="text-gray-700">{cart.totalProducts} items</p>
                  <div className="inline-flex items-center space-x-2">
                    <span
                      className={classNames(
                        cart.discountedTotal ? "line-through" : "",
                        `text-red-500 font-bold text-lg`
                      )}
                    >
                      ${cart.total}
                    </span>
                    {!!cart.discountedTotal && (
                      <span className={`text-gray-900 font-bold text-lg`}>
                        ${cart.discountedTotal}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Explore
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
