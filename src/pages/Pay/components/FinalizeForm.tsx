import React from "react";
import { z } from "zod";
import { paymentSchema, paySchema } from "../pay.schema";
import { Button } from "@/components/ui/button";

interface FinalizeFormProps {
  onSubmit: () => void;
  onBack: () => void;
  data: z.infer<typeof paySchema>;
}
function FinalizeForm({ onSubmit, onBack, data }: FinalizeFormProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-between">
      <div className=" w-full h-full flex flex-col space-y-4">
        <div className="w-full bg-gray-300 rounded-sm p-4 shadow-inner shadow-gray-600 ">
          <div className="flex justify-between">
            <div className="font-bold">Amount</div>
            <div>
              {Number(data.amount).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="font-bold">Currency</div>
            <div>{data.currency}</div>
          </div>
          <div className="flex justify-between">
            <div className="font-bold">Account To</div>
            <div>{data.account_to}</div>
          </div>
          <div className="flex justify-between">
            <div className="font-bold">Provider</div>
            <div>{data.provider}</div>
          </div>
        </div>
        <div className="w-full bg-gray-300 rounded-sm p-4 shadow-inner shadow-gray-600 ">
          {data.value_1 && (
            <div className="flex justify-between">
              <div className="font-bold">
                {data.provider === "Swift" ? "Swift Code" : "Value 1"}
              </div>
              <div>{data.value_1}</div>
            </div>
          )}
          {data.value_2 && (
            <div className="flex justify-between">
              <div className="font-bold">Value 2</div>
              <div>{data.value_2}</div>
            </div>
          )}
        </div>
      </div>
      <div className="w-full flex justify-end space-x-2">
        <Button variant="destructive" onClick={onBack}>
          Back
        </Button>
        <Button variant={"special"} onClick={onSubmit}>
          Finalize
        </Button>
      </div>
    </div>
  );
}

export default FinalizeForm;
