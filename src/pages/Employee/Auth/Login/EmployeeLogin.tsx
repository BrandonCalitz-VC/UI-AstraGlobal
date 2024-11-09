import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { login } from "@/services/lib/user";
import { PasswordInput } from "@/components/ui/password-input";
import { useNavigate } from "react-router-dom";
import { authSchema } from "../auth.scheme";
import { useToast } from "@/hooks/use-toast";

function EmployeeLogin() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
      employee: true,
    },
  });

  const onSubmit = (values: z.infer<typeof authSchema>) => {
    const { email, password } = values as { email: string; password: string };

    login({ email, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/employee");
        toast({
          title: "Login Successful!",
          description: "You have successfully logged in!",
          variant: "default",
        });
      })
      .catch(() => {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          variant: "destructive",
        });
      });
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Employee Login</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 flex flex-col h-full"
          >
            <div className="flex-grow space-y-2">
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
              <Button type="submit" variant="employee" className="mt-2">
                Sign in
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </>
  );
}

export default EmployeeLogin;
