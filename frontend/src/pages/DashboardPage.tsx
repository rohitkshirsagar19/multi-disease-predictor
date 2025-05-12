
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { User, History, Activity } from "lucide-react";

// Define the type for prediction history items
interface PredictionHistoryItem {
  id: string;
  disease: string;
  date: string;
  result: number;
}

const DashboardPage: React.FC = () => {
  // Using local state for patient info in this demo
  const [patientInfo] = useState({
    name: "John Doe",
    age: 45,
    gender: "Male",
    bloodType: "O+",
    height: "175 cm",
    weight: "80 kg",
  });

  const [predictionHistory, setPredictionHistory] = useState<PredictionHistoryItem[]>([]);

  // Load prediction history from localStorage on component mount
  useEffect(() => {
    const storedHistory = localStorage.getItem("predictionHistory");
    if (storedHistory) {
      setPredictionHistory(JSON.parse(storedHistory));
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-medical-dark mb-6">Patient Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Patient Information Card */}
        <Card className="shadow-md md:col-span-1">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-medical-primary" />
              <h2 className="text-xl font-semibold">Patient Information</h2>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mb-4">
              <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                <img 
                  src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=200&h=200" 
                  alt="Patient avatar" 
                  className="object-cover w-full h-full" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Name:</span>
                <span className="font-medium">{patientInfo.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Age:</span>
                <span className="font-medium">{patientInfo.age}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Gender:</span>
                <span className="font-medium">{patientInfo.gender}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Blood Type:</span>
                <span className="font-medium">{patientInfo.bloodType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Height:</span>
                <span className="font-medium">{patientInfo.height}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Weight:</span>
                <span className="font-medium">{patientInfo.weight}</span>
              </div>
            </div>
            
            <Button asChild className="w-full mt-4 bg-medical-primary">
              <Link to="/predict">Start New Prediction</Link>
            </Button>
          </CardContent>
        </Card>
        
        {/* Prediction History Card */}
        <Card className="shadow-md md:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <History className="h-5 w-5 text-medical-primary" />
                <h2 className="text-xl font-semibold">Prediction History</h2>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link to="/predict">
                  <Activity className="h-4 w-4 mr-2" />
                  New Prediction
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {predictionHistory.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-2">Disease</th>
                      <th className="text-left py-2 px-2">Date</th>
                      <th className="text-left py-2 px-2">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {predictionHistory.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-2">
                          {item.disease.charAt(0).toUpperCase() + item.disease.slice(1).replace("_", " ")}
                        </td>
                        <td className="py-3 px-2">{item.date}</td>
                        <td className="py-3 px-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              item.result === 1
                                ? "bg-red-100 text-red-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {item.result === 1 ? "Positive" : "Negative"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500">No prediction history available.</p>
                <p className="text-sm text-gray-400 mt-1">
                  Start a new prediction to see your history here.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
