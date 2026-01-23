import { useEffect, useState } from "react";
import {
  Search,
  MoreVertical,
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  X,
  FileText,
  Building2,
  Trash2,
  Star,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashApplication() {
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [applications, setApplications] = useState([]);
  const { currentUser } = useSelector((state: any) => state.user);

  const statusConfig = {
    all: {
      label: "All Applications",
      color: "bg-gray-100 text-gray-700",
      count: 5,
    },
    applied: { label: "Applied", color: "bg-blue-100 text-blue-700", count: 1 },
    in_review: {
      label: "In Review",
      color: "bg-yellow-100 text-yellow-700",
      count: 2,
    },
    interview: {
      label: "Interview",
      color: "bg-purple-100 text-purple-700",
      count: 1,
    },
    rejected: { label: "Rejected", color: "bg-red-100 text-red-700", count: 1 },
  };

  useEffect(() => {
    const getApplications = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/application/getall?jobSeekerId=${currentUser.userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        const data = await res.json();
        if (res.ok) {
          setApplications(data.applications);
        } else {
          console.error("Failed to fetch applications", data);
        }
      } catch (error) {
        console.error("Error fetching applications", error);
      } finally {
        setLoading(false);
      }
    };
    getApplications();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Content */}
      <main className="p-4 sm:p-6 lg:p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Applications
          </h1>
          <p className="text-gray-600">
            Track and manage your job applications
          </p>
        </div>

        {loading ? (
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
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {applications.map((application) => {
              return (
                <div
                  key={application.id}
                  className={`relative flex flex-col gap-4 bg-white border-1 rounded-2xl p-6 shadow-sm border-gray-200`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-14 h-14 bg-[#E6F7FB] rounded-lg hidden sm:flex items-center justify-center text-2xl">
                        <img src={application.employerId.logo} alt="logo" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-1">
                          {application.jobOfferId.title}
                        </h4>
                        <p className="text-sm text-gray-600 font-medium mb-2">
                          {application.employerId.companyName}
                        </p>
                      </div>
                    </div>
                    {application.jobOfferId.deadline < new Date() && (
                      <span className="text-white bg-red-500 font-semibold rounded-full text-xs px-1.5 py-0.5">
                        expired
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col text-sm text-gray-600 gap-2">
                    <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-4">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1 text-[#008CBA]" />
                        {application.jobOfferId.location}
                      </span>
                      <span className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1 text-[#008CBA]" />
                        {application.jobOfferId.salaryRange}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1 text-[#008CBA]" />
                        Posted 3 days ago
                      </span>
                    </div>
                  </div>

                  <div className="w-full flex items-center justify-end">
                    <button className=" py-2 px-6 rounded-lg font-semibold text-white transition-all bg-[#008CBA] hover:bg-[#00668C]">
                      Apply Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
