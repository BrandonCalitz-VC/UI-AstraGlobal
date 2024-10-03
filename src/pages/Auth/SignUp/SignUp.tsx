import { z } from "zod";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignUpForm from "./components/SignUpForm";
import { useState } from "react";
import UserInfoForm from "./components/UserInfoFom";
import { register } from "@/services/lib/user";
import BankInfoForm from "./components/BankInfoForm";
import { bankInfoSchema, signUpSchema, userInfoSchema } from "../auth.scheme";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

function SignUp() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [step, setStep] = useState(1);
  const [requestData, setRequestData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    national_id: "",
    account_number: "",
    bank: "",
  });

  function onStep1(values: z.infer<typeof signUpSchema>) {
    setRequestData((prev) => ({ ...prev, ...values }));
    setStep(2);
  }
  function onStep2(values: z.infer<typeof userInfoSchema>) {
    setRequestData((prev) => ({ ...prev, ...values }));
    setStep(3);
  }
  function onStep3(values: z.infer<typeof bankInfoSchema>) {
    setRequestData((prev) => ({ ...prev, ...values }));
    console.log("Bank Info", values);
    register(requestData).then(
      (res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
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
    <>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Sign up to create your account</CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        {step == 1 && <SignUpForm onSubmit={onStep1} />}
        {step == 2 && <UserInfoForm onSubmit={onStep2} onBack={onBack} />}
        {step == 3 && <BankInfoForm onSubmit={onStep3} onBack={onBack} />}
      </CardContent>
    </>
  );
}

export default SignUp;
