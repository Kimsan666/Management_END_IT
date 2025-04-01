import React from "react";
import { Outlet } from "react-router-dom";
import SiarbarAdmin from "../components/admin/SiarbarAdmin";
import HeaderBar from "../components/admin/HeaderBar";

const LayoutAdmin = () => {
  return (
    <div className="flex h-screen">
      <SiarbarAdmin />

      <div className="flex-1 flex flex-col ">
        <HeaderBar />
        <main className="flex-1  p-6 bg-gray-100 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutAdmin;
