
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
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-1.5">
        <Label htmlFor={field}>{label}</Label>
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
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
        className="w-full"
        required
      />
    </div>
  );
};

export default InputField;
