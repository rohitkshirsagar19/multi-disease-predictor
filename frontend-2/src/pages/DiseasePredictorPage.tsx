
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import DiseaseSelector from "@/components/DiseaseSelector";
import DiseaseForm from "@/components/DiseaseForm";
import PredictionResult from "@/components/PredictionResult";
import { fetchPrediction } from "@/services/api";
import { diseaseInputs } from "@/utils/diseaseInputs";

const DiseasePredictorPage: React.FC = () => {
  const { toast } = useToast();
  const [selectedDisease, setSelectedDisease] = useState<string>("");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [prediction, setPrediction] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Reset form and results when disease changes
  useEffect(() => {
    setFormData({});
    setPrediction(null);
    setError(null);
  }, [selectedDisease]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDisease) {
      toast({
        title: "Error",
        description: "Please select a disease first",
        variant: "destructive",
      });
      return;
    }

    // Check if all fields are filled
    const fieldsList = diseaseInputs[selectedDisease].fields;
    const missingFields = fieldsList.filter(
      (f) => !formData[f.field] || formData[f.field].trim() === ""
    );

    if (missingFields.length > 0) {
      toast({
        title: "Missing fields",
        description: `Please fill all required fields`,
        variant: "destructive",
      });
      return;
    }

    // Convert string values to numbers
    const numericFormData: Record<string, number> = {};
    for (const key in formData) {
      numericFormData[key] = parseFloat(formData[key]);
    }

    setIsLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const result = await fetchPrediction(selectedDisease, numericFormData);
      setPrediction(result);
      
      // Save to prediction history
      savePredictionToHistory(selectedDisease, result);
      
      toast({
        title: "Prediction Complete",
        description: `Prediction for ${diseaseInputs[selectedDisease].displayName} completed successfully`,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Save prediction result to local storage for history tracking
  const savePredictionToHistory = (disease: string, result: number) => {
    const newPrediction = {
      id: Date.now().toString(),
      disease,
      date: new Date().toLocaleDateString(),
      result,
    };

    const existingHistory = localStorage.getItem("predictionHistory");
    let history = existingHistory ? JSON.parse(existingHistory) : [];
    
    // Add new prediction to the beginning of the array
    history = [newPrediction, ...history];
    
    // Keep only the last 10 predictions
    if (history.length > 10) {
      history = history.slice(0, 10);
    }
    
    localStorage.setItem("predictionHistory", JSON.stringify(history));
  };

  const handleClearForm = () => {
    setFormData({});
    setPrediction(null);
    setError(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <div className="inline-block p-1.5 rounded-full bg-medical-light mb-4">
          <div className="bg-gradient-to-r from-medical-primary to-medical-secondary text-white px-6 py-2 rounded-full">
            Health Prediction
          </div>
        </div>
        <h1 className="text-3xl font-bold text-medical-dark mb-4">
          Disease Prediction System
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select a disease and enter your health data to get a prediction based on machine learning models. 
          This tool is for informational purposes only and should not replace professional medical advice.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <DiseaseSelector
          selectedDisease={selectedDisease}
          setSelectedDisease={setSelectedDisease}
        />
      </div>

      {selectedDisease && (
        <DiseaseForm
          selectedDisease={selectedDisease}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          onClear={handleClearForm}
        />
      )}

      {(prediction !== null || error !== null) && (
        <div className="mt-8 animate-fadeIn">
          <PredictionResult prediction={prediction} error={error} />
        </div>
      )}
    </div>
  );
};

export default DiseasePredictorPage;
