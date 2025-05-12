from numpy import inner
import pandas as pd

def update_csv(csv_1,csv_2):
    df1=pd.read_csv(csv_1)
    df2=pd.read_csv(csv_2)

    df3=pd.merge(df1,df2,how="inner")
    print(df3.head)






if __name__=="__main__":
    Anemia="data/processed/Anemia.csv"
    Cardiovascular="data/processed/Cardiovascular.csv"
    Heart="data/processed/cleaned_heart.csv"
    Hepatitis_C="data/processed/Hepatitis_C.csv"
    Lung_cancer="data/processed/lung_cancer_processed.csv"
    Thyroid="data/processed/thyroid_cleaned_data.csv"
    Stroke="data/processed/processed_healthcare_data.csv"
    Liver="data/processed/indian_liver_patient_processed.csv"  

    Anemia_="backend/user_data/anemia.csv"
    Cardiovascular_="backend/user_data/cardiovascular.csv"
    Heart_="backend/user_data/heart.csv"
    Hepatitis_C_="backend/user_data/hepatitis.csv"
    Lung_cancer_="backend/user_data/lung_cancer.csv"
    Thyroid_="backend/user_data/thyroid.csv"
    Stroke_="backend/user_data/stroke.csv"
    Liver_="backend/user_data/liver.csv"

    update_csv(Anemia,Anemia_)
    update_csv(Cardiovascular,Cardiovascular_)
    update_csv(Heart,Heart_)
    update_csv(Hepatitis_C,Hepatitis_C_)
    update_csv(Lung_cancer,Lung_cancer_)
    update_csv(Thyroid,Thyroid_)
    update_csv(Stroke,Stroke_)
    update_csv(Liver,Liver_)

