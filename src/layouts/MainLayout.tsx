import React from "react";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-16 bg-blue-500 flex items-center justify-between px-4">
        <div className="font-bold text-white">Astra Global</div>
        <div className="flex space-x-4">
          <a href="/login" className="text-white">
            Login
          </a>
          <a href="/register" className="text-white">
            Register
          </a>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default MainLayout;
