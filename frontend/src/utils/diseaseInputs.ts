export type InputField = {
  label: string;
  field: string;
  placeholder: string;
  tooltip?: string;
};

export type DiseaseInputs = {
  [key: string]: {
    displayName: string;
    fields: InputField[];
  };
};

export const diseaseInputs: DiseaseInputs = {
  anemia: {
    displayName: "Anemia",
    fields: [
      { label: "Age", field: "Age", placeholder: "Enter age in years" },
      { label: "Sex", field: "Sex", placeholder: "0 = male, 1 = female", tooltip: "Enter 0 for male, 1 for female" },
      { label: "RBC", field: "RBC", placeholder: "Red Blood Cell count" },
      { label: "PCV", field: "PCV", placeholder: "Packed Cell Volume" },
      { label: "MCV", field: "MCV", placeholder: "Mean Corpuscular Volume" },
      { label: "MCH", field: "MCH", placeholder: "Mean Corpuscular Hemoglobin" },
      { label: "MCHC", field: "MCHC", placeholder: "Mean Corpuscular Hemoglobin Concentration" },
      { label: "RDW", field: "RDW", placeholder: "Red Cell Distribution Width" },
      { label: "TLC", field: "TLC", placeholder: "Total Leukocyte Count" },
      { label: "PLT_mm3", field: "PLT_mm3", placeholder: "Platelets per mm³" },
      { label: "HGB", field: "HGB", placeholder: "Hemoglobin" },
    ]
  },
  lung_cancer: {
    displayName: "Lung Cancer",
    fields: [
      { label: "GENDER", field: "GENDER", placeholder: "0 = male, 1 = female", tooltip: "Enter 0 for male, 1 for female" },
      { label: "AGE", field: "AGE", placeholder: "Enter age in years" },
      { label: "SMOKING", field: "SMOKING", placeholder: "0 = no, 1 = yes", tooltip: "Enter 1 if yes, 0 if no" },
      { label: "YELLOW_FINGERS", field: "YELLOW_FINGERS", placeholder: "0 = no, 1 = yes", tooltip: "Enter 1 if yes, 0 if no" },
      { label: "ANXIETY", field: "ANXIETY", placeholder: "0 = no, 1 = yes", tooltip: "Enter 1 if yes, 0 if no" },
      { label: "PEER_PRESSURE", field: "PEER_PRESSURE", placeholder: "0 = no, 1 = yes", tooltip: "Enter 1 if yes, 0 if no" },
      { label: "CHRONIC_DISEASE", field: "CHRONIC_DISEASE", placeholder: "0 = no, 1 = yes", tooltip: "Enter 1 if yes, 0 if no" },
      { label: "FATIGUE", field: "FATIGUE", placeholder: "0 = no, 1 = yes", tooltip: "Enter 1 if yes, 0 if no" },
      { label: "ALLERGY", field: "ALLERGY", placeholder: "0 = no, 1 = yes", tooltip: "Enter 1 if yes, 0 if no" },
      { label: "WHEEZING", field: "WHEEZING", placeholder: "0 = no, 1 = yes", tooltip: "Enter 1 if yes, 0 if no" },
      { label: "ALCOHOL_CONSUMING", field: "ALCOHOL_CONSUMING", placeholder: "0 = no, 1 = yes", tooltip: "Enter 1 if yes, 0 if no" },
      { label: "COUGHING", field: "COUGHING", placeholder: "0 = no, 1 = yes", tooltip: "Enter 1 if yes, 0 if no" },
      { label: "SHORTNESS_OF_BREATH", field: "SHORTNESS_OF_BREATH", placeholder: "0 = no, 1 = yes", tooltip: "Enter 1 if yes, 0 if no" },
      { label: "SWALLOWING_DIFFICULTY", field: "SWALLOWING_DIFFICULTY", placeholder: "0 = no, 1 = yes", tooltip: "Enter 1 if yes, 0 if no" },
      { label: "CHEST_PAIN", field: "CHEST_PAIN", placeholder: "0 = no, 1 = yes", tooltip: "Enter 1 if yes, 0 if no" },
    ]
  },
  hepatitis: {
    displayName: "Hepatitis",
    fields: [
      { label: "Age", field: "Age", placeholder: "Enter age in years" },
      { label: "Sex", field: "Sex", placeholder: "0 = male, 1 = female", tooltip: "Enter 0 for male, 1 for female" },
      { label: "ALB", field: "ALB", placeholder: "Albumin level" },
      { label: "ALP", field: "ALP", placeholder: "Alkaline phosphatase" },
      { label: "ALT", field: "ALT", placeholder: "Alanine aminotransferase" },
      { label: "AST", field: "AST", placeholder: "Aspartate aminotransferase" },
      { label: "BIL", field: "BIL", placeholder: "Bilirubin" },
      { label: "CHE", field: "CHE", placeholder: "Cholinesterase" },
      { label: "CHOL", field: "CHOL", placeholder: "Cholesterol" },
      { label: "CREA", field: "CREA", placeholder: "Creatinine" },
      { label: "GGT", field: "GGT", placeholder: "Gamma-glutamyl transferase" },
      { label: "PROT", field: "PROT", placeholder: "Total protein" },
    ]
  },
  cardiovascular: {
    displayName: "Cardiovascular",
    fields: [
      { label: "age", field: "age", placeholder: "Enter age in days" },
      { label: "gender", field: "gender", placeholder: "1 = female, 2 = male", tooltip: "Enter 1 for female, 2 for male" },
      { label: "height", field: "height", placeholder: "Enter height in cm" },
      { label: "weight", field: "weight", placeholder: "Enter weight in kg" },
      { label: "ap_hi", field: "ap_hi", placeholder: "Systolic blood pressure" },
      { label: "ap_lo", field: "ap_lo", placeholder: "Diastolic blood pressure" },
      { label: "cholesterol", field: "cholesterol", placeholder: "1=normal, 2=above normal, 3=well above normal", tooltip: "1=normal, 2=above normal, 3=well above normal" },
      { label: "gluc", field: "gluc", placeholder: "1=normal, 2=above normal, 3=well above normal", tooltip: "1=normal, 2=above normal, 3=well above normal" },
      { label: "smoke", field: "smoke", placeholder: "0 = no, 1 = yes", tooltip: "Enter 1 if yes, 0 if no" },
      { label: "alco", field: "alco", placeholder: "0 = no, 1 = yes", tooltip: "Enter 1 if yes, 0 if no" },
      { label: "active", field: "active", placeholder: "0 = no, 1 = yes", tooltip: "Enter 1 if yes, 0 if no" },
    ]
  },
  thyroid: {
    displayName: "Thyroid",
    fields: [
      { label: "Age", field: "Age", placeholder: "Enter age in years" },
      { label: "Gender", field: "Gender", placeholder: "0 = male, 1 = female", tooltip: "Enter 0 for male, 1 for female" },
      { label: "Family History", field: "Family_History", placeholder: "0 = no, 1 = yes", tooltip: "Do you have a family history of thyroid disorders?" },
      { label: "Radiation Exposure", field: "Radiation_Exposure", placeholder: "0 = no, 1 = yes", tooltip: "Have you been exposed to radiation?" },
      { label: "Iodine Deficiency", field: "Iodine_Deficiency", placeholder: "0 = no, 1 = yes", tooltip: "Do you have iodine deficiency?" },
      { label: "Smoking", field: "Smoking", placeholder: "0 = no, 1 = yes", tooltip: "Do you smoke?" },
      { label: "Obesity", field: "Obesity", placeholder: "0 = no, 1 = yes", tooltip: "Are you obese?" },
      { label: "Diabetes", field: "Diabetes", placeholder: "0 = no, 1 = yes", tooltip: "Do you have diabetes?" },
      { label: "TSH Level", field: "TSH_Level", placeholder: "Thyroid-stimulating hormone level", tooltip: "Enter your TSH level" },
      { label: "T3 Level", field: "T3_Level", placeholder: "Triiodothyronine level", tooltip: "Enter your T3 level" },
      { label: "T4 Level", field: "T4_Level", placeholder: "Total thyroxine level", tooltip: "Enter your T4 level" },
      { label: "Nodule Size", field: "Nodule_Size", placeholder: "Size in mm", tooltip: "Enter the size of thyroid nodule (if any) in mm" }
    ]
  },
  heart: {
    displayName: "Heart Disease",
    fields: [
      { label: "Age", field: "Age", placeholder: "Enter age in years" },
      { label: "Sex", field: "Sex", placeholder: "0 = female, 1 = male", tooltip: "Enter 0 for female, 1 for male" },
      { label: "RestingBP", field: "RestingBP", placeholder: "Resting blood pressure (mm Hg)" },
      { label: "Cholesterol", field: "Cholesterol", placeholder: "Serum cholesterol (mg/dl)" },
      { label: "FastingBS", field: "FastingBS", placeholder: "0 = no, 1 = yes", tooltip: "Fasting blood sugar > 120 mg/dl: 1 if yes, 0 if no" },
      { label: "MaxHR", field: "MaxHR", placeholder: "Maximum heart rate achieved" },
      { label: "ExerciseAngina", field: "ExerciseAngina", placeholder: "0 = no, 1 = yes", tooltip: "Exercise-induced angina: 1 if yes, 0 if no" },
      { label: "Oldpeak", field: "Oldpeak", placeholder: "ST depression induced by exercise" },
      { label: "ChestPainType_ATA", field: "ChestPainType_ATA", placeholder: "1 if ATA, 0 otherwise", tooltip: "Atypical Angina: 1 if present, 0 if not" },
      { label: "ChestPainType_NAP", field: "ChestPainType_NAP", placeholder: "1 if NAP, 0 otherwise", tooltip: "Non-Anginal Pain: 1 if present, 0 if not" },
      { label: "ChestPainType_TA", field: "ChestPainType_TA", placeholder: "1 if TA, 0 otherwise", tooltip: "Typical Angina: 1 if present, 0 if not" },
      { label: "RestingECG_Normal", field: "RestingECG_Normal", placeholder: "1 if normal, 0 otherwise", tooltip: "Normal resting ECG: 1 if normal, 0 if not" },
      { label: "RestingECG_ST", field: "RestingECG_ST", placeholder: "1 if ST abnormality, 0 otherwise", tooltip: "ST-T wave abnormality: 1 if present, 0 if not" },
      { label: "ST_Slope_Flat", field: "ST_Slope_Flat", placeholder: "1 if flat, 0 otherwise", tooltip: "ST slope flat: 1 if yes, 0 if no" },
      { label: "ST_Slope_Up", field: "ST_Slope_Up", placeholder: "1 if upsloping, 0 otherwise", tooltip: "ST slope upsloping: 1 if yes, 0 if no" }
    ]
  },
  liver: {
    displayName: "Liver Disease",
    fields: [
      { label: "Age", field: "Age", placeholder: "Enter age in years" },
      { label: "Gender", field: "Gender", placeholder: "0 = female, 1 = male", tooltip: "Enter 0 for female, 1 for male" },
      { label: "Total_Bilirubin", field: "Total_Bilirubin", placeholder: "Total bilirubin level" },
      { label: "Direct_Bilirubin", field: "Direct_Bilirubin", placeholder: "Direct bilirubin level" },
      { label: "Alkaline_Phosphotase", field: "Alkaline_Phosphotase", placeholder: "Alkaline phosphatase level" },
      { label: "Alamine_Aminotransferase", field: "Alamine_Aminotransferase", placeholder: "Alanine aminotransferase level" },
      { label: "Aspartate_Aminotransferase", field: "Aspartate_Aminotransferase", placeholder: "Aspartate aminotransferase level" },
      { label: "Total_Protiens", field: "Total_Protiens", placeholder: "Total protein level" },
      { label: "Albumin", field: "Albumin", placeholder: "Albumin level" },
      { label: "Albumin_and_Globulin_Ratio", field: "Albumin_and_Globulin_Ratio", placeholder: "A/G ratio" },
    ]
  },
  stroke: {
    displayName: "Stroke",
    fields: [
      {
        label: "Gender",
        field: "gender",
        placeholder: "0 = female, 1 = male",
        tooltip: "Enter 0 for female, 1 for male"
      },
      {
        label: "Age",
        field: "age",
        placeholder: "Enter age in years"
      },
      {
        label: "Hypertension",
        field: "hypertension",
        placeholder: "0 = no, 1 = yes",
        tooltip: "Enter 1 if yes, 0 if no"
      },
      {
        label: "Heart Disease",
        field: "heart_disease",
        placeholder: "0 = no, 1 = yes",
        tooltip: "Enter 1 if yes, 0 if no"
      },
      {
        label: "Ever Married",
        field: "ever_married",
        placeholder: "0 = no, 1 = yes",
        tooltip: "Enter 1 if yes, 0 if no"
      },
      {
        label: "Work Type",
        field: "work_type",
        placeholder: "0 = Govt job, 1 = Never worked, 2 = Private, 3 = Self-employed, 4 = Children",
        tooltip: "Choose one: 0=Govt, 1=Never worked, 2=Private, 3=Self-employed, 4=Children"
      },
      {
        label: "Residence Type",
        field: "Residence_type",  // <-- must match exactly!
        placeholder: "0 = rural, 1 = urban",
        tooltip: "Enter 0 for rural, 1 for urban"
      },
      {
        label: "Average Glucose Level",
        field: "avg_glucose_level",
        placeholder: "Enter average glucose level"
      },
      {
        label: "BMI",
        field: "bmi",
        placeholder: "Enter Body Mass Index"
      },
      {
        label: "Smoking Status",
        field: "smoking_status",
        placeholder: "0 = formerly smoked, 1 = never smoked, 2 = smokes, 3 = unknown",
        tooltip: "Choose one: 0=formerly smoked, 1=never smoked, 2=smokes, 3=unknown"
      }
    ]
  }

};
