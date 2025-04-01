import React from "react";
import { Outlet } from "react-router-dom";
import Mainnav from "../components/mainnav";
const layout = () => {
  return (
    <div>
      <Mainnav />

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default layout;
