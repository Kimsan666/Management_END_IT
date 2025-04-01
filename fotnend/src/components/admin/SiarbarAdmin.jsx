import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
const SiarbarAdmin = () => {
  return (
    <div className="bg-gray-800 text-white w-64 h-screen flex flex-col">
      <div className="flex items-center justify-center h-24 bg-gray-900 text-2xl font-bold">
        AdminPanel
      </div>
      <div className="flex-1 items-center px-4 py-2 justify-center space-y-2">
        <NavLink 
        to={'/admin'}
        end
        className={({ isActive }) => (isActive 
                ? "bg-gray-900 text-white  flex items-center px-4 py-2 rounded" 
                : "text-gray-300 hover:bg-gray-700 flex hover:text-white rouded px-4 py-2")}>
          <LayoutDashboard
          />
          Dasshboard
        </NavLink>
        <NavLink 
        to={'/admin/product'}
        className={({ isActive }) => (isActive 
                ? "bg-gray-900 text-white  flex items-center px-4 py-2 rounded" 
                : "text-gray-300 hover:bg-gray-700 flex hover:text-white rouded items-center px-4 py-2")}>
          <LayoutDashboard
          />
          Product
        </NavLink>
      </div>
      <div>Footer</div>
    </div>
  );
};

export default SiarbarAdmin;
