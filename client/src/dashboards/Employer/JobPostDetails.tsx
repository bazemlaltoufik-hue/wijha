import React, { useEffect, useState } from "react";
import {
  Search,
  Edit2,
  Save,
  X,
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  Users,
  Phone,
  Award,
} from "lucide-react";
import {
  ClipboardList,
  FileText,
  Lightbulb,
  ArrowLeft,
  Send,
  Check,
  Mail,
  Building2,
  Calendar as CalendarIcon,
} from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";

export default function JobPostManager() {
  const [applicants, setApplicants] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");
  const [state, setState] = useState("");
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const tabFromUrl = urlParams.get("jobPost");
  const [jobPost, setJobPost] = useState({
    title: "",
    description: "",
    location: "",
    companyName: "TechCorp Solutions",
    industry: "",
    jobType: "",
    workArrangement: "",
    experienceLevel: "",
    educationLevel: "",
    numberOfPositions: "",
    salaryRange: "",
    deadline: new Date(),
  });

  useEffect(() => {
    const getJobPost = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/jobpost/${tabFromUrl}`,
        );
        const data = await res.json();
        if (res.ok) {
          console.log("Fetched job post:", data);
          setJobPost(data);
        } else {
          console.error("Failed to fetch job post:", data);
        }
      } catch (error) {
        console.error("Error fetching job post:", error);
      }
    };
    getJobPost();
  }, []);

  useEffect(() => {
    if (jobPost && jobPost.title) {
      form.reset({
        title: jobPost.title,
        description: jobPost.description,
        location: jobPost.location,
        companyName: jobPost.companyName,
        industry: jobPost.industry,
        jobType: jobPost.jobType,
        workArrangement: jobPost.workArrangement,
        experienceLevel: jobPost.experienceLevel,
        educationLevel: jobPost.educationLevel,
        numberOfPositions: jobPost.numberOfPositions,
        salaryRange: jobPost.salaryRange,
        deadline: new Date(jobPost.deadline),
      });
    }
  }, [jobPost]);

  useEffect(() => {
    const getApplicants = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/application/getall?jobOfferId=${jobPost._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        const data = await res.json();
        if (res.ok) {
          setApplicants(data);
        } else {
          console.error("Failed to fetch applicants:", data);
        }
      } catch (error) {
        console.error("Error fetching applicants:", error);
      } finally {
        setLoading(false);
      }
    };
    getApplicants();
  });

  const FormSchema = z.object({
    title: z.string().min(1, "Job title is required."),
    description: z.string().min(1, "Job description is required."),
    location: z.string().min(1, "Location is required."),
    companyName: z.string().min(1, "Company name is required."),
    industry: z.string().min(1, "Industry is required."),
    jobType: z.string().min(1, "Job type is required."),
    workArrangement: z.string().min(1, "Work arrangement is required."),
    experienceLevel: z.string().min(1, "Experience level is required."),
    educationLevel: z.string().min(1, "Education level is required."),
    numberOfPositions: z.string().min(1, "Number of positions is required."),
    salaryRange: z.string(),
    deadline: z.date().min(new Date(), "Deadline must be in the future."),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      companyName: "TechCorp Solutions",
      industry: "",
      jobType: "",
      workArrangement: "",
      experienceLevel: "",
      educationLevel: "",
      numberOfPositions: "",
      salaryRange: "",
      deadline: new Date(),
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/jobpost/${tabFromUrl}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      const result = await res.json();
      if (res.ok) {
        navigate("/dashboard?tab=jobPost");
      } else {
        console.error("Failed to update job post:", result);
      }
    } catch (error) {
      console.error("Error updating job post:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            Job Management
          </h1>
          <p className="text-slate-600">
            Manage your job postings and review applicants
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center items-center gap-2 p-4 bg-white shadow-sm rounded-lg mb-4">
          <Button
            onClick={() => setActiveTab("details")}
            className={`flex-1 px-4 py-2 ${
              activeTab === "details"
                ? "bg-[#008CBA] hover:bg-[#00668C]  text-white"
                : " hover:bg-[#008CBA] border-2 border-[#008CBA] transition hover:text-white"
            }  font-medium transition cursor-pointer`}
          >
            details
          </Button>
          <Button
            onClick={() => setActiveTab("applicants")}
            className={`flex-1 px-4 py-2 ${
              activeTab === "applicants"
                ? "bg-[#008CBA] hover:bg-[#00668C]  text-white"
                : " hover:bg-[#008CBA] border-2 border-[#008CBA] transition hover:text-white"
            }  font-medium transition cursor-pointer`}
          >
            applicants
          </Button>
        </div>

        {/* Job Details Tab */}
        {activeTab === "details" && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="p-8 space-y-8"
              >
                {/* Basic Information */}
                <section className="">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="bg-[#008CBA] text-white w-10 h-10 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Basic Information
                    </h2>
                  </div>

                  <div className="flex flex-col gap-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="input-label">
                            Job Title
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="input-icon" size={20} />
                              <Input
                                placeholder="e.g., Senior Software Engineer"
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
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="input-label">
                            Location
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="input-icon" size={20} />
                              <Input
                                placeholder="e.g., New York, NY"
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
                              <Mail className="input-icon" size={20} />
                              <Input
                                disabled
                                placeholder="e.g., Acme Corp"
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
                </section>

                {/* Employment Details */}
                <section className="">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="bg-[#008CBA] text-white w-10 h-10 rounded-lg flex items-center justify-center">
                      <ClipboardList className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Employment Details
                    </h2>
                  </div>

                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col sm:flex-row gap-6 ">
                      <FormField
                        control={form.control}
                        name="jobType"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="input-label">
                              Job Type
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Building2 className="input-icon" size={20} />
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <SelectTrigger className="input">
                                    <SelectValue placeholder="Select job type" />
                                  </SelectTrigger>
                                  <SelectContent className="p-2 border-gray-300 bg-white">
                                    <SelectItem
                                      key="1"
                                      className="hover:bg-blue-50"
                                      value="Full-time"
                                    >
                                      Full-time
                                    </SelectItem>
                                    <SelectItem
                                      key="2"
                                      className="hover:bg-blue-50"
                                      value="Part-time"
                                    >
                                      Part-time
                                    </SelectItem>
                                    <SelectItem
                                      key="3"
                                      className="hover:bg-blue-50"
                                      value="Contract"
                                    >
                                      Contract
                                    </SelectItem>
                                    <SelectItem
                                      key="4"
                                      className="hover:bg-blue-50"
                                      value="Internship"
                                    >
                                      Internship
                                    </SelectItem>
                                    <SelectItem
                                      key="5"
                                      className="hover:bg-blue-50"
                                      value="Temporary"
                                    >
                                      Temporary
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </FormControl>
                            <FormMessage className="input-msg" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="industry"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="input-label">
                              job field
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Building2 className="input-icon" size={20} />
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger className="input">
                                    <SelectValue placeholder="Select job field" />
                                  </SelectTrigger>
                                  <SelectContent className="p-2 border-gray-300 bg-white">
                                    <SelectItem
                                      key="1"
                                      className="hover:bg-blue-50"
                                      value="Technology & IT"
                                    >
                                      Technology & IT
                                    </SelectItem>
                                    <SelectItem
                                      key="2"
                                      className="hover:bg-blue-50"
                                      value="Business & Finance"
                                    >
                                      Business & Finance
                                    </SelectItem>
                                    <SelectItem
                                      key="3"
                                      className="hover:bg-blue-50"
                                      value="Sales & Marketing"
                                    >
                                      Sales & Marketing
                                    </SelectItem>
                                    <SelectItem
                                      key="4"
                                      className="hover:bg-blue-50"
                                      value="Engineering"
                                    >
                                      Engineering
                                    </SelectItem>
                                    <SelectItem
                                      key="5"
                                      className="hover:bg-blue-50"
                                      value="Healthcare & Medical"
                                    >
                                      Healthcare & Medical
                                    </SelectItem>
                                    <SelectItem
                                      key="6"
                                      className="hover:bg-blue-50"
                                      value="Education & Training"
                                    >
                                      Education & Training
                                    </SelectItem>
                                    <SelectItem
                                      key="7"
                                      className="hover:bg-blue-50"
                                      value="Creative & Media"
                                    >
                                      Creative & Media
                                    </SelectItem>
                                    <SelectItem
                                      key="8"
                                      className="hover:bg-blue-50"
                                      value="Logistics & Supply Chain"
                                    >
                                      Logistics & Supply Chain
                                    </SelectItem>
                                    <SelectItem
                                      key="9"
                                      className="hover:bg-blue-50"
                                      value="Retail & Customer Service"
                                    >
                                      Retail & Customer Service
                                    </SelectItem>
                                    <SelectItem
                                      key="10"
                                      className="hover:bg-blue-50"
                                      value="Hospitality & Travel"
                                    >
                                      Hospitality & Travel
                                    </SelectItem>
                                    <SelectItem
                                      key="11"
                                      className="hover:bg-blue-50"
                                      value="Manufacturing & Production"
                                    >
                                      Manufacturing & Production
                                    </SelectItem>
                                    <SelectItem
                                      key="12"
                                      className="hover:bg-blue-50"
                                      value="Real Estate & Construction"
                                    >
                                      Real Estate & Construction
                                    </SelectItem>
                                    <SelectItem
                                      key="13"
                                      className="hover:bg-blue-50"
                                      value="Legal"
                                    >
                                      Legal
                                    </SelectItem>
                                    <SelectItem
                                      key="14"
                                      className="hover:bg-blue-50"
                                      value="Energy & Environment"
                                    >
                                      Energy & Environment
                                    </SelectItem>
                                    <SelectItem
                                      key="15"
                                      className="hover:bg-blue-50"
                                      value="Government & Public Services"
                                    >
                                      Government & Public Services
                                    </SelectItem>
                                    <SelectItem
                                      key="16"
                                      className="hover:bg-blue-50"
                                      value="agriculture"
                                    >
                                      Agriculture
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </FormControl>
                            <FormMessage className="input-msg" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="workArrangement"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="input-label">
                            work arrangement
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Building2 className="input-icon" size={20} />
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <SelectTrigger className="input">
                                  <SelectValue placeholder="Select work arrangement" />
                                </SelectTrigger>
                                <SelectContent className="p-2 border-gray-300 bg-white">
                                  <SelectItem
                                    key="1"
                                    className="hover:bg-blue-50"
                                    value="On-site"
                                  >
                                    On-site
                                  </SelectItem>
                                  <SelectItem
                                    key="2"
                                    className="hover:bg-blue-50"
                                    value="Remote"
                                  >
                                    Remote
                                  </SelectItem>
                                  <SelectItem
                                    key="3"
                                    className="hover:bg-blue-50"
                                    value="Hybrid"
                                  >
                                    Hybrid
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </FormControl>
                          <FormMessage className="input-msg" />
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-col sm:flex-row gap-6 ">
                      <FormField
                        control={form.control}
                        name="experienceLevel"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="input-label">
                              experience level
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Building2 className="input-icon" size={20} />
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <SelectTrigger className="input">
                                    <SelectValue placeholder="Select experience level" />
                                  </SelectTrigger>
                                  <SelectContent className="p-2 border-gray-300 bg-white">
                                    <SelectItem
                                      key="1"
                                      className="hover:bg-blue-50"
                                      value="Entry-level"
                                    >
                                      Entry-level
                                    </SelectItem>
                                    <SelectItem
                                      key="2"
                                      className="hover:bg-blue-50"
                                      value="Mid-level"
                                    >
                                      Mid-level
                                    </SelectItem>
                                    <SelectItem
                                      key="3"
                                      className="hover:bg-blue-50"
                                      value="Senior-level"
                                    >
                                      Senior-level
                                    </SelectItem>
                                    <SelectItem
                                      key="4"
                                      className="hover:bg-blue-50"
                                      value="Director"
                                    >
                                      Director
                                    </SelectItem>
                                    <SelectItem
                                      key="5"
                                      className="hover:bg-blue-50"
                                      value="Executive"
                                    >
                                      Executive
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </FormControl>
                            <FormMessage className="input-msg" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="educationLevel"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="input-label">
                              education level
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Building2 className="input-icon" size={20} />
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <SelectTrigger className="input">
                                    <SelectValue placeholder="Select education level" />
                                  </SelectTrigger>
                                  <SelectContent className="p-2 border-gray-300 bg-white">
                                    <SelectItem
                                      key="1"
                                      className="hover:bg-blue-50"
                                      value="High School"
                                    >
                                      High School
                                    </SelectItem>
                                    <SelectItem
                                      key="2"
                                      className="hover:bg-blue-50"
                                      value="Associate's Degree"
                                    >
                                      Associate's Degree
                                    </SelectItem>
                                    <SelectItem
                                      key="3"
                                      className="hover:bg-blue-50"
                                      value="Bachelor's Degree"
                                    >
                                      Bachelor's Degree
                                    </SelectItem>
                                    <SelectItem
                                      key="4"
                                      className="hover:bg-blue-50"
                                      value="Master's Degree"
                                    >
                                      Master's Degree
                                    </SelectItem>
                                    <SelectItem
                                      key="5"
                                      className="hover:bg-blue-50"
                                      value="Doctorate"
                                    >
                                      Doctorate
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </FormControl>
                            <FormMessage className="input-msg" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 ">
                      <FormField
                        control={form.control}
                        name="numberOfPositions"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="input-label">
                              Number of Positions
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="input-icon" size={20} />
                                <Input
                                  placeholder="e.g., 5"
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

                      <FormField
                        control={form.control}
                        name="salaryRange"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="input-label">
                              Salary Range
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="input-icon" size={20} />
                                <Input
                                  placeholder="e.g., $60,000 - $80,000 per year"
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
                  </div>
                </section>

                {/* Job Description */}
                <section className="">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="bg-[#008CBA] text-white w-10 h-10 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Job Description
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="input-label">
                            Job Description
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Mission / Role Overview

The purpose of this role is to support the company’s growth by contributing to key projects, ensuring efficient operations, and delivering high-quality work. The candidate will play an important role in improving processes, collaborating with team members, and helping the company achieve its goals.

Key Responsibilities

• Assist in planning and executing daily tasks and projects.
• Collaborate with team members to ensure smooth workflow and timely delivery.
• Monitor and report progress, highlighting any issues or improvements.
• Maintain accurate documentation and follow company procedures.
• Communicate effectively with internal teams and external partners when needed.

Requirements (Qualifications & Skills)

• Basic understanding of the field or relevant experience is preferred.
• Strong communication and organizational skills.
• Ability to manage time, prioritize tasks, and work independently when required.
• Problem-solving mindset and willingness to learn.
• Knowledge of common tools or software used in the role is a plus."
                              {...field}
                              className="h-[446px] text-[16px] w-full  px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008CBA] focus:border-transparent outline-none transition"
                            />
                          </FormControl>
                          <FormMessage className="input-msg" />
                        </FormItem>
                      )}
                    />
                  </div>
                </section>

                {/* Application Deadline */}
                <section className="">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="bg-[#008CBA] text-white w-10 h-10 rounded-lg flex items-center justify-center">
                      <CalendarIcon className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Application Deadline
                    </h2>
                  </div>

                  <div className="max-w-md">
                    <FormField
                      control={form.control}
                      name="deadline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="input-label">
                            Event Date
                          </FormLabel>
                          <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                              <FormControl className="w-full">
                                <Button className="input" variant={"outline"}>
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className=" border-none bg-white"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value ?? undefined}
                                onSelect={(date) => {
                                  field.onChange(date);
                                  setOpen(false);
                                }}
                                captionLayout="dropdown"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <p className="mt-2 text-xs text-gray-500">
                      Applications will close at 11:59 PM on this date
                    </p>
                  </div>
                </section>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button
                    onClick={() => setState("draft")}
                    type="submit"
                    className="border-box cursor-pointer h-auto flex-1 px-4 py-2 border-2 border-[#008CBA] text-[#008CBA] font-semibold rounded-lg hover:bg-blue-50 transition"
                  >
                    <Save className="w-5 h-5" />
                    <span>Save Draft</span>
                  </Button>
                  <Button
                    type="submit"
                    className="border-box cursor-pointer flex-1 px-4 py-2 bg-[#008CBA] text-white h-auto font-semibold rounded-lg hover:opacity-90 transition"
                  >
                    <Send className="w-5 h-5" />
                    <span>Create</span>
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}

        {/* Applicants Tab */}
        {activeTab === "applicants" && (
          <div className="flex flex-col gap-4 mt-6">
            {applicants.map((applicant) => (
              <div
                key={applicant.id}
                className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <img
                    src={applicant.jobSeekerId.profileImage}
                    alt="profileImage"
                    className="w-16 h-16 rounded-2xl border-4 border-gray-200 self-start"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {applicant.jobSeekerId.firstName}{" "}
                        {applicant.jobSeekerId.lastName}
                      </h3>
                      <p className="text-gray-600 font-medium mb-3">
                        {applicant.jobSeekerId.professionalTitle}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">
                          <Mail className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-gray-500 font-medium">
                            Email
                          </p>
                          <p className="text-sm text-gray-900 truncate">
                            {applicant.jobSeekerId.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center">
                          <Phone className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-gray-500 font-medium">
                            {applicant.jobSeekerId.firstName}
                          </p>
                          <p className="text-sm text-gray-900">0668868241</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-purple-50 rounded-lg flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-purple-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-gray-500 font-medium">
                            Location
                          </p>
                          <p className="text-sm text-gray-900 truncate">
                            {applicant.jobSeekerId.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-orange-50 rounded-lg flex items-center justify-center">
                          <Award className="w-4 h-4 text-orange-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-gray-500 font-medium">
                            Experience
                          </p>
                          <p className="text-sm text-gray-900">
                            {applicant.jobSeekerId.experienceYears} years
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          Applied 2 days ago
                        </span>
                      </div>
                      <button
                        onClick={() => navigate("#")}
                        className="px-5 py-2  text-white rounded-lg font-medium bg-[#008CBA] hover:bg-[#00668C] cursor-pointer transition-colors"
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
