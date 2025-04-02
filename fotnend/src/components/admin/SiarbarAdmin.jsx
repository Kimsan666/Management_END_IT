import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  PackageSearch,
  Boxes,
  Combine,
  Container,
  Warehouse,
  Package,
  CalendarArrowDown,
  UserRoundPen,
  ArchiveRestore,
} from "lucide-react";
const SiarbarAdmin = () => {
  return (
    <div className="bg-gray-800 text-white w-64 h-screen flex flex-col">
      <div className="flex items-center justify-center h-24 bg-gray-900 text-2xl font-bold">
        AdminPanel
      </div>
      <div className="flex-1 items-center px-4 py-2 justify-center space-y-2">
        <NavLink
          to={"/admin"}
          end
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 text-white  flex items-center px-4 py-2 rounded"
              : "text-gray-300 hover:bg-gray-700 flex hover:text-white rouded px-4 py-2"
          }
        >
          <LayoutDashboard />
          Dashboard
        </NavLink>
        <NavLink
          to={"/admin/product"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 text-white  flex items-center px-4 py-2 rounded"
              : "text-gray-300 hover:bg-gray-700 flex hover:text-white rouded items-center px-4 py-2"
          }
        >
          <PackageSearch />
          Product
        </NavLink>
        <NavLink
          to={"/admin/category"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 text-white  flex items-center px-4 py-2 rounded"
              : "text-gray-300 hover:bg-gray-700 flex hover:text-white rouded items-center px-4 py-2"
          }
        >
          <Combine />
          Category
        </NavLink>
        <NavLink
          to={"/admin/Unit"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 text-white  flex items-center px-4 py-2 rounded"
              : "text-gray-300 hover:bg-gray-700 flex hover:text-white rouded items-center px-4 py-2"
          }
        >
          <Boxes />
          Unit
        </NavLink>
        <NavLink
          to={"/admin/supplier"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 text-white  flex items-center px-4 py-2 rounded"
              : "text-gray-300 hover:bg-gray-700 flex hover:text-white rouded items-center px-4 py-2"
          }
        >
          <Container />
          Supplier
        </NavLink>
        <NavLink
          to={"/admin/warehouse"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 text-white  flex items-center px-4 py-2 rounded"
              : "text-gray-300 hover:bg-gray-700 flex hover:text-white rouded items-center px-4 py-2"
          }
        >
          <Warehouse />
          Warehouse
        </NavLink>
        <NavLink
          to={"/admin/warehousestock"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 text-white  flex items-center px-4 py-2 rounded"
              : "text-gray-300 hover:bg-gray-700 flex hover:text-white rouded items-center px-4 py-2"
          }
        >
          <Package />
          WarehouseStock
        </NavLink>
        <NavLink
          to={"/admin/order"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 text-white  flex items-center px-4 py-2 rounded"
              : "text-gray-300 hover:bg-gray-700 flex hover:text-white rouded items-center px-4 py-2"
          }
        >
          <CalendarArrowDown />
          Order
        </NavLink>
        <NavLink
          to={"/admin/employee"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 text-white  flex items-center px-4 py-2 rounded"
              : "text-gray-300 hover:bg-gray-700 flex hover:text-white rouded items-center px-4 py-2"
          }
        >
          <UserRoundPen />
          Employee
        </NavLink>
        <NavLink
          to={"/admin/inputproduct"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 text-white  flex items-center px-4 py-2 rounded"
              : "text-gray-300 hover:bg-gray-700 flex hover:text-white rouded items-center px-4 py-2"
          }
        >
          <ArchiveRestore />
          InputProduct
        </NavLink>
      </div>

      <div>
        <NavLink
          // to={"/admin/employee"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 text-white  flex items-center px-4 py-2 rounded"
              : "text-gray-300 hover:bg-gray-700 flex hover:text-white rouded items-center px-4 py-2"
          }
        >
          <LayoutDashboard />
          Sign Out
        </NavLink>
      </div>
    </div>
  );
};

export default SiarbarAdmin;
