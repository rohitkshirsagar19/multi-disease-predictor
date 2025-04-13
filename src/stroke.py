import os
import yaml
import pandas as pd
import numpy as np
import argparse
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score,precision_score, recall_score, f1_score
import mlflow
import argparse
import joblib
from urllib.parse import urlparse

def read_param(config_path):
    with open(config_path) as yaml_file:
        config=yaml.safe_load(yaml_file)
        return config
    

def train_and_evaluate(config_path):
    config = read_param(config_path)
    data_path = config["data_source"]["Stroke"]
    df = pd.read_csv(data_path, sep=',', encoding='utf-8')
    random_state = config["base"]["random_state"]
    split_ratio = config["base"]["split_ratio"]
    model_dir = config["Stroke"]["model_path"]

    stroke_n_estimators = config["Stroke"]["RandomForestClassifier"]["params"]["n_estimators"]
    stroke_max_depth = config["Stroke"]["RandomForestClassifier"]["params"]["max_depth"]

    features=df.drop("stroke",axis=1)
    target=df['stroke']

    X_train, X_test, y_train, y_test = train_test_split(
        features,
        target,
        test_size=split_ratio,
        random_state=random_state
        )
    ###########################

    mlflow_config = config["Stroke"]["mlflow_config"]
    remote_server_uri = mlflow_config["remote_server_uri"]
    mlflow.set_tracking_uri(remote_server_uri)
    mlflow.set_experiment(mlflow_config["experiment_name"])

    ############################
    with mlflow.start_run(run_name=mlflow_config["run_name"]) as mlops_runs:    
    
        lr = RandomForestClassifier(
            n_estimators = stroke_n_estimators,
            max_depth = stroke_max_depth
        )

        lr.fit(X_train,y_train)
        y_pred = lr.predict(X_test)

        accuracy = accuracy_score(y_test, y_pred)
        precision = precision_score(y_test, y_pred, average='macro')  
        recall = recall_score(y_test, y_pred, average='macro')        
        f1 = f1_score(y_test, y_pred, average='macro')                

        
        
        mlflow.log_param("n_estimators",stroke_n_estimators)
        mlflow.log_param("max_depth",stroke_max_depth)

        mlflow.log_metric("accuracy",accuracy)
        mlflow.log_metric("precision",precision)
        mlflow.log_metric("recall", recall)
        mlflow.log_metric("f1_score",f1)

        tracking_uri_type = urlparse(mlflow.get_tracking_uri()).scheme
        if tracking_uri_type != "file":
            mlflow.sklearn.log_model(lr, "model", registered_model_name=mlflow_config["registered_model_name"])
        else:
            mlflow.sklearn.log_model(lr, "model")

        # model_path = config["model_path"]
        # joblib.dump(lr, model_path)
        if os.path.exists(model_dir) and os.path.isfile(model_dir):
          os.remove(model_dir)
        os.makedirs(model_dir, exist_ok=True)
        model_path = os.path.join(model_dir, "stroke.joblib")
        joblib.dump(lr, model_path)


if __name__=="__main__":
    args = argparse.ArgumentParser()
    args.add_argument("--config", default="params.yaml")
    parsed_args= args.parse_args()
    train_and_evaluate(config_path=parsed_args.config)
