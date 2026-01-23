import { useEffect, useRef, useState, type RefObject } from "react";
import {
  Building2,
  MapPin,
  Users,
  Globe,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  Award,
  TrendingUp,
  Star,
  ArrowUpRight,
  CheckCircle2,
  Target,
  Lightbulb,
  Heart,
  Zap,
  Clock,
  DollarSign,
  BookmarkPlus,
  Camera,
  Plus,
  Pen,
  X,
  PlusIcon,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { array, string, z } from "zod";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/lib/supabaseClient";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

export default function DashCompanyProfile() {
  const [loadingCoverImage, setLoadingCoverImage] = useState(false);
  const [loadingLogo, setLoadingLogo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingEditMode, setLoadingEditMode] = useState(false);
  const [section, setSection] = useState("information");
  const [editMode, setEditMode] = useState(false);
  const [mission, setMission] = useState("");
  const coverImageRef = useRef<HTMLInputElement | null>(null);
  const logoRef = useRef<HTMLInputElement | null>(null);

  const [companyInfo, setCompanyInfo] = useState({
    companyName: "",
    email: "",
    industry: "",
    size: "",
    phoneNumber: "",
    address: "",
    logo: "",
    coverImage: "",
    description: "",
    mission: [],
    foundingYear: "",
    website: "",
    registredName: "",
    legalForm: "",
    registredAdress: "",
    mainActivity: "",
    NIS: "",
    NIF: "",
    RC: "",
  });
  const { currentUser } = useSelector((state: any) => state.user);

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

  const removeMission = (index: number) => {
    const updatedMission = [...companyInfo.mission];
    updatedMission.splice(index, 1);
    setCompanyInfo({ ...companyInfo, mission: updatedMission });
    form.setValue("mission", updatedMission, {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/${currentUser.userId}`,
        );

        if (res.ok) {
          const data = await res.json();
          setCompanyInfo(data);
        } else {
          console.error("Failed to fetch company data");
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const FormSchema = z.object({
    companyName: string().min(2, "Company name must be at least 2 characters"),
    email: string(),
    industry: string().min(2, "Industry is required"),
    size: string(),
    phoneNumber: string().optional(),
    address: string().optional(),
    logo: string().optional(),
    coverImage: string().optional(),
    description: string().optional(),
    mission: array(string()).optional(),
    foundingYear: string().optional(),
    website: string().optional(),
    registredName: string().optional(),
    legalForm: string().optional(),
    registredAdress: string().optional(),
    mainActivity: string().optional(),
    NIS: string().optional(),
    NIF: string().optional(),
    RC: string().optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      companyName: companyInfo.companyName,
      email: companyInfo?.email ? companyInfo.email : "",
      industry: companyInfo?.industry ? companyInfo.industry : "",
      size: companyInfo?.size ? companyInfo.size : "",
      phoneNumber: companyInfo?.phoneNumber ? companyInfo.phoneNumber : "",
      address: companyInfo.address,
      logo: companyInfo?.logo ? companyInfo.logo : "",
      coverImage: companyInfo?.coverImage ? companyInfo.coverImage : "",
      description: companyInfo?.description ? companyInfo.description : "",
      mission: companyInfo?.mission ? companyInfo.mission : [],
      website: companyInfo?.website ? companyInfo.website : "",
      foundingYear: companyInfo?.foundingYear ? companyInfo.foundingYear : "",
      registredName: companyInfo?.registredName
        ? companyInfo.registredName
        : "",
      legalForm: companyInfo?.legalForm ? companyInfo.legalForm : "",
      registredAdress: companyInfo?.registredAdress
        ? companyInfo.registredAdress
        : "",
      mainActivity: companyInfo?.mainActivity ? companyInfo.mainActivity : "",
      NIS: companyInfo?.NIS ? companyInfo.NIS : "",
      NIF: companyInfo?.NIF ? companyInfo.NIF : "",
      RC: companyInfo?.RC ? companyInfo.RC : "",
    },
  });

  useEffect(() => {
    if (companyInfo && companyInfo.companyName) {
      form.reset({
        companyName: companyInfo.companyName,
        industry: companyInfo.industry || "",
        email: companyInfo.email || "",
        size: companyInfo.size || "",
        phoneNumber: companyInfo.phoneNumber || "",
        address: companyInfo.address || "",
        logo: companyInfo.logo || "",
        coverImage: companyInfo.coverImage || "",
        description: companyInfo.description || "",
        mission: companyInfo.mission || "",
        foundingYear: companyInfo.foundingYear || "",
        website: companyInfo.website || "",
        registredName: companyInfo.registredName || "",
        legalForm: companyInfo.legalForm || "",
        registredAdress: companyInfo.registredAdress || "",
        mainActivity: companyInfo.mainActivity || "",
        NIS: companyInfo.NIS || "",
        NIF: companyInfo.NIF || "",
        RC: companyInfo.RC || "",
      });
    }
  }, [companyInfo]);

  const handleUploadLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoadingLogo(true);
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    console.log(file);

    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("wijha")
      .upload(`public/${fileName}`, file);

    if (error) {
      console.error(error.message);
      return;
    }

    const { data } = supabase.storage
      .from("wijha")
      .getPublicUrl(`public/${fileName}`);

    if (!data?.publicUrl) return;

    data &&
      form.setValue("logo", data.publicUrl, {
        shouldDirty: true,
        shouldTouch: true,
      });
    data && setCompanyInfo({ ...companyInfo, logo: data.publicUrl });

    setLoadingLogo(false);
  };

  const handleUploadCoverImage = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setLoadingCoverImage(true);
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("wijha")
      .upload(`public/${fileName}`, file);

    if (error) {
      console.error(error);
      return;
    }

    const { data } = supabase.storage
      .from("wijha")
      .getPublicUrl(`public/${fileName}`);

    console.log(data.publicUrl);

    if (!data?.publicUrl) return;

    data &&
      form.setValue("coverImage", data.publicUrl, {
        shouldDirty: true,
        shouldTouch: true,
      });

    data && setCompanyInfo({ ...companyInfo, coverImage: data.publicUrl });
    setLoadingCoverImage(false);
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoadingEditMode(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/${currentUser.userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      if (res.ok) {
        setEditMode(false);
        const updatedData = await res.json();
        toast.success("profile information edited successfuly");
        setCompanyInfo(updatedData);
      } else {
        toast.error("There is an error");
        console.error("Failed to update company data");
      }
    } catch (error) {
      console.error("Error updating company data:", error);
    } finally {
      setLoadingEditMode(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
          {loading && (
            <div className="space-y-8">
              {/* ===== Header ===== */}
              <div className="relative">
                {/* Cover image */}
                <Skeleton className="h-48 w-full rounded-lg bg-gray-200" />

                {/* Avatar + name */}
                <div className="flex items-end gap-4 mt-[-40px] px-4">
                  <Skeleton className="h-20 w-20 rounded-full bg-gray-200" />

                  <div className="space-y-2 pb-2">
                    <Skeleton className="h-6 w-48 bg-gray-200" />
                    <Skeleton className="h-4 w-32 bg-gray-200" />
                  </div>
                </div>
              </div>

              {/* ===== Content ===== */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main content */}
                <div className="md:col-span-2 space-y-4">
                  <Skeleton className="h-5 w-40" />

                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-11/12" />
                    <Skeleton className="h-4 w-10/12" />
                    <Skeleton className="h-4 w-9/12" />
                  </div>

                  {/* Section */}
                  <Skeleton className="h-5 w-32 mt-4 bg-gray-200" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full bg-gray-200" />
                    <Skeleton className="h-4 w-5/6 bg-gray-200" />
                    <Skeleton className="h-4 w-4/6 bg-gray-200" />
                  </div>
                </div>

                {/* Side content */}
                <div className="space-y-4">
                  <Skeleton className="h-5 w-32 bg-gray-200" />

                  <div className="space-y-3">
                    <Skeleton className="h-4 w-full bg-gray-200" />
                    <Skeleton className="h-4 w-5/6 bg-gray-200" />
                    <Skeleton className="h-4 w-4/6 bg-gray-200" />
                  </div>

                  <Skeleton className="h-5 w-28 mt-4 bg-gray-200" />
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-full bg-gray-200" />
                    <Skeleton className="h-4 w-3/4 bg-gray-200" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {!loading && (
            <>
              {/* Company Header */}
              <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Company Profile
                  </h1>
                  <p className="mt-1 text-gray-600">
                    Manage and update your company information
                  </p>
                </div>
                {editMode ? (
                  <button
                    className="cursor-pointer flex items-center justify-center px-6 py-3 bg-[#008CBA] text-white font-medium rounded-lg hover:bg-[#007399] transition-colors shadow-md hover:shadow-lg"
                    type="submit"
                  >
                    {loadingEditMode ? (
                      <Spinner className="h-4 w-4" />
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                ) : (
                  <Button
                    type="button"
                    onClick={() => {
                      setEditMode(true);
                    }}
                    className="cursor-pointer flex items-center justify-center !px-6 !py-3 bg-[#008CBA] text-white !font-medium rounded-lg hover:bg-[#007399] transition-colors shadow-md hover:shadow-lg"
                  >
                    <Pen className="w-5 h-5 mr-2" />
                    Edit Mode
                  </Button>
                )}
              </div>

              {/* profile header */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
                {/* Cover Image Section */}
                <div className="relative h-40 bg-[#008CBA]">
                  {companyInfo.coverImage ? (
                    <img
                      src={
                        companyInfo.coverImage ||
                        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&h=400&fit=crop"
                      }
                      alt="Cover"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#008CBA]" />
                  )}

                  {/* Edit Cover Button (shown in edit mode) */}
                  {editMode && (
                    <>
                      <FormField
                        control={form.control}
                        name="coverImage"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="file"
                                className="hidden"
                                ref={coverImageRef}
                                onChange={handleUploadCoverImage}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <button
                        type="button"
                        className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-700 px-4 py-2 rounded-lg shadow-md flex items-center gap-2 transition-all"
                        onClick={() => {
                          coverImageRef.current?.click();
                        }}
                      >
                        {loadingCoverImage ? (
                          <Spinner className="h-4 w-4" />
                        ) : (
                          <>
                            <Camera className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              Edit Cover
                            </span>
                          </>
                        )}
                      </button>
                    </>
                  )}
                </div>

                {/* Profile Content */}
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-20">
                    {/* Logo with Edit Button Overlay */}
                    <div className="relative m-auto sm:m-0">
                      <img
                        src={companyInfo.logo || ""}
                        alt="logo"
                        className="w-32 h-32 rounded-xl border-4 border-white shadow-lg object-cover bg-white"
                      />
                      {editMode && (
                        <>
                          <FormField
                            control={form.control}
                            name="logo"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    type="file"
                                    className="hidden"
                                    ref={logoRef}
                                    onChange={handleUploadLogo}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          {loadingLogo ? (
                            <div className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-all">
                              <Spinner className="h-4 w-4 text-gray-700" />
                            </div>
                          ) : (
                            <button
                              type="button"
                              className="cursor-pointer absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-all"
                              onClick={() => {
                                logoRef.current?.click();
                              }}
                            >
                              <Camera className="w-4 h-4 text-gray-700" />
                            </button>
                          )}
                        </>
                      )}
                    </div>

                    <div className="flex-1 m-auto text-center sm:text-start sm:mt-16 flex flex-col gap-2">
                      {/* company name */}
                      {editMode ? (
                        <FormField
                          control={form.control}
                          name="companyName"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="relative">
                                  <Building2 className="input-icon-filter h-4 w-4" />
                                  <Input
                                    placeholder="Company Name"
                                    type="text"
                                    className="input-filter text-3xl font-bold"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      ) : (
                        <h2 className="text-2xl font-bold text-gray-900">
                          {companyInfo.companyName}
                        </h2>
                      )}

                      {/* industry */}
                      {editMode ? (
                        <FormField
                          control={form.control}
                          name="industry"
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <div className="relative">
                                  <Building2 className="input-icon-filter w-4 h-4" />
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <SelectTrigger className="input-filter">
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
                            </FormItem>
                          )}
                        />
                      ) : (
                        <span className="bg-[#008CBA] w-fit inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white">
                          {companyInfo.industry}
                        </span>
                      )}

                      <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600">
                        {/* Address */}
                        <div className="flex items-center gap-1 justify-center ">
                          {editMode ? (
                            <FormField
                              control={form.control}
                              name="address"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <div className="relative flex items-center gap-1">
                                      <MapPin className="input-icon-filter w-4 h-4" />
                                      <Input
                                        placeholder="Location"
                                        type="text"
                                        className="input-filter"
                                        {...field}
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage className="input-msg" />
                                </FormItem>
                              )}
                            />
                          ) : (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{companyInfo.address}</span>
                            </div>
                          )}
                        </div>

                        {/* company size */}
                        <div className="flex items-center gap-1 justify-center">
                          {editMode ? (
                            <FormField
                              control={form.control}
                              name="size"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <div className="relative flex items-center gap-1">
                                      <Users className="input-icon-filter w-4 h-4" />
                                      <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                      >
                                        <SelectTrigger className="input-filter">
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
                          ) : (
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>{companyInfo.size}</span>
                            </div>
                          )}
                        </div>

                        {/* founding year */}
                        <div className="flex items-center gap-1 justify-center">
                          {editMode && (
                            <FormField
                              control={form.control}
                              name="foundingYear"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <div className="relative flex items-center gap-1">
                                      <Calendar className="input-icon-filter w-4 h-4" />
                                      <Input
                                        placeholder="Founding year"
                                        type="text"
                                        className="input-filter"
                                        {...field}
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage className="input-msg" />
                                </FormItem>
                              )}
                            />
                          )}

                          {companyInfo.foundingYear && !editMode && (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>Founded {companyInfo.foundingYear}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Main Content Column */}
                <div className="lg:col-span-2">
                  <div className="flex justify-center bg-white rounded-lg shadow-sm mb-4">
                    <button
                      onClick={() => setSection("information")}
                      className={`flex-1 ${
                        section === "information"
                          ? "border-b-2  border-b-[#008CBA]"
                          : "border-b-2  border-b-transparent"
                      } px-6 py-4 text-sm font-medium text-gray-700 hover:bg-gray-50  transition cursor-pointer`}
                    >
                      Information
                    </button>
                    <button
                      onClick={() => setSection("fiscal")}
                      className={`flex-1 ${
                        section === "fiscal"
                          ? "border-b-2  border-b-[#008CBA]"
                          : "border-b-2  border-b-transparent"
                      } px-6 py-4 cursor-pointer text-sm font-medium text-gray-700 hover:bg-gray-50  transition`}
                    >
                      Fiscal
                    </button>
                  </div>

                  {section === "information" ? (
                    <div className="space-y-6">
                      {/* About Section */}
                      <div className="bg-white rounded-xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                          About Us
                        </h2>
                        {companyInfo.description && !editMode && (
                          <p className="text-gray-700 leading-relaxed mb-4">
                            {companyInfo.description}
                          </p>
                        )}
                        {editMode && (
                          <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Textarea
                                    placeholder="Company Description"
                                    {...field}
                                    className="h-[446px] text-[16px] w-full  px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008CBA] focus:border-transparent outline-none transition"
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        )}
                      </div>

                      {/* What We Do */}
                      <div className="bg-white rounded-xl shadow-lg p-8">
                        <div className="flex justify-between">
                          <h3 className="text-2xl font-bold text-gray-900 mb-6">
                            What We Do
                          </h3>
                          <Dialog>
                            <DialogTrigger asChild>
                              {editMode && (
                                <Button
                                  type="button"
                                  className="bg-[#008CBA] hover:bg-[#007399] text-white flex items-center gap-2 cursor-pointer"
                                >
                                  <PlusIcon className="w-4 h-4" />
                                  Add Mission
                                </Button>
                              )}
                            </DialogTrigger>
                            <DialogContent className="bg-white">
                              <DialogTitle>Add new Mission</DialogTitle>
                              <Input
                                type="text"
                                placeholder="add new mission....."
                                value={mission}
                                onChange={(e) => setMission(e.target.value)}
                                className="input-filter mb-6 mt-6 pl-2!"
                              />
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button
                                    className="border-[#008CBA] text-[#008CBA] hover:bg-gray-50 cursor-pointer"
                                    variant="outline"
                                  >
                                    Cancel
                                  </Button>
                                </DialogClose>
                                <DialogClose asChild>
                                  <Button
                                    onClick={() => {
                                      if (mission !== "") {
                                        form.setValue(
                                          "mission",
                                          [
                                            ...(form.getValues("mission") ||
                                              []),
                                            mission,
                                          ],
                                          {
                                            shouldDirty: true,
                                            shouldTouch: true,
                                          },
                                        );
                                        setCompanyInfo(form.getValues());
                                        setMission("");
                                      } else {
                                        toast.error("Please add a mission");
                                      }
                                    }}
                                    className="bg-[#008CBA] hover:bg-[#007399] text-white cursor-pointer"
                                  >
                                    Save changes
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {companyInfo.mission.map((item, index) => {
                            return (
                              <div
                                key={index}
                                className="relative p-4 rounded-lg bg-[#008CBA10] border-t-3 border-[#008CBA]"
                              >
                                {editMode && (
                                  <X
                                    onClick={() => removeMission(index)}
                                    className="cursor-pointer absolute top-2 right-2 w-4 h-4 text-[#008CBA]"
                                  />
                                )}
                                <p className="text-sm text-gray-600">{item}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-xl shadow-lg p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Fiscal Information
                      </h2>
                      <div className="flex flex-col gap-6 mt-8">
                        {/* registred Name */}
                        <FormField
                          control={form.control}
                          name="registredName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="input-label">
                                Registred Name
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  {editMode ? (
                                    <Input
                                      placeholder="Registred Name"
                                      type="text"
                                      {...field}
                                      className="input-filter pl-2!"
                                    />
                                  ) : (
                                    <p className="input-filter pl-2! min-h-[35px]">
                                      {field.value}
                                    </p>
                                  )}
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        {/* legal Form */}
                        <FormField
                          control={form.control}
                          name="legalForm"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="input-label">
                                legal Form
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  {editMode ? (
                                    <Input
                                      placeholder="legal Form"
                                      type="text"
                                      {...field}
                                      className="input-filter pl-2!"
                                    />
                                  ) : (
                                    <p className="input-filter pl-2! min-h-[35px]">
                                      {field.value}
                                    </p>
                                  )}
                                </div>
                              </FormControl>
                              <FormMessage className="input-msg" />
                            </FormItem>
                          )}
                        />

                        {/* registred Adress */}
                        <FormField
                          control={form.control}
                          name="registredAdress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="input-label">
                                Registered Address
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  {editMode ? (
                                    <Input
                                      placeholder="Registered Address"
                                      type="text"
                                      {...field}
                                      className="input-filter pl-2!"
                                    />
                                  ) : (
                                    <p className="input-filter pl-2! min-h-[35px]">
                                      {field.value}
                                    </p>
                                  )}
                                </div>
                              </FormControl>
                              <FormMessage className="input-msg" />
                            </FormItem>
                          )}
                        />

                        {/* Main Activity */}
                        <FormField
                          control={form.control}
                          name="mainActivity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="input-label">
                                Main Activity
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  {editMode ? (
                                    <Input
                                      placeholder="Main Activity"
                                      type="text"
                                      {...field}
                                      className="input-filter pl-2!"
                                    />
                                  ) : (
                                    <p className="input-filter pl-2! min-h-[35px]">
                                      {field.value}
                                    </p>
                                  )}
                                </div>
                              </FormControl>
                              <FormMessage className="input-msg" />
                            </FormItem>
                          )}
                        />

                        {/* NIS */}
                        <FormField
                          control={form.control}
                          name="NIS"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="input-label">NIS</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  {editMode ? (
                                    <Input
                                      placeholder="NIS"
                                      type="text"
                                      {...field}
                                      className="input-filter pl-2!"
                                    />
                                  ) : (
                                    <p className="input-filter pl-2! min-h-[35px]">
                                      {field.value}
                                    </p>
                                  )}
                                </div>
                              </FormControl>
                              <FormMessage className="input-msg" />
                            </FormItem>
                          )}
                        />

                        {/* NIF */}
                        <FormField
                          control={form.control}
                          name="NIF"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="input-label">NIF</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  {editMode ? (
                                    <Input
                                      placeholder="NIF"
                                      type="text"
                                      {...field}
                                      className="input-filter pl-2!"
                                    />
                                  ) : (
                                    <p className="input-filter pl-2! min-h-[35px]">
                                      {field.value}
                                    </p>
                                  )}
                                </div>
                              </FormControl>
                              <FormMessage className="input-msg" />
                            </FormItem>
                          )}
                        />

                        {/* RC */}
                        <FormField
                          control={form.control}
                          name="RC"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="input-label">RC</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  {editMode ? (
                                    <Input
                                      placeholder="RC"
                                      type="text"
                                      {...field}
                                      className="input-filter pl-2!"
                                    />
                                  ) : (
                                    <p className="input-filter pl-2! min-h-[35px]">
                                      {field.value}
                                    </p>
                                  )}
                                </div>
                              </FormControl>
                              <FormMessage className="input-msg" />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Sidebar Column */}
                <div className="space-y-6">
                  {/* Contact Card */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Contact Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                        <Mail className="w-5 h-5 mt-0.5 text-[#008CBA]" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-600 mb-0.5">Email</p>
                          {editMode ? (
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <div className="relative flex items-center gap-1">
                                      <MapPin className="input-icon-filter w-4 h-4" />
                                      <Input
                                        placeholder="xyz@email.com"
                                        type="email"
                                        className="input-filter"
                                        {...field}
                                      />
                                    </div>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          ) : (
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {companyInfo.email}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                        <Phone className="w-5 h-5 mt-0.5 text-[#008CBA]" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-600 mb-0.5">Phone</p>
                          {editMode ? (
                            <FormField
                              control={form.control}
                              name="phoneNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <div className="relative flex items-center gap-1">
                                      <MapPin className="input-icon-filter w-4 h-4" />
                                      <Input
                                        placeholder="+1234567890"
                                        type="text"
                                        className="input-filter"
                                        {...field}
                                      />
                                    </div>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          ) : (
                            <p className="text-sm font-medium text-gray-900">
                              {companyInfo.phoneNumber}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                        <Globe className="w-5 h-5 mt-0.5 text-[#008CBA]" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-600 mb-0.5">
                            Website
                          </p>
                          {editMode ? (
                            <FormField
                              control={form.control}
                              name="website"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <div className="relative flex items-center gap-1">
                                      <MapPin className="input-icon-filter w-4 h-4" />
                                      <Input
                                        placeholder="www.company.com"
                                        type="text"
                                        className="input-filter"
                                        {...field}
                                      />
                                    </div>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          ) : (
                            <p className="text-sm font-medium text-gray-900">
                              {companyInfo.website}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </form>
    </Form>
  );
}
