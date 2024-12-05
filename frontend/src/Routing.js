import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom"; 
import UserBaseRoute from "./UserBaseRoute";
import AdminBaseRoute from "./AdminBaseRoute";
import AdminRegister from "./pages/admin/auth/AdminRegister";
import AdminLogin from "./pages/admin/auth/AdminLogin";
import { useDispatch, useSelector } from "react-redux";
import { logout, setLoggedIn } from "./redux/slice/authSlice";
import AdminDashboardHome from "./pages/admin/dashboard/AdminDashboardHome";


const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/adminauth/login" />;
};

function Routing() {
  const dispatch = useDispatch();

  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);



  useEffect(() => {
   
    const token = localStorage.getItem("token"); // Or use any other logic to check login status
    if (token) {
      dispatch(setLoggedIn()); // Dispatch action to set logged in if token exists
    } else {
      dispatch(logout()); // Dispatch action to set logged out if no token
    }
  }, [dispatch]);


  return (
    <Routes>
      {/* User Routes */}
      <Route path="/" element={<UserBaseRoute />}>
        <Route index element={<h1>HomePage</h1>} /> {/* Default Route */}
        <Route path="products" element={<h1>Productpage</h1>} />
        {/* Add more user routes as needed */}
      </Route>

      {/* Admin Routes */}

      <Route path="/adminauth">
        <Route path="register" element={<AdminRegister />} />
        <Route path="login" element={<AdminLogin />} />
      </Route>

      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminBaseRoute />
          </PrivateRoute>
        }
      >
        <Route index element={<AdminDashboardHome/>} /> {/* Default Route */}
        <Route path="products" element={<h1>AdminProductManagement</h1>} />
      </Route>

      {/* Default Route */}
      {/* <Route path="/" element={<h1>homepage/</h1>} /> */}
    </Routes>
  );
}

export default Routing;
