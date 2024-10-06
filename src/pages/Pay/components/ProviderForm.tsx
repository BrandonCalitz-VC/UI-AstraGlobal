import React from "react";
import { providerSchema } from "../pay.schema";
import { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox-input";

const providers = [{ value: "Swift", label: "Swift" }];

interface ProviderFormProps {
  onSubmit: (values: z.infer<typeof providerSchema>) => void;
  onBack: () => void;
}

function ProviderForm({ onSubmit, onBack }: ProviderFormProps) {
  const form = useForm<z.infer<typeof providerSchema>>({
    resolver: zodResolver(providerSchema, {}),
    defaultValues: {
      provider: "Swift",
      value_1: "",
      value_2: "",
    },
    reValidateMode: "onChange",
  });

  const provider = useWatch({
    control: form.control,
    name: "provider",
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
            name="provider"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Provider</FormLabel>
                <FormControl>
                  <Combobox options={providers} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          {provider === "Swift" && (
            <FormField
              control={form.control}
              name="value_1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Swift Code</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          )}
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

export default ProviderForm;
