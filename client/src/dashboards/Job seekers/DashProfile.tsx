import { useEffect, useRef, useState } from "react";
import {
  Upload,
  Edit2,
  Save,
  X,
  Plus,
  Briefcase,
  GraduationCap,
  MapPin,
  Mail,
  Phone,
  FileText,
  Linkedin,
  Github,
  Globe,
  Link2,
  Languages,
  Award,
  ChevronDownIcon,
  XIcon,
} from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

const DashProfile = () => {
  const [loading, setLoading] = useState(true);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [experience, setExperience] = useState({
    title: "",
    company: "",
    from: "",
    to: "",
    description: "",
  });
  const [formation, setFormation] = useState({
    title: "",
    institution: "",
    from: "",
    to: "",
  });
  const [language, setLanguage] = useState({
    language: "",
    level: "",
  });
  const [skill, setSkill] = useState("");
  const profileImg = useRef<HTMLInputElement | null>(null);

  const [profile, setProfile] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
    resume?: string;
    profileImage?: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
    experience?: Array<{
      title: string;
      company: string;
      from: string;
      to: string;
      description: string;
    }>;
    education?: Array<{
      title: string;
      institution: string;
      from: string;
      to: string;
    }>;
    languages?: Array<{
      language: string;
      level: string;
    }>;
    skills?: string[];
    accounts?: {
      linkedin?: string;
      github?: string;
      portfolio?: string;
    };
    CV?: string;
  }>({});

  const { currentUser } = useSelector((state: any) => state.user);

  const FormSchema = z.object({
    firstName: z.string().min(1, "First name is required."),
    lastName: z.string().min(1, "Last name is required."),
    linkedin: z.string().optional(),
    github: z.string().optional(),
    portfolio: z.string().optional(),
    email: z
      .string()
      .min(1, "Email is required.")
      .email("Invalid email address"),
    phoneNumber: z.string().min(1, "Phone number is required."),
    address: z.string().min(1, "Address is required."),
    resume: z.string().optional(),
    experience: z
      .array(
        z.object({
          title: z.string().min(1, "Job title is required."),
          company: z.string().min(1, "Company is required."),
          from: z.string().min(1, "Duration is required."),
          to: z.string().min(1, "Duration is required."),
          description: z.string().optional(),
        }),
      )
      .optional(),
    education: z
      .array(
        z.object({
          title: z.string().min(1, "Formation title is required."),
          institution: z.string().min(1, "Institution is required."),
          from: z.string().min(1, "Duration is required."),
          to: z.string().min(1, "Duration is required."),
        }),
      )
      .optional(),
    languages: z
      .array(
        z.object({
          language: z.string().min(1, "Language is required."),
          level: z.string().min(1, "Level is required."),
        }),
      )
      .optional(),
    skills: z.array(z.string()).optional(),
    profileImage: z.string().optional(),
    CV: z.string().optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: profile?.firstName ? profile?.firstName : "",
      lastName: profile?.lastName ? profile?.lastName : "",
      email: profile?.email ? profile?.email : "",
      phoneNumber: profile?.phoneNumber ? profile?.phoneNumber : "",
      address: profile?.address ? profile?.address : "",
      resume: profile?.resume ? profile?.resume : "",
      linkedin: profile?.linkedin ? profile?.linkedin : "",
      github: profile?.github ? profile?.github : "",
      portfolio: profile?.portfolio ? profile?.portfolio : "",
      experience: profile?.experience ? profile?.experience : [],
      education: profile?.education ? profile?.education : [],
      languages: profile?.languages ? profile?.languages : [],
      skills: profile?.skills ? profile?.skills : [],
      profileImage: profile?.profileImage ? profile?.profileImage : "",
      CV: profile.CV ? profile?.CV : "",
    },
  });

  useEffect(() => {
    const getUserProfile = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/${currentUser?.userId}`,
        );
        const data = await res.json();
        if (res.ok) {
          setProfile(data);
        } else {
          console.error("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };
    getUserProfile();
  }, []);

  useEffect(() => {
    if (profile && profile.firstName) {
      form.reset({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phoneNumber: profile.phoneNumber,
        address: profile.address,
        resume: profile.resume,
        linkedin: profile.linkedin || "",
        github: profile.github || "",
        portfolio: profile.portfolio || "",
        experience: profile.experience || [],
        education: profile.education || [],
        languages: profile.languages || [],
        skills: profile.skills || [],
        CV: profile.CV || "",
        profileImage: profile.profileImage || "",
      });
    }
  }, [profile]);

  const handleProfileImgUpload = async (e: any) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

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
    console.log(data.publicUrl);

    data &&
      form.setValue("profileImage", data.publicUrl, {
        shouldDirty: true,
        shouldTouch: true,
      });
    setProfile(form.getValues());
  };

  const handleAddFormation = () => {
    const newFormation = formation;

    form.setValue(
      "education",
      [...(form.getValues("education") || []), newFormation],
      {
        shouldDirty: true,
        shouldTouch: true,
      },
    );

    setProfile(form.getValues());

    setFormation({
      title: "",
      institution: "",
      from: "",
      to: "",
    });
  };

  const handleAddExperience = () => {
    const newExp = experience;

    form.setValue(
      "experience",
      [...(form.getValues("experience") || []), newExp],
      {
        shouldDirty: true,
        shouldTouch: true,
      },
    );

    setProfile(form.getValues());

    setExperience({
      title: "",
      company: "",
      from: "",
      to: "",
      description: "",
    });
  };

  const handleAddLanguage = () => {
    const newLang = language;

    form.setValue(
      "languages",
      [...(form.getValues("languages") || []), newLang],
      {
        shouldDirty: true,
        shouldTouch: true,
      },
    );

    setProfile(form.getValues());

    setLanguage({
      language: "",
      level: "",
    });
  };

  const handleRemoveFormation = (index: number) => {
    const updatedEducation = form
      .getValues("education")
      ?.filter((_, i) => i !== index);
    form.setValue("education", updatedEducation || [], {
      shouldDirty: true,
      shouldTouch: true,
    });
    setProfile(form.getValues());
  };

  const handleRemoveExperience = (index: number) => {
    const updatedExperience = form
      .getValues("experience")
      ?.filter((_, i) => i !== index);
    form.setValue("experience", updatedExperience || [], {
      shouldDirty: true,
      shouldTouch: true,
    });
    setProfile(form.getValues());
  };

  const handleRemoveLanguage = (index: number) => {
    const updatedLanguages = form
      .getValues("languages")
      ?.filter((_, i) => i !== index);
    form.setValue("languages", updatedLanguages || [], {
      shouldDirty: true,
      shouldTouch: true,
    });
    setProfile(form.getValues());
  };

  const handleCVUpload = async (e: any) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("CV")
      .upload(`public/${fileName}`, file);

    if (error) {
      console.error(error.message);
      return;
    }

    const { data } = supabase.storage
      .from("CV")
      .getPublicUrl(`public/${fileName}`);

    if (!data?.publicUrl) return;
    console.log(data.publicUrl);

    data &&
      form.setValue("CV", data.publicUrl, {
        shouldDirty: true,
        shouldTouch: true,
      });
    setProfile(form.getValues());
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoadingEdit(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/${currentUser.userId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const updatedData = await res.json();
      if (res.ok) {
        setProfile(updatedData);
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    } finally {
      setLoadingEdit(false);
      setIsEditing(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {/* Top Navigation */}
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center gap-3">
                {!isEditing ? (
                  <Button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="cursor-pointer flex items-center gap-2 px-5 py-2.5 bg-[#008CBA] text-white rounded-xl hover:bg-[#007B9E] transition"
                  >
                    <Edit2 className="w-4 h-4" />
                    Modifier le profil
                  </Button>
                ) : (
                  <>
                    <button
                      className="cursor-pointer flex items-center gap-2 px-5 py-2.5  text-white rounded-xl bg-[#008CBA] hover:bg-[#007B9E] transition"
                      type="submit"
                    >
                      <Save className="w-4 h-4" />
                      {loadingEdit ? (
                        <>
                          <Spinner className="" /> "Loading"
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
              {/* Header Card with Photo and Title */}
              <div className=" bg-white rounded-3xl shadow-xl overflow-hidden mb-6 relative">
                <div className="h-32  bg-[#008CBA]"></div>
                <div className="px-8 pb-8">
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6 -mt-16">
                    {/* Profile Photo */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={profile.profileImage}
                        alt="Profile"
                        className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg"
                      />
                      {isEditing && (
                        <>
                          <Input
                            type="file"
                            className="hidden"
                            ref={profileImg}
                            onChange={handleProfileImgUpload}
                          />
                          <button
                            type="button"
                            onClick={() => profileImg.current?.click()}
                            className="absolute bottom-2 right-2 bg-[#008CBA] text-white p-2 rounded-lg hover:bg-indigo-700 transition shadow-lg"
                          >
                            <Upload className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>

                    {/* Name and Title */}
                    <div className="flex-1 mt-4 md:mt-6">
                      {isEditing ? (
                        <div className="space-y-3">
                          <div className="flex gap-1">
                            <FormField
                              control={form.control}
                              name="firstName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <div className="relative">
                                      <Input
                                        placeholder="First Name"
                                        type="text"
                                        className="input-filter text-gray-900 bg-gray-50 border-gray-200 pl-2! text-3xl font-bold"
                                        {...field}
                                      />
                                    </div>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="lastName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <div className="relative">
                                      <Input
                                        placeholder="Last Name"
                                        type="text"
                                        className="input-filter text-gray-900 bg-gray-50 border-gray-200 pl-2! text-3xl font-bold"
                                        {...field}
                                      />
                                    </div>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <div className="relative">
                                    <Input
                                      placeholder="First Name"
                                      type="text"
                                      className="input-filter text-gray-900 bg-gray-50 border-gray-200 pl-2! text-3xl font-bold"
                                      {...field}
                                    />
                                  </div>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      ) : (
                        <>
                          <h2 className="text-3xl font-bold text-gray-900">
                            {profile.firstName} {profile.lastName}
                          </h2>
                          <p className="text-xl text-[#008CBA] font-medium mt-1">
                            software Engineer
                          </p>
                        </>
                      )}

                      {/* Contact Info */}
                      <div className="flex flex-wrap gap-4 mt-4">
                        {isEditing ? (
                          <>
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <div className="relative">
                                      <Input
                                        placeholder="xyz@gmail.com"
                                        type="text"
                                        className="input-filter text-gray-900 bg-gray-50 border-gray-200 pl-2! text-3xl font-bold"
                                        {...field}
                                      />
                                    </div>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="phoneNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <div className="relative">
                                      <Input
                                        placeholder="+33 6 12 34 56 78"
                                        type="text"
                                        className="input-filter text-gray-900 bg-gray-50 border-gray-200 pl-2! text-3xl font-bold"
                                        {...field}
                                      />
                                    </div>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="address"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <div className="relative">
                                      <Input
                                        placeholder="Paris, France"
                                        type="text"
                                        className="input-filter text-gray-900 bg-gray-50 border-gray-200 pl-2! text-3xl font-bold"
                                        {...field}
                                      />
                                    </div>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </>
                        ) : (
                          <>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Mail className="w-4 h-4" />
                              <span className="text-sm">{profile.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Phone className="w-4 h-4" />
                              <span className="text-sm">
                                {profile.phoneNumber}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin className="w-4 h-4" />
                              <span className="text-sm">{profile.address}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Professional Summary */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-6 bg-[#008CBA] rounded-full"></div>
                      <h3 className="text-xl font-bold text-gray-900">
                        Résumé Professionnel
                      </h3>
                    </div>
                    {isEditing ? (
                      <FormField
                        control={form.control}
                        name="resume"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                placeholder="Enter Professional Summary....."
                                rows={4}
                                {...field}
                                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none resize-none"
                              />
                            </FormControl>
                            <FormMessage className="input-msg" />
                          </FormItem>
                        )}
                      />
                    ) : (
                      <p className="text-gray-700 leading-relaxed">
                        {profile.resume || "No professional summary available."}
                      </p>
                    )}
                  </div>

                  {/* Experience */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-6 bg-blue rounded-full"></div>
                        <h3 className="text-xl font-bold text-gray-900">
                          Expérience Professionnelle
                        </h3>
                      </div>
                      {isEditing && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <button className="flex items-center gap-2 px-4 py-2 bg-[#008CBA] hover:bg-[#007399] text-white rounded-lg  transition text-sm font-medium">
                              <Plus className="w-4 h-4" />
                              Ajouter
                            </button>
                          </DialogTrigger>
                          <DialogContent className="bg-white max-h-[90vh] overflow-y-auto overflow-x-hidden">
                            <DialogTitle>Add new experience</DialogTitle>
                            <div className="flex flex-col gap-1">
                              <Label className="input-label">Job Title</Label>
                              <Input
                                type="text"
                                placeholder="Job Title"
                                onChange={(e) =>
                                  setExperience({
                                    ...experience,
                                    title: e.target.value,
                                  })
                                }
                                className="input-filter pl-2!"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <Label className="input-label">Company</Label>
                              <Input
                                type="text"
                                placeholder="Company"
                                onChange={(e) =>
                                  setExperience({
                                    ...experience,
                                    company: e.target.value,
                                  })
                                }
                                className="input-filter pl-2!"
                              />
                            </div>
                            <div className="flex gap-2">
                              <div className="flex-1 flex flex-col gap-1">
                                <Label className="input-label">From</Label>
                                <Popover
                                  open={openFrom}
                                  onOpenChange={setOpenFrom}
                                >
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      id="date"
                                      className="input-filter flex w-full justify-between"
                                    >
                                      {experience.from
                                        ? experience.from
                                        : "Select date"}
                                      <ChevronDownIcon />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto overflow-hidden p-0 bg-white"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      selected={experience.from}
                                      captionLayout="dropdown"
                                      onSelect={(date) => {
                                        setExperience({
                                          ...experience,
                                          from: date.toLocaleDateString(),
                                        });
                                        setOpenFrom(false);
                                      }}
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>
                              <div className="flex-1 flex flex-col gap-1">
                                <Label className="input-label">To</Label>
                                <Popover open={openTo} onOpenChange={setOpenTo}>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      id="date"
                                      className="input-filter flex w-full justify-between"
                                    >
                                      {experience.to
                                        ? experience.to
                                        : "Select date"}
                                      <ChevronDownIcon />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto overflow-hidden p-0 bg-white"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      selected={experience.to}
                                      captionLayout="dropdown"
                                      onSelect={(date) => {
                                        setExperience({
                                          ...experience,
                                          to: date?.toLocaleDateString(),
                                        });
                                        setOpenTo(false);
                                      }}
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <Label className="input-label">
                                Job Description
                              </Label>
                              <textarea
                                placeholder="Job Description"
                                rows={4}
                                onChange={(e) =>
                                  setExperience({
                                    ...experience,
                                    description: e.target.value,
                                  })
                                }
                                className="input-filter pl-2! resize-none"
                              />
                            </div>
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
                                  onClick={handleAddExperience}
                                  className="bg-[#008CBA] hover:bg-[#007399] text-white cursor-pointer"
                                >
                                  Save changes
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>

                    <div className="space-y-6">
                      {profile.experience?.map((exp, index) => (
                        <div
                          key={index}
                          className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-[#008CBA] before:rounded-full before:shadow-lg"
                        >
                          {index !== profile.experience?.length - 1 && (
                            <div className="absolute left-[5px] top-5 bottom-0 w-0.5 bg-gray-200"></div>
                          )}
                          <h4 className="font-bold text-gray-900 text-lg">
                            {exp.title}
                          </h4>
                          <p className="text-[#008CBA] font-semibold mt-1">
                            {exp.company}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {exp.from} - {exp.to}
                          </p>
                          <p className="text-gray-700 mt-3 leading-relaxed">
                            {exp.description}
                          </p>
                          <XIcon
                            onClick={() => handleRemoveExperience(index)}
                            className="absolute text-red-500 cursor-pointer top-2 right-2 w-5 h-5"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Education */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-6 bg-[#008CBA] rounded-full"></div>
                        <h3 className="text-xl font-bold text-gray-900">
                          Formation
                        </h3>
                      </div>
                      {isEditing && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <button className="flex items-center gap-2 px-4 py-2 bg-[#008CBA] hover:bg-[#007399] text-white rounded-lg  transition text-sm font-medium">
                              <Plus className="w-4 h-4" />
                              Ajouter
                            </button>
                          </DialogTrigger>
                          <DialogContent className="bg-white max-h-[90vh] overflow-y-auto overflow-x-hidden">
                            <DialogTitle>Add new Formation</DialogTitle>
                            <div className="flex flex-col gap-1">
                              <Label className="input-label">Job Title</Label>
                              <Input
                                type="text"
                                placeholder="Formation Title"
                                onChange={(e) =>
                                  setFormation({
                                    ...formation,
                                    title: e.target.value,
                                  })
                                }
                                className="input-filter pl-2!"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <Label className="input-label">Institution</Label>
                              <Input
                                type="text"
                                placeholder="Institution"
                                onChange={(e) =>
                                  setFormation({
                                    ...formation,
                                    institution: e.target.value,
                                  })
                                }
                                className="input-filter pl-2!"
                              />
                            </div>
                            <div className="flex gap-2">
                              <div className="flex-1 flex flex-col gap-1">
                                <Label className="input-label">From</Label>
                                <Popover
                                  open={openFrom}
                                  onOpenChange={setOpenFrom}
                                >
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      id="date"
                                      className="input-filter flex w-full justify-between"
                                    >
                                      {formation.from
                                        ? formation.from
                                        : "Select date"}
                                      <ChevronDownIcon />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto overflow-hidden p-0 bg-white"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      selected={formation.from}
                                      captionLayout="dropdown"
                                      onSelect={(date) => {
                                        setFormation({
                                          ...formation,
                                          from: date.toLocaleDateString(),
                                        });
                                        setOpenFrom(false);
                                      }}
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>
                              <div className="flex-1 flex flex-col gap-1">
                                <Label className="input-label">To</Label>
                                <Popover open={openTo} onOpenChange={setOpenTo}>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      id="date"
                                      className="input-filter flex w-full justify-between"
                                    >
                                      {formation.to
                                        ? formation.to
                                        : "Select date"}
                                      <ChevronDownIcon />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto overflow-hidden p-0 bg-white"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      selected={formation.to}
                                      captionLayout="dropdown"
                                      onSelect={(date) => {
                                        setFormation({
                                          ...formation,
                                          to: date?.toLocaleDateString(),
                                        });
                                        setOpenTo(false);
                                      }}
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>
                            </div>
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
                                  onClick={handleAddFormation}
                                  className="bg-[#008CBA] hover:bg-[#007399] text-white cursor-pointer"
                                >
                                  Save changes
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>

                    <div className="space-y-5">
                      {profile.education?.map((edu, index) => (
                        <div key={index} className="flex gap-4 relative">
                          <div className="flex-shrink-0 w-12 h-12 bg-[#E6F7FB] rounded-xl flex items-center justify-center">
                            <GraduationCap className="w-6 h-6 text-[#008CBA]" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">
                              {edu.title}
                            </h4>
                            <p className="text-[#008CBA] font-medium mt-1">
                              {edu.institution}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              {edu.from} - {edu.to}
                            </p>
                          </div>
                          <XIcon
                            onClick={() => handleRemoveFormation(index)}
                            className="absolute text-red-500 cursor-pointer top-2 right-2 w-5 h-5"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CV Upload */}
                  <div className="bg-[#E6F7FB] rounded-2xl shadow-lg p-6 border-2 border-[#B3E6F5]">
                    <div className="flex items-center gap-2 mb-4">
                      <FileText className="w-5 h-5 text-[#008CBA]" />
                      <h3 className="text-xl font-bold text-gray-900">
                        CV / Curriculum Vitae
                      </h3>
                    </div>

                    <div className="border-2 border-dashed border-[#B3E6F5] rounded-xl p-8 text-center bg-white/50  hover:bg-white/70 transition">
                      <input
                        type="file"
                        id="cv-upload"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={handleCVUpload}
                      />
                      <label htmlFor="cv-upload" className="cursor-pointer">
                        <Upload className="w-12 h-12 mx-auto text-[#008CBA] mb-3" />
                        <p className="text-gray-700 font-semibold mb-1">
                          {profile.CV
                            ? "✓ CV chargé avec succès"
                            : "Cliquez ou glissez-déposez votre CV"}
                        </p>
                        <p className="text-sm text-gray-500">
                          PDF, DOC, DOCX (MAX. 5MB)
                        </p>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Links */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Link2 className="w-5 h-5 text-[#008CBA]" />
                      <h3 className="text-lg font-bold text-gray-900">Liens</h3>
                    </div>

                    <div className="space-y-3">
                      {isEditing ? (
                        <>
                          <FormField
                            control={form.control}
                            name="linkedin"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <div className="relative">
                                    <Linkedin className="input-icon-filter h-4 w-4" />
                                    <Input
                                      placeholder="Your Linkedin"
                                      type="text"
                                      {...field}
                                      className="input-filter"
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage className="input-msg" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="github"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <div className="relative">
                                    <Github className="input-icon-filter h-4 w-4" />
                                    <Input
                                      placeholder="Your Github"
                                      type="text"
                                      {...field}
                                      className="input-filter"
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage className="input-msg" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="portfolio"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <div className="relative">
                                    <Globe className="input-icon-filter h-4 w-4" />
                                    <Input
                                      placeholder="Your Portfolio"
                                      type="text"
                                      {...field}
                                      className="input-filter"
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage className="input-msg" />
                              </FormItem>
                            )}
                          />
                        </>
                      ) : (
                        <>
                          <Link
                            to={profile.linkedin ? profile.linkedin : "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition group"
                          >
                            <Linkedin className="w-5 h-5 text-blue-600" />
                            <span className="text-sm text-gray-700 group-hover:text-blue-600 transition">
                              {profile.linkedin}
                            </span>
                          </Link>
                          <Link
                            to={profile.github ? profile.github : "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition group"
                          >
                            <Github className="w-5 h-5 text-gray-800" />
                            <span className="text-sm text-gray-700 group-hover:text-gray-900 transition">
                              {profile.github}
                            </span>
                          </Link>
                          <Link
                            to={`https://${profile.portfolio}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition group"
                          >
                            <Globe className="w-5 h-5 text-indigo-600" />
                            <span className="text-sm text-gray-700 group-hover:text-indigo-600 transition">
                              {profile.portfolio}
                            </span>
                          </Link>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Languages className="w-5 h-5 text-[#008CBA]" />
                        <h3 className="text-lg font-bold text-gray-900">
                          Langues
                        </h3>
                      </div>
                      {isEditing && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <button className="flex items-center gap-2 px-4 py-2 bg-[#008CBA] hover:bg-[#007399] text-white rounded-lg  transition text-sm font-medium">
                              <Plus className="w-4 h-4" />
                            </button>
                          </DialogTrigger>
                          <DialogContent className="bg-white max-h-[90vh] overflow-y-auto overflow-x-hidden">
                            <DialogTitle>Add Language</DialogTitle>
                            <div className="flex flex-col gap-1">
                              <Label className="input-label mb-1">
                                Language
                              </Label>
                              <Input
                                type="text"
                                placeholder="Language"
                                onChange={(e) =>
                                  setLanguage({
                                    ...language,
                                    language: e.target.value,
                                  })
                                }
                                className="input-filter pl-2!"
                              />
                            </div>
                            <div className="relative">
                              <Label className="input-label mb-1.5">
                                Language Level
                              </Label>
                              <Select
                                value={language.level}
                                onValueChange={(value) =>
                                  setLanguage({ ...language, level: value })
                                }
                              >
                                <SelectTrigger className="input-filter">
                                  <SelectValue placeholder="Select language level" />
                                </SelectTrigger>
                                <SelectContent className="p-2 border-gray-300 bg-white">
                                  <SelectItem
                                    key="1"
                                    className="hover:bg-blue-50"
                                    value="A1 - Beginner"
                                  >
                                    A1 - Beginner
                                  </SelectItem>
                                  <SelectItem
                                    key="2"
                                    className="hover:bg-blue-50"
                                    value="A2 - Elementary"
                                  >
                                    A2 - Elementary
                                  </SelectItem>
                                  <SelectItem
                                    key="3"
                                    className="hover:bg-blue-50"
                                    value="B1 - Intermediate"
                                  >
                                    B1 - Intermediate
                                  </SelectItem>
                                  <SelectItem
                                    key="4"
                                    className="hover:bg-blue-50"
                                    value="B2 - Upper Intermediate"
                                  >
                                    B2 - Upper Intermediate
                                  </SelectItem>
                                  <SelectItem
                                    key="5"
                                    className="hover:bg-blue-50"
                                    value="C1 - Advanced"
                                  >
                                    C1 - Advanced
                                  </SelectItem>
                                  <SelectItem
                                    key="6"
                                    className="hover:bg-blue-50"
                                    value="C2 - Proficient"
                                  >
                                    C2 - Proficient
                                  </SelectItem>
                                  <SelectItem
                                    key="7"
                                    className="hover:bg-blue-50"
                                    value="Natif"
                                  >
                                    Natif
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

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
                                  onClick={handleAddLanguage}
                                  className="bg-[#008CBA] hover:bg-[#007399] text-white cursor-pointer"
                                >
                                  Save changes
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>

                    <div className="space-y-3">
                      {profile.languages?.map((lang, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg"
                        >
                          <div>
                            <p className="font-semibold text-gray-900">
                              {lang.language}
                            </p>
                            <p className="text-sm text-gray-600">
                              {lang.level}
                            </p>
                          </div>
                          {isEditing && (
                            <button
                              onClick={() => handleRemoveLanguage(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-[#008CBA]" />
                        <h3 className="text-lg font-bold text-gray-900">
                          Compétences
                        </h3>
                      </div>
                      {isEditing && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <button className="flex items-center gap-2 px-4 py-2 bg-[#008CBA] hover:bg-[#007399] text-white rounded-lg  transition text-sm font-medium">
                              <Plus className="w-4 h-4" />
                            </button>
                          </DialogTrigger>
                          <DialogContent className="bg-white max-h-[90vh] overflow-y-auto overflow-x-hidden">
                            <DialogTitle>Add Skill</DialogTitle>
                            <div className="flex flex-col gap-1">
                              <Label className="input-label">Skill</Label>
                              <Input
                                type="text"
                                placeholder="Skill"
                                onChange={(e) => setSkill(e.target.value)}
                                className="input-filter pl-2!"
                              />
                            </div>

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
                                    form.setValue(
                                      "skills",
                                      [
                                        ...(form.getValues("skills") || []),
                                        skill,
                                      ],
                                      {
                                        shouldDirty: true,
                                        shouldTouch: true,
                                      },
                                    );
                                    setProfile(form.getValues());
                                  }}
                                  className="bg-[#008CBA] hover:bg-[#007399] text-white cursor-pointer"
                                >
                                  Save changes
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {profile.skills?.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-[#E6F7FB] text-[#008CBA] rounded-full text-sm font-medium flex items-center gap-2 hover:shadow-md transition"
                        >
                          {skill}
                          {isEditing && (
                            <button
                              onClick={() => {
                                const updatedSkills = form
                                  .getValues("skills")
                                  ?.filter((_, i) => i !== index);
                                form.setValue("skills", updatedSkills || [], {
                                  shouldDirty: true,
                                  shouldTouch: true,
                                });
                                setProfile(form.getValues());
                              }}
                              className="hover:text-red-600 transition"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
    </Form>
  );
};
export default DashProfile;
