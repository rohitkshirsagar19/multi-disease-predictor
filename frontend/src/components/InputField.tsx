import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import BinaryChoiceField from "./BinaryChoiceField";

interface InputFieldProps {
  label: string;
  field: string;
  placeholder: string;
  tooltip?: string;
  value: string;
  onChange: (field: string, value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  field,
  placeholder,
  tooltip,
  value,
  onChange,
}) => {
  // Improved binary field detection
  const isBinaryField = () => {
    const lowerPlaceholder = placeholder.toLowerCase();
    const lowerField = field.toLowerCase();
    const lowerLabel = label.toLowerCase();

    // Check for common binary field patterns in placeholder
    const binaryPatterns = [
      /0\s*=\s*(no|female|rural|normal|never|private|govt|self-employed|formerly|smokes|never smoked|never worked|ata|nap|ta|flat|up|male|female|yes|no)/i,
      /1\s*=\s*(yes|male|urban|above|normal|well above|normal|private|govt|self-employed|formerly|smokes|never smoked|never worked|ata|nap|ta|flat|up|male|female|yes|no)/i,
    ];

    // Check if field name indicates binary choice
    const binaryFieldNames = [
      // Gender/Sex
      'gender', 'sex',
      // Lifestyle
      'smoking', 'smoke', 'alco', 'active',
      // Medical conditions
      'anxiety', 'peer_pressure', 'chronic_disease', 'fatigue', 'allergy',
      'wheezing', 'alcohol_consuming', 'coughing', 'shortness_of_breath',
      'swallowing_difficulty', 'chest_pain', 'hypertension', 'heart_disease',
      // Personal info
      'ever_married', 'residence_type',
      // Medical tests
      'exerciseangina_y', 'fastingbs',
      // Work type
      'work_type_govt_job', 'work_type_never_worked', 'work_type_private',
      'work_type_self_employed',
      // Smoking status
      'smoking_status_formerly_smoked', 'smoking_status_never_smoked',
      'smoking_status_smokes',
      // Chest pain types
      'chestpaintype_ata', 'chestpaintype_nap', 'chestpaintype_ta',
      // ST slope
      'st_slope_flat', 'st_slope_up',
      // Resting ECG
      'restingecg_normal', 'restingecg_st'
    ];

    // Check if label contains binary indicators
    const binaryLabelIndicators = [
      'yes/no', 'male/female', 'urban/rural', 'smoker/non-smoker',
      'married/unmarried', 'active/inactive', 'normal/abnormal'
    ];

    return binaryPatterns.some(pattern => pattern.test(lowerPlaceholder)) ||
      binaryFieldNames.some(name => lowerField.includes(name)) ||
      binaryLabelIndicators.some(indicator => lowerLabel.includes(indicator));
  };

  if (isBinaryField()) {
    return (
      <BinaryChoiceField
        label={label}
        field={field}
        value={value}
        onChange={onChange}
        tooltip={tooltip}
      />
    );
  }

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-1.5">
        <Label htmlFor={field}>{label}</Label>
        {tooltip && (
          <div className="relative group">
            <span className="text-gray-400 cursor-help">ⓘ</span>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {tooltip}
            </div>
          </div>
        )}
      </div>
      <Input
        id={field}
        type="number"
        step="any"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(field, e.target.value)}
        className="w-full"
        required
      />
    </div>
  );
};

export default InputField;
