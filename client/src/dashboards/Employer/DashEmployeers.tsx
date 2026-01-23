import React, { useState } from "react";
import {
  Briefcase,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Star,
  Mail,
  Eye,
  Bell,
  Search,
  Filter,
  BarChart3,
  PieChart,
  Calendar,
  Award,
  Target,
  Zap,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  Download,
  Share2,
} from "lucide-react";

export default function DashEmployeers() {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      label: "Total Applications",
      value: "1,847",
      change: "+23.5%",
      trend: "up",
      icon: Users,
      gradient: "from-blue-500 to-cyan-500",
      chart: [40, 45, 38, 50, 49, 55, 60],
    },
    {
      label: "Active Positions",
      value: "18",
      change: "+12.3%",
      trend: "up",
      icon: Briefcase,
      gradient: "from-purple-500 to-pink-500",
      chart: [30, 35, 40, 38, 42, 45, 48],
    },
    {
      label: "Interview Scheduled",
      value: "34",
      change: "+8.1%",
      trend: "up",
      icon: Calendar,
      gradient: "from-orange-500 to-red-500",
      chart: [20, 25, 23, 28, 30, 32, 34],
    },
    {
      label: "Avg. Time to Hire",
      value: "12d",
      change: "-15.2%",
      trend: "down",
      icon: Clock,
      gradient: "from-green-500 to-emerald-500",
      chart: [25, 23, 20, 18, 15, 13, 12],
    },
  ];

  const topCandidates = [
    {
      name: "Alexandra Martinez",
      role: "Senior Product Designer",
      score: 98,
      location: "San Francisco, CA",
      salary: "$125k - $145k",
      skills: ["UI/UX", "Figma", "Design Systems", "Prototyping"],
      experience: "7 years",
      image: "AM",
      applied: "2h ago",
      status: "new",
    },
    {
      name: "James Chen",
      role: "Full Stack Engineer",
      score: 96,
      location: "New York, NY",
      salary: "$140k - $160k",
      skills: ["React", "Node.js", "AWS", "PostgreSQL"],
      experience: "6 years",
      image: "JC",
      applied: "5h ago",
      status: "shortlisted",
    },
    {
      name: "Sophia Williams",
      role: "Data Scientist",
      score: 94,
      location: "Austin, TX",
      salary: "$130k - $150k",
      skills: ["Python", "ML", "TensorFlow", "Statistics"],
      experience: "5 years",
      image: "SW",
      applied: "1d ago",
      status: "reviewed",
    },
  ];

  const recentJobs = [
    {
      title: "Senior Software Engineer",
      applications: 145,
      views: 2847,
      status: "active",
      daysLeft: 12,
    },
    {
      title: "Product Manager",
      applications: 89,
      views: 1923,
      status: "active",
      daysLeft: 18,
    },
    {
      title: "UX Designer",
      applications: 67,
      views: 1456,
      status: "active",
      daysLeft: 8,
    },
    {
      title: "DevOps Engineer",
      applications: 34,
      views: 892,
      status: "expiring",
      daysLeft: 2,
    },
  ];

  const activities = [
    {
      user: "Sarah Johnson",
      action: "applied for",
      position: "Senior Developer",
      time: "5 min ago",
      type: "application",
    },
    {
      user: "Mike Davis",
      action: "was shortlisted for",
      position: "Product Manager",
      time: "23 min ago",
      type: "shortlist",
    },
    {
      user: "Emma Wilson",
      action: "interview scheduled for",
      position: "UX Designer",
      time: "1 hour ago",
      type: "interview",
    },
    {
      user: "System",
      action: "Your job post",
      position: "DevOps Engineer expires in 2 days",
      time: "2 hours ago",
      type: "alert",
    },
  ];

  const miniChart = (data: any) => {
    const max = Math.max(...data);
    return data.map((val: any, idx: any) => (
      <div key={idx} className="flex-1 flex items-end">
        <div
          className="w-full bg-white/40 rounded-sm"
          style={{ height: `${(val / max) * 24}px` }}
        />
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Enhanced Stats Cards with Mini Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}
              ></div>

              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}
                  >
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      stat.trend === "up"
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <ArrowUp className="w-3 h-3" />
                    ) : (
                      <ArrowDown className="w-3 h-3" />
                    )}
                    {stat.change}
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                </div>

                {/* Mini Chart */}
                <div className="flex gap-1 h-6">{miniChart(stat.chart)}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 mb-6">
          {/* Top Candidates - Takes 2 columns */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    AI-Matched Candidates
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Based on your job requirements
                  </p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#008CBA] hover:bg-blue-50 rounded-lg transition-colors">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {topCandidates.map((candidate, index) => (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 border border-gray-100 hover:border-[#008CBA]/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar with Score */}
                    <div className="relative">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#008CBA] to-cyan-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {candidate.image}
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-md">
                        {candidate.score}
                      </div>
                    </div>

                    {/* Candidate Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">
                            {candidate.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {candidate.role}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {candidate.status === "new" && (
                            <span className="px-3 py-1 bg-gradient-to-r from-[#008CBA] to-cyan-600 text-white text-xs font-semibold rounded-full">
                              NEW
                            </span>
                          )}
                          {candidate.status === "shortlisted" && (
                            <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                              SHORTLISTED
                            </span>
                          )}
                          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                            <MoreVertical className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Target className="w-4 h-4" />
                          {candidate.experience}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Award className="w-4 h-4" />
                          {candidate.salary}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {candidate.skills.slice(0, 4).map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-blue-50 text-[#008CBA] rounded-lg text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <button className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#008CBA] to-cyan-600 text-white rounded-lg hover:shadow-lg hover:shadow-[#008CBA]/30 transition-all font-medium text-sm">
                          View Profile
                        </button>
                        <button className="px-4 py-2.5 border-2 border-gray-200 text-gray-700 rounded-lg hover:border-[#008CBA] hover:text-[#008CBA] transition-all font-medium text-sm">
                          <Mail className="w-4 h-4" />
                        </button>
                        <button className="px-4 py-2.5 border-2 border-gray-200 text-gray-700 rounded-lg hover:border-[#008CBA] hover:text-[#008CBA] transition-all font-medium text-sm">
                          <Star className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Jobs Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Active Job Posts
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Manage your current openings
                </p>
              </div>
              <div className="flex gap-2">
                <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors">
                  <Download className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors">
                  <Share2 className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Job Title
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Applications
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Days Left
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentJobs.map((job, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900">
                        {job.title}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="font-semibold text-gray-900">
                          {job.applications}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">
                          {job.views.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          job.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {job.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`font-medium ${
                          job.daysLeft <= 5 ? "text-red-600" : "text-gray-600"
                        }`}
                      >
                        {job.daysLeft} days
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-[#008CBA] hover:text-cyan-700 font-medium text-sm">
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
