import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import InputField from "./InputField";
import { motion } from "framer-motion";
import {
    Activity,
    AlertCircle,
    Heart,
    HeartPulse,
    Scale,
    Thermometer,
    User,
    Users,
    Cigarette,
    CigaretteOff,
    Brain,
    BrainOff,
    Droplet,
    DropletOff,
    Pill,
    PillOff
} from "lucide-react";

interface ThyroidFormProps {
    formData: Record<string, string>;
    setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
    onSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
    onClear: () => void;
}

const ThyroidForm: React.FC<ThyroidFormProps> = ({
    formData,
    setFormData,
    onSubmit,
    isLoading,
    onClear,
}) => {
    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const getFieldConfig = (field: string) => {
        const configs: Record<string, { icon: any; tooltip: string }> = {
            Age: {
                icon: User,
                tooltip: "Enter your age in years"
            },
            Gender: {
                icon: Users,
                tooltip: "Select your gender"
            },
            Family_History: {
                icon: Users,
                tooltip: "Do you have a family history of thyroid disorders?"
            },
            Radiation_Exposure: {
                icon: AlertCircle,
                tooltip: "Have you been exposed to radiation?"
            },
            Iodine_Deficiency: {
                icon: Droplet,
                tooltip: "Do you have iodine deficiency?"
            },
            Smoking: {
                icon: Cigarette,
                tooltip: "Do you smoke?"
            },
            Obesity: {
                icon: Scale,
                tooltip: "Are you obese?"
            },
            Diabetes: {
                icon: HeartPulse,
                tooltip: "Do you have diabetes?"
            },
            TSH_Level: {
                icon: Activity,
                tooltip: "Enter your TSH (Thyroid Stimulating Hormone) level"
            },
            T3_Level: {
                icon: Activity,
                tooltip: "Enter your T3 hormone level"
            },
            T4_Level: {
                icon: Activity,
                tooltip: "Enter your T4 hormone level"
            },
            Nodule_Size: {
                icon: AlertCircle,
                tooltip: "Enter the size of thyroid nodule (if any) in mm"
            }
        };

        return configs[field] || { icon: AlertCircle, tooltip: "" };
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="prediction-page"
        >
            <div className="prediction-header">
                <h1 className="text-3xl font-bold mb-2">Thyroid Disease Prediction</h1>
                <p className="text-lg opacity-90">
                    Enter your health data to predict the likelihood of thyroid disease
                </p>
            </div>

            <form onSubmit={onSubmit} className="prediction-form">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Information Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="section section-1"
                    >
                        <h2 className="text-xl font-semibold mb-4 text-primary">Personal Information</h2>
                        <InputField
                            label="Age"
                            field="Age"
                            placeholder="Enter your age"
                            tooltip={getFieldConfig("Age").tooltip}
                            value={formData.Age || ""}
                            onChange={handleInputChange}
                        />
                        <InputField
                            label="Gender"
                            field="Gender"
                            placeholder="0 = Female, 1 = Male"
                            tooltip={getFieldConfig("Gender").tooltip}
                            value={formData.Gender || ""}
                            onChange={handleInputChange}
                        />
                    </motion.div>

                    {/* Risk Factors Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="section section-2"
                    >
                        <h2 className="text-xl font-semibold mb-4 text-primary">Risk Factors</h2>
                        <InputField
                            label="Family History"
                            field="Family_History"
                            placeholder="0 = No, 1 = Yes"
                            tooltip={getFieldConfig("Family_History").tooltip}
                            value={formData.Family_History || ""}
                            onChange={handleInputChange}
                        />
                        <InputField
                            label="Radiation Exposure"
                            field="Radiation_Exposure"
                            placeholder="0 = No, 1 = Yes"
                            tooltip={getFieldConfig("Radiation_Exposure").tooltip}
                            value={formData.Radiation_Exposure || ""}
                            onChange={handleInputChange}
                        />
                        <InputField
                            label="Iodine Deficiency"
                            field="Iodine_Deficiency"
                            placeholder="0 = No, 1 = Yes"
                            tooltip={getFieldConfig("Iodine_Deficiency").tooltip}
                            value={formData.Iodine_Deficiency || ""}
                            onChange={handleInputChange}
                        />
                    </motion.div>

                    {/* Lifestyle Factors Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className="section section-3"
                    >
                        <h2 className="text-xl font-semibold mb-4 text-primary">Lifestyle Factors</h2>
                        <InputField
                            label="Smoking"
                            field="Smoking"
                            placeholder="0 = No, 1 = Yes"
                            tooltip={getFieldConfig("Smoking").tooltip}
                            value={formData.Smoking || ""}
                            onChange={handleInputChange}
                        />
                        <InputField
                            label="Obesity"
                            field="Obesity"
                            placeholder="0 = No, 1 = Yes"
                            tooltip={getFieldConfig("Obesity").tooltip}
                            value={formData.Obesity || ""}
                            onChange={handleInputChange}
                        />
                        <InputField
                            label="Diabetes"
                            field="Diabetes"
                            placeholder="0 = No, 1 = Yes"
                            tooltip={getFieldConfig("Diabetes").tooltip}
                            value={formData.Diabetes || ""}
                            onChange={handleInputChange}
                        />
                    </motion.div>

                    {/* Thyroid Levels Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                        className="section section-4"
                    >
                        <h2 className="text-xl font-semibold mb-4 text-primary">Thyroid Levels</h2>
                        <InputField
                            label="TSH Level"
                            field="TSH_Level"
                            placeholder="Enter TSH level"
                            tooltip={getFieldConfig("TSH_Level").tooltip}
                            value={formData.TSH_Level || ""}
                            onChange={handleInputChange}
                        />
                        <InputField
                            label="T3 Level"
                            field="T3_Level"
                            placeholder="Enter T3 level"
                            tooltip={getFieldConfig("T3_Level").tooltip}
                            value={formData.T3_Level || ""}
                            onChange={handleInputChange}
                        />
                        <InputField
                            label="T4 Level"
                            field="T4_Level"
                            placeholder="Enter T4 level"
                            tooltip={getFieldConfig("T4_Level").tooltip}
                            value={formData.T4_Level || ""}
                            onChange={handleInputChange}
                        />
                        <InputField
                            label="Nodule Size"
                            field="Nodule_Size"
                            placeholder="Enter nodule size in mm"
                            tooltip={getFieldConfig("Nodule_Size").tooltip}
                            value={formData.Nodule_Size || ""}
                            onChange={handleInputChange}
                        />
                    </motion.div>
                </div>

                <div className="flex space-x-4 mt-8">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="button-primary min-w-[200px]"
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <div className="loading-spinner" />
                                <span>Generating Prediction...</span>
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
        </motion.div>
    );
};

export default ThyroidForm; 