import { Menu } from "lucide-react";
import { useState } from "react";
import img from "../assets/1.png";
import { useNavigate } from "react-router";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 w-full bg-white/95 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-2">
            <img src={img} alt="logo" className="w-32" />
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
          <div className="flex items-center space-x-4">
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
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-6 h-6 text-black" />
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
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
          </div>
        </div>
      )}
    </nav>
  );
}

export default Header;
