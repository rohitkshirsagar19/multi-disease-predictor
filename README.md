# 🧠 Multi-Disease Predictor

A full-stack Machine Learning application that allows users to predict **8 different diseases** based on user inputs. The system is designed with a modular backend in FastAPI and a responsive frontend in React with TailwindCSS, and includes functionality for **online learning** via user feedback and retraining!

---

![Python](https://img.shields.io/badge/Python-3.10-blue?logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-%2300C7B7.svg?logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![MLflow](https://img.shields.io/badge/MLflow-0194f3?logo=mlflow&logoColor=white)
![Joblib](https://img.shields.io/badge/Joblib-003366?logo=scikit-learn&logoColor=white)
![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)

---

## 🚀 Features

- 🩺 Predicts the likelihood of:
  - Anemia
  - Cardiovascular Disease
  - Heart Disease
  - Hepatitis C
  - Liver Disease
  - Lung Cancer
  - Stroke
  - Thyroid Disease
- ⚡ Built with FastAPI backend and Vite+React frontend
- 🔁 Supports user feedback and model retraining via `/submit_data/{disease}` and `/retrain/{disease}` APIs
- 🧪 MLflow integration for experiment tracking
- 🐳 Dockerized for seamless deployment

---

## 🧰 Tech Stack

| Layer        | Technologies |
| ------------ | ------------ |
| **Frontend** | ![React](https://img.shields.io/badge/React-20232a?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwindcss) |
| **Backend**  | ![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi) ![Uvicorn](https://img.shields.io/badge/Uvicorn-003366?logo=python&logoColor=white) |
| **ML Models**| ![scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?logo=scikitlearn) ![joblib](https://img.shields.io/badge/joblib-003366?logo=python) |
| **MLOps**    | ![MLflow](https://img.shields.io/badge/MLflow-0194f3?logo=mlflow) |
| **DevOps**   | ![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker) ![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?logo=githubactions) |

---

## 🏗️ Project Structure

```bash
multi-disease-predictor/
├── backend/               # FastAPI server + ML models + retraining
├── frontend/              # React (Vite + TailwindCSS) UI
├── models/                # Pretrained ML models
├── notebooks/             # Jupyter Notebooks for experiments
├── mlruns/                # MLflow runs
├── mlartifacts/           # MLflow artifacts
├── data/                  # Raw and processed datasets
├── docs/                  # Sphinx documentation
├── docker-compose.yml     # Docker orchestration
└── tests/                 # API test scripts
```
---

## 🖥️ Local Setup
🔧 Prerequisites

    Python 3.10+

    Node.js 18+

    Docker (for containerized deployment)

    pip or conda

## 🐍 Backend

#Create virtualenv and activate
```bash
python3 -m venv venv
source venv/bin/activate
```
# Install dependencies
```bash
pip install -r requirements.txt
```
# Start FastAPI server
```bash
cd backend
uvicorn main_2:app --reload
```
## 🌐 Frontend
```bash
cd frontend
npm install
npm run dev
```
## 🐳 Run with Docker Compose
```bash
docker-compose up --build
```

Backend: http://localhost:8000

Frontend: http://localhost:3000

## 🤝 Contributors

Thanks to these amazing people :



| Name               | GitHub Profile                                     |
|--------------------|----------------------------------------------------|
| Rohit Kshirsagar   | [@rohitkshirsagar19](https://github.com/rohitkshirsagar19) |
| Parth Lhase        | [@LhaseParth2610](https://github.com/LhaseParth2610)       |
| Rishabh Kothari    | [@RishabhK103](https://github.com/RIshabhK103)             |
| Prajwal Kumbhar    | [@prajwalkumbhar29](https://github.com/prajwalkumbhar29)                   |

## 🪪 License

This project is licensed under the MIT License. See the LICENSE file for details.
