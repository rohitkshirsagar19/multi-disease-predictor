
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { diseaseInputs } from "@/utils/diseaseInputs";

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
        <Select value={selectedDisease} onValueChange={setSelectedDisease}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose a disease to predict" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(diseaseInputs).map((disease) => (
              <SelectItem key={disease} value={disease}>
                {diseaseInputs[disease].displayName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

export default DiseaseSelector;
