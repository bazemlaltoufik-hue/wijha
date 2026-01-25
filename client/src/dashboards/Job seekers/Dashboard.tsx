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
import DashMain from "./DashMain";
import DashProfile from "./DashProfile";
import DashApplication from "./DashApplication";
import DashSaved from "./DashSaved";
import DashSettings from "./DashSettings";
import img from "@/assets/1.png";

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
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-white to-indigo-50">
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
      <div className="flex-1">
        {/* Header */}
        <DashHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {tab === "dash" && <DashMain />}
        {tab === "profile" && <DashProfile />}
        {tab === "application" && <DashApplication />}
        {tab === "saved" && <DashSaved />}
        {tab === "setting" && <DashSettings />}
      </div>
    </div>
  );
};

export default Dashboard;
