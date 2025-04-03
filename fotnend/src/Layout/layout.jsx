import React from "react";
import { Outlet } from "react-router-dom";
import Mainnav from "../components/mainnav";
const layout = () => {
  return (
    <div>
      <Mainnav />

      <main className="h-full px-4 mt-2 mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default layout;
