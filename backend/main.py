from fastapi import FastAPI
from pydantic import BaseModel, Field
import joblib
import numpy as np

app = FastAPI()

# Define input schema using Pydantic for Anemia prediction
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

# Define input schema for Lung Cancer prediction
class LungCancerInput(BaseModel):
    GENDER: float
    AGE: float
    SMOKING: float
    YELLOW_FINGERS: float
    ANXIETY: float
    PEER_PRESSURE: float
    CHRONIC_DISEASE: float = Field(..., alias="CHRONIC DISEASE")
    FATIGUE: float
    ALLERGY: float
    WHEEZING: float
    ALCOHOL_CONSUMING: float = Field(..., alias="ALCOHOL CONSUMING")
    COUGHING: float
    SHORTNESS_OF_BREATH: float = Field(..., alias="SHORTNESS OF BREATH")
    SWALLOWING_DIFFICULTY: float = Field(..., alias="SWALLOWING DIFFICULTY")
    CHEST_PAIN: float = Field(..., alias="CHEST PAIN")

# Load models once at startup
ANEMIA_MODEL_PATH = "../models/anemia.joblib/model.pkl"
LUNG_CANCER_MODEL_PATH = "../models/lung_cancer.joblib/model.pkl"

anemia_model = joblib.load(ANEMIA_MODEL_PATH)
lung_cancer_model = joblib.load(LUNG_CANCER_MODEL_PATH)

# Home route to check if the API is running
@app.get("/")
def home():
    return {"message": "Health Prediction API is running!"}

# Route for anemia prediction
@app.post("/predict/anemia")
def predict_anemia(data: AnemiaInput):
    try:
        features = [[
            data.Age, data.Sex, data.RBC, data.PCV, data.MCV, data.MCH,
            data.MCHC, data.RDW, data.TLC, data.PLT_mm3, data.HGB
        ]]
        prediction = anemia_model.predict(features)[0]
        result = "Anemia Positive" if prediction == 1 else "Anemia Negative"
        return {"prediction": result}
    except Exception as e:
        import traceback
        traceback.print_exc()
        return {"error": str(e)}

# Route for lung cancer prediction
@app.post("/predict/lung_cancer")
def predict_lung_cancer(data: LungCancerInput):
    try:
        features = [[
            data.GENDER, data.AGE, data.SMOKING, data.YELLOW_FINGERS,
            data.ANXIETY, data.PEER_PRESSURE, data.CHRONIC_DISEASE,
            data.FATIGUE, data.ALLERGY, data.WHEEZING,
            data.ALCOHOL_CONSUMING, data.COUGHING,
            data.SHORTNESS_OF_BREATH, data.SWALLOWING_DIFFICULTY,
            data.CHEST_PAIN
        ]]
        prediction = lung_cancer_model.predict(features)[0]
        result = "Lung Cancer Positive" if prediction == 1 else "Lung Cancer Negative"
        return {"prediction": result}
    except Exception as e:
        import traceback
        traceback.print_exc()
        return {"error": str(e)}
