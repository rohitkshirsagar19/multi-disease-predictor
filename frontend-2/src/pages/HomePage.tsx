
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-medical-primary to-medical-secondary">
          Health Disease Prediction System
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-8">
          Our advanced machine learning models can help predict the likelihood of
          various diseases based on your health data. Early detection is key to
          better health outcomes.
        </p>
        
        <div className="relative rounded-xl overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&h=500"
            alt="Medical research" 
            className="w-full h-80 object-cover rounded-xl shadow-lg" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-medical-primary/60 to-transparent rounded-xl flex items-center">
            <div className="text-white max-w-lg p-8">
              <h2 className="text-3xl font-bold mb-4">Predict. Prevent. Protect.</h2>
              <p className="text-white/90 mb-6">
                Using cutting-edge AI to help you understand your health risks before symptoms appear.
              </p>
              <Button asChild className="bg-white text-medical-primary hover:bg-white/90">
                <Link to="/predict">Start Your First Prediction</Link>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-10 flex justify-center space-x-6">
          <Button asChild className="bg-medical-primary hover:bg-medical-secondary transition-colors shadow-md px-6">
            <Link to="/dashboard">View Dashboard</Link>
          </Button>
          <Button asChild variant="outline" className="border-medical-primary text-medical-primary hover:bg-medical-primary/10">
            <Link to="/predict">Start Prediction</Link>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-t-medical-primary hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-medical-primary mb-3">Multiple Disease Models</h3>
          <p className="text-gray-600">
            Our system supports predictions for various conditions including heart disease, 
            anemia, lung cancer, and more.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-t-medical-secondary hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-medical-secondary mb-3">Patient Dashboard</h3>
          <p className="text-gray-600">
            Track your health metrics, view prediction history, and monitor your progress over time.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-t-medical-primary hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-medical-primary mb-3">AI-Powered Analysis</h3>
          <p className="text-gray-600">
            Our machine learning models provide insights based on the latest medical research.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
