import { useEffect, useState } from "react";
import {
  Briefcase,
  User,
  Mail,
  Lock,
  Building2,
  Phone,
  MapPin,
  Users,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import { Button } from "../components/ui/button";
import logo from "../assets/1.png";
import { Spinner } from "@/components/ui/spinner";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

export default function Registre() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accountType, setAccountType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    if (accountType === "jobseeker") {
      form.reset({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
        password: "",
        confirmPassword: "",
        termsAndConditions: false,
      });
    } else if (accountType === "employer") {
      form.reset({
        companyName: "",
        size: "",
        industry: "",
        address: "",
        email: "",
        password: "",
        confirmPassword: "",
        termsAndConditions: false,
      });
    }
  }, [accountType]);

  const industries = [
    "Technology & Digital",
    "Engineering & Technical",
    "Business & Corporate Services",
    "Sales, Marketing & Customer Service",
    "Industrial & Manufacturing",
    "Creative, Media & Design",
    "Healthcare & Life Sciences",
    "Education & Training",
    "Government & Public Sector",
    "Hospitality & Tourism",
    "Transportation & Logistics",
    "Energy & Environment",
    "Agriculture & Food",
    "Non-Profit & Community Services",
    "Others",
  ];

  const companySize = [
    "1-10",
    "11-50",
    "51-200",
    "201-500",
    "501-1000",
    "1000+",
  ];

  const jobSeekerSchema = z
    .object({
      firstName: z
        .string()
        .min(1, "User name is required.")
        .min(2, "User name must be at least 2 characters.")
        .max(25, "User name must not exceed 25 characters."),
      lastName: z
        .string()
        .min(1, "User name is required.")
        .min(2, "User name must be at least 2 characters.")
        .max(25, "User name must not exceed 25 characters."),
      email: z
        .string()
        .min(1, "Email is required.")
        .email("Invalid email address"),
      phoneNumber: z
        .string()
        .min(1, "Phone number is required.")
        .regex(/^0[5-7]\d{8}$/, "Invalid Phone number"),
      address: z.string().min(1, "Address is required."),
      password: z
        .string()
        .min(1, "Password is required.")
        .min(8, "Password must be at least 8 characters."),
      confirmPassword: z.string().min(1, "Confirm password is required."),
      termsAndConditions: z.boolean().refine((val) => val === true, {
        message: "You must accept the terms and conditions.",
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords must match",
      path: ["confirmPassword"],
    });

  const employerSchema = z
    .object({
      companyName: z
        .string()
        .min(1, "Company name is required.")
        .min(2, "Company name must be at least 2 characters.")
        .max(100, "Company name must not exceed 100 characters."),
      size: z.string().min(1, "Company size is required."),
      address: z.string().min(1, "Address is required."),
      industry: z.string().min(1, "Industry is required."),
      email: z
        .string()
        .min(1, "Email is required.")
        .email("Invalid email address"),
      password: z
        .string()
        .min(1, "Password is required.")
        .min(8, "Password must be at least 8 characters."),
      confirmPassword: z.string().min(1, "Confirm password is required."),
      termsAndConditions: z.boolean().refine((val) => val === true, {
        message: "You must accept the terms and conditions.",
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords must match",
      path: ["confirmPassword"],
    });

  const FormSchema =
    accountType === "jobseeker" ? jobSeekerSchema : employerSchema;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues:
      accountType === "jobseeker"
        ? {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            address: "",
            password: "",
            confirmPassword: "",
            termsAndConditions: false,
          }
        : {
            companyName: "",
            size: "",
            industry: "",
            address: "",
            email: "",
            password: "",
            confirmPassword: "",
            termsAndConditions: false,
          },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, role: accountType }),
      });
      const result = await res.json();
      if (!res.ok) {
        setErrorMessage(result.message || "Registration failed.");
        setLoading(false);
      } else {
        toast.success("Registration successful! Please sign in.");
        navigate("/SignIn");
        setLoading(false);
      }
    } catch (error) {
      setErrorMessage("Registration failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className=" ">
              <img src={logo} alt="logo" className="h-32" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Your Account
          </h1>
          <p className="text-gray-600">
            Join thousands of professionals finding their perfect match
          </p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* Account Type Selection */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  I want to register as:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setAccountType("jobseeker")}
                    className={`p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                      accountType === "jobseeker"
                        ? "border-[#008CBA] bg-[#E6F7FB] shadow-md"
                        : "border-gray-200 hover:border-[#4DC2E7] hover:bg-gray-50"
                    }`}
                  >
                    <User
                      className={`mx-auto mb-3 ${
                        accountType === "jobseeker"
                          ? "text-[#008CBA]"
                          : "text-gray-400"
                      }`}
                      size={32}
                    />
                    <h3 className="font-semibold text-gray-900">Job Seeker</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Looking for opportunities
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAccountType("employer")}
                    className={`p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                      accountType === "employer"
                        ? "border-[#008CBA] bg-[#E6F7FB] shadow-md"
                        : "border-gray-200 hover:border-[#4DC2E7] hover:bg-gray-50"
                    }`}
                  >
                    <Building2
                      className={`mx-auto mb-3 ${
                        accountType === "employer"
                          ? "text-[#008CBA]"
                          : "text-gray-400"
                      }`}
                      size={32}
                    />
                    <h3 className="font-semibold text-gray-900">Employer</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Hiring talented people
                    </p>
                  </button>
                </div>
              </div>

              {accountType && (
                <>
                  <div className="flex flex-col gap-5 mb-6">
                    {/* Email Address */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="input-label">
                            Email Address
                          </FormLabel>
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
                          <FormLabel className="input-label">
                            Password
                          </FormLabel>
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
                                <EyeOff
                                  className="input-icon-right"
                                  size={20}
                                  onClick={() => setShowPassword(false)}
                                />
                              ) : (
                                <Eye
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

                    {/* Confirm Password */}
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="input-label">
                            Confirm Password
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="input-icon" size={20} />
                              <Input
                                placeholder="********"
                                type={showConfirmPassword ? "text" : "password"}
                                {...field}
                                className="input"
                              />
                              {showConfirmPassword ? (
                                <EyeOff
                                  className="input-icon-right"
                                  size={20}
                                  onClick={() => setShowConfirmPassword(false)}
                                />
                              ) : (
                                <Eye
                                  className="input-icon-right"
                                  size={20}
                                  onClick={() => setShowConfirmPassword(true)}
                                />
                              )}
                            </div>
                          </FormControl>
                          <FormMessage className="input-msg" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Job Seeker Specific Fields */}
                  {accountType === "jobseeker" && (
                    <div className="space-y-5 border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Personal Information
                      </h3>

                      <div className="flex flex-col sm:flex-row gap-5">
                        {/* First Name */}
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem className="flex-1 h-fit">
                              <FormLabel className="input-label">
                                First Name
                              </FormLabel>
                              <FormControl className="">
                                <div className="relative">
                                  <User className="input-icon" size={20} />
                                  <Input
                                    placeholder="John"
                                    type="text"
                                    {...field}
                                    className="input"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage className="input-msg" />
                            </FormItem>
                          )}
                        />

                        {/* Last Name */}
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem className="flex-1 h-fit">
                              <FormLabel className="input-label">
                                Last Name
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <User className="input-icon" size={20} />
                                  <Input
                                    placeholder="Doe"
                                    type="text"
                                    {...field}
                                    className="input"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage className="input-msg" />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Phone Number */}
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="input-label">
                              Phone Number
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Phone className="input-icon" size={20} />
                                <Input
                                  placeholder="+213 612345678"
                                  type="tel"
                                  {...field}
                                  className="input"
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="input-msg" />
                          </FormItem>
                        )}
                      />

                      {/* Location */}
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="input-label">
                              Address
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <MapPin className="input-icon" size={20} />
                                <Input
                                  placeholder="Alger, Cheraga"
                                  type="text"
                                  {...field}
                                  className="input"
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="input-msg" />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* Employer Specific Fields */}
                  {accountType === "employer" && (
                    <div className="flex flex-col gap-5 border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Company Information
                      </h3>

                      {/* Company Name */}
                      <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="input-label">
                              Company Name
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Building2 className="input-icon" size={20} />
                                <Input
                                  placeholder="Acme Corporation"
                                  type="text"
                                  {...field}
                                  className="input"
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="input-msg" />
                          </FormItem>
                        )}
                      />

                      {/* Location */}
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="input-label">
                              Address
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <MapPin className="input-icon" size={20} />
                                <Input
                                  placeholder="Alger, Cheraga"
                                  type="text"
                                  {...field}
                                  className="input"
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="input-msg" />
                          </FormItem>
                        )}
                      />

                      <div className="flex flex-col sm:flex-row gap-5">
                        {/* Industry */}
                        <FormField
                          control={form.control}
                          name="industry"
                          render={({ field }) => (
                            <FormItem className="flex-1 h-fit">
                              <FormLabel className="input-label">
                                Industry
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Building2 className="input-icon" size={20} />
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <SelectTrigger className="input">
                                      <SelectValue placeholder="Select Industry" />
                                    </SelectTrigger>
                                    <SelectContent className="p-2 border-gray-300 bg-white">
                                      {industries.map((industry, index) => {
                                        return (
                                          <SelectItem
                                            key={index}
                                            className="hover:bg-blue-50"
                                            value={industry}
                                          >
                                            {industry}
                                          </SelectItem>
                                        );
                                      })}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </FormControl>
                              <FormMessage className="input-msg" />
                            </FormItem>
                          )}
                        />

                        {/* Company Size */}
                        <FormField
                          control={form.control}
                          name="size"
                          render={({ field }) => (
                            <FormItem className="flex-1 h-fit">
                              <FormLabel className="input-label">
                                Company Size
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Users className="input-icon" size={20} />
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <SelectTrigger className="input">
                                      <SelectValue placeholder="Company Size" />
                                    </SelectTrigger>
                                    <SelectContent className="p-2 border-gray-300 bg-white">
                                      {companySize.map((size, index) => {
                                        return (
                                          <SelectItem
                                            key={index}
                                            className="hover:bg-blue-50"
                                            value={size}
                                          >
                                            {size}
                                          </SelectItem>
                                        );
                                      })}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </FormControl>
                              <FormMessage className="input-msg" />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  )}

                  {/* Terms and Submit */}
                  <div className="mt-6">
                    <FormField
                      control={form.control}
                      name="termsAndConditions"
                      render={({ field }) => (
                        <FormItem className="flex justify-center items-start flex-col">
                          <div className="flex items-start ">
                            <FormControl>
                              <Checkbox
                                onCheckedChange={field.onChange}
                                checked={field.value ?? false}
                                className="input-checkbox cursor-pointer"
                              />
                            </FormControl>
                            <FormLabel className="text-sm text-gray-600 cursor-pointer">
                              I agree to the terms and conditions
                            </FormLabel>
                          </div>
                          <FormMessage className="input-msg" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    disabled={loading}
                    type="submit"
                    className="py-3 px-4 h-auto! rounded-lg font-semibold text-white transition-all duration-200 bg-[#008CBA] hover:bg-[#00668C] cursor-pointer w-full mt-6"
                  >
                    {loading ? (
                      <>
                        <Spinner className="mr-2" /> Loading
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </>
              )}
            </form>
          </Form>
          {/* Sign In Link */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/SignIn"
              className="font-semibold text-[#008CBA] hover:text-[#00668C]"
            >
              Sign in
            </Link>
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
