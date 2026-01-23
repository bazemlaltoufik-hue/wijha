import {
  Bell,
  Building,
  LogOutIcon,
  Menu,
  Search,
  Settings,
  User,
  User2Icon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router";
import { signout } from "@/redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export default function DashHeader({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.user);

  const handleLogOut = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
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
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 gap-3">
        {/* Left: Menu (mobile) */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Center: Search */}
        <form onSubmit={() => navigate(`/JobSearchLanding?search=${search}`)}>
          <div className=" max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search jobs..."
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-[#008CBA] focus:border-transparent"
              />
            </div>
          </div>
        </form>

        {/* Right: Notifications + User */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* User */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="w-9 h-9 bg-[#008CBA] rounded-full flex items-center justify-center">
                  {currentUser?.profileImage ? (
                    <img
                      src={currentUser?.profileImage}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 text-white" />
                  )}
                </div>

                {/* Hidden on mobile */}
                <div className="hidden md:block">
                  <div className="text-sm font-medium text-gray-900">
                    {currentUser?.firstName} {currentUser?.lastName}
                  </div>
                  <div className="text-xs text-gray-500 truncate max-w-[160px]">
                    {currentUser?.email}
                  </div>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44 p-2 shadow bg-white border-gray-200">
              <DropdownMenuLabel className="md:hidden mb-2">
                <div className="text-sm font-medium text-gray-900">
                  {currentUser?.firstName} {currentUser?.lastName}
                </div>
                <div className="text-xs text-gray-500 truncate max-w-[160px]">
                  {currentUser?.email}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigate("/dashboard?tab=dash")}
                className="hover:bg-gray-100 rounded-md cursor-pointer p-2"
              >
                <Building className="w-4 h-4 mr-2" /> Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate("/dashboard?tab=company")}
                className="hover:bg-gray-100 rounded-md cursor-pointer p-2"
              >
                <User2Icon className="w-4 h-4 mr-2" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate("/dashboard?tab=settings")}
                className="hover:bg-gray-100 rounded-md cursor-pointer p-2"
              >
                <Settings className="w-4 h-4 mr-2" /> Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-200" />
              <DropdownMenuItem
                onClick={handleLogOut}
                className="hover:bg-gray-100 rounded-md cursor-pointer p-2"
              >
                <LogOutIcon className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
