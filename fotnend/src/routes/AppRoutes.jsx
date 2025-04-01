import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../page/auth/Login/login";
import Shop from "../page/User/PageShop/shop";
import Cart from "../page/User/PageCart/Cart";
import History from "../page/User/History/History";
import CheckOut from "../page/User/CheckOut/CheckOut";
import Layout from "../Layout/layout";
import LayoutAdmin from "../Layout/LayoutAdmin";
import Dasbroard from "../page/Admin/Dasboard/Dasbroard";
import Categorys from "../page/Admin/Category/Categorys";
import Product from "../page/Admin/Product/Product";
import Unit from "../page/Admin/Unit/Unit";
import Supplier from "../page/Admin/Supplier/Supplier";
import Warehouse from "../page/Admin/Warehouse/Warehouse";
import WarehouseStock from "../page/Admin/WarehouseStock/WarehouseStock";
import InputProduct from "../page/Admin/InputProduct/InputProduct";
import Register from "../page/Admin/Register/Register";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  {
    path: "/user",
    element: <Layout />,
    children: [
      { index: true, element: <Shop /> },
      { path: "/user/cart", element: <Cart /> },
      { path: "/user/history", element: <History /> },
      { path: "/user/checkout", element: <CheckOut /> },
    ],
  },
  {
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      { index: true, element: <Dasbroard /> },
      { path: "/admin/category", element: <Categorys /> },
      { path: "/admin/product", element: <Product /> },
      { path: "/admin/unit", element: <Unit /> },
      { path: "/admin/supplier", element: <Supplier /> },
      { path: "/admin/warehouse", element: <Warehouse /> },
      { path: "/admin/warehousestock", element: <WarehouseStock /> },
      { path: "/admin/inputproduct", element: <InputProduct /> },
      { path: "/admin/register", element: <Register /> },
    ],
  },
]);

const AppRoutes = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default AppRoutes;
