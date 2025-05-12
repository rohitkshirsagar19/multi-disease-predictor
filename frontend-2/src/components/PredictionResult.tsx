
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface PredictionResultProps {
  prediction: number | null;
  error: string | null;
}

const PredictionResult: React.FC<PredictionResultProps> = ({ prediction, error }) => {
  if (prediction === null && error === null) return null;

  return (
    <Card className="shadow-lg border-2">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Prediction Result</h2>

        {error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <div className="flex">
              <div className="ml-3">
                <p className="text-red-700 font-medium">Error</p>
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
          </div>
        ) : prediction !== null ? (
          <div>
            <div
              className={`rounded-lg p-4 ${
                prediction === 1
                  ? "bg-red-50 text-medical-danger"
                  : "bg-green-50 text-medical-success"
              }`}
            >
              <p className="font-semibold text-lg">
                The model predicts that the disease is{" "}
                <span className="font-bold">
                  {prediction === 1 ? "present" : "absent"}
                </span>
                .
              </p>
            </div>
            <p className="text-gray-500 mt-4 text-sm">
              This prediction is based on the health data provided. 
              Please consult with a healthcare professional for proper diagnosis.
            </p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default PredictionResult;
