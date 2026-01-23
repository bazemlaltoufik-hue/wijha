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
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Building2, Filter, MapPin, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface Job {
  _id: string;
  title: string;
  location: string;
  state: string;
  createdAt: string;
  views: number;
  applicants: number;
}

function DashFilter({
  setJobs,
  createdBy,
}: {
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  createdBy: string;
}) {
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/jobPost/getAllJobs?createdBy=${createdBy}${
          data.search && `&search=${data.search}`
        }${data.location && `&location=${data.location}`}${
          data.jobType && `&jobType=${data.jobType}`
        }${data.industry && `&industry=${data.industry}`}${
          data.workArrangement && `&workArrangement=${data.workArrangement}`
        }${data.experienceLevel && `&experienceLevel=${data.experienceLevel}`}${
          data.educationLevel && `&educationLevel=${data.educationLevel}`
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      const result = await res.json();
      if (res.ok) {
        setJobs(result.jobPosts);
      } else {
        throw new Error(result.message || "Failed to fetch job posts");
      }
    } catch (error) {
      console.error("Error fetching job posts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-between gap-8">
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
                  <FormItem className="hidden sm:block flex-1">
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
                        <Building2 className="input-icon-filter" size={16} />
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
            <Popover>
              <PopoverTrigger asChild>
                <Button className="py-2 px-4 text-white bg-[#008CBA]">
                  <Filter className="mr-1" /> Filters
                </Button>
              </PopoverTrigger>
              <PopoverContent className="bg-white flex flex-col gap-4 justify-center p-3 border-gray-200">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  {/* Location */}
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem className="sm:hidden">
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

                  <div className="mt-4 flex justify-between">
                    <Button
                      type="submit"
                      className="py-1.5 px-3 bg-[#008CBA] hover:bg-[#007B9E] cursor-pointer text-white"
                    >
                      Apply
                    </Button>
                    <Button className="py-1.5 px-3 bg-gray-300 hover:bg-[#008CBA] hover:text-white cursor-pointer text-gray-700">
                      Reset
                    </Button>
                  </div>
                </form>
              </PopoverContent>
            </Popover>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default DashFilter;
