from fastapi.testclient import TestClient
from backend.main import app

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

