from fastapi.testclient import TestClient
from backend.main_2 import app

client = TestClient(app)

def test_home():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Health Prediction API is running 🚀"}

def test_predict_cardiovascular():
    payload = {
        "age": 50,
        "gender": 1,
        "height": 165,
        "weight": 70,
        "ap_hi": 120,
        "ap_lo": 80,
        "cholesterol": 1,
        "gluc": 1,
        "smoke": 0,
        "alco": 0,
        "active": 1
    }
    response = client.post("/predict/cardiovascular", json=payload)
    assert response.status_code == 200
    assert "prediction" in response.json()

def test_predict_anemia():
    payload = {
        "Age": 35,
        "Sex": 1,
        "RBC": 4.5,
        "PCV": 42,
        "MCV": 88,
        "MCH": 30,
        "MCHC": 34,
        "RDW": 13,
        "TLC": 7000,
        "PLT_mm3": 250000,
        "HGB": 13.5
    }
    response = client.post("/predict/anemia", json=payload)
    assert response.status_code == 200
    assert "prediction" in response.json()

def test_predict_heart():
    payload = {
        "Age": 50,
        "Sex": 1,
        "RestingBP": 120,
        "Cholesterol": 200,
        "FastingBS": 0,
        "MaxHR": 150,
        "ExerciseAngina": 0,
        "Oldpeak": 1.5,
        "ChestPainType_ATA": 1,
        "ChestPainType_NAP": 0,
        "ChestPainType_TA": 0,
        "RestingECG_Normal": 1,
        "RestingECG_ST": 0,
        "ST_Slope_Flat": 0,
        "ST_Slope_Up": 1
    }
    response = client.post("/predict/heart", json=payload)
    assert response.status_code == 200
    assert "prediction" in response.json()

# def test_predict_thyroid():
#     payload = {
#         "Age": 45,
#         "Gender": 1,
#         "Family_History": 1,
#         "Radiation_Exposure": 0,
#         "Iodine_Deficiency": 0,
#         "Smoking": 0,
#         "Obesity": 0,
#         "Diabetes": 0,
#         "TSH_Level": 2.5,
#         "T3_Level": 1.2,
#         "T4_Level": 8.0,
#         "Nodule_Size": 0.0
#     }
#     response = client.post("/predict/thyroid", json=payload)

#     # 🔍 Logging the response details
#     print("Status Code:", response.status_code)
#     print("Response JSON:", response.json())

#     assert response.status_code == 200

#     assert response.status_code == 200
def test_predict_lung_cancer():
    payload = {
        "GENDER": 1,
        "AGE": 60,
        "SMOKING": 1,
        "YELLOW_FINGERS": 1,
        "ANXIETY": 0,
        "PEER_PRESSURE": 0,
        "CHRONIC_DISEASE": 0,
        "FATIGUE": 1,
        "ALLERGY": 0,
        "WHEEZING": 1,
        "ALCOHOL_CONSUMING": 0,
        "COUGHING": 1,
        "SHORTNESS_OF_BREATH": 1,
        "SWALLOWING_DIFFICULTY": 0,
        "CHEST_PAIN": 1
    }
    response = client.post("/predict/lung_cancer", json=payload)
    assert response.status_code == 200
    assert "prediction" in response.json()

def test_predict_hepatitis():
    payload = {
        "Age": 45,
        "Sex": 1,
        "ALB": 4.0,
        "ALP": 120,
        "ALT": 35,
        "AST": 40,
        "BIL": 1.2,
        "CHE": 6.5,
        "CHOL": 180,
        "CREA": 1.0,
        "GGT": 50,
        "PROT": 7.2
    }
    response = client.post("/predict/hepatitis", json=payload)
    assert response.status_code == 200
    assert "prediction" in response.json()

def test_predict_liver():
    payload = {
        "Age": 52,
        "Gender": 1,
        "Total_Bilirubin": 0.8,
        "Direct_Bilirubin": 0.3,
        "Alkaline_Phosphotase": 210,
        "Alamine_Aminotransferase": 35,
        "Aspartate_Aminotransferase": 40,
        "Total_Protiens": 6.5,
        "Albumin": 3.2,
        "Albumin_and_Globulin_Ratio": 1.0
    }
    response = client.post("/predict/liver", json=payload)
    assert response.status_code == 200
    assert "prediction" in response.json()

def test_predict_stroke():
    payload = {
        "gender": 1,
        "age": 60.0,
        "hypertension": 1,
        "heart_disease": 1,
        "ever_married": 1,
        "work_type": 2,
        "Residence_type": 1,
        "avg_glucose_level": 150.0,
        "bmi": 28.0,
        "smoking_status": 1
    }
    response = client.post("/predict/stroke", json=payload)
    assert response.status_code == 200
    assert "prediction" in response.json()
