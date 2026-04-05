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
    <div className="max-w-2xl mx-auto my-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Orders</h1>
      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : orders.length === 0 ? (
        <div className="text-gray-500">No orders found.</div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {orders.map((order) => (
            <li key={order.id} className="py-4">
              <div>
                <span className="font-semibold text-gray-900">Order #{order.id}</span>
              </div>
              <div className="text-sm text-gray-600">
                {order.description || "No description"}
              </div>
              <div className="text-sm text-gray-500">
                Status: {order.status}
              </div>
              <div className="text-sm text-gray-400">
                Placed: {order.createdAt ? new Date(order.createdAt).toLocaleString() : "Unknown"}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Orders;