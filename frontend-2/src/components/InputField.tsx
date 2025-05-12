
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { InfoIcon } from "lucide-react";

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
  return (
    <div className="mb-4 relative group">
      <div className="flex items-center gap-2 mb-1.5">
        <Label htmlFor={field} className="text-medical-dark font-medium">{label}</Label>
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-medical-primary hover:text-medical-secondary transition-colors" />
              </TooltipTrigger>
              <TooltipContent className="bg-white border border-medical-light p-2 shadow-lg">
                <p>{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <Input
        id={field}
        type="number"
        step="any"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(field, e.target.value)}
        className="w-full border-medical-light focus:border-medical-primary focus:ring-2 focus:ring-medical-primary/20 transition-all"
        required
      />
      <div className="absolute inset-0 border border-medical-light rounded-md -z-10 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity"></div>
    </div>
  );
};

export default InputField;
