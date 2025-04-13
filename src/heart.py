import os
import yaml
import argparse
import mlflow
import joblib
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, classification_report
from urllib.parse import urlparse

def read_param(config_path):
    print("🔧 Loading configuration...")
    print(f"Reading configuration from: {config_path}")
    with open(config_path) as yaml_file:
        config = yaml.safe_load(yaml_file)
    print("✅ Configuration loaded successfully.")
    return config

def train_and_evaluate(config_path):
    config = read_param(config_path)

    # Load dataset
    print("📄 Reading dataset...")
    data_path = config['data_source']['Heart']
    df = pd.read_csv(data_path, sep=',', encoding='utf-8')
    print(f"✅ Data loaded from {data_path} with shape: {df.shape}")

    # Extract parameters and split the data
    print("🔢 Extracting parameters...")
    random_state = config['base']['random_state']
    split_ratio = config['base']['split_ratio']
    # model_dir is a directory where the model file will be saved
    model_dir = config['Heart']['model_path']
    rf_params = config['Heart']['RandomForestClassifier']['params']

    print(f"📊 Splitting data (test size = {split_ratio})...")
    features = df.drop(columns=['HeartDisease'], axis=1)
    target = df['HeartDisease']
    X_train, X_test, y_train, y_test = train_test_split(
        features, target, test_size=split_ratio, random_state=random_state
    )
    print(f"✅ Data split: Train = {X_train.shape}, Test = {X_test.shape}")

    # Train the Random Forest model
    print("🌲 Training Random Forest...")
    rf = RandomForestClassifier(**rf_params)
    rf.fit(X_train, y_train)
    rf_pred = rf.predict(X_test)
    rf_metrics = {
        'accuracy': accuracy_score(y_test, rf_pred),
        'precision': precision_score(y_test, rf_pred),
        'recall': recall_score(y_test, rf_pred),
        'f1_score': f1_score(y_test, rf_pred)
    }
    print("\n📈 Random Forest Metrics:")
    print(classification_report(y_test, rf_pred))

    # Save the model: ensure the model directory exists first.
    if not os.path.exists(model_dir):
        os.makedirs(model_dir)
        print(f"📁 Created model directory: {model_dir}")
    else:
        print(f"📁 Model directory already exists: {model_dir}")

    # Save the model as heart_model.pkl within the model directory.
    model_path = os.path.join(model_dir, 'heart_model.pkl')
    print("💾 Saving model...")
    joblib.dump(rf, model_path)
    print(f"✅ Model saved at {model_path}")

    # Setup MLflow tracking
    print("📦 Setting up MLflow...")
    mlflow_config = config['Heart']['mlflow_config']
    experiment_name = mlflow_config['experiment_name']
    run_name = mlflow_config['run_name']
    remote_uri = mlflow_config['remote_server_uri']

    print(f"🔗 MLflow Tracking URI: {remote_uri}")
    print(f"🧪 Experiment Name: {experiment_name}")
    print(f"🏷️ Run Name: {run_name}")

    mlflow.set_tracking_uri(remote_uri)

    try:
        mlflow.set_experiment(experiment_name)
    except Exception as e:
        print(f"⚠️ Failed to set experiment: {e}")

    print("🚀 Starting MLflow run...")
    try:
        with mlflow.start_run(run_name=run_name):
            # Logging params and metrics
            mlflow.log_params(rf_params)
            mlflow.log_metrics(rf_metrics)

            print("📦 Logging model artifact to MLflow...")
            tracking_uri_type = urlparse(mlflow.get_tracking_uri()).scheme
            if tracking_uri_type != "file":
                mlflow.sklearn.log_model(rf, "model", registered_model_name=mlflow_config["registered_model_name"])
            else:
                mlflow.sklearn.log_model(rf, "model")

        print("✅ MLflow logging complete.")
    except Exception as e:
        print(f"❌ MLflow run failed: {e}")

    
if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Train and evaluate models for Heart Disease Prediction.')
    parser.add_argument('--config', default='params.yaml', type=str, help='Path to the config file.')
    args = parser.parse_args()
    train_and_evaluate(args.config)
