from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel
import joblib
import os

app = FastAPI()

# === MODEL PATHS ===
MODEL_PATHS = {
    "anemia": "../models/anemia.joblib/model.pkl",
    "lung_cancer": "../models/lung_cancer.joblib/model.pkl",
    "hepatitis": "../models/hepatitis.joblib/hepatitis.joblib",
    "cardiovascular": "../models/cardiovascular.joblib/cardiovascular.joblib",
    # Add more diseases here
}

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

# === MODEL-SCHEMA MAPPING ===
model_input_schemas = {
    "anemia": AnemiaInput,
    "lung_cancer": LungCancerInput,
    "hepatitis": HepatitisInput,
    "cardiovascular": CardiovascularInput,
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

    # Get prediction
    prediction = model.predict(features)[0]  # This should now return 0, 1, 2, or 3

    # Convert numpy.int64 to a native int
    prediction = int(prediction)

    # Return the prediction as a number (0, 1, 2, or 3)
    return {"prediction": prediction}
