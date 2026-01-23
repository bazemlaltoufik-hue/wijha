import { useState, useEffect } from "react";
import {
  Briefcase,
  ClipboardList,
  FileText,
  Lightbulb,
  ArrowLeft,
  Save,
  Send,
  Check,
  MapPin,
  Mail,
  Building2,
  Calendar as CalendarIcon,
  Pin,
} from "lucide-react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import JobDetailsPage from "../../pages/JobOffer";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const CreateJobPost = () => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState("In-review");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { currentUser } = useSelector((state: any) => state.user);

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
      companyName: currentUser.companyName,
      industry: "",
      jobType: "",
      workArrangement: "",
      experienceLevel: "",
      educationLevel: "",
      numberOfPositions: "",
      salaryRange: "",
      deadline: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);
    console.log({ ...data, state: state === "draft" && "draft" });
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/jobPost/create`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            state: state,
          }),
        },
      );
      const info = await res.json();
      if (res.ok) {
        setLoading(false);
        toast.success("Job post created successfully");
        navigate("/dashboard?tab=jobPost");
      } else {
        setLoading(false);
        console.log("Error:", info.message);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Create a Job Post
            </h1>
            <p className="mt-1 text-gray-600">
              Create a job post and reach the right candidates.
            </p>
          </div>
        </div>
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
                        <FormLabel className="input-label">Job Title</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="e.g., Senior Software Engineer"
                              type="text"
                              {...field}
                              className="input pl-4!"
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
                        <FormLabel className="input-label">Location</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="e.g., New York, NY"
                              type="text"
                              {...field}
                              className="input pl-4!"
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
                            <Input
                              disabled
                              placeholder="e.g., Acme Corp"
                              type="text"
                              {...field}
                              className="input pl-4!"
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
                        <FormItem className="flex-1 h-fit">
                          <FormLabel className="input-label">
                            Job Type
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger className="input pl-4!">
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
                        <FormItem className="flex-1 h-fit">
                          <FormLabel className="input-label">
                            job field
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger className="input pl-4!">
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
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="input pl-4!">
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
                        <FormItem className="flex-1 h-fit">
                          <FormLabel className="input-label">
                            experience level
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger className="input pl-4!">
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
                        <FormItem className="flex-1 h-fit">
                          <FormLabel className="input-label">
                            education level
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger className="input pl-4!">
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
                        <FormItem className="flex-1 h-fit">
                          <FormLabel className="input-label">
                            Number of Positions
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                placeholder="e.g., 5"
                                type="number"
                                {...field}
                                className="input pl-4!"
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
                        <FormItem className="flex-1 h-fit">
                          <FormLabel className="input-label">
                            Salary Range
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                placeholder="e.g., $60,000 - $80,000 per year"
                                type="text"
                                {...field}
                                className="input pl-4!"
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
                          Event Deadline
                        </FormLabel>
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <FormControl className="w-full">
                              <Button
                                className="input pl-4! justify-start cursor-pointer"
                                variant={"outline"}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
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
                              disabled={(date) =>
                                date <= new Date().setHours(0, 0, 0, 0)
                              }
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
                  onClick={() => setState("Draft")}
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
      </main>
    </div>
  );
};

export default CreateJobPost;
