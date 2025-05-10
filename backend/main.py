from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel
import joblib
import os

# Import CORSMiddleware if it's not already at the top
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

# Get the directory of the current script (main_2.py)
# This makes path resolution independent of the Current Working Directory (CWD).
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

# === MODEL PATHS ===
# Construct paths relative to the SCRIPT_DIR.
# If main_2.py is in 'backend/', and models are in 'models/' at the project root,
# then '../models/' relative to SCRIPT_DIR will correctly point to project_root/models/.
MODEL_PATHS = {
    "anemia": os.path.join(SCRIPT_DIR, "../models/anemia.joblib/model.pkl"),
    "lung_cancer": os.path.join(SCRIPT_DIR, "../models/lung_cancer.joblib/model.pkl"),
    "hepatitis": os.path.join(SCRIPT_DIR, "../models/hepatitis.joblib/hepatitis.joblib"),
    "cardiovascular": os.path.join(SCRIPT_DIR, "../models/cardiovascular.joblib/cardiovascular.joblib"),
    "thyroid": os.path.join(SCRIPT_DIR, "../models/thyroid_model/thyroid_model.joblib"),
    "heart": os.path.join(SCRIPT_DIR, "../models/heart.joblib/heart_model.joblib"),
    "liver": os.path.join(SCRIPT_DIR, "../models/liver.joblib/liver.joblib"),
    "stroke": os.path.join(SCRIPT_DIR, "../models/stroke.joblib/stroke.joblib"),
}


# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # Adjust to match your frontend's URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Allow all headers
)


# === LOAD MODELS ===
models = {}
for name, path in MODEL_PATHS.items():
    # Now, 'path' will be an absolute path or a correctly resolved relative path.
    if os.path.exists(path):
        models[name] = joblib.load(path)
    else:
        # It's helpful to print the absolute path it's looking for during debugging
        print(f"⚠️ Warning: Model for {name} not found. Looked for: {os.path.abspath(path)}")

# === INPUT SCHEMAS ===
class AnemiaInput(BaseModel):
    Age: float
    Sex: int
    RBC: float
    PCV: float
    MCV: float
    MCH: float
    MCHC: float
    RDW: float
    TLC: float
    PLT_mm3: float
    HGB: float

class LungCancerInput(BaseModel):
    GENDER: float
    AGE: float
    SMOKING: float
    YELLOW_FINGERS: float
    ANXIETY: float
    PEER_PRESSURE: float
    CHRONIC_DISEASE: float
    FATIGUE: float
    ALLERGY: float
    WHEEZING: float
    ALCOHOL_CONSUMING: float
    COUGHING: float
    SHORTNESS_OF_BREATH: float
    SWALLOWING_DIFFICULTY: float
    CHEST_PAIN: float

class HepatitisInput(BaseModel):
    Age: float
    Sex: float
    ALB: float
    ALP: float
    ALT: float
    AST: float
    BIL: float
    CHE: float
    CHOL: float
    CREA: float
    GGT: float
    PROT: float

class CardiovascularInput(BaseModel):
    age: float
    gender: float
    height: float
    weight: float
    ap_hi: float
    ap_lo: float
    cholesterol: float
    gluc: float
    smoke: float
    alco: float
    active: float

class HeartInput(BaseModel):
    Age: float
    Sex: float
    RestingBP: float
    Cholesterol: float
    FastingBS: float
    MaxHR: float
    ExerciseAngina: float
    Oldpeak: float
    ChestPainType_ATA: float
    ChestPainType_NAP: float
    ChestPainType_TA: float
    RestingECG_Normal: float
    RestingECG_ST: float
    ST_Slope_Flat: float
    ST_Slope_Up: float

class ThyroidInput(BaseModel):
    Age: float
    Gender: float
    Family_History: float
    Radiation_Exposure: float
    Iodine_Deficiency: float
    Smoking: float
    Obesity: float
    Diabetes: float
    TSH_Level: float
    T3_Level: float
    T4_Level: float
    Nodule_Size: float
    Country_China: float
    Country_Germany: float
    Country_India: float
    Country_Japan: float
    Country_Nigeria: float
    Country_Russia: float
    Country_South_Korea: float
    Country_UK: float
    Country_USA: float
    Ethnicity_Asian: float
    Ethnicity_Caucasian: float
    Ethnicity_Hispanic: float
    Ethnicity_Middle_Eastern: float

class LiverInput(BaseModel):
    Age : int  
    Gender : int  
    Total_Bilirubin : float
    Direct_Bilirubin : float
    Alkaline_Phosphotase : int 
    Alamine_Aminotransferase : int 
    Aspartate_Aminotransferase : int 
    Total_Protiens : float
    Albumin : float
    Albumin_and_Globulin_Ratio : float

class StrokeInput(BaseModel): 
    gender : int
    age : float
    hypertension : int
    heart_disease : int
    ever_married : int
    work_type : int
    Residence_type : int
    avg_glucose_level: float
    bmi : float
    smoking_status : int
    

# === MODEL-SCHEMA MAPPING ===
model_input_schemas = {
    "anemia": AnemiaInput,
    "lung_cancer": LungCancerInput,
    "hepatitis": HepatitisInput,
    "cardiovascular": CardiovascularInput,
    "thyroid": ThyroidInput,
    "heart": HeartInput,
    "liver": LiverInput,
    "stroke" : StrokeInput,
}

# === API HOME ===
@app.get("/")
def home():
    return {"message": "Health Prediction API is running 🚀"}

# === PREDICTION ROUTE ===
@app.post("/predict/{disease_name}")
def predict_disease(disease_name: str, data: dict = Body(...)):
    if disease_name not in models:
        raise HTTPException(status_code=404, detail=f"Model for '{disease_name}' not found or not loaded.") # Added more detail

    model = models[disease_name]
    schema = model_input_schemas.get(disease_name)

    if not schema:
        raise HTTPException(status_code=400, detail=f"Schema not defined for disease '{disease_name}'")

    try:
        validated_data = schema(**data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid input data for '{disease_name}': {str(e)}")

    features = [[value for value in validated_data.dict().values()]]
    prediction = model.predict(features)[0]
    prediction = int(prediction)

    return {"prediction": prediction}