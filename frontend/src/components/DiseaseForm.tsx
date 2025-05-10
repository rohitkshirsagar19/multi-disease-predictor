
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import InputField from "./InputField";
import { diseaseInputs, InputField as InputFieldType } from "@/utils/diseaseInputs";
import LoadingSpinner from "./LoadingSpinner";

interface DiseaseFormProps {
  selectedDisease: string;
  formData: Record<string, string>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  onClear: () => void;
}

const DiseaseForm: React.FC<DiseaseFormProps> = ({
  selectedDisease,
  formData,
  setFormData,
  onSubmit,
  isLoading,
  onClear,
}) => {
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!selectedDisease) return null;

  const disease = diseaseInputs[selectedDisease];
  if (!disease) return null;

  return (
    <Card className="shadow-lg mt-6">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">
          Enter Health Data for {disease.displayName}
        </h2>
        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {disease.fields.map((field: InputFieldType) => (
              <InputField
                key={field.field}
                label={field.label}
                field={field.field}
                placeholder={field.placeholder}
                tooltip={field.tooltip}
                value={formData[field.field] || ""}
                onChange={handleInputChange}
              />
            ))}
          </div>
          <div className="flex space-x-4 mt-6">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-medical-primary hover:bg-blue-700"
            >
              {isLoading ? <LoadingSpinner /> : "Generate Prediction"}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              onClick={onClear}
            >
              Clear Form
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DiseaseForm;
