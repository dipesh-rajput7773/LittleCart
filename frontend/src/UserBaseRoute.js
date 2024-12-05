import React from "react";
import Navbar from "./layouts/navbarFront/Navbar";
import { Outlet } from "react-router-dom";

function UserBaseRoute() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default UserBaseRoute;
