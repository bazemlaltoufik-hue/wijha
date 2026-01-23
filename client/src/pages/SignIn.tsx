import { Briefcase, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/ui/button";
import img from "../assets/1.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "@/components/ui/spinner";
import { signInSuccess } from "@/redux/user/userSlice";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const { currentUser } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const FormSchema = z.object({
    email: z
      .string()
      .min(1, "Email is required.")
      .email("Invalid email address"),
    password: z
      .string()
      .min(1, "Password is required.")
      .min(8, "Password must be at least 8 characters."),
    rememberMe: z.boolean(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        setLoading(false);
        setErrorMessage(result.message || "sign in failed. please try again.");
      } else {
        dispatch(signInSuccess(result));
        setLoading(false);
        navigate("/Dashboard?tab=dash");
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage("sign in failed. please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-transparent p-4">
              <img src={img} alt="logo" className="h-32" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to continue your job search journey
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="input-label">Email Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="input-icon" size={20} />
                        <Input
                          placeholder="you@example.com"
                          type="email"
                          {...field}
                          className="input"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="input-msg" />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="input-label">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="input-icon" size={20} />
                        <Input
                          placeholder="********"
                          type={showPassword ? "text" : "password"}
                          {...field}
                          className="input"
                        />
                        {showPassword ? (
                          <Eye
                            className="input-icon-right"
                            size={20}
                            onClick={() => setShowPassword(false)}
                          />
                        ) : (
                          <EyeOff
                            className="input-icon-right"
                            size={20}
                            onClick={() => setShowPassword(true)}
                          />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage className="input-msg" />
                  </FormItem>
                )}
              />

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex justify-center items-start flex-col">
                      <div className="flex items-start">
                        <FormControl>
                          <Checkbox
                            onCheckedChange={field.onChange}
                            checked={field.value}
                            className="input-checkbox cursor-pointer"
                          />
                        </FormControl>
                        <FormLabel className="text-sm text-gray-600 cursor-pointer">
                          Remember me
                        </FormLabel>
                      </div>
                      <FormMessage className="input-msg" />
                    </FormItem>
                  )}
                />
                <a
                  href="#"
                  className="text-sm font-medium text-[#008CBA] hover:text-[#00668C] transition"
                >
                  Forgot password?
                </a>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                className="py-3 px-4 h-auto! rounded-lg font-semibold text-white transition-all duration-200 bg-[#008CBA] hover:bg-[#00668C] active:bg-blue-80 w-full mt-6 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Spinner className="mr-2" /> Loading
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Form>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/registre"
                className="font-semibold text-[#008CBA] hover:text-[#00668C] transition"
              >
                Sign up for free
              </Link>
            </p>
          </div>
          {errorMessage && (
            <div
              className="mt-6 w-full p-4 text-sm text-red-700 bg-red-100 rounded-lg"
              role="alert"
            >
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
