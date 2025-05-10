
import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-8 h-8 rounded-full border-4 border-medical-primary border-t-transparent animate-spin"></div>
      <span className="ml-2 text-medical-primary font-medium">Processing...</span>
    </div>
  );
};

export default LoadingSpinner;
