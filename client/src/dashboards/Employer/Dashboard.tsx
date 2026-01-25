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
import SideBar from "./SideBar";
import DashHeader from "./DashHeader";
import DashCompanyProfile from "@/dashboards/Employer/DashProfileCompany";
import DashJobPost from "@/dashboards/Employer/DashJobPosts";
import DashEmployeers from "./DashEmployeers";
import CreateJobPost from "./CreateJobPost";
import JobPostDetails from "./JobPostDetails";
import DashSettings from "./DashSettings";
import JobseekerDashboard from "./DashProfiles";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Sidebar */}
      <SideBar
        active={tab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <DashHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {tab === "dash" && <DashEmployeers />}
        {tab === "company" && <DashCompanyProfile />}
        {tab === "createJobPost" && <CreateJobPost />}
        {tab === "jobPostDetails" && <JobPostDetails />}
        {tab === "jobPost" && <DashJobPost />}
        {tab === "setting" && <DashSettings />}
        {tab === "profiles" && <JobseekerDashboard />}
      </div>
    </div>
  );
};

export default Dashboard;
