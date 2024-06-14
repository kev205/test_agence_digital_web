import { getSession } from "@/lib/session";

export default async function Page() {
  const session = await getSession();

  const carts: void | any[] = await fetch(`https://dummyjson.com/carts`)
    .then((res) => res.json())
    .then((res) => res.carts);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-white shadow-md rounded-md p-6">
        <h2 className="text-2xl font-bold mb-4">Your Carts</h2>
        <div className="space-y-4">
          {carts?.map((cart) => (
            <div key={cart.id} className="bg-gray-100 p-4 rounded-md">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Cart #{cart.id}</h3>
              </div>
              <div className="mt-2">
                <p className="text-gray-700">{cart.totalProducts} items</p>
                <p className="text-gray-700">Total: ${cart.total.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
