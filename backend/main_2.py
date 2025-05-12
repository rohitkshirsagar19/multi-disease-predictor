from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel
import joblib
import os
import pandas as pd
from src.retrain import retrain_model

app = FastAPI()

# === MODEL PATHS ===
MODEL_PATHS = {
    "anemia": "models/anemia.joblib/model.pkl",
    "lung_cancer": "models/lung_cancer.joblib/model.pkl",
    "hepatitis": "models/hepatitis.joblib/hepatitis.joblib",
    "cardiovascular": "models/cardiovascular.joblib/cardiovascular.joblib",
    "thyroid": "models/thyroid_model/thyroid_model.joblib",   # Added thyroid
    "heart": "models/heart.joblib/heart_model.joblib",          # Added heart
    "liver": "models/liver.joblib/liver.joblib",
    "stroke": "models/stroke.joblib/stroke.joblib",
    # Add more diseases here
}

from fastapi.middleware.cors import CORSMiddleware



# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust to match your frontend's URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Allow all headers
)


# === LOAD MODELS ===
models = {}
for name, path in MODEL_PATHS.items():
    if os.path.exists(path):
        models[name] = joblib.load(path)
    else:
        print(f"⚠️ Warning: Model for {name} not found at {path}")

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
# Updated Heart Input based on cleaned_heart.csv (excluding target: HeartDisease)
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

# Thyroid input based on thyroid_cleaned_data.csv (excluding target columns such as Diagnosis, Thyroid_Cancer_Risk_Low, Thyroid_Cancer_Risk_Medium)
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
    "thyroid": ThyroidInput,  # Added mapping for thyroid endpoint
    "heart": HeartInput,       # Added mapping for heart endpoint
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
        raise HTTPException(status_code=404, detail="Model not found")

    model = models[disease_name]
    schema = model_input_schemas.get(disease_name)

    if not schema:
        raise HTTPException(status_code=400, detail="Schema not defined for this disease")

    # Validate input with Pydantic
    try:
        validated_data = schema(**data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid input data: {str(e)}")

    # Convert to 2D list for model input
    features = [[value for value in validated_data.dict().values()]]

    # Get prediction from the model
    prediction = model.predict(features)[0]

    # Convert numpy.int64 to a native int
    prediction = int(prediction)

    return {"prediction": prediction}


@app.post("/submit_data/{disease_name}")
def submit_user_data(disease_name: str, data: dict = Body(...)):
    schema = model_input_schemas.get(disease_name)

    if not schema:
        raise HTTPException(status_code=400, detail="Schema not defined for this disease")

    try:
        validated_data = schema(**data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid input data: {str(e)}")

    df = pd.DataFrame([validated_data.dict()])

    # Predict using the model
    model = models.get(disease_name)
    if model is None:
        raise HTTPException(status_code=404, detail="Model not found")

    features = [[value for value in validated_data.dict().values()]]
    prediction = model.predict(features)[0]

    # Add prediction as target column (adjust column name if needed)
    df["target"] = int(prediction)

    # Save to CSV
    os.makedirs("user_data", exist_ok=True)
    file_path = f"user_data/{disease_name}.csv"

    if os.path.exists(file_path) and os.path.getsize(file_path) > 0:
        df.to_csv(file_path, mode='a', header=False, index=False)
    else:
        df.to_csv(file_path, mode='w', header=True, index=False)


    return {
        "message": "User data and prediction saved for retraining.",
        "prediction": int(prediction)
    }


# === RETRAINING ROUTE ===
@app.post("/retrain/{disease_name}")
def retrain_route(disease_name: str):
    return retrain_model(disease_name, model_input_schemas, MODEL_PATHS, models)


