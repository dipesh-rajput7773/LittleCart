import React from "react";
import { Outlet } from "react-router-dom";
import SidebarWithToggle from "./layouts/sidebar/SideBar";

function AdminBaseRoute() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <SidebarWithToggle />

      {/* Main Content Area (Outlet) */}
      <div style={{ flexGrow: 1, padding: "16px" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminBaseRoute;
