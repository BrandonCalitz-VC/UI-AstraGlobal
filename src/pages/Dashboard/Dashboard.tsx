import { TbCreditCardPay } from "react-icons/tb";
import { HiMiniArrowsUpDown } from "react-icons/hi2";
import NavItem from "./components/NavItem";

function Dashboard() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-gray-200">
      <div className="flex space-x-4">
        <NavItem to="/pay" Icon={TbCreditCardPay} title="Pay" />
        <NavItem
          to="/transactions"
          Icon={HiMiniArrowsUpDown}
          title="Transactions"
        />
      </div>
    </div>
  );
}

export default Dashboard;
