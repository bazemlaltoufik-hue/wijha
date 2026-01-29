import {
  Briefcase,
  Building2,
  FileText,
  LogOut,
  Settings,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import img from "@/assets/1.png";
import img1 from "@/assets/5.png";
import { useDispatch } from "react-redux";
import { signout } from "@/redux/user/userSlice";

export default function SideBar({
  active,
  sidebarOpen,
  setSidebarOpen,
}: {
  active?: string;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(active || "dashboard");
  const dispatch = useDispatch();
  useEffect(() => {
    setActiveTab(active || "dashboard");
  }, [active]);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Briefcase, url: "dash" },
    {
      id: "jobPost",
      label: "Job Post",
      icon: FileText,
      url: "jobPost",
    },
    {
      id: "companyProfile",
      label: "Company Profile",
      icon: Building2,
      url: "company",
    },
    { id: "profile", label: "Profile", icon: User, url: "profiles" },
    { id: "settings", label: "Settings", icon: Settings, url: "setting" },
  ];

  const handleLogOut = async () => {
    console.log("Logging out...");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        },
      );
      if (res.ok) {
        dispatch(signout());
        navigate("/SignIn");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <aside
      className={`
  fixed md:sticky top-0 left-0 z-50
  h-screen w-64
  bg-white border-r border-gray-200
  transform transition-transform duration-300 ease-in-out
  ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
  md:translate-x-0
`}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-between  h-16 px-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-full rounded-lg flex items-center justify-center">
              <img src={img} alt="Logo" className="h-16" />
              <img src={img1} alt="Logo" className="w-20" />
            </div>
          </div>
          <button
            className="hover:bg-gray-100 md:hidden p-2 rounded-lg cursor-pointer"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 flex flex-col gap-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => navigate(`/dashboard?tab=${item.url}`)}
                className={`cursor-pointer flex items-center justify-start  gap-3  px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.url
                    ? "bg-blue-50 text-[#008CBA]"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-gray-200">
          <button
            onClick={() => handleLogOut()}
            className="cursor-pointer w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <LogOut className="w-6 h-6" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
