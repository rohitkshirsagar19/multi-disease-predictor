import joblib
import numpy as np

model_paths = {
    "anemia": "models/anemia.joblib/model.pkl",
    "lung_cancer": "models/lung_cancer.joblib/model.pkl",
    "hepatitis": "models/hepatitis.joblib/hepatitis.joblib",
    "cardiovascular": "models/cardiovascular.joblib/cardiovascular.joblib",
    "thyroid": "models/thyroid_model/thyroid_model.joblib",
    "heart": "models/heart.joblib/heart_model.joblib",
    "liver": "models/liver.joblib/liver.joblib",
    "stroke": "models/stroke.joblib/stroke.joblib"
}

def load_model(path):
    return joblib.load(path)

def test_cardiovascular_model():
    model = load_model(model_paths["cardiovascular"])
    sample = np.array([[50, 1, 165, 70, 120, 80, 1, 1, 0, 0, 1]])
    pred = model.predict(sample)
    assert pred is not None

def test_anemia_model():
    model = load_model(model_paths["anemia"])
    sample = np.array([[35, 1, 4.5, 42, 88, 30, 34, 13, 7000, 250000, 13.5]])
    pred = model.predict(sample)
    assert pred is not None

def test_lung_cancer_model():
    model = load_model(model_paths["lung_cancer"])
    sample = np.array([[1, 60, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1]])
    pred = model.predict(sample)
    assert pred is not None

def test_hepatitis_model():
    model = load_model(model_paths["hepatitis"])
    sample = np.array([[45, 1, 4.0, 120, 35, 40, 1.2, 6.5, 180, 1.0, 50, 7.2]])
    pred = model.predict(sample)
    assert pred is not None

def test_heart_model():
    model = load_model(model_paths["heart"])
    sample = np.array([[58, 1, 130, 220, 0, 140, 1, 1.0, 0, 1, 0, 1, 0, 1, 0]])
    pred = model.predict(sample)
    assert pred is not None

def test_liver_model():
    model = load_model(model_paths["liver"])
    sample = np.array([[52, 1, 0.8, 0.3, 210, 35, 40, 6.5, 3.2, 1.0]])
    pred = model.predict(sample)
    assert pred is not None

def test_stroke_model():
    model = load_model(model_paths["stroke"])
    sample = np.array([[1, 60.0, 1, 1, 1, 2, 1, 150.0, 28.0, 1]])
    pred = model.predict(sample)
    assert pred is not None
