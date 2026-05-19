import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormProvider,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/features/auth/hooks/use-login";
import {
  type LoginSchema,
  loginSchema,
} from "@/features/auth/schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const login = useLogin();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "alicia@matrixcrm.io",
      password: "demo123",
      remember: true,
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    await login.mutateAsync(values);
  });

  return (
    <Card className="border-white/50 bg-card/80">
      <CardHeader>
        <CardTitle className="text-3xl">Sign in</CardTitle>
        <CardDescription>
          Access your customer operating system.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form className="space-y-5" onSubmit={onSubmit}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="login-email">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="login-email"
                      placeholder="team@company.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.email?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="login-password">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        onClick={() => setShowPassword((value) => !value)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.password?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between gap-4">
              <label
                className="flex items-center gap-3 text-sm text-muted-foreground"
                htmlFor="remember-session"
              >
                <Checkbox
                  id="remember-session"
                  checked={form.watch("remember")}
                  onCheckedChange={(checked) =>
                    form.setValue("remember", checked === true)
                  }
                />
                Keep me signed in
              </label>
              <Link
                to="/auth/forgot-password"
                className="text-sm font-medium text-primary"
              >
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full" disabled={login.isPending}>
              {login.isPending ? "Signing in..." : "Continue to workspace"}
            </Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
