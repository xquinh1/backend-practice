import React, { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const selectedUserId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!selectedUserId) {
      setError("No user selected.");
      setLoading(false);
      return;
    }
    if (!token) {
      setError("No authentication token found.");
      setLoading(false);
      return;
    }
    fetch(`http://localhost:3000/users/${selectedUserId}/orders`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch orders.");
        }
        return response.json();
      })
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  

  return (
    <div className="max-w-2xl mx-auto my-10 p-4">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-900 text-center">Orders</h1>
      {loading ? (
        <div className="text-gray-500 text-center">Loading...</div>
      ) : error ? (
        <div className="text-red-500 text-center">Error: {error}</div>
      ) : orders.length === 0 ? (
        <div className="text-gray-500 text-center">No orders found.</div>
      ) : (
        <div className="flex flex-col items-center">
          {orders.map((order) => (
            <div
              key={order.id}
              className="w-full bg-white rounded-lg shadow-md p-6 mb-6 transition transform hover:shadow-xl hover:scale-[1.02] duration-150"
            >
              <div className="flex flex-col space-y-2">
                <div>
                  <span className="font-semibold text-blue-600">Order ID:&nbsp;</span>
                  <span className="text-gray-900">#{order.id}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">User ID:&nbsp;</span>
                  <span className="text-gray-800">{order.user_id || order.userId}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Total Amount:&nbsp;</span>
                  <span className="text-green-600 font-medium">
                    {order.amount !== undefined ? `$${order.amount}` : "No Amount"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Payment Type:&nbsp;</span>
                  <span className="text-gray-800">{order.payment_type || "No payment"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;