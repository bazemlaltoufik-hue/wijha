import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Calendar,
  Star,
  Eye,
  MoreVertical,
  Clock,
  Award,
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
import { Button } from "@/components/ui/button";

const JobseekerDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalProfiles, setTotalProfiles] = useState(0);
  const limit = 4;
  const totalPages = Math.ceil(totalProfiles / limit);

  const FormSchema = z.object({
    search: z.string(),
    address: z.string().optional(),
    language: z.string().optional(),
    skills: z.string().optional(),
    minExp: z.string().optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search: "",
      address: "",
      language: "",
      skills: "",
      minExp: "",
    },
  });

  useEffect(() => {
    getProfiles();
  }, [page]);

  const getProfiles = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/profiles?${form.getValues().search && `&search=${form.getValues().search}`}${form.getValues().address && `&address=${form.getValues().address}`}${form.getValues().language && `&language=${form.getValues().language}`}${form.getValues().skills && `&skills=${form.getValues().skills}`}${form.getValues().minExp && `&minExp=${form.getValues().minExp}`}&page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const data = await res.json();
      if (res.ok) {
        setProfiles(data);
      } else {
        console.error("Failed to fetch profiles:", data);
      }
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    getProfiles();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Applicants</h1>
          <p className="mt-1 text-gray-600">
            Manage and review jobseeker applications
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
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

                  {/* address */}
                  <FormField
                    control={form.control}
                    name="address"
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
                  {/* Language */}
                  <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem className="hidden lg:block flex-1">
                        <FormControl>
                          <div className="relative">
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
                                  value="arabic"
                                >
                                  Arabic
                                </SelectItem>
                                <SelectItem
                                  key="2"
                                  className="hover:bg-blue-50"
                                  value="French"
                                >
                                  French
                                </SelectItem>
                                <SelectItem
                                  key="3"
                                  className="hover:bg-blue-50"
                                  value="Spanish"
                                >
                                  Spanish
                                </SelectItem>
                                <SelectItem
                                  key="4"
                                  className="hover:bg-blue-50"
                                  value="English"
                                >
                                  English
                                </SelectItem>
                                <SelectItem
                                  key="5"
                                  className="hover:bg-blue-50"
                                  value="German"
                                >
                                  German
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
                        {/* address */}
                        <FormField
                          control={form.control}
                          name="address"
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
                        {/* language */}
                        <FormField
                          control={form.control}
                          name="language"
                          render={({ field }) => (
                            <FormItem className="flex-1 lg:hidden">
                              <FormControl>
                                <div className="relative">
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
                                        value="arabic"
                                      >
                                        Arabic
                                      </SelectItem>
                                      <SelectItem
                                        key="2"
                                        className="hover:bg-blue-50"
                                        value="French"
                                      >
                                        French
                                      </SelectItem>
                                      <SelectItem
                                        key="3"
                                        className="hover:bg-blue-50"
                                        value="Spanish"
                                      >
                                        Spanish
                                      </SelectItem>
                                      <SelectItem
                                        key="4"
                                        className="hover:bg-blue-50"
                                        value="English"
                                      >
                                        English
                                      </SelectItem>
                                      <SelectItem
                                        key="5"
                                        className="hover:bg-blue-50"
                                        value="German"
                                      >
                                        German
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        {/* skills */}
                        <FormField
                          control={form.control}
                          name="skills"
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <div className="relative">
                                <Input
                                  placeholder="Skills"
                                  type="text"
                                  {...field}
                                  className="input-filter"
                                />
                              </div>
                            </FormItem>
                          )}
                        />

                        {/* minExp */}
                        <FormField
                          control={form.control}
                          name="minExp"
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <div className="relative">
                                <Search
                                  className="input-icon-filter"
                                  size={16}
                                />
                                <Input
                                  placeholder="Min Experience (years)"
                                  type="number"
                                  {...field}
                                  className="input-filter"
                                />
                              </div>
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

        {/* Jobseeker Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {profiles.map((profile) => (
            <div
              key="1"
              className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <img
                  src={profile.profileImage}
                  alt="profileImage"
                  className="w-16 h-16 rounded-2xl border-4 border-gray-200 self-start"
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {profile.firstName} {profile.lastName}
                    </h3>
                    <p className="text-gray-600 font-medium mb-3">
                      {profile.professionalTitle}
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
                          {profile.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center">
                        <Phone className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500 font-medium">
                          Phone
                        </p>
                        <p className="text-sm text-gray-900">
                          {profile.phoneNumber}
                        </p>
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
                          {profile.address}
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
                          {profile.experienceYears} years
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
                    <button className="px-5 py-2  text-white rounded-lg font-medium bg-[#008CBA] hover:bg-[#00668C] cursor-pointer transition-colors">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {profiles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No jobseekers found matching your criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobseekerDashboard;
