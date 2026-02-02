import { Building, LogOutIcon, Menu, Settings, User2Icon } from "lucide-react";
import { useState } from "react";
import img from "../assets/1.png";
import img1 from "../assets/5.png";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { signout } from "@/redux/user/userSlice";
import { current } from "@reduxjs/toolkit";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const handleLogOut = async () => {
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
    <nav className="sticky top-0 w-full bg-white/95 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-2">
            <img src={img} alt="Logo" className="h-16" />
            <img src={img1} alt="Logo" className="w-20" />
          </div>
          <div className="hidden lg:flex space-x-8">
            <a
              href="#"
              className={`${
                true ? "text-[#008CBA]" : "text-gray-700"
              } hover:text-[#008CBA] transition font-medium`}
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-[#008CBA] transition font-medium"
            >
              Find Jobs
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-[#008CBA] transition font-medium"
            >
              Contacts
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-[#008CBA] transition font-medium"
            >
              About
            </a>
          </div>
          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer">
                  <div className="w-9 h-9 bg-[#008CBA] rounded-full flex items-center justify-center">
                    <Building className="w-5 h-5 text-white" />
                  </div>

                  {/* Hidden on mobile */}
                  <div className="hidden md:block">
                    <div className="text-sm font-medium text-gray-900">
                      {currentUser.companyName}
                    </div>
                    <div className="text-xs text-gray-500 truncate max-w-[160px]">
                      {currentUser.email}
                    </div>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-44 p-2 shadow bg-white border-gray-200">
                <DropdownMenuLabel className="md:hidden mb-2">
                  <div className="text-sm font-medium text-gray-900">
                    {currentUser.role === "jobseeker" ? (
                      <>
                        {currentUser.firstName} {currentUser.lastName}
                      </>
                    ) : (
                      <>{currentUser.companyName}</>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 truncate max-w-[160px]">
                    {currentUser.email}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigate("/dashboard?tab=dash")}
                  className="hover:bg-gray-100 rounded-md cursor-pointer p-2"
                >
                  <Building className="w-4 h-4 mr-2" /> Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    navigate(
                      `/dashboard?tab=${currentUser.role === "jobseeker" ? "profile" : "company"}`,
                    )
                  }
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
          ) : (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/SignIn")}
                className="hover:text-white box-border hidden lg:block hover:bg-[#008CBA] text-[#008CBA] border-2 border-[#008CBA] rounded-xl px-4 py-2 font-medium transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/registre")}
                className="hidden lg:block px-4 py-2 rounded-xl text-white font-semibold bg-[#008CBA] hover:bg-[#00668C] transition-all"
              >
                Get Started
              </button>
              <button
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="w-6 h-6 text-black" />
              </button>
            </div>
          )}
        </div>
      </div>
      {isMenuOpen && !currentUser && (
        <div className="lg:hidden bg-white shadow-md border-t">
          <div className="px-4 py-4 space-y-4">
            <a
              href="#"
              className="block text-gray-700 hover:text-[#008CBA] transition font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#"
              className="block text-gray-700 hover:text-[#008CBA] transition font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Find Jobs
            </a>
            <a
              href="#"
              className="block text-gray-700 hover:text-[#008CBA] transition font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contacts
            </a>
            <a
              href="#"
              className="block text-gray-700 hover:text-[#008CBA] transition font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <div className="flex items-center flex-col space-x-4">
              <button
                onClick={() => navigate("/SignIn")}
                className="hover:text-white box-border hover:bg-[#008CBA] text-[#008CBA] border-2 border-[#008CBA] rounded-xl px-4 py-2 font-medium transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/registre")}
                className="px-4 py-2 rounded-xl text-white font-semibold bg-[#008CBA] hover:bg-[#00668C] transition-all"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Header;
