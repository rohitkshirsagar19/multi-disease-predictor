from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
import os

app = FastAPI()

# Define input schema using Pydantic for Anemia prediction
# This schema should match the features used in your model
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

# Load model once at startup
ANEMIA_MODEL_PATH = "../models/anemia.joblib/model.pkl"  

anemia_model = joblib.load(ANEMIA_MODEL_PATH)

# Home route to check if the API is running
@app.get("/")
def home():
    return {"message": "Anemia Prediction API is running!"}

# Route for anemia prediction
@app.post("/predict/anemia")
def predict_anemia(data: AnemiaInput):
    try:
        features = [[
            data.Age, data.Sex, data.RBC, data.PCV, data.MCV, data.MCH,
            data.MCHC, data.RDW, data.TLC, data.PLT_mm3, data.HGB
        ]]
        prediction = anemia_model.predict(features)[0]  # 0 or 1
        result = "Anemia Positive" if prediction == 1 else "Anemia Negative"
        return {"prediction": result}
    except Exception as e:
        import traceback
        traceback.print_exc()  # Prints to terminal
        return {"error": str(e)}
