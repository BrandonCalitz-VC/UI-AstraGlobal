import { Card } from "@/components/ui/card";
import { Outlet } from "react-router-dom";

function EmployeeAuth() {
  return (
    <div className="w-full h-full  bg-gradient-to-bl from-orange-500 to-yellow-500 flex flex-col justify-center items-center">
      <Card className="w-[350px] h-[450px] flex flex-col">
        <Outlet />
      </Card>
    </div>
  );
}

export default EmployeeAuth;
