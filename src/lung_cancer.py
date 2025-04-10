import os
import yaml
import argparse
import joblib
import pandas as pd
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from sklearn.model_selection import train_test_split
import mlflow
import mlflow.sklearn


def read_param(config_path):
    with open(config_path) as yaml_file:
        config = yaml.safe_load(yaml_file)
    return config


def train_and_evaluate(config_path):
    print("🔧 Loading configuration...")
    print(f"Reading configuration from: {config_path}")
    config = read_param(config_path)
    print("✅ Configuration loaded successfully.")

    print("📄 Reading dataset...")
    data_path = config['data_source']['Lung_cancer']
    df = pd.read_csv(data_path, sep=',', encoding='utf-8')
    print(f"✅ Data loaded from {data_path} with shape: {df.shape}")

    print("🔢 Extracting parameters...")
    target = df['LUNG_CANCER']
    features = df.drop(columns=['LUNG_CANCER'], axis=1)


    random_state = config['base']['random_state']
    split_ratio = config['base']['split_ratio']

    C = config['lung_cancer']['LogisticRegression']['params']['C']
    max_iter = config['lung_cancer']['LogisticRegression']['params']['max_iter']
    penalty = config['lung_cancer']['LogisticRegression']['params']['penalty']
    solver = config['lung_cancer']['LogisticRegression']['params']['solver']

    model_dir = config['lung_cancer']['model_path']
    mlflow_config = config['lung_cancer']['mlflow_config']

    print(f"📊 Splitting data (test size = {split_ratio})...")
    X_train, X_test, y_train, y_test = train_test_split(
        features, target, test_size=split_ratio, random_state=random_state
    )
    print(f"✅ Data split: Train = {X_train.shape}, Test = {X_test.shape}")

    print("➕ Initializing Logistic Regression...")
    lr = LogisticRegression(C=C, max_iter=max_iter, penalty=penalty, solver=solver)

    print("🧠 Training model...")
    lr.fit(X_train, y_train)
    print("✅ Model training complete.")

    print("🔍 Predicting and evaluating...")
    y_pred = lr.predict(X_test)

    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred, average='weighted')
    recall = recall_score(y_test, y_pred, average='weighted')
    f1 = f1_score(y_test, y_pred, average='weighted')

    print("📈 Metrics:")
    print(f" Accuracy: {accuracy:.4f}")
    print(f" Precision: {precision:.4f}")
    print(f" Recall: {recall:.4f}")
    print(f" F1 Score: {f1:.4f}")

    if not os.path.exists(model_dir):
        os.makedirs(model_dir)
        print(f"📁 Model directory created: {model_dir}")
    else:
        print(f"📁 Model directory already exists: {model_dir}")

    model_path = os.path.join(model_dir, 'model.pkl')
    print("💾 Saving model...")
    joblib.dump(lr, model_path)
    print(f"✅ Model saved at {model_path}")

    print("📦 Setting up MLflow...")
    mlflow.set_tracking_uri(mlflow_config['remote_server_uri'])
    mlflow.set_experiment(mlflow_config['experiment_name'])

    print(f"🔗 MLflow Tracking URI: {mlflow_config['remote_server_uri']}")
    print(f"🧪 Experiment Name: {mlflow_config['experiment_name']}")
    print(f"🏷️ Run Name: {mlflow_config['run_name']}")

    with mlflow.start_run(run_name=mlflow_config['run_name']) as run:
        mlflow.log_params({
            'C': C,
            'max_iter': max_iter,
            'penalty': penalty,
            'solver': solver
        })

        mlflow.log_metrics({
            'accuracy': accuracy,
            'precision': precision,
            'recall': recall,
            'f1_score': f1
        })

        print("📦 Logging model artifact to MLflow...")
        mlflow.sklearn.log_model(lr, "model", registered_model_name=mlflow_config['registered_model_name'])
        print("✅ MLflow logging complete.")

        print(f"🏃 View run {mlflow_config['run_name']} at: {mlflow_config['remote_server_uri']}/#/experiments/{run.info.experiment_id}/runs/{run.info.run_id}")


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Train and evaluate a Logistic Regression model for lung cancer.')
    parser.add_argument('--config', default='params.yaml', type=str, help='Path to the config file.')
    args = parser.parse_args()
    train_and_evaluate(args.config)
