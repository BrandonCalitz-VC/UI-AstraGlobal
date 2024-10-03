import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { z } from "zod";
import { signUpSchema } from "../../auth.scheme";

interface SignUpFormProps {
  onSubmit: (values: z.infer<typeof signUpSchema>) => void;
}

function SignUpForm({ onSubmit }: SignUpFormProps) {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema, {}),
    defaultValues: {
      email: "",
      password: "",
    },
    reValidateMode: "onChange",
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 flex flex-col h-full"
      >
        <div className="flex-grow space-y-2 ">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormDescription>
            Already have an account?{" "}
            <NavLink to="/auth/login" className="font-medium text-primary">
              Sign In
            </NavLink>
          </FormDescription>
          <Button type="submit" variant="special" className="mt-2">
            Sign Up
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default SignUpForm;
