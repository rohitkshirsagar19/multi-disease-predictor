
import React from "react";
import { Link } from "react-router-dom";
import { Home, ActivitySquare, Info, User } from "lucide-react";

const NavBar: React.FC = () => {
  return (
    <nav className="bg-medical-primary text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center">
            <span className="font-bold text-xl">MediPredict</span>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/"
              className="flex items-center px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <Home className="w-5 h-5 mr-1" />
              <span>Home</span>
            </Link>
            <Link
              to="/dashboard"
              className="flex items-center px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <User className="w-5 h-5 mr-1" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/predict"
              className="flex items-center px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <ActivitySquare className="w-5 h-5 mr-1" />
              <span>Predict</span>
            </Link>
            <Link
              to="/about"
              className="flex items-center px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <Info className="w-5 h-5 mr-1" />
              <span>About</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
