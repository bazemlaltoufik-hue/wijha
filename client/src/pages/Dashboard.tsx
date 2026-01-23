import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import {
  Search,
  Bell,
  User,
  Briefcase,
  FileText,
  BookmarkIcon,
  Settings,
  LogOut,
  Menu,
  X,
  MapPin,
  Clock,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import SideBar from "../components/SideBar";
import DashHeader from "../components/DashHeader";
import DashMain from "@/components/DashMain";
import DashProfile from "@/components/DashProfile";
import DashApplication from "@/components/DashApplication";
import DashSaved from "@/components/DashSaved";
import DashEmployeers from "@/dashboards/Employer/DashEmployeers";
import DashCompanyProfile from "@/dashboards/Employer/DashProfileCompany";
import DashJobPost from "@/dashboards/Employer/DashJobPosts";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

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

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Briefcase },
    { id: "jobs", label: "Find Jobs", icon: Search },
    { id: "applications", label: "My Applications", icon: FileText },
    { id: "saved", label: "Saved Jobs", icon: BookmarkIcon },
    { id: "profile", label: "Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <DashHeader />

        {tab === "dash" && <DashMain />}
        {tab === "employeers" && <DashEmployeers />}
        {tab === "profile" && <DashProfile />}
        {tab === "application" && <DashApplication />}
        {tab === "saved" && <DashSaved />}
        {tab === "company" && <DashCompanyProfile />}
        {tab === "jobPost" && <DashJobPost />}
      </div>
    </div>
  );
};

export default Dashboard;
