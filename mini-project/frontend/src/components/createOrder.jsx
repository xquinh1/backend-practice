import React, { useState } from "react";

function CreateOrder() {
  const [amount, setAmount] = useState("");
  const [paymentType, setPaymentType] = useState("cash");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Authorization token not found. Please login.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: Number(amount),
          payment_type: paymentType
        })
      });

      if (!response.ok) {
        const resData = await response.json();
        throw new Error(resData.error || "Failed to create order.");
      }

      setMessage("Order created successfully!");
      setAmount("");
      setPaymentType("cash");
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleCreateOrder}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Create Order</h2>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-700 mb-2">
            Amount
          </label>
          <input
            id="amount"
            type="number"
            min="0"
            step="any"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            disabled={loading}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="paymentType" className="block text-gray-700 mb-2">
            Payment Type
          </label>
          <select
            id="paymentType"
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            disabled={loading}
            required
          >
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="crypto">Crypto</option>
          </select>
        </div>
        <button
          type="submit"
          className={`w-full ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white py-2 rounded transition-colors font-semibold`}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Order"}
        </button>
        {message && (
          <div
            className={`mt-4 text-center font-medium ${
              message.startsWith("Order created")
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

export default CreateOrder;