
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import InputField from "./InputField";
import RadioField from "./RadioField";
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

  // Helper function to determine if a field is a binary yes/no field
  const isBinaryField = (field: InputFieldType): boolean => {
    const binaryKeywords = ["smoking", "gender", "sex", "yes", "no", "present", "absent"];
    const fieldLower = field.field.toLowerCase();
    const tooltipLower = field.tooltip?.toLowerCase() || "";
    const placeholderLower = field.placeholder?.toLowerCase() || "";
    
    // Check if the field name, tooltip, or placeholder contains binary indicators
    return (
      binaryKeywords.some(keyword => fieldLower.includes(keyword)) || 
      tooltipLower.includes("0 = no") || 
      tooltipLower.includes("1 = yes") ||
      tooltipLower.includes("0 for no") || 
      tooltipLower.includes("1 for yes") ||
      placeholderLower.includes("0 = no") || 
      placeholderLower.includes("1 = yes")
    ) && !fieldLower.includes("age") && !fieldLower.includes("count");
  };

  return (
    <Card className="shadow-lg mt-6 border-t-4 border-t-medical-primary">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-medical-dark flex items-center">
          <span className="inline-block w-2 h-8 bg-medical-primary mr-2"></span>
          Enter Health Data for {disease.displayName}
        </h2>
        <form onSubmit={onSubmit} className="bg-white rounded-lg p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {disease.fields.map((field: InputFieldType) => (
              isBinaryField(field) ? (
                <RadioField
                  key={field.field}
                  label={field.label}
                  field={field.field}
                  tooltip={field.tooltip}
                  value={formData[field.field] || ""}
                  onChange={handleInputChange}
                />
              ) : (
                <InputField
                  key={field.field}
                  label={field.label}
                  field={field.field}
                  placeholder={field.placeholder}
                  tooltip={field.tooltip}
                  value={formData[field.field] || ""}
                  onChange={handleInputChange}
                />
              )
            ))}
          </div>
          <div className="flex space-x-4 mt-8">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-medical-primary to-medical-secondary hover:from-medical-secondary hover:to-medical-primary text-white px-6 py-2 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {isLoading ? <LoadingSpinner /> : "Generate Prediction"}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              onClick={onClear}
              className="border-medical-light hover:bg-gray-50"
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
