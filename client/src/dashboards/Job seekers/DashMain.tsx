import { Button } from "@/components/ui/button";
import {
  Bookmark,
  BookmarkIcon,
  Briefcase,
  Clock,
  DollarSign,
  FileText,
  MapPin,
  Plus,
  Star,
  TrendingUp,
} from "lucide-react";

const DashMain = () => {
  const stats = [
    {
      label: "Applications",
      value: "24",
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      label: "Saved Jobs",
      value: "12",
      icon: BookmarkIcon,
      color: "bg-purple-500",
    },
    { label: "Interviews", value: "3", icon: Briefcase, color: "bg-green-500" },
    {
      label: "Profile Views",
      value: "156",
      icon: TrendingUp,
      color: "bg-orange-500",
    },
  ];

  const recentJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120k - $150k",
      posted: "2 days ago",
      logo: "🚀",
    },
    {
      id: 2,
      title: "UX Designer",
      company: "DesignHub",
      location: "Remote",
      type: "Contract",
      salary: "$90k - $110k",
      posted: "3 days ago",
      logo: "🎨",
    },
    {
      id: 3,
      title: "Product Manager",
      company: "StartupXYZ",
      location: "New York, NY",
      type: "Full-time",
      salary: "$130k - $160k",
      posted: "5 days ago",
      logo: "💼",
    },
    {
      id: 4,
      title: "Data Analyst",
      company: "DataCo",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$85k - $105k",
      posted: "1 week ago",
      logo: "📊",
    },
  ];

  const applications = [
    {
      id: 1,
      title: "Full Stack Developer",
      company: "WebSolutions",
      status: "Under Review",
      date: "2024-10-10",
      statusColor: "bg-yellow-100 text-yellow-800",
    },
    {
      id: 2,
      title: "React Developer",
      company: "AppMakers",
      status: "Interview Scheduled",
      date: "2024-10-08",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 3,
      title: "Software Engineer",
      company: "CodeBase",
      status: "Applied",
      date: "2024-10-12",
      statusColor: "bg-blue-100 text-blue-800",
    },
  ];

  const trendingJobs = [
    {
      id: 1,
      title: "Senior Product Designer",
      company: "Nexus Labs",
      location: "Remote",
      salary: "$110k - $140k",
      type: "Full-time",
      tags: ["Design", "UI/UX", "Figma"],
      match: 95,
      urgent: true,
      color: "bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200",
    },
    {
      id: 2,
      title: "Lead Frontend Engineer",
      company: "TechVision",
      location: "San Francisco, CA",
      salary: "$140k - $180k",
      type: "Full-time",
      tags: ["React", "TypeScript", "Node.js"],
      match: 92,
      urgent: false,
      color: "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200",
    },
    {
      id: 3,
      title: "Marketing Manager",
      company: "GrowthCo",
      location: "New York, NY",
      salary: "$95k - $120k",
      type: "Full-time",
      tags: ["Marketing", "Strategy", "SEO"],
      match: 88,
      urgent: false,
      color: "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200",
    },
  ];

  return (
    <>
      <main className="p-4 sm:p-6 lg:p-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Welcome back, John!
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your job search today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-y-6">
          {/* Trending Jobs */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Top Matches For You
                </h3>
                <p className="text-sm text-gray-600">
                  Based on your skills and preferences
                </p>
              </div>
              <Button className="cursor-pointer px-4 py-2 text-sm font-medium text-[#008CBA] hover:bg-[#E6F7FB] rounded-xl transition-colors">
                View All
              </Button>
            </div>

            {trendingJobs.map((job) => (
              <div
                key={job.id}
                className={`relative flex flex-col gap-4 bg-white border-1 rounded-2xl p-6 shadow-sm border-gray-200`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-[#E6F7FB] rounded-lg hidden sm:flex items-center justify-center text-2xl">
                      {job.company.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-1">
                        {job.title}
                      </h4>
                      <p className="text-sm text-gray-600 font-medium mb-2">
                        {job.company}
                      </p>
                      {/* <div className="flex flex-wrap gap-2">
                        {job.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 bg-white/60 backdrop-blur text-xs font-medium text-gray-700 rounded-lg"
                          >
                            {tag}
                          </span>
                        ))}
                      </div> */}
                    </div>
                  </div>
                  <Bookmark className="w-5 h-5 text-gray-400 hover:text-amber-300 cursor-pointer transition-colors" />
                </div>

                <div className="flex flex-col text-sm text-gray-600 gap-2">
                  <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-4">
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1 text-[#008CBA]" />
                      {job.location}
                    </span>
                    <span className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1 text-[#008CBA]" />
                      {job.salary}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-[#008CBA]" />
                      Posted 3 days ago
                    </span>
                  </div>

                  <div className="flex flex-wrap basis-full gap-1">
                    {job.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-[#E6F7FB] backdrop-blur text-xs font-medium text-[#008CBA] rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* <span className="px-2.5 py-1 bg-white/60 backdrop-blur rounded-lg text-xs font-medium">
                    {job.type}
                  </span> */}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="ml-1 text-sm font-bold text-gray-900">
                        {job.match}% Match
                      </span>
                    </div>
                  </div>
                  <button className="py-2 px-6 rounded-lg font-semibold text-white transition-all bg-[#008CBA] hover:bg-[#00668C]">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Upcoming Interviews */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                Upcoming Interviews
              </h3>
              <Plus className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-700" />
            </div>
            <div className="space-y-3">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:shadow-md transition-all"
                >
                  <h3 className="font-medium text-gray-900 mb-1">
                    {app.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{app.company}</p>
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${app.statusColor}`}
                    >
                      {app.status}
                    </span>
                    <span className="text-xs text-gray-500">{app.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default DashMain;
