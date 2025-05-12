
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { InfoIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RadioFieldProps {
  label: string;
  field: string;
  tooltip?: string;
  value: string;
  onChange: (field: string, value: string) => void;
}

const RadioField: React.FC<RadioFieldProps> = ({
  label,
  field,
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
      <RadioGroup
        id={field}
        value={value}
        onValueChange={(value) => onChange(field, value)}
        className="flex space-x-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="0" id={`${field}-no`} />
          <Label htmlFor={`${field}-no`} className="cursor-pointer">No</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="1" id={`${field}-yes`} />
          <Label htmlFor={`${field}-yes`} className="cursor-pointer">Yes</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default RadioField;
