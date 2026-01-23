import React, { useState } from "react";
import {
  Search,
  MapPin,
  DollarSign,
  Briefcase,
  Clock,
  ChevronDown,
  SlidersHorizontal,
  Bookmark,
  Building2,
  TrendingUp,
  SearchIcon,
  Star,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { useSelector, useDispatch } from "react-redux";
import { removeSavedJob, saveJob } from "@/redux/user/userSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router";

interface Job {
  _id: string;
  title: string;
  location: string;
  state: string;
  applicants: number;
  views: number;
  createdAt: string;
}

const JobSearchPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const limit = 4;
  const [totalJobs, setTotalJobs] = useState(0);
  const totalPages = Math.ceil(totalJobs / limit);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state: any) => state.user);

  const fetchJobs = async (data?: any) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/jobPost/getAllJobs?state=Published&page=${page}&limit=${limit} ${
          data?.search && `&search=${data.search}`
        }${data?.location && `&location=${data.location}`}${
          data?.jobType && `&jobType=${data.jobType}`
        }${data?.industry && `&industry=${data.industry}`}${
          data?.workArrangement && `&workArrangement=${data.workArrangement}`
        }${data?.experienceLevel && `&experienceLevel=${data.experienceLevel}`}${
          data?.educationLevel && `&educationLevel=${data.educationLevel}`
        }`,
      );
      const info = await res.json();
      if (!res.ok) {
        console.error("Failed to fetch jobs:", info.message);
      } else {
        setJobs(info.jobPosts);
        setTotalJobs(info.totalcount);
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page]);

  const FormSchema = z.object({
    search: z.string(),
    location: z.string().optional(),
    jobType: z.string().optional(),
    industry: z.string().optional(),
    workArrangement: z.string().optional(),
    experienceLevel: z.string().optional(),
    educationLevel: z.string().optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search: "",
      location: "",
      jobType: "",
      industry: "",
      workArrangement: "",
      experienceLevel: "",
      educationLevel: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    fetchJobs(data);
  };

  const handleSaveJob = async (jobId: string) => {
    const updatedSaved = [...currentUser.saved, jobId];
    dispatch(saveJob(jobId));
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/${currentUser.userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ saved: updatedSaved }),
        },
      );
      const data = await res.json();
      if (res.ok) {
        toast.success("Job saved successfully");
      } else {
        dispatch(removeSavedJob(jobId));
        toast.error("Failed to save job");
      }
    } catch (error) {
      dispatch(removeSavedJob(jobId));
      console.error("Error saving job:", error);
    }
  };
  const handleRemoveSavedJob = async (jobId: string) => {
    const updatedSaved = currentUser.saved.filter((id: string) => id !== jobId);
    dispatch(removeSavedJob(jobId));
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/${currentUser.userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ saved: updatedSaved }),
        },
      );
      const data = await res.json();
      if (res.ok) {
        toast.success("Job unsaved successfully");
      } else {
        dispatch(saveJob(jobId));
        toast.error("Failed to unsaved job");
      }
    } catch (error) {
      dispatch(saveJob(jobId));
      console.error("Error unsaving job:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <div className="max-w-7xl mx-auto mt-20 px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Advanced Filter Sidebar */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <aside className="hidden lg:block lg:w-72 xl:w-80 flex-shrink-0">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="w-5 h-5 text-[#008CBA]" />
                      <h3 className="text-lg font-bold text-gray-900">
                        Filters
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    {/* search */}
                    <FormField
                      control={form.control}
                      name="search"
                      render={({ field }) => (
                        <FormItem className="border-b border-gray-100 pb-2 mb-2">
                          <FormLabel className="font-semibold text-gray-900 mb-1 text-sm">
                            Search Jobs
                          </FormLabel>
                          <div className="relative">
                            <SearchIcon
                              className="input-icon-filter"
                              size={14}
                            />
                            <Input
                              placeholder="Search"
                              type="text"
                              {...field}
                              className="input-filter"
                            />
                          </div>
                        </FormItem>
                      )}
                    />

                    {/* Location */}
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem className="border-b border-gray-100 pb-2 mb-2">
                          <FormLabel className="font-semibold text-gray-900 mb-1 text-sm">
                            Location
                          </FormLabel>
                          <div className="relative">
                            <MapPin className="input-icon-filter" size={14} />
                            <Input
                              placeholder="Location"
                              type="text"
                              {...field}
                              className="input-filter"
                            />
                          </div>
                        </FormItem>
                      )}
                    />

                    {/* Job Type */}
                    <FormField
                      control={form.control}
                      name="jobType"
                      render={({ field }) => (
                        <FormItem className="border-b border-gray-100 pb-2 mb-2">
                          <FormLabel className="font-semibold text-gray-900 mb-1 text-sm">
                            Job Type
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Building2
                                className="input-icon-filter"
                                size={16}
                              />
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger className="input-filter">
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
                        </FormItem>
                      )}
                    />

                    {/* Industry */}
                    <FormField
                      control={form.control}
                      name="industry"
                      render={({ field }) => (
                        <FormItem className="border-b border-gray-100 pb-2 mb-2">
                          <FormLabel className="font-semibold text-gray-900 mb-1 text-sm">
                            Industry
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Building2
                                className="input-icon-filter"
                                size={16}
                              />
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger className="input-filter">
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
                        </FormItem>
                      )}
                    />

                    {/* Work Arrangement */}
                    <FormField
                      control={form.control}
                      name="workArrangement"
                      render={({ field }) => (
                        <FormItem className="border-b border-gray-100 pb-2 mb-2">
                          <FormLabel className="font-semibold text-gray-900 mb-1 text-sm">
                            Work Arrangement
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Building2
                                className="input-icon-filter"
                                size={16}
                              />
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger className="input-filter">
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
                        </FormItem>
                      )}
                    />

                    {/* Experience Level */}
                    <FormField
                      control={form.control}
                      name="experienceLevel"
                      render={({ field }) => (
                        <FormItem className="border-b border-gray-100 pb-2 mb-2">
                          <FormLabel className="font-semibold text-gray-900 mb-1 text-sm">
                            Experience Level
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Building2
                                className="input-icon-filter"
                                size={16}
                              />
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger className="input-filter">
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
                        </FormItem>
                      )}
                    />

                    {/* Education Level */}
                    <FormField
                      control={form.control}
                      name="educationLevel"
                      render={({ field }) => (
                        <FormItem className="border-b border-gray-100 pb-2 mb-2">
                          <FormLabel className="font-semibold text-gray-900 mb-1 text-sm">
                            Education Level
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Building2
                                className="input-icon-filter"
                                size={16}
                              />
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger className="input-filter">
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
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mt-6 flex justify-center items-center gap-3">
                    <button
                      type="submit"
                      className="flex-1 cursor-pointer px-6 py-2 bg-[#008CBA] hover:bg-[#00668C] text-white transition rounded-lg border-2 border-[#008CBA] hover:border-[#00668C]"
                    >
                      Apply
                    </button>
                    <button
                      type="button"
                      className="flex-1 cursor-pointer px-6 py-2 bg-white hover:bg-[#008CBA] text-[#008CBA] hover:text-white transition rounded-lg border-2 border-[#008CBA]"
                      onClick={() => {
                        form.reset();
                        fetchJobs();
                      }}
                    >
                      clear
                    </button>
                  </div>
                </div>
              </aside>
            </form>
          </Form>

          <Form {...form}>
            <form>
              <div className="bg-white rounded-lg border-2 border-gray-50 w-full p-4 lg:hidden">
                <div className="w-full overflow-x-auto">
                  <div className="flex flex-row gap-3 justify-center items-center whitespace-nowrap w-full">
                    {/* search */}
                    <FormField
                      control={form.control}
                      name="search"
                      render={({ field }) => (
                        <FormItem className="flex-shrink-0 w-64 border-b border-gray-100 pb-2 mb-2">
                          <FormLabel className="font-semibold text-gray-900 mb-1 text-sm">
                            Search Jobs
                          </FormLabel>
                          <div className="relative">
                            <SearchIcon
                              className="input-icon-filter"
                              size={14}
                            />
                            <Input
                              placeholder="Search"
                              type="text"
                              {...field}
                              className="input-filter"
                            />
                          </div>
                        </FormItem>
                      )}
                    />

                    {/* Location */}
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem className="flex-shrink-0 w-64 border-b border-gray-100 pb-2 mb-2">
                          <FormLabel className="font-semibold text-gray-900 mb-1 text-sm">
                            Location
                          </FormLabel>
                          <div className="relative">
                            <MapPin className="input-icon-filter" size={14} />
                            <Input
                              placeholder="Location"
                              type="text"
                              {...field}
                              className="input-filter"
                            />
                          </div>
                        </FormItem>
                      )}
                    />

                    {/* Job Type */}
                    <FormField
                      control={form.control}
                      name="jobType"
                      render={({ field }) => (
                        <FormItem className="border-b border-gray-100 pb-2 mb-2">
                          <FormLabel className="font-semibold text-gray-900 mb-1 text-sm">
                            Job Type
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Building2
                                className="input-icon-filter"
                                size={16}
                              />
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger className="input-filter">
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
                        </FormItem>
                      )}
                    />

                    {/* Industry */}
                    <FormField
                      control={form.control}
                      name="industry"
                      render={({ field }) => (
                        <FormItem className="border-b border-gray-100 pb-2 mb-2">
                          <FormLabel className="font-semibold text-gray-900 mb-1 text-sm">
                            Industry
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Building2
                                className="input-icon-filter"
                                size={16}
                              />
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger className="input-filter">
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
                        </FormItem>
                      )}
                    />

                    {/* Work Arrangement */}
                    <FormField
                      control={form.control}
                      name="workArrangement"
                      render={({ field }) => (
                        <FormItem className="border-b border-gray-100 pb-2 mb-2">
                          <FormLabel className="font-semibold text-gray-900 mb-1 text-sm">
                            Work Arrangement
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Building2
                                className="input-icon-filter"
                                size={16}
                              />
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger className="input-filter">
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
                        </FormItem>
                      )}
                    />

                    {/* Experience Level */}
                    <FormField
                      control={form.control}
                      name="experienceLevel"
                      render={({ field }) => (
                        <FormItem className="border-b border-gray-100 pb-2 mb-2">
                          <FormLabel className="font-semibold text-gray-900 mb-1 text-sm">
                            Experience Level
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Building2
                                className="input-icon-filter"
                                size={16}
                              />
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger className="input-filter">
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
                        </FormItem>
                      )}
                    />

                    {/* Education Level */}
                    <FormField
                      control={form.control}
                      name="educationLevel"
                      render={({ field }) => (
                        <FormItem className="border-b border-gray-100 pb-2 mb-2">
                          <FormLabel className="font-semibold text-gray-900 mb-1 text-sm">
                            Education Level
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Building2
                                className="input-icon-filter"
                                size={16}
                              />
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger className="input-filter">
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
                        </FormItem>
                      )}
                    />

                    <div className=" flex justify-center items-center gap-3">
                      <button
                        type="submit"
                        className="flex-1 cursor-pointer px-4 py-1.5 bg-[#008CBA] hover:bg-[#00668C] text-white transition rounded-lg border-2 border-[#008CBA] hover:border-[#00668C]"
                      >
                        Apply
                      </button>
                      <button
                        type="button"
                        className="flex-1 cursor-pointer px-4 py-1.5 bg-white hover:bg-[#008CBA] text-[#008CBA] hover:text-white transition rounded-lg border-2 border-[#008CBA]"
                        onClick={() => {
                          form.reset();
                          fetchJobs();
                        }}
                      >
                        clear
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </Form>

          {/* Premium Job Listings */}
          <main className="flex-1 min-w-0">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {jobs.length} {jobs.length === 1 ? "Job" : "Jobs"} Found Found
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Based on your filters and search
                </p>
              </div>
            </div>

            {loading && (
              <div className="space-y-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div className="space-y-3 py-4">
                    {/* Job title */}
                    <Skeleton className="h-4 w-2/3 bg-gray-300" />

                    {/* Company name */}
                    <Skeleton className="h-3 w-1/3 bg-gray-300" />

                    {/* Location · Job type · Time */}
                    <div className="flex gap-3">
                      <Skeleton className="h-3 w-20 bg-gray-300" />
                      <Skeleton className="h-3 w-16 bg-gray-300" />
                      <Skeleton className="h-3 w-14 bg-gray-300" />
                    </div>

                    {/* Short description */}
                    <Skeleton className="h-3 w-11/12 bg-gray-300" />
                  </div>
                ))}
              </div>
            )}

            {/* Job Cards Grid */}
            {!loading && (
              <div className="flex flex-col gap-4">
                {jobs.map((job) => (
                  <div
                    key={job._id}
                    className={`relative flex flex-col gap-4 bg-white border-1 rounded-2xl p-6 shadow-sm border-gray-200`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-14 h-14 bg-[#E6F7FB] rounded-lg hidden sm:flex items-center justify-center text-2xl">
                          <img src={job.employerIdInfo.logo} alt="logo" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-1">
                            {job.title}
                          </h4>
                          <p className="text-sm text-gray-600 font-medium mb-2">
                            Yassir
                          </p>
                        </div>
                      </div>
                      {currentUser && currentUser.role !== "jobSeeker" && (
                        <button
                          onClick={() => {
                            if (currentUser.saved.includes(job._id)) {
                              handleRemoveSavedJob(job._id);
                            } else {
                              handleSaveJob(job._id);
                            }
                          }}
                        >
                          <Bookmark
                            className={`w-5 h-5 cursor-pointer transition-colors ${
                              currentUser.saved.includes(job._id)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-400"
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    <div className="flex flex-col text-sm text-gray-600 gap-2">
                      <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-4">
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1 text-[#008CBA]" />
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1 text-[#008CBA]" />
                          $30k
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1 text-[#008CBA]" />
                          Posted 3 days ago
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-end w-full">
                      <button
                        onClick={() => navigate(`/joboffer/${job._id}`)}
                        className="cursor-pointer self-end py-2 px-6 rounded-lg font-semibold text-white transition-all bg-[#008CBA] hover:bg-[#00668C]"
                      >
                        See details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results State */}
            {jobs.length === 0 && !loading && (
              <div className="text-center py-16 bg-white rounded-2xl border-2 border-gray-100">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No jobs found
                </h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your filters or search query
                </p>
                <button className="px-6 py-2.5 bg-[#008CBA] text-white rounded-xl hover:bg-[#006d91] transition font-medium">
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 p-4 w-full">
                {/* PREVIOUS BUTTON */}
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className={`text-[12px] ${
                    page === 1 ? "text-gray-400" : "text-[#9E9E9E]"
                  }`}
                >
                  Previous
                </button>

                {[...Array(totalPages)].map((_, i) => {
                  const num = i + 1;
                  return (
                    <button
                      key={num}
                      onClick={() => setPage(num)}
                      className={`px-3 py-2 rounded-lg text-[12px] border transition ${
                        page === num
                          ? "bg-[#008CBA] text-white"
                          : "bg-white text-[#9E9E9E] border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {num}
                    </button>
                  );
                })}

                {/* NEXT BUTTON */}
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className={`text-[12px] ${
                    page === totalPages ? "text-gray-400" : "text-[#9E9E9E]"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JobSearchPage;
