import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import InputField from "./InputField";
import { diseaseInputs, InputField as InputFieldType } from "@/utils/diseaseInputs";
import LoadingSpinner from "./LoadingSpinner";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="shadow-lg mt-6">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Enter Health Data for {disease.displayName}
          </h2>
          <form onSubmit={onSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {disease.fields.map((field: InputFieldType) => (
                <motion.div
                  key={field.field}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <InputField
                    label={field.label}
                    field={field.field}
                    placeholder={field.placeholder}
                    tooltip={field.tooltip}
                    value={formData[field.field] || ""}
                    onChange={handleInputChange}
                  />
                </motion.div>
              ))}
            </div>
            <div className="flex space-x-4 mt-8">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-medical-primary hover:bg-blue-700 transition-colors duration-200 min-w-[200px]"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <LoadingSpinner />
                    <span>Generating...</span>
                  </div>
                ) : (
                  "Generate Prediction"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={isLoading}
                onClick={onClear}
                className="hover:bg-gray-100 transition-colors duration-200"
              >
                Clear Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DiseaseForm;
