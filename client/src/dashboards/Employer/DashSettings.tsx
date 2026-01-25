import React, { useState } from "react";
import { Bell, Lock, Globe, Eye, EyeOff } from "lucide-react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

export default function SettingsPage() {
    const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState({
    newApplications: true,
    statusUpdates: true,
    interviews: true,
    weeklyDigest: false,
  });
  const [language, setLanguage] = useState("en");
  const {currentUser} = useSelector((state:any) => state.user);

  const handleNotificationToggle = (key) => {
    setEmailNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const FormSchema = z
    .object({
      currentPassword: z
        .string()
        .min(1, "Current password is required.")
        .min(8, "Password must be at least 8 characters."),
      newPassword: z
        .string()
        .min(1, "New password is required.")
        .min(8, "Password must be at least 8 characters."),
      confirmNewPassword: z
        .string()
        .min(1, "Confirm new password is required.")
        .min(8, "Password must be at least 8 characters."),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: "Passwords do not match.",
    });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/password/${currentUser?.userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if(res.ok) {
        toast.success("Password updated successfully.");
        form.reset();
      } else {
        toast.error(result.message || "Failed to update password.");
      }
    } catch (error) {
        toast.error("An error occurred. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl ">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="mt-1 text-gray-600">Manage your account preferences</p>
        </div>

        <div className="space-y-6">
          {/* Change Password Section */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-5 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#ebfaff] rounded-lg flex items-center justify-center">
                      <Lock className="text-[#008CBA]" size={20} />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        Change Password
                      </h2>
                      <p className="text-sm text-gray-500">
                        Update your password to keep your account secure
                      </p>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-6">
                  <div className="space-y-5">
                    {/* Current Password */}
                    <FormField
                      control={form.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="input-label">
                            Current Password
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="input-icon" size={20} />
                              <Input
                                placeholder="********"
                                type={showCurrentPassword ? "text" : "password"}
                                {...field}
                                className="input"
                              />
                              {showCurrentPassword ? (
                                <Eye
                                  className="input-icon-right"
                                  size={20}
                                  onClick={() => setShowCurrentPassword(false)}
                                />
                              ) : (
                                <EyeOff
                                  className="input-icon-right"
                                  size={20}
                                  onClick={() => setShowCurrentPassword(true)}
                                />
                              )}
                            </div>
                          </FormControl>
                          <FormMessage className="input-msg" />
                        </FormItem>
                      )}
                    />
                    {/* New Password */}
                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="input-label">
                            New Password
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="input-icon" size={20} />
                              <Input
                                placeholder="********"
                                type={showNewPassword ? "text" : "password"}
                                {...field}
                                className="input"
                              />
                              {showNewPassword ? (
                                <Eye
                                  className="input-icon-right"
                                  size={20}
                                  onClick={() => setShowNewPassword(false)}
                                />
                              ) : (
                                <EyeOff
                                  className="input-icon-right"
                                  size={20}
                                  onClick={() => setShowNewPassword(true)}
                                />
                              )}
                            </div>
                          </FormControl>
                          <FormMessage className="input-msg" />
                        </FormItem>
                      )}
                    />
                    {/* Confirm New Password */}
                    <FormField
                      control={form.control}
                      name="confirmNewPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="input-label">
                            Confirm New Password
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="input-icon" size={20} />
                              <Input
                                placeholder="********"
                                type={
                                  showConfirmNewPassword ? "text" : "password"
                                }
                                {...field}
                                className="input"
                              />
                              {showConfirmNewPassword ? (
                                <Eye
                                  className="input-icon-right"
                                  size={20}
                                  onClick={() =>
                                    setShowConfirmNewPassword(false)
                                  }
                                />
                              ) : (
                                <EyeOff
                                  className="input-icon-right"
                                  size={20}
                                  onClick={() =>
                                    setShowConfirmNewPassword(true)
                                  }
                                />
                              )}
                            </div>
                          </FormControl>
                          <FormMessage className="input-msg" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className=" mt-6 flex justify-end">
                    <button disabled={loading} className="cursor-pointer ml-auto px-6 py-2.5 bg-[#008CBA] text-white rounded-lg hover:bg-[#007a9e] transition-colors font-medium">
                      {loading ? <> <Spinner className="w-5 h-5"/> Updating...</> : "Update Password"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </Form>

          {/* Email Notifications Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-5 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#ebfaff] rounded-lg flex items-center justify-center">
                  <Bell className="text-[#008CBA]" size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Email Notifications
                  </h2>
                  <p className="text-sm text-gray-500">
                    Choose what updates you want to receive
                  </p>
                </div>
              </div>
            </div>
            <div className="px-6 py-6">
              <div className="space-y-4">
                {Object.entries(emailNotifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between py-3"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {key === "newApplications" && "New Applications"}
                        {key === "statusUpdates" &&
                          "Application Status Updates"}
                        {key === "interviews" && "Interview Reminders"}
                        {key === "weeklyDigest" && "Weekly Digest"}
                      </p>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {key === "newApplications" &&
                          "Get notified when candidates submit applications"}
                        {key === "statusUpdates" &&
                          "Receive updates when application status changes"}
                        {key === "interviews" &&
                          "Reminders for upcoming interviews"}
                        {key === "weeklyDigest" &&
                          "Weekly summary of recruitment activities"}
                      </p>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle(key)}
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        value ? "bg-[#008CBA]" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                          value ? "translate-x-5" : ""
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Language Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-5 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#ebfaff] rounded-lg flex items-center justify-center">
                  <Globe className="text-[#008CBA]" size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Language
                  </h2>
                  <p className="text-sm text-gray-500">
                    Select your preferred language
                  </p>
                </div>
              </div>
            </div>
            <div className="px-6 py-6">
              <div className="max-w-md">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                >
                  <option value="en">English</option>
                  <option value="fr">French</option>
                  <option value="ar">Arabic</option>
                </select>
              </div>
              <div className="mt-6 flex justify-end">
                <button className="cursor-pointer px-6 py-2.5 bg-[#008CBA] text-white rounded-lg hover:bg-[#007a9e] transition-colors font-medium">
                  Save Language
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
