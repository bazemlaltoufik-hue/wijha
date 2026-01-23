import { useEffect, useState } from "react";
import {
  Bookmark,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Trash2,
  ExternalLink,
  Search,
  Filter,
  Star,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { saveJob, removeSavedJob } from "@/redux/user/userSlice";
import { toast } from "sonner";
import { set } from "zod";
import { Skeleton } from "@/components/ui/skeleton";

const DashSaved = () => {
  const [savedJobs, setSavedJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const getJobs = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "http://localhost:3000/api/jobPost/getJobPostsByIds",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ids: currentUser.saved,
            }),
          },
        );
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setSavedJobs(data.jobs);
        } else {
          console.log("Error fetching jobs by IDs:", data.error);
        }
      } catch (error) {
        console.error("Error fetching jobs by IDs:", error);
      } finally {
        setLoading(false);
      }
    };

    getJobs();
  }, []);

  const handleSaveJob = async (jobId: string) => {
    const updatedSaved = [...currentUser.saved, jobId];
    dispatch(saveJob(jobId));
    try {
      const res = await fetch(
        `http://localhost:3000/api/auth/${currentUser.userId}`,
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
        setSavedJobs((prevJobs) => [...prevJobs, data.job]);
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
        `http://localhost:3000/api/auth/${currentUser.userId}`,
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
        setSavedJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Saved Jobs
          </h1>
          <p className="text-gray-600">
            Browse and manage your saved job listings
          </p>
        </div>
        {/* Job Cards Grid */}
        {loading && (
          <>
            {[1, 2, 3].map((index) => (
              <div key={index} className="space-y-3 py-4">
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
          </>
        )}
        {savedJobs.length > 0 && !loading && (
          <div className="grid grid-cols-1 gap-6">
            {savedJobs.map((job: any) => {
              return (
                <div
                  key={job._id}
                  className={`relative flex flex-col gap-4 bg-white border-1 rounded-2xl p-6 shadow-sm border-gray-200`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-14 h-14 bg-[#E6F7FB] rounded-lg hidden sm:flex items-center justify-center text-2xl">
                        {job?.employerIdInfo.logo}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-1">
                          {job.title}
                        </h4>
                        <p className="text-sm text-gray-600 font-medium mb-2">
                          {job.employerIdInfo.companyName}
                        </p>
                      </div>
                    </div>
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
                  </div>

                  <div className="flex flex-col text-sm text-gray-600 gap-2">
                    <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-4">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1 text-[#008CBA]" />
                        {job.location}
                      </span>
                      <span className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1 text-[#008CBA]" />
                        {job.salaryRange}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1 text-[#008CBA]" />
                        Posted 3 days ago
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end">
                    <button className="py-2 px-6 rounded-lg font-semibold text-white transition-all bg-[#008CBA] hover:bg-[#00668C]">
                      Apply Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {savedJobs.length == 0 && !loading && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-100 rounded-full mb-6">
                <Bookmark
                  className="w-12 h-12 text-slate-400"
                  strokeWidth={1.5}
                />
              </div>

              {/* Title */}
              <h2 className="text-2xl font-semibold text-slate-800 mb-3">
                No saved jobs yet
              </h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashSaved;
