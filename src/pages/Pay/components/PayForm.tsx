import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";

import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox-input";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentSchema } from "../pay.schema";

interface PayFormProps {
  onSubmit: (values: z.infer<typeof paymentSchema>) => void;
  onBack: () => void;
}

const currencies = [
  { value: "ZAR", label: "Rand (ZA)" },
  { value: "USD", label: "Dollar (US)" },
  { value: "EUR", label: "Euro (EU)" },
  { value: "GBP", label: "Pound (GB)" },
  { value: "CHF", label: "Franc (CH)" },
  { value: "JPY", label: "Yen (JP)" },
  { value: "KRW", label: "Won (KR)" },
  { value: "BRL", label: "Real (BR)" },
  { value: "MXN", label: "Peso (MX)" },
  { value: "CAD", label: "Dollar (CA)" },
  { value: "AUD", label: "Dollar (AU)" },
];

function PayForm({ onSubmit, onBack }: PayFormProps) {
  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema, {}),
    defaultValues: {
      amount: 0,
      currency: "ZAR",
      account_to: "",
    },
    reValidateMode: "onChange",
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 flex flex-col h-full justify-between"
      >
        <div className="flex-grow space-y-1">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input placeholder="Amount" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Currency</FormLabel>
                <FormControl>
                  <Combobox options={currencies} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="account_to"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account To</FormLabel>
                <FormControl>
                  <Input placeholder="Account To" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end place-self-end space-x-2">
          <Button variant={"destructive"} onClick={onBack}>
            Back
          </Button>
          <Button type="submit" variant="special">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default PayForm;
