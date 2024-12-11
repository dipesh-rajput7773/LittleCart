import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UserBaseRoute from "./UserBaseRoute";
import AdminBaseRoute from "./AdminBaseRoute";
import AdminRegister from "./pages/admin/auth/AdminRegister";
import AdminLogin from "./pages/admin/auth/AdminLogin";
import { useDispatch, useSelector } from "react-redux";
import { logout, setLoggedIn } from "./redux/slice/authSlice";
import AdminDashboardHome from "./pages/admin/dashboard/AdminDashboardHome";
import axiosInstance from "./services/axiosInstance";

const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/register" />;
};

function Routing() {
  const dispatch = useDispatch();

  const verifyToken = async () => {
    if (isAuthenticated()) {
      try {
        await axiosInstance.get("/user/verifyadmin");
        dispatch(setLoggedIn(true));
      } catch (error) {
        dispatch(setLoggedIn(false));
        dispatch(logout());
      }
    }
  };

  useEffect(() => {
    verifyToken()
  }, []);

  return (
    <Routes>
      
      <Route path="register" element={<AdminRegister />} />
      <Route path="login" element={<AdminLogin />} />


      {/* User Routes */}


      <Route path="/" element={<UserBaseRoute />}>
        <Route index element={<h1>HomePage</h1>} /> {/* Default Route */}
        <Route path="products" element={<h1>Productpage</h1>} />
        {/* Add more user routes as needed */}
      </Route>

      {/* Admin Routes */}


      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminBaseRoute />
          </PrivateRoute>
        }
      >
        <Route index element={<AdminDashboardHome />} /> {/* Default Route */}
        <Route path="products" element={<h1>AdminProductManagement</h1>} />
      </Route>

      {/* Default Route */}
      {/* <Route path="/" element={<h1>homepage/</h1>} /> */}
    </Routes>
  );
}

export default Routing;
