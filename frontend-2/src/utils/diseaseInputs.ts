
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
      { label: "Country_China", field: "Country_China", placeholder: "1 if China, 0 otherwise", tooltip: "Enter 1 if China, 0 otherwise" },
      { label: "Country_Germany", field: "Country_Germany", placeholder: "1 if Germany, 0 otherwise", tooltip: "Enter 1 if Germany, 0 otherwise" },
      { label: "Country_India", field: "Country_India", placeholder: "1 if India, 0 otherwise", tooltip: "Enter 1 if India, 0 otherwise" },
      { label: "Country_Luxembourg", field: "Country_Luxembourg", placeholder: "1 if Luxembourg, 0 otherwise", tooltip: "Enter 1 if Luxembourg, 0 otherwise" },
      { label: "Country_South_Africa", field: "Country_South_Africa", placeholder: "1 if South Africa, 0 otherwise", tooltip: "Enter 1 if South Africa, 0 otherwise" },
      { label: "Country_USA", field: "Country_USA", placeholder: "1 if USA, 0 otherwise", tooltip: "Enter 1 if USA, 0 otherwise" },
      { label: "TSH", field: "TSH", placeholder: "Thyroid-stimulating hormone level" },
      { label: "T3", field: "T3", placeholder: "Triiodothyronine level" },
      { label: "TT4", field: "TT4", placeholder: "Total thyroxine level" },
      { label: "T4U", field: "T4U", placeholder: "Thyroxine uptake" },
      { label: "FTI", field: "FTI", placeholder: "Free Thyroxine Index" },
    ]
  },
  heart: {
    displayName: "Heart Disease",
    fields: [
      { label: "Age", field: "Age", placeholder: "Enter age in years" },
      { label: "Sex", field: "Sex", placeholder: "0 = female, 1 = male", tooltip: "Enter 0 for female, 1 for male" },
      { label: "RestingBP", field: "RestingBP", placeholder: "Resting blood pressure (mm Hg)" },
      { label: "Cholesterol", field: "Cholesterol", placeholder: "Serum cholesterol (mg/dl)" },
      { label: "ChestPainType_ATA", field: "ChestPainType_ATA", placeholder: "1 if ATA, 0 otherwise", tooltip: "Atypical Angina: 1 if present, 0 if not" },
      { label: "ChestPainType_NAP", field: "ChestPainType_NAP", placeholder: "1 if NAP, 0 otherwise", tooltip: "Non-Anginal Pain: 1 if present, 0 if not" },
      { label: "ChestPainType_TA", field: "ChestPainType_TA", placeholder: "1 if TA, 0 otherwise", tooltip: "Typical Angina: 1 if present, 0 if not" },
      { label: "ExerciseAngina_Y", field: "ExerciseAngina_Y", placeholder: "1 if yes, 0 if no", tooltip: "Exercise-Induced Angina: 1 if yes, 0 if no" },
      { label: "FastingBS", field: "FastingBS", placeholder: "1 if >120 mg/dl, 0 otherwise", tooltip: "Fasting blood sugar: 1 if >120 mg/dl, 0 if not" },
      { label: "MaxHR", field: "MaxHR", placeholder: "Maximum heart rate achieved" },
      { label: "Oldpeak", field: "Oldpeak", placeholder: "ST depression induced by exercise" },
      { label: "RestingECG_Normal", field: "RestingECG_Normal", placeholder: "1 if normal, 0 otherwise", tooltip: "Normal resting ECG: 1 if normal, 0 if not" },
      { label: "RestingECG_ST", field: "RestingECG_ST", placeholder: "1 if ST abnormality, 0 otherwise", tooltip: "ST-T wave abnormality: 1 if present, 0 if not" },
      { label: "ST_Slope_Flat", field: "ST_Slope_Flat", placeholder: "1 if flat, 0 otherwise", tooltip: "ST slope flat: 1 if yes, 0 if no" },
      { label: "ST_Slope_Up", field: "ST_Slope_Up", placeholder: "1 if upsloping, 0 otherwise", tooltip: "ST slope upsloping: 1 if yes, 0 if no" },
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
      { label: "gender", field: "gender", placeholder: "0 = female, 1 = male", tooltip: "Enter 0 for female, 1 for male" },
      { label: "age", field: "age", placeholder: "Enter age in years" },
      { label: "hypertension", field: "hypertension", placeholder: "0 = no, 1 = yes", tooltip: "Enter 1 if yes, 0 if no" },
      { label: "heart_disease", field: "heart_disease", placeholder: "0 = no, 1 = yes", tooltip: "Enter 1 if yes, 0 if no" },
      { label: "ever_married", field: "ever_married", placeholder: "0 = no, 1 = yes", tooltip: "Enter 1 if yes, 0 if no" },
      { label: "work_type_Govt_job", field: "work_type_Govt_job", placeholder: "1 if govt job, 0 otherwise", tooltip: "1 if government job, 0 otherwise" },
      { label: "work_type_Never_worked", field: "work_type_Never_worked", placeholder: "1 if never worked, 0 otherwise", tooltip: "1 if never worked, 0 otherwise" },
      { label: "work_type_Private", field: "work_type_Private", placeholder: "1 if private job, 0 otherwise", tooltip: "1 if private job, 0 otherwise" },
      { label: "work_type_Self_employed", field: "work_type_Self_employed", placeholder: "1 if self-employed, 0 otherwise", tooltip: "1 if self-employed, 0 otherwise" },
      { label: "residence_type", field: "residence_type", placeholder: "0 = rural, 1 = urban", tooltip: "Enter 0 for rural, 1 for urban" },
      { label: "avg_glucose_level", field: "avg_glucose_level", placeholder: "Average glucose level" },
      { label: "bmi", field: "bmi", placeholder: "Body Mass Index" },
      { label: "smoking_status_formerly_smoked", field: "smoking_status_formerly_smoked", placeholder: "1 if formerly smoked, 0 otherwise", tooltip: "1 if formerly smoked, 0 otherwise" },
      { label: "smoking_status_never_smoked", field: "smoking_status_never_smoked", placeholder: "1 if never smoked, 0 otherwise", tooltip: "1 if never smoked, 0 otherwise" },
      { label: "smoking_status_smokes", field: "smoking_status_smokes", placeholder: "1 if currently smokes, 0 otherwise", tooltip: "1 if currently smokes, 0 otherwise" },
    ]
  }
};
