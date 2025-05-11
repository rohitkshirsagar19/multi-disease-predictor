from setuptools import find_packages, setup

setup(
    name='multi_disease_predictor',
    packages=find_packages(),
    version='0.1.0',
    description='A multi-disease prediction project.',
    author='Rohit, Rishabh, Parth, Prajwal',
    license='MIT',
    install_requires=[
        "pandas",
        "numpy",
        "scikit-learn",
        "matplotlib",
        "seaborn",
        "pyyaml",
        "mlflow",
        "joblib",
        "argparse",
        "fastapi",
        "uvicorn",
        "pydantic",
        "pytest",
        "pytest-cov",
    ],
)
