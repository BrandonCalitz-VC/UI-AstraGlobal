import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Combobox } from "@/components/ui/combobox-input";
import { bankInfoSchema } from "../../auth.scheme";

interface BankInfoFormProps {
  onSubmit: (values: z.infer<typeof bankInfoSchema>) => void;
  onBack: () => void;
}

function BankInfoForm({ onSubmit, onBack }: BankInfoFormProps) {
  const banks = [
    { value: "FNB", label: "FNB (First National Bank)" },
    { value: "ABSA", label: "ABSA Bank" },
    { value: "Nedbank", label: "Nedbank" },
    { value: "StandardBank", label: "Standard Bank" },
    { value: "Capitec", label: "Capitec Bank" },
    { value: "Investec", label: "Investec" },
  ];

  const form = useForm<z.infer<typeof bankInfoSchema>>({
    resolver: zodResolver(bankInfoSchema),
    defaultValues: {
      account_number: "",
      bank: "FNB",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 flex flex-col h-full"
      >
        <div className="flex-grow space-y-2 ">
          <FormField
            control={form.control}
            name="account_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Number</FormLabel>
                <FormControl>
                  <Input placeholder="Account Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bank"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank</FormLabel>
                <FormControl>
                  <Combobox options={banks} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="reset" variant="destructive" onClick={onBack}>
            Back
          </Button>
          <Button type="submit" variant="special">
            Finish
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default BankInfoForm;
