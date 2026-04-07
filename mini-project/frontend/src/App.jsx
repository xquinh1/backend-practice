import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login";
import Users from "./components/users";
import Orders from "./components/orders";
import Checkout from "./components/checkout";
import Register from "./components/register";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
}

// Override the default App to use routing
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={
          <ProtectedRoute>
            <Users />
            </ProtectedRoute>
          } 
        />
        <Route path="/users/:id/orders" element={
          <ProtectedRoute>
            <Orders />
            </ProtectedRoute>
          }
        />
        <Route path="/checkout" element={
          <ProtectedRoute>
            <Checkout />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;