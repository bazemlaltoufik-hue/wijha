import React, { useEffect, useState } from "react";
import {
  MapPin,
  DollarSign,
  Clock,
  Briefcase,
  Users,
  Calendar,
  CheckCircle,
  Award,
  TrendingUp,
  Bookmark,
  Building2,
  School,
  GraduationCap,
  Globe,
} from "lucide-react";

import { useParams, useNavigate, Link } from "react-router";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { saveJob, removeSavedJob } from "@/redux/user/userSlice";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function JobOfferDetails() {
  const [data, setData] = useState(null);
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [applyLoading, setApplyLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state: any) => state.user);

  const { id } = useParams();

  const jobData = {
    title: "Senior Frontend Developer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    type: "Full-time",
    remote: "Hybrid",
    salary: "$120,000 - $160,000",
    posted: "2 days ago",
    logo: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=200&h=200&fit=crop",
    description:
      "We're looking for an experienced Frontend Developer to join our dynamic team. You'll be working on cutting-edge web applications that serve millions of users worldwide. This role offers the opportunity to work with the latest technologies and contribute to meaningful projects that make a real impact.",
    responsibilities: [
      "Design and implement responsive user interfaces using React and modern web technologies",
      "Collaborate with designers, product managers, and backend developers to deliver high-quality features",
      "Write clean, maintainable, and well-documented code following best practices",
      "Optimize applications for maximum speed and scalability",
      "Mentor junior developers and contribute to code reviews",
      "Stay up-to-date with emerging trends and technologies in frontend development",
    ],
    requirements: [
      "5+ years of experience in frontend development",
      "Expert knowledge of React, TypeScript, and modern JavaScript",
      "Strong understanding of HTML5, CSS3, and responsive design principles",
      "Experience with state management libraries (Redux, Zustand, etc.)",
      "Familiarity with build tools and CI/CD pipelines",
      "Excellent problem-solving skills and attention to detail",
      "Strong communication and collaboration abilities",
    ],
    benefits: [
      "Comprehensive health, dental, and vision insurance",
      "401(k) with company match up to 6%",
      "Flexible work hours and remote work options",
      "Professional development budget of $3,000/year",
      "Unlimited PTO policy",
      "Stock options",
      "Modern office with standing desks and ergonomic equipment",
      "Team building events and company outings",
    ],
    skills: [
      "React",
      "TypeScript",
      "JavaScript",
      "CSS",
      "HTML",
      "Redux",
      "Git",
      "REST APIs",
    ],
    team: "Engineering",
    reportingTo: "VP of Engineering",
    teamSize: "12 developers",
  };

  useEffect(() => {
    const getJobData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/jobPost/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();

        if (res.ok) {
          console.log("Fetched job data:", data);
          setData(data);
        } else {
          console.error("Failed to fetch job data", data);
        }
      } catch (error) {
        console.error("Error fetching job data", error);
      } finally {
        setLoading(false);
      }
    };

    const getApplication = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/application/get?jobSeekerId=${currentUser.userId}&jobOfferId=${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        const data = await res.json();
        if (res.ok) {
          if (data) {
            console.log(data);
            setApplied(true);
          }
        }
      } catch (error) {
        console.error("Error fetching application data", error);
      }
    };

    if (currentUser) {
      getApplication();
    }

    getJobData();
  }, []);

  const handleCreateApplication = async () => {
    setApplyLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/application/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobSeekerId: currentUser.userId,
          employerId: data.employerIdInfo,
          jobOfferId: data._id,
        }),
      });

      const created = await res.json();

      if (res.ok) {
        setApplied(true);
        console.log("Application created successfully");
      } else {
        console.error("Failed to create application", created);
      }
    } catch (error) {
      console.error("Error creating application", error);
    } finally {
      setApplyLoading(false);
    }
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
        setSaved(true);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      {!loading ? (
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
            <div className="flex flex-col lg:flex-row gap-6 px-8 py-6">
              <div className="flex justify-between">
                <img
                  src={data?.employerIdInfo.logo}
                  alt="logo"
                  className="w-24 h-24 rounded-2xl bg-white p-1 shadow-md"
                />
                <div className="flex gap-2 h-fit lg:hidden">
                  {!currentUser && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="cursor-pointer px-6 py-2 bg-[#008CBA] text-white font-semibold text-sm rounded-xl hover:bg-[#0077A3] transition-colors shadow-md">
                          Apply Now
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-white">
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            You need to be logged in to apply
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Please log in or create an account to apply for this
                            job.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-gray-200 text-gray-800 font-semibold rounded-xl hover:bg-gray-300 transition-colors shadow-md">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => navigate("/signIn")}
                            className="bg-[#008CBA] text-white font-semibold rounded-xl hover:bg-[#0077A3] transition-colors shadow-md"
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                  {currentUser &&
                    currentUser.role === "jobseeker" &&
                    !applied && (
                      <button
                        onClick={() => handleCreateApplication()}
                        className="cursor-pointer px-6 py-2 bg-[#008CBA] text-white font-semibold text-sm rounded-xl hover:bg-[#0077A3] transition-colors shadow-md"
                      >
                        {applyLoading ? (
                          <>
                            <Spinner className="w-4 h-4 mr-2 animate-spin" />
                            Applying...
                          </>
                        ) : (
                          <>"Apply Now"</>
                        )}
                      </button>
                    )}
                  {currentUser && currentUser.role === "employer" && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="cursor-pointer px-6 py-2 bg-[#008CBA] text-white font-semibold text-sm rounded-xl hover:bg-[#0077A3] transition-colors shadow-md">
                          Apply Now
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-white">
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Employers cannot apply for job offers
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Please log in with a job seeker account to apply for
                            this job.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-gray-200 text-gray-800 font-semibold rounded-xl hover:bg-gray-300 transition-colors shadow-md">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction className="bg-[#008CBA] text-white font-semibold rounded-xl hover:bg-[#0077A3] transition-colors shadow-md">
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                  {applied && (
                    <button className="cursor-pointer px-6 py-2 text-sm bg-green-500 text-white font-semibold rounded-xl shadow-md  flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Applied
                    </button>
                  )}
                  {currentUser?.role === "jobseeker" &&
                    currentUser.saved.includes(data?._id) && (
                      <button
                        onClick={() => handleRemoveSavedJob(data._id)}
                        className="cursor-pointer p-3 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200  transition-all"
                      >
                        <Bookmark className="w-4 h-4 text-yellow-300 fill-current" />
                      </button>
                    )}
                  {currentUser?.role === "jobseeker" &&
                    !currentUser?.saved.includes(data?._id) && (
                      <button
                        onClick={() => handleSaveJob(data?._id)}
                        className="cursor-pointer p-3 rounded-xl bg-gray-100 text-gray-600 fill-current hover:text-yellow-400 transition-all"
                      >
                        <Bookmark
                          className={`w-4 h-4${currentUser.saved.includes(data?._id) && " text-yellow-300 fill-current"}`}
                        />
                      </button>
                    )}
                </div>
              </div>
              <div className="flex-1">
                <h1 className="hover:underline text-3xl font-bold text-gray-900 mb-2">
                  {data && data.title}
                </h1>
                <p className="cursor-pointer text-xl font-medium text-gray-600 mb-3">
                  <Link to={`/company/${data?.employerIdInfo.userId}`}>
                    {data && data.employerIdInfo.companyName}
                  </Link>
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#008CBA] backdrop-blur-sm rounded-full text-white text-sm">
                    <MapPin size={14} />
                    {data && data.location}
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#008CBA] backdrop-blur-sm rounded-full text-white text-sm">
                    <Briefcase size={14} />
                    {data && data.jobType}
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#008CBA] backdrop-blur-sm rounded-full text-white text-sm">
                    <Clock size={14} />
                    {data && data.workArrangement}
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#008CBA] backdrop-blur-sm rounded-full text-white text-sm">
                    <Calendar size={14} />
                    Posted 2 days ago
                  </span>
                </div>
              </div>
              <div className="lg:flex gap-2 h-fit hidden">
                {!currentUser && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="cursor-pointer px-8 py-3 bg-[#008CBA] text-white font-semibold rounded-xl hover:bg-[#0077A3] transition-colors shadow-md">
                        Apply Now
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          You need to be logged in to apply
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Please log in or create an account to apply for this
                          job.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-gray-200 text-gray-800 font-semibold rounded-xl hover:bg-gray-300 transition-colors shadow-md">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => navigate("/signIn")}
                          className="bg-[#008CBA] text-white font-semibold rounded-xl hover:bg-[#0077A3] transition-colors shadow-md"
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
                {currentUser &&
                  currentUser?.role === "jobseeker" &&
                  !applied && (
                    <button
                      onClick={() => handleCreateApplication()}
                      className="cursor-pointer px-8 py-3 bg-[#008CBA] text-white font-semibold rounded-xl hover:bg-[#0077A3] transition-colors shadow-md"
                    >
                      {applyLoading ? (
                        <>
                          <Spinner className="w-5 h-5 mr-2 animate-spin" />
                          Applying...
                        </>
                      ) : (
                        <>"Apply Now"</>
                      )}
                    </button>
                  )}
                {currentUser && currentUser?.role === "employer" && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="cursor-pointer px-8 py-3 bg-[#008CBA] text-white font-semibold rounded-xl hover:bg-[#0077A3] transition-colors shadow-md">
                        Apply Now
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Employers cannot apply for job offers
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Please log in with a job seeker account to apply for
                          this job.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-gray-200 text-gray-800 font-semibold rounded-xl hover:bg-gray-300 transition-colors shadow-md">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction className="bg-[#008CBA] text-white font-semibold rounded-xl hover:bg-[#0077A3] transition-colors shadow-md">
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
                {applied && (
                  <button className="cursor-pointer px-8 py-3 bg-green-500 text-white font-semibold rounded-xl shadow-md cursor-default flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Applied
                  </button>
                )}
                {currentUser?.role === "jobseeker" &&
                  currentUser?.saved.includes(data._id) && (
                    <button
                      onClick={() => handleRemoveSavedJob(data._id)}
                      className="p-3 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200  transition-all"
                    >
                      <Bookmark className="w-5 h-5 text-yellow-300 fill-current" />
                    </button>
                  )}
                {currentUser?.role === "jobseeker" &&
                  !currentUser?.saved.includes(data?._id) && (
                    <button
                      onClick={() => handleSaveJob(data?._id)}
                      className="cursor-pointer p-3 rounded-xl bg-gray-100 text-gray-600 fill-current hover:text-yellow-400 transition-all"
                    >
                      <Bookmark
                        className={`w-5 h-5${currentUser.saved.includes(data?._id) && " text-yellow-300 fill-current"}`}
                      />
                    </button>
                  )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-3 gap-6">
            {/* Left Column - Main Details */}
            <div className="col-span-3 xl:col-span-2 space-y-6">
              {/* Quick Info Grid */}
              <div className="bg-white rounded-xl shadow-md p-6 grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6">
                <div className="flex flex-col gap-3 lg:border-r-2 lg:border-gray-200 lg:pr-6">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-[#E6F7FB] rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-[#008CBA]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Industry</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {data && data.industry}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-[#E6F7FB] rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-[#008CBA]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Experience Level</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {data && data.experienceLevel}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-[#E6F7FB] rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-[#008CBA]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Education Level</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {data && data.educationLevel}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-[#E6F7FB] rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-[#008CBA]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Deadline</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {data && moment(data.deadline).format("MMMM D, YYYY")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-[#E6F7FB] rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-[#008CBA]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Salary Range</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {data && data.salaryRange}$
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-[#E6F7FB] rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-[#008CBA]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">
                        Number of Positions
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        {data && data.numberOfPositions}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Job Description */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#008CBA] rounded-xl flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Job Description
                  </h2>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {data && data.description}
                </p>
              </div>
            </div>

            {/* Right Column - Skills & Actions */}
            <div className="col-span-2 xl:col-span-1 space-y-6">
              {/* Required Skills */}
              <aside className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#008CBA] rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    About Company
                  </h2>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Company</p>
                    <p className="font-bold text-gray-900 text-lg">
                      {data && data.employerIdInfo.companyName}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <p className="text-xs text-gray-500 mb-1">Industry</p>
                      <p className="whitespace-nowrap truncate font-semibold text-gray-900 text-sm">
                        {data && data.employerIdInfo.industry}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <p className="text-xs text-gray-500 mb-1">Size</p>
                      <p className="whitespace-nowrap font-semibold text-gray-900 text-sm">
                        {data && data.employerIdInfo.size}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <p className="text-xs text-gray-500 mb-1">Founded</p>
                      <p className="font-semibold text-gray-900 text-sm">
                        {data && data.employerIdInfo.foundingYear}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <Globe className="w-4 h-4 text-gray-400 mb-1" />
                      <a
                        href={`https://linkedin.com`}
                        className="font-semibold text-blue-600 hover:underline text-sm block truncate"
                      >
                        Website
                      </a>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {data && data.employerIdInfo.description}
                  </p>
                </div>

                <button
                  onClick={() =>
                    navigate(`/company/${data?.employerIdInfo._id}`)
                  }
                  className="cursor-pointer w-full px-4 py-3 bg-[#008CBA] text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold"
                >
                  View Company Profile
                </button>
              </aside>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-6xl px-4 py-8">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <Skeleton className="h-8 w-2/3 bg-gray-300" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-md bg-gray-300" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-40 bg-gray-300" />
                <Skeleton className="h-3 w-32 bg-gray-300" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Main content */}
            <div className="space-y-8 lg:col-span-2">
              {/* Job meta */}
              <div className="flex flex-wrap gap-4">
                <Skeleton className="h-4 w-24 bg-gray-300" />
                <Skeleton className="h-4 w-28 bg-gray-300" />
                <Skeleton className="h-4 w-20 bg-gray-300" />
              </div>

              {/* Description */}
              <div className="space-y-3">
                <Skeleton className="h-5 w-40 bg-gray-300" />
                <Skeleton className="h-4 w-full bg-gray-300" />
                <Skeleton className="h-4 w-full bg-gray-300" />
                <Skeleton className="h-4 w-5/6 bg-gray-300" />
              </div>

              {/* Responsibilities */}
              <div className="space-y-3">
                <Skeleton className="h-5 w-52 bg-gray-300" />
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full bg-gray-300" />
                ))}
              </div>

              {/* Requirements */}
              <div className="space-y-3">
                <Skeleton className="h-5 w-48 bg-gray-300" />
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-4 w-11/12 bg-gray-300" />
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Apply box */}
              <div className="space-y-4 rounded-lg">
                <Skeleton className="h-10 w-full rounded-md bg-gray-300" />
                <Skeleton className="h-4 w-3/4 bg-gray-300" />
              </div>

              {/* Job info */}
              <div className="space-y-4 rounded-lg">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-4 w-24 bg-gray-300" />
                    <Skeleton className="h-4 w-28 bg-gray-300" />
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
