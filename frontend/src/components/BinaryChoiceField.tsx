import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
    User,
    Users,
    CheckCircle,
    XCircle,
    Home,
    Building2,
    Cigarette,
    CigaretteOff,
    Heart,
    HeartOff,
    Activity,
    AlertCircle,
    BeanOff,
    Wine,
    WineOff,
    Cog,
    Wind,
    HeartPulse,
    Building,
    Briefcase,
    BriefcaseBusiness,
    UserCog,
    Stethoscope,
    ActivitySquare,
    LineChart
} from "lucide-react";

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
    // Get the appropriate labels and icons based on the field type
    const getFieldConfig = () => {
        const lowerField = field.toLowerCase();
        const lowerLabel = label.toLowerCase();

        // Gender/Sex fields
        if (lowerField.includes("gender") || lowerField.includes("sex")) {
            return {
                true: { label: "Male", icon: User },
                false: { label: "Female", icon: Users }
            };
        }

        // Residence type
        if (lowerField.includes("residence_type")) {
            return {
                true: { label: "Urban", icon: Building2 },
                false: { label: "Rural", icon: Home }
            };
        }

        // Work type fields
        if (lowerField.includes("work_type")) {
            if (lowerField.includes("govt")) {
                return {
                    true: { label: "Government Job", icon: Building },
                    false: { label: "Not Government Job", icon: Building }
                };
            }
            if (lowerField.includes("private")) {
                return {
                    true: { label: "Private Job", icon: Briefcase },
                    false: { label: "Not Private Job", icon: Briefcase }
                };
            }
            if (lowerField.includes("self")) {
                return {
                    true: { label: "Self-employed", icon: BriefcaseBusiness },
                    false: { label: "Not Self-employed", icon: BriefcaseBusiness }
                };
            }
            if (lowerField.includes("never")) {
                return {
                    true: { label: "Never Worked", icon: UserCog },
                    false: { label: "Has Worked", icon: UserCog }
                };
            }
        }

        // Smoking status fields
        if (lowerField.includes("smoking_status")) {
            if (lowerField.includes("formerly")) {
                return {
                    true: { label: "Formerly Smoked", icon: Cigarette },
                    false: { label: "Never Formerly Smoked", icon: CigaretteOff }
                };
            }
            if (lowerField.includes("never")) {
                return {
                    true: { label: "Never Smoked", icon: CigaretteOff },
                    false: { label: "Has Smoked", icon: Cigarette }
                };
            }
            if (lowerField.includes("smokes")) {
                return {
                    true: { label: "Currently Smokes", icon: Cigarette },
                    false: { label: "Doesn't Smoke", icon: CigaretteOff }
                };
            }
        }

        // Medical conditions
        if (lowerField.includes("anxiety")) {
            return {
                true: { label: "Has Anxiety", icon: AlertCircle },
                false: { label: "No Anxiety", icon: AlertCircle }
            };
        }
        if (lowerField.includes("chronic_disease")) {
            return {
                true: { label: "Has Chronic Disease", icon: Stethoscope },
                false: { label: "No Chronic Disease", icon: Stethoscope }
            };
        }
        if (lowerField.includes("fatigue")) {
            return {
                true: { label: "Has Fatigue", icon: Activity },
                false: { label: "No Fatigue", icon: Activity }
            };
        }
        if (lowerField.includes("allergy")) {
            return {
                true: { label: "Has Allergy", icon: AlertCircle },
                false: { label: "No Allergy", icon: AlertCircle }
            };
        }
        if (lowerField.includes("wheezing")) {
            return {
                true: { label: "Has Wheezing", icon: Wind },
                false: { label: "No Wheezing", icon: Wind }
            };
        }
        if (lowerField.includes("alcohol_consuming")) {
            return {
                true: { label: "Consumes Alcohol", icon: Wine },
                false: { label: "Doesn't Consume Alcohol", icon: WineOff }
            };
        }
        if (lowerField.includes("coughing")) {
            return {
                true: { label: "Has Cough", icon: Cog },
                false: { label: "No Cough", icon: Cog }
            };
        }
        if (lowerField.includes("shortness_of_breath")) {
            return {
                true: { label: "Has Shortness of Breath", icon: HeartPulse },
                false: { label: "No Shortness of Breath", icon: HeartPulse }
            };
        }
        if (lowerField.includes("swallowing_difficulty")) {
            return {
                true: { label: "Has Swallowing Difficulty", icon: AlertCircle },
                false: { label: "No Swallowing Difficulty", icon: AlertCircle }
            };
        }
        if (lowerField.includes("chest_pain")) {
            return {
                true: { label: "Has Chest Pain", icon: HeartPulse },
                false: { label: "No Chest Pain", icon: HeartPulse }
            };
        }
        if (lowerField.includes("hypertension")) {
            return {
                true: { label: "Has Hypertension", icon: ActivitySquare },
                false: { label: "No Hypertension", icon: ActivitySquare }
            };
        }
        if (lowerField.includes("heart_disease")) {
            return {
                true: { label: "Has Heart Disease", icon: Heart },
                false: { label: "No Heart Disease", icon: HeartOff }
            };
        }
        if (lowerField.includes("exerciseangina_y")) {
            return {
                true: { label: "Has Exercise Angina", icon: HeartPulse },
                false: { label: "No Exercise Angina", icon: HeartPulse }
            };
        }
        if (lowerField.includes("fastingbs")) {
            return {
                true: { label: "High Fasting BS", icon: LineChart },
                false: { label: "Normal Fasting BS", icon: LineChart }
            };
        }

        // Default Yes/No for other binary fields
        return {
            true: { label: "Yes", icon: CheckCircle },
            false: { label: "No", icon: XCircle }
        };
    };

    const config = getFieldConfig();
    const TrueIcon = config.true.icon;
    const FalseIcon = config.false.icon;

    return (
        <div className="mb-4 form-animate">
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
                    <CardContent className="p-3 flex items-center justify-center gap-2">
                        <TrueIcon className="w-5 h-5" />
                        <span className="text-center font-medium">{config.true.label}</span>
                    </CardContent>
                </Card>
                <Card
                    className={cn(
                        "cursor-pointer transition-all duration-200 hover:shadow-md",
                        value === "0" ? "border-2 border-medical-primary bg-medical-primary/5" : "hover:border-medical-primary/50"
                    )}
                    onClick={() => onChange(field, "0")}
                >
                    <CardContent className="p-3 flex items-center justify-center gap-2">
                        <FalseIcon className="w-5 h-5" />
                        <span className="text-center font-medium">{config.false.label}</span>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default BinaryChoiceField; 