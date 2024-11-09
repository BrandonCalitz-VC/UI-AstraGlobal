import { useUser } from "@/provider/UserProvider";
import { NavLink, Outlet, useLocation } from "react-router-dom";

function MainLayout() {
  const { user } = useUser();
  const path = useLocation().pathname;
  const employeePath = path.includes("employee");
  console.log(user);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-16 bg-white flex items-center justify-between px-4 ">
        <div
          className={`font-bold ${
            employeePath ? "text-orange-500" : "text-blue-900"
          }`}
        >
          Astra Global
        </div>
        <div className="flex items-center gap-4">
          {!employeePath && (
            <NavLink
              to="/employee/"
              className=" text-blue-900 hover:text-blue-900 hover:underline"
            >
              Employee
            </NavLink>
          )}
          {employeePath && (
            <NavLink
              to="/"
              className=" text-orange-500 hover:text-orange-500 hover:underline"
            >
              Account Holder
            </NavLink>
          )}
          {user?.employee && employeePath && (
            <NavLink
              to="/employee/add-employee"
              className={`${
                employeePath
                  ? "text-orange-500 hover:text-orange-500"
                  : "text-blue-900 hover:text-blue-900"
              } hover:underline`}
            >
              Add Employee
            </NavLink>
          )}
          {user && (
            <NavLink
              to={!employeePath ? "/" : "/employee/"}
              className={`${
                employeePath
                  ? "text-orange-500 hover:text-orange-500"
                  : "text-blue-900 hover:text-blue-900"
              } hover:underline`}
            >
              Dashboard
            </NavLink>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default MainLayout;
