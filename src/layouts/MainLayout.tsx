import { NavLink, Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-16 bg-blue-900 flex items-center justify-between px-4">
        <div className="font-bold text-white">Astra Global</div>
        <div className="flex items-center">
          <NavLink
            to="/"
            className="text-white hover:text-white hover:underline"
          >
            Dashboard
          </NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default MainLayout;
