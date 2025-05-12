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
    Droplet,
    Pill,
    Globe,
    ActivitySquare
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
                tooltip: "Select your gender (0 = male, 1 = female)"
            },
            Country_China: {
                icon: Globe,
                tooltip: "Select if you are from China"
            },
            Country_Germany: {
                icon: Globe,
                tooltip: "Select if you are from Germany"
            },
            Country_India: {
                icon: Globe,
                tooltip: "Select if you are from India"
            },
            Country_Luxembourg: {
                icon: Globe,
                tooltip: "Select if you are from Luxembourg"
            },
            Country_South_Africa: {
                icon: Globe,
                tooltip: "Select if you are from South Africa"
            },
            Country_USA: {
                icon: Globe,
                tooltip: "Select if you are from USA"
            },
            TSH: {
                icon: Activity,
                tooltip: "Enter your Thyroid-stimulating hormone level"
            },
            T3: {
                icon: Activity,
                tooltip: "Enter your Triiodothyronine level"
            },
            TT4: {
                icon: Activity,
                tooltip: "Enter your Total thyroxine level"
            },
            T4U: {
                icon: Activity,
                tooltip: "Enter your Thyroxine uptake"
            },
            FTI: {
                icon: ActivitySquare,
                tooltip: "Enter your Free Thyroxine Index"
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
                            placeholder="0 = male, 1 = female"
                            tooltip={getFieldConfig("Gender").tooltip}
                            value={formData.Gender || ""}
                            onChange={handleInputChange}
                        />
                    </motion.div>

                    {/* Country Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="section section-2"
                    >
                        <h2 className="text-xl font-semibold mb-4 text-primary">Country</h2>
                        <InputField
                            label="China"
                            field="Country_China"
                            placeholder="1 if China, 0 otherwise"
                            tooltip={getFieldConfig("Country_China").tooltip}
                            value={formData.Country_China || ""}
                            onChange={handleInputChange}
                        />
                        <InputField
                            label="Germany"
                            field="Country_Germany"
                            placeholder="1 if Germany, 0 otherwise"
                            tooltip={getFieldConfig("Country_Germany").tooltip}
                            value={formData.Country_Germany || ""}
                            onChange={handleInputChange}
                        />
                        <InputField
                            label="India"
                            field="Country_India"
                            placeholder="1 if India, 0 otherwise"
                            tooltip={getFieldConfig("Country_India").tooltip}
                            value={formData.Country_India || ""}
                            onChange={handleInputChange}
                        />
                        <InputField
                            label="Luxembourg"
                            field="Country_Luxembourg"
                            placeholder="1 if Luxembourg, 0 otherwise"
                            tooltip={getFieldConfig("Country_Luxembourg").tooltip}
                            value={formData.Country_Luxembourg || ""}
                            onChange={handleInputChange}
                        />
                        <InputField
                            label="South Africa"
                            field="Country_South_Africa"
                            placeholder="1 if South Africa, 0 otherwise"
                            tooltip={getFieldConfig("Country_South_Africa").tooltip}
                            value={formData.Country_South_Africa || ""}
                            onChange={handleInputChange}
                        />
                        <InputField
                            label="USA"
                            field="Country_USA"
                            placeholder="1 if USA, 0 otherwise"
                            tooltip={getFieldConfig("Country_USA").tooltip}
                            value={formData.Country_USA || ""}
                            onChange={handleInputChange}
                        />
                    </motion.div>

                    {/* Thyroid Levels Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className="section section-3"
                    >
                        <h2 className="text-xl font-semibold mb-4 text-primary">Thyroid Levels</h2>
                        <InputField
                            label="TSH"
                            field="TSH"
                            placeholder="Thyroid-stimulating hormone level"
                            tooltip={getFieldConfig("TSH").tooltip}
                            value={formData.TSH || ""}
                            onChange={handleInputChange}
                        />
                        <InputField
                            label="T3"
                            field="T3"
                            placeholder="Triiodothyronine level"
                            tooltip={getFieldConfig("T3").tooltip}
                            value={formData.T3 || ""}
                            onChange={handleInputChange}
                        />
                        <InputField
                            label="TT4"
                            field="TT4"
                            placeholder="Total thyroxine level"
                            tooltip={getFieldConfig("TT4").tooltip}
                            value={formData.TT4 || ""}
                            onChange={handleInputChange}
                        />
                        <InputField
                            label="T4U"
                            field="T4U"
                            placeholder="Thyroxine uptake"
                            tooltip={getFieldConfig("T4U").tooltip}
                            value={formData.T4U || ""}
                            onChange={handleInputChange}
                        />
                        <InputField
                            label="FTI"
                            field="FTI"
                            placeholder="Free Thyroxine Index"
                            tooltip={getFieldConfig("FTI").tooltip}
                            value={formData.FTI || ""}
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