import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
    setMessage("");
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Registration failed");
      } else {
        setMessage("Registration successful!");
        setFormData({ name: "", email: "", role: "user" });
      }
    } catch (e) {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="w-full max-w-md p-8 rounded-xl shadow-xl bg-white">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center tracking-tight">Create an Account</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium mb-1 text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              type="text"
              name="name"
              id="name"
              autoComplete="off"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-700" htmlFor="role">
              Role
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all shadow focus:ring-2 focus:ring-purple-400"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        {message && (
          <div className="mt-4 text-green-600 text-center font-medium">{message}</div>
        )}
        {error && (
          <div className="mt-4 text-red-500 text-center font-medium">{error}</div>
        )}
      </div>
    </div>
  );
};

export default Register;