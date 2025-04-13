import os
import yaml
import argparse
import mlflow
import joblib
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score


def read_param(config_path):
    print("🔧 Loading configuration...")
    print(f"Reading configuration from: {config_path}")
    with open(config_path) as yaml_file:
        config = yaml.safe_load(yaml_file)
    print("✅ Configuration loaded successfully.")
    return config


def train_and_evaluate(config_path):
    config = read_param(config_path)

    print("📄 Reading dataset...")
    data_path = config['data_source']['Thyroid']
    df = pd.read_csv(data_path, sep=',', encoding='utf-8')
    print(f"✅ Data loaded from {data_path} with shape: {df.shape}")

    print("🔢 Extracting parameters...")
    random_state = config['base']['random_state']
    split_ratio = config['base']['split_ratio']
    model_dir = config['Thyroid']['model_path']
    rf_params = config['Thyroid']['RandomForestClassifier']['params']

    print(f"📊 Splitting data (test size = {split_ratio})...")
    features = df.drop(columns=['Diagnosis'], axis=1)
    target = df['Diagnosis']
    X_train, X_test, y_train, y_test = train_test_split(
        features,
        target,
        test_size=split_ratio,
        random_state=random_state
    )
    print(f"✅ Data split: Train = {X_train.shape}, Test = {X_test.shape}")

    print("🌲 Initializing Random Forest Classifier...")
    rf = RandomForestClassifier(
        max_depth=rf_params['max_depth'],
        min_samples_leaf=rf_params['min_samples_leaf'],
        min_samples_split=rf_params['min_samples_split'],
        n_estimators=rf_params['n_estimators']
    )

    print("🧠 Training model...")
    rf.fit(X_train, y_train)
    print("✅ Model training complete.")

    print("🔍 Predicting and evaluating...")
    y_pred = rf.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred, average='weighted')
    recall = recall_score(y_test, y_pred, average='weighted')
    f1 = f1_score(y_test, y_pred, average='weighted')

    print("📈 Metrics:")
    print(f" Accuracy: {accuracy:.4f}")
    print(f" Precision: {precision:.4f}")
    print(f" Recall: {recall:.4f}")
    print(f" F1 Score: {f1:.4f}")

    # Save the model
    if not os.path.exists(model_dir):
        os.makedirs(model_dir)
        print(f"📁 Created model directory: {model_dir}")
    else:
        print(f"📁 Model directory already exists: {model_dir}")

    model_path = os.path.join(model_dir, 'thyroid_model.pkl')
    print("💾 Saving model...")
    joblib.dump(rf, model_path)
    print(f"✅ Model saved at {model_path}")

    # MLflow tracking
    print("📦 Setting up MLflow...")
    mlflow_config = config['Thyroid']['mlflow_config']
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
            mlflow.log_metrics({
                'accuracy': accuracy,
                'precision': precision,
                'recall': recall,
                'f1_score': f1
            })

            print("📦 Logging model artifact to MLflow...")
            mlflow.log_artifact(model_path, artifact_path="model")
            print("✅ MLflow logging complete.")
    except Exception as e:
        print(f"❌ MLflow run failed: {e}")


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Train and evaluate a Random Forest model for Thyroid Disease.')
    parser.add_argument('--config', default='params.yaml', type=str, help='Path to the config file.')
    args = parser.parse_args()
    train_and_evaluate(args.config)