
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-medical-dark mb-4">
          Welcome to Health Disease Prediction System
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Our advanced machine learning models can help predict the likelihood of
          various diseases based on your health data. Early detection is key to
          better health outcomes.
        </p>
        
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&h=400"
            alt="Medical research" 
            className="w-full h-64 object-cover rounded-lg shadow-md mb-8" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-medical-primary/50 to-transparent rounded-lg"></div>
        </div>
        
        <div className="mt-8 flex justify-center space-x-4">
          <Button asChild className="bg-medical-primary hover:bg-blue-700">
            <Link to="/dashboard">View Dashboard</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/predict">Start Prediction</Link>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-medical-primary mb-2">Multiple Disease Models</h3>
          <p className="text-gray-600">
            Our system supports predictions for various conditions including heart disease, 
            anemia, lung cancer, and more.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-medical-primary mb-2">Patient Dashboard</h3>
          <p className="text-gray-600">
            Track your health metrics, view prediction history, and monitor your progress over time.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-medical-primary mb-2">AI-Powered Analysis</h3>
          <p className="text-gray-600">
            Our machine learning models provide insights based on the latest medical research.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
