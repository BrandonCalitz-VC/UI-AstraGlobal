import { z } from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignUpForm from "./components/SignUpForm";
import { useState } from "react";
import UserInfoForm from "./components/UserInfoFom";
import { addEmployee, register } from "@/services/lib/user";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { signUpSchema, userInfoSchema } from "../Auth/auth.scheme";

function AddEmployee() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [step, setStep] = useState(1);
  const [requestData, setRequestData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    national_id: "",
  });

  function onStep1(values: z.infer<typeof signUpSchema>) {
    setRequestData((prev) => ({ ...prev, ...values }));
    setStep(2);
  }
  function onStep2(values: z.infer<typeof userInfoSchema>) {
    setRequestData((prev) => ({ ...prev, ...values }));
    addEmployee(requestData).then(
      (res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/");
        toast({
          title: "Account Created!",
          description: "Your account has been created!",
          variant: "default",
        });
      },
      () => {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          variant: "destructive",
        });
      }
    );
  }
  function onBack() {
    setStep(step - 1);
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Card className="w-[350px] h-[450px] flex flex-col">
        <CardHeader>
          <CardTitle>Add Employee</CardTitle>
          <CardDescription>Add an Employee to the system</CardDescription>
        </CardHeader>
        <CardContent className="h-full">
          {step == 1 && <SignUpForm onSubmit={onStep1} />}
          {step == 2 && <UserInfoForm onSubmit={onStep2} onBack={onBack} />}
        </CardContent>
      </Card>
    </div>
  );
}

export default AddEmployee;
