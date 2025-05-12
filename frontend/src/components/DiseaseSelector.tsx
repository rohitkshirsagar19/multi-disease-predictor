import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { diseaseInputs } from "@/utils/diseaseInputs";
import { cn } from "@/lib/utils";

interface DiseaseSelectorProps {
  selectedDisease: string;
  setSelectedDisease: (disease: string) => void;
}

const DiseaseSelector: React.FC<DiseaseSelectorProps> = ({
  selectedDisease,
  setSelectedDisease,
}) => {
  return (
    <Card className="shadow-md">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Select Disease</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(diseaseInputs).map(([key, disease]) => (
            <Card
              key={key}
              className={cn(
                "cursor-pointer transition-all duration-200 hover:shadow-lg",
                selectedDisease === key
                  ? "border-2 border-medical-primary bg-medical-primary/5"
                  : "hover:border-medical-primary/50"
              )}
              onClick={() => setSelectedDisease(key)}
            >
              <CardContent className="p-4 flex items-center justify-center h-24">
                <span className="text-center font-medium">{disease.displayName}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DiseaseSelector;
