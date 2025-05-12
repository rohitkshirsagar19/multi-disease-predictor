import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface BinaryChoiceFieldProps {
    label: string;
    field: string;
    value: string;
    onChange: (field: string, value: string) => void;
    tooltip?: string;
}

const BinaryChoiceField: React.FC<BinaryChoiceFieldProps> = ({
    label,
    field,
    value,
    onChange,
    tooltip,
}) => {
    // Get the appropriate labels based on the field type
    const getLabels = () => {
        const lowerField = field.toLowerCase();
        const lowerLabel = label.toLowerCase();

        // Gender/Sex fields
        if (lowerField.includes("gender") || lowerField.includes("sex")) {
            return { true: "Male", false: "Female" };
        }

        // Residence type
        if (lowerField.includes("residence_type")) {
            return { true: "Urban", false: "Rural" };
        }

        // Work type fields
        if (lowerField.includes("work_type")) {
            if (lowerField.includes("govt")) {
                return { true: "Government Job", false: "Not Government Job" };
            }
            if (lowerField.includes("private")) {
                return { true: "Private Job", false: "Not Private Job" };
            }
            if (lowerField.includes("self")) {
                return { true: "Self-employed", false: "Not Self-employed" };
            }
            if (lowerField.includes("never")) {
                return { true: "Never Worked", false: "Has Worked" };
            }
        }

        // Smoking status fields
        if (lowerField.includes("smoking_status")) {
            if (lowerField.includes("formerly")) {
                return { true: "Formerly Smoked", false: "Never Formerly Smoked" };
            }
            if (lowerField.includes("never")) {
                return { true: "Never Smoked", false: "Has Smoked" };
            }
            if (lowerField.includes("smokes")) {
                return { true: "Currently Smokes", false: "Doesn't Smoke" };
            }
        }

        // Chest pain type fields
        if (lowerField.includes("chestpaintype")) {
            if (lowerField.includes("ata")) {
                return { true: "Atypical Angina", false: "Not Atypical Angina" };
            }
            if (lowerField.includes("nap")) {
                return { true: "Non-Anginal Pain", false: "Not Non-Anginal Pain" };
            }
            if (lowerField.includes("ta")) {
                return { true: "Typical Angina", false: "Not Typical Angina" };
            }
        }

        // ST slope fields
        if (lowerField.includes("st_slope")) {
            if (lowerField.includes("flat")) {
                return { true: "Flat", false: "Not Flat" };
            }
            if (lowerField.includes("up")) {
                return { true: "Upsloping", false: "Not Upsloping" };
            }
        }

        // Default Yes/No for other binary fields
        return { true: "Yes", false: "No" };
    };

    const labels = getLabels();

    return (
        <div className="mb-4">
            <div className="flex items-center gap-2 mb-1.5">
                <label className="text-sm font-medium">{label}</label>
                {tooltip && (
                    <div className="relative group">
                        <span className="text-gray-400 cursor-help">ⓘ</span>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {tooltip}
                        </div>
                    </div>
                )}
            </div>
            <div className="grid grid-cols-2 gap-2">
                <Card
                    className={cn(
                        "cursor-pointer transition-all duration-200 hover:shadow-md",
                        value === "1" ? "border-2 border-medical-primary bg-medical-primary/5" : "hover:border-medical-primary/50"
                    )}
                    onClick={() => onChange(field, "1")}
                >
                    <CardContent className="p-3 flex items-center justify-center">
                        <span className="text-center font-medium">{labels.true}</span>
                    </CardContent>
                </Card>
                <Card
                    className={cn(
                        "cursor-pointer transition-all duration-200 hover:shadow-md",
                        value === "0" ? "border-2 border-medical-primary bg-medical-primary/5" : "hover:border-medical-primary/50"
                    )}
                    onClick={() => onChange(field, "0")}
                >
                    <CardContent className="p-3 flex items-center justify-center">
                        <span className="text-center font-medium">{labels.false}</span>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default BinaryChoiceField; 