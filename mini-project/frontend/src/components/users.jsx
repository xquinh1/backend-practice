import React, { useEffect, useState } from "react";


function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
          const token = localStorage.getItem("token");
          const response = await fetch("http://localhost:3000/users", {
              headers: {
                  "Authorization": `Bearer ${token}`
              }
          });

          const data = await response.json();
          setUsers(data)
          setLoading(false);

        } catch (error) {
          console.error("Error fetching users:", error);
        } 
      }
    fetchUsers();
  }, []);

  return (
    <div className="max-w-xl mx-auto my-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Users</h1>
      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {users.map((user) => (
            <li key={user.id} className="py-3">
              <span className="text-gray-900 font-medium">{user.name}</span>
              <br />
              <span className="text-gray-500 text-sm">{user.email}</span>
              <button
                className="mt-2 px-3 py-1 rounded bg-blue-500 text-white text-sm hover:bg-blue-600 transition"
                onClick={() => {
                  localStorage.setItem("userId", user.id);
                  // navigate to `/users/:id/orders`
                  window.location.href = `/users/${user.id}/orders`;
                }}
              >
                View Orders
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Users;