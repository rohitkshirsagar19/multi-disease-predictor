
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, ActivitySquare, Info, User } from "lucide-react";

const NavBar: React.FC = () => {
  const location = useLocation();
  
  // Function to determine if a link is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-medical-primary to-medical-secondary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <span className="font-bold text-2xl tracking-tight">
              <span className="mr-1">Medi</span>
              <span className="bg-white text-medical-primary px-2 py-1 rounded-md">Predict</span>
            </span>
          </div>
          <div className="hidden md:flex space-x-1">
            <Link
              to="/"
              className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
                isActive("/") 
                  ? "bg-white text-medical-primary font-medium shadow-md" 
                  : "hover:bg-white/10"
              }`}
            >
              <Home className="w-5 h-5 mr-1.5" />
              <span>Home</span>
            </Link>
            <Link
              to="/dashboard"
              className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
                isActive("/dashboard") 
                  ? "bg-white text-medical-primary font-medium shadow-md" 
                  : "hover:bg-white/10"
              }`}
            >
              <User className="w-5 h-5 mr-1.5" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/predict"
              className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
                isActive("/predict") 
                  ? "bg-white text-medical-primary font-medium shadow-md" 
                  : "hover:bg-white/10"
              }`}
            >
              <ActivitySquare className="w-5 h-5 mr-1.5" />
              <span>Predict</span>
            </Link>
            <Link
              to="/about"
              className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
                isActive("/about") 
                  ? "bg-white text-medical-primary font-medium shadow-md" 
                  : "hover:bg-white/10"
              }`}
            >
              <Info className="w-5 h-5 mr-1.5" />
              <span>About</span>
            </Link>
          </div>
          <div className="md:hidden flex space-x-2">
            <Link to="/" className={`p-2 rounded-full ${isActive("/") ? "bg-white/20" : ""}`}>
              <Home className="w-5 h-5" />
            </Link>
            <Link to="/dashboard" className={`p-2 rounded-full ${isActive("/dashboard") ? "bg-white/20" : ""}`}>
              <User className="w-5 h-5" />
            </Link>
            <Link to="/predict" className={`p-2 rounded-full ${isActive("/predict") ? "bg-white/20" : ""}`}>
              <ActivitySquare className="w-5 h-5" />
            </Link>
            <Link to="/about" className={`p-2 rounded-full ${isActive("/about") ? "bg-white/20" : ""}`}>
              <Info className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
