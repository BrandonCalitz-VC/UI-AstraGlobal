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
import { NavLink, useNavigate } from "react-router-dom";
import { authSchema } from "../auth.scheme";
import { useToast } from "@/hooks/use-toast";

function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof authSchema>) {
    login(values).then(
      (res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        navigate("/");
        toast({
          title: "Login Successful!",
          description: "You have successfully logged in!",
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

  return (
    <>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
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
              <FormDescription>
                Don't have an account?{" "}
                <NavLink
                  to="/auth/register"
                  className="font-medium text-primary"
                >
                  Sign Up
                </NavLink>
              </FormDescription>
              <Button type="submit" variant="special" className="mt-2">
                Sign in
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </>
  );
}

export default Login;
