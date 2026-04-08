import React, { useState } from "react";

function Checkout() {
  const [paymentType, setPaymentType] = useState("paypal");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Authorization token not found. Please login.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/users/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ payment_type })
      });

      if (!response.ok) {
        const resData = await response.json();
        throw new Error(resData.message || "Checkout failed");
      }

      setMessage("Checkout successful!");
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleCheckout}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Checkout</h2>
        <div className="mb-4">
          <label htmlFor="paymentType" className="block text-gray-700 mb-2">
            Payment Method
          </label>
          <select
            id="paymentType"
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            required
          >
            <option value="paypal">PayPal</option>
            <option value="stripe">Stripe</option>
          </select>
        </div>
        <button
          type="submit"
          className={`w-full ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white py-2 rounded transition-colors`}
          disabled={loading}
        >
          {loading ? "Processing..." : "Checkout"}
        </button>
        {message && (
          <div
            className={`mt-4 text-center ${
              message.startsWith("Error:")
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

export default Checkout;