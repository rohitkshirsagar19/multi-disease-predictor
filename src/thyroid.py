import os
import yaml
import argparse
import joblib
import pandas as pd
import mlflow
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score, precision_score, recall_score, f1_score


def read_params(path):
    with open(path) as f:
        return yaml.safe_load(f)


def train_and_evaluate(config_path):
    # Load configuration
    print("Reading configuration...")
    cfg = read_params(config_path)
    print("Configuration loaded.")

    # Load data
    print(f"Loading dataset from {cfg['data_source']['Thyroid']}...")
    df1 = pd.read_csv(cfg['data_source']['Thyroid'])
    
    # Check class distribution
    print("\nClass distribution in Diagnosis column:")
    class_counts = df1[cfg['Thyroid']['target_column']].value_counts()
    total_samples = len(df1)
    for label, count in class_counts.items():
        proportion = count / total_samples * 100
        print(f"Class {label}: {count} samples ({proportion:.2f}%)")
    
    # Check for imbalance
    imbalance_ratio = class_counts.max() / class_counts.min()
    print(f"Imbalance ratio (majority/minority): {imbalance_ratio:.2f}")
    if imbalance_ratio > 2:
        print("Warning: Dataset is imbalanced (ratio > 2). Consider techniques like oversampling, undersampling, or class weights.")
    else:
        print("Dataset is balanced or mildly imbalanced (ratio <= 2).")

    X = df1.drop(columns=[cfg['Thyroid']['target_column']])
    y = df1[cfg['Thyroid']['target_column']]

    # Split into training and test sets (80% train, 20% test)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=cfg['base']['random_state'])

    # Train Random Forest Classifier
    rf_model = RandomForestClassifier(
        n_estimators=cfg['Thyroid']['RandomForestClassifier']['n_estimators'],
        max_depth=cfg['Thyroid']['RandomForestClassifier']['max_depth'],
        min_samples_split=cfg['Thyroid']['RandomForestClassifier']['min_samples_split'],
        min_samples_leaf=cfg['Thyroid']['RandomForestClassifier']['min_samples_leaf'],
        random_state=cfg['Thyroid']['RandomForestClassifier']['random_state_thyroid']
    )
    rf_model.fit(X_train, y_train)
    
    # Save model
    model_dir = cfg['Thyroid']['model_dir']
    os.makedirs(model_dir, exist_ok=True)
    model_path = os.path.join(model_dir, 'thyroid_model.joblib')
    joblib.dump(rf_model, model_path, compress=9)
    print(f"Model saved to {model_path}")
    print(f"Model size: {os.path.getsize(model_path) / (1024 * 1024):.2f} MB")

    # Predict on test set
    y_pred = rf_model.predict(X_test)

    # Calculate and print evaluation metrics
    accuracy = accuracy_score(y_test, y_pred)
    print(f"Test Set Accuracy: {accuracy:.4f}")
    print("Classification Report:\n", classification_report(y_test, y_pred))
    print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred))
    print(f"Accuracy: {accuracy_score(y_test, y_pred):.4f}")
    print(f"Precision: {precision_score(y_test, y_pred, average='weighted'):.4f}")
    print(f"Recall: {recall_score(y_test, y_pred, average='weighted'):.4f}")
    print(f"F1 Score: {f1_score(y_test, y_pred, average='weighted'):.4f}")

    # MLflow logging
    print("Logging to MLflow...")
    mlflow.set_tracking_uri(cfg['Thyroid']['mlflow_config']['remote_server_uri'])
    mlflow.set_experiment(cfg['Thyroid']['mlflow_config']['experiment_name'])
    with mlflow.start_run(run_name=cfg['Thyroid']['mlflow_config']['run_name']):
        mlflow.log_params({
            'split_ratio': cfg['base']['split_ratio'],
            'random_state': cfg['Thyroid']['RandomForestClassifier']['random_state_thyroid'],
            'n_estimators': cfg['Thyroid']['RandomForestClassifier']['n_estimators'],
            'max_depth': cfg['Thyroid']['RandomForestClassifier']['max_depth'],
            'min_samples_split': cfg['Thyroid']['RandomForestClassifier']['min_samples_split'],
            'min_samples_leaf': cfg['Thyroid']['RandomForestClassifier']['min_samples_leaf']
        })
        mlflow.log_metrics({
            'accuracy': accuracy_score(y_test, y_pred),
            'precision': precision_score(y_test, y_pred, average='weighted'),
            'recall': recall_score(y_test, y_pred, average='weighted'),
            'f1_score': f1_score(y_test, y_pred, average='weighted')
        })
        mlflow.sklearn.log_model(rf_model, "model")
    print("MLflow logging complete.")


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--config', default='params.yaml', help='Path to config file')
    args = parser.parse_args()
    train_and_evaluate(args.config)
