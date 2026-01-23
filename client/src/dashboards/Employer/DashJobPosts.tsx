import { useEffect, useState } from "react";
import {
  X,
  Edit2,
  Trash2,
  Eye,
  Plus,
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  Search,
  Filter,
  Upload,
  Pause,
  Play,
  Building2,
  SearchIcon,
  RouteOff,
} from "lucide-react";
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
import { useNavigate, Link } from "react-router";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import DashFilter from "./DashFilter";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

interface Job {
  _id: string;
  title: string;
  location: string;
  state: string;
  applicants: number;
  views: number;
  createdAt: string;
}

export default function DashJobPost() {
  const [loading, setLoading] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const limit = 4;
  const totalPages = Math.ceil(totalJobs / limit);

  const { currentUser } = useSelector((state: any) => state.user);

  const fetchJobs = async (data?: any) => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3000/api/jobPost/getAllJobs?createdBy=${
          currentUser.userId
        }&page=${page}&limit=${limit} ${
          data?.search && `&search=${data.search}`
        }${data?.location && `&location=${data.location}`}${
          data?.jobType && `&jobType=${data.jobType}`
        }${data?.industry && `&industry=${data.industry}`}${
          data?.workArrangement && `&workArrangement=${data.workArrangement}`
        }${
          data?.experienceLevel && `&experienceLevel=${data.experienceLevel}`
        }${data?.educationLevel && `&educationLevel=${data.educationLevel}`}`
      );
      const info = await res.json();
      if (!res.ok) {
        console.error("Failed to fetch jobs:", info.message);
      } else {
        setJobs(info.jobPosts);
        setTotalJobs(info.totalcount);
      }
    } catch (error) {
      console.error("An error occurred while fetching jobs:", error);
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
    fetchJobs(data);
  };

  const handleChangeState = async (jobId: string, newState: string) => {
    setLoadingState(true);
    try {
      const res = await fetch(`http://localhost:3000/api/jobPost/${jobId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ state: newState }),
      });
      const info = await res.json();
      if (res.ok) {
        // Update the job state in the local state
        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job._id === jobId ? { ...job, state: newState } : job
          )
        );
        toast.success("Job state updated successfully");
      } else {
        toast.error("Failed to update job state");
        console.error("Failed to update job state");
      }
    } catch (error) {
      console.error("An error occurred while updating job state:", error);
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Job Management</h1>
            <p className="mt-1 text-gray-600">
              Create and manage your job postings
            </p>
          </div>
          <button
            onClick={() => navigate("/dashboard?tab=createJobPost")}
            className="cursor-pointer inline-flex items-center justify-center px-6 py-3 bg-[#008CBA] text-white font-medium rounded-lg hover:bg-[#007399] transition-colors shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Job
          </button>
        </div>

        {/* filter bar */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex justify-between gap-2">
                <div className="flex gap-4 flex-1">
                  <FormField
                    control={form.control}
                    name="search"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <div className="relative">
                          <Search className="input-icon-filter" size={16} />
                          <Input
                            placeholder="Search jobs"
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
                      <FormItem className="hidden lg:block flex-1">
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
                      <FormItem className="hidden lg:block flex-1">
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
                </div>
                <Button
                  type="submit"
                  className="py-2 px-4 text-white bg-[#008CBA] cursor-pointer"
                >
                  <SearchIcon className="mr-1" />{" "}
                  <span className="hidden md:block">Search</span>
                </Button>
                <Button
                  onClick={() => {
                    form.reset();
                    fetchJobs();
                  }}
                  className="py-2 px-4 text-white bg-[#008CBA] cursor-pointer"
                >
                  <RouteOff className="mr-1" />{" "}
                  <span className="hidden md:block">Reset</span>
                </Button>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button className="py-2 px-4 text-white bg-[#008CBA] cursor-pointer">
                      <Filter className="mr-1" />{" "}
                      <span className="hidden md:block">Filters</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="bg-white p-3 border-gray-200">
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      <div className="flex flex-col gap-4 justify-center">
                        {/* Location */}
                        <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem className="lg:hidden">
                              <div className="relative">
                                <MapPin
                                  className="input-icon-filter"
                                  size={14}
                                />
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
                            <FormItem className="flex-1 lg:hidden">
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
                            <FormItem className="flex-1">
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
                            <FormItem>
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

                        <FormField
                          control={form.control}
                          name="experienceLevel"
                          render={({ field }) => (
                            <FormItem className="flex-1">
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

                        <FormField
                          control={form.control}
                          name="educationLevel"
                          render={({ field }) => (
                            <FormItem className="flex-1">
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
                    </form>
                  </PopoverContent>
                </Popover>
              </div>
            </form>
          </Form>
        </div>

        {loading && (
          <div className="w-full space-y-4">
            {/* Table header */}
            <div className="grid grid-cols-5 gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full bg-gray-300" />
              ))}
            </div>

            {/* Table rows */}
            {Array.from({ length: 6 }).map((_, rowIndex) => (
              <div
                key={rowIndex}
                className="grid grid-cols-5 gap-4 items-center"
              >
                {Array.from({ length: 5 }).map((_, colIndex) => (
                  <Skeleton
                    key={colIndex}
                    className="h-6 w-full rounded-md bg-gray-300"
                  />
                ))}
              </div>
            ))}
          </div>
        )}

        {!loading && jobs.length === 0 && (
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

        {!loading && jobs.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-full max-w-full">
            <div className="w-full overflow-x-auto">
              <table className="whitespace-nowrap w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Job Title
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Date Posted
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Applications
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Views
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {jobs.map((job) => (
                    <tr
                      key={job._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">
                            {job.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {job.location}
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            job.state === "In-review" &&
                            "bg-yellow-100 text-yellow-800"
                          }
                        ${
                          job.state === "Published" &&
                          "bg-green-100 text-green-800"
                        }
                        ${job.state === "Closed" && "bg-blue-100 text-blue-800"}
                          ${
                            job.state === "Draft" && "bg-gray-100 text-gray-800"
                          }
                          ${
                            job.state === "Rejected" &&
                            "bg-red-100 text-red-800"
                          }
                          ${
                            job.state === "Paused" &&
                            "bg-purple-100 text-purple-800"
                          }
                        `}
                        >
                          {job.state}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-sm text-gray-600">
                        {new Date(job.createdAt).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex items-center">
                          <span className="text-lg font-semibold text-gray-900">
                            {job.applicants}
                          </span>
                          <span className="ml-1 text-sm text-gray-500">
                            applicants
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 text-gray-400 mr-1" />
                          <span className="text-sm text-gray-600">
                            {job.views} views
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-1">
                          {loadingState && (
                            <Spinner className="w-5 h-5 text-gray-400" />
                          )}
                          {!loadingState && job.state === "Draft" && (
                            <Button
                              onClick={() =>
                                handleChangeState(job._id, "in-review")
                              }
                              className="cursor-pointer p-2 text-gray-600 hover:text-[#008CBA] hover:bg-blue-50 rounded-lg transition-colors"
                              title="Publish"
                            >
                              <Upload className="w-4 h-4" />
                            </Button>
                          )}
                          {!loadingState && job.state === "Published" && (
                            <Button
                              onClick={() =>
                                handleChangeState(job._id, "Paused")
                              }
                              className="cursor-pointer p-2 text-gray-600 hover:text-[#008CBA] hover:bg-blue-50 rounded-lg transition-colors"
                              title="Pause"
                            >
                              <Pause className="w-4 h-4" />
                            </Button>
                          )}
                          {!loadingState && job.state === "Paused" && (
                            <Button
                              onClick={() =>
                                handleChangeState(job._id, "Published")
                              }
                              className="cursor-pointer p-2 text-gray-600 hover:text-[#008CBA] hover:bg-blue-50 rounded-lg transition-colors"
                              title="resume"
                            >
                              <Play className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            className="cursor-pointer p-2 text-gray-600 hover:text-[#008CBA] hover:bg-blue-50 rounded-lg transition-colors"
                            title="View"
                          >
                            <Link target="_blank" to={`/joboffer/${job._id}`}>
                              <Eye className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button
                            onClick={() =>
                              navigate(
                                `/dashboard?tab=jobPostDetails&jobPost=${job._id}`
                              )
                            }
                            className=" cursor-pointer p-2 text-gray-600 hover:text-[#008CBA] hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            className="cursor-pointer p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
