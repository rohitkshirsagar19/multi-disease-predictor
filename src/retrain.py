
import os
import pandas as pd
import joblib
from fastapi import HTTPException
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

def retrain_model(disease_name: str, model_input_schemas: dict, MODEL_PATHS: dict, models: dict):
    schema = model_input_schemas.get(disease_name)
    model_path = MODEL_PATHS.get(disease_name)

    if not schema or not model_path:
        raise HTTPException(status_code=404, detail="Schema or model path not found")

    file_path = f"user_data/{disease_name}.csv"

    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="No user data available for retraining.")

    try:
        df = pd.read_csv(file_path)

        if df.shape[0] < 10:
            raise HTTPException(status_code=400, detail="Not enough data to retrain.")

        if "target" not in df.columns:
            raise HTTPException(status_code=400, detail="Target column missing from data.")

        X = df.drop(columns=["target"])
        y = df["target"]

        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        clf = RandomForestClassifier()
        clf.fit(X_train, y_train)

        os.makedirs(os.path.dirname(model_path), exist_ok=True)
        joblib.dump(clf, model_path)

        models[disease_name] = clf

        return {"message": f"Model for {disease_name} retrained successfully!"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Retraining failed: {str(e)}")
