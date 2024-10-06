import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import PayForm from "./components/PayForm";
import { paymentSchema, paySchema, providerSchema } from "./pay.schema";
import ProviderForm from "./components/ProviderForm";
import FinalizeForm from "./components/FinalizeForm";
import { pay } from "@/services/lib/transaction";
import { toast } from "@/hooks/use-toast";

function Pay() {
  const [step, setStep] = useState(1);
  const [requestData, setRequestData] = useState<z.infer<typeof paySchema>>({
    amount: 0,
    account_to: "",
    currency: "ZAR",
    provider: "Swift",
  });

  const navigate = useNavigate();

  function onStep1(values: z.infer<typeof paymentSchema>) {
    setRequestData((prev) => ({ ...prev, ...values }));
    setStep(2);
  }
  function onStep2(values: z.infer<typeof providerSchema>) {
    setRequestData((prev) => ({ ...prev, ...values }));
    setStep(3);
  }

  function onStep3() {
    pay(requestData).then(
      () => {
        navigate("/");
        toast({
          title: "Payment Successful!",
          description: "Your payment has been successful!",
          variant: "default",
        });
      },
      (err) => {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          variant: "destructive",
        });
        console.log(err);
      }
    );
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card className="w-[350px] h-[475px] flex flex-col">
        <CardHeader>
          <CardTitle>Pay</CardTitle>
          {/* <CardDescription>
            Make an payment with the specified provider
          </CardDescription> */}
        </CardHeader>
        <CardContent className="h-full">
          {step == 1 && (
            <PayForm onSubmit={onStep1} onBack={() => navigate(-1)} />
          )}
          {step == 2 && (
            <ProviderForm onSubmit={onStep2} onBack={() => setStep(1)} />
          )}
          {step == 3 && (
            <FinalizeForm
              onSubmit={onStep3}
              onBack={() => setStep(2)}
              data={requestData}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Pay;
