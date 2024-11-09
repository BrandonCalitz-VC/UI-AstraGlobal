import { HiMiniArrowsUpDown } from "react-icons/hi2";
import NavItem from "./components/NavItem";

function EmployeeDashboard() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-gray-200">
      <div className="flex space-x-4">
        <NavItem
          to="transactions"
          Icon={HiMiniArrowsUpDown}
          title="Transactions"
        />
      </div>
    </div>
  );
}

export default EmployeeDashboard;
