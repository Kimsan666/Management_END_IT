import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
const App = () => {
  //javacript

  return (
    <>
      <AppRoutes />;
      <ToastContainer />
    </>
  );
};

export default App;
