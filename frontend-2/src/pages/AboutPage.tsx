
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-medical-dark mb-6">About Our Health Prediction System</h1>
      
      <Card className="shadow-md mb-6">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-3">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            The Health Disease Prediction System is designed to provide early detection of potential health issues
            through advanced machine learning algorithms. Our goal is to empower individuals with information
            about their health risk factors and encourage proactive healthcare decisions.
          </p>
          <p className="text-gray-600">
            By analyzing various health parameters, our system can predict the likelihood of various diseases,
            allowing users to seek medical consultation earlier and potentially improve health outcomes.
          </p>
        </CardContent>
      </Card>
      
      <Card className="shadow-md mb-6">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-3">How It Works</h2>
          <p className="text-gray-600 mb-4">
            Our system uses machine learning models trained on large datasets of patient information
            to identify patterns associated with different diseases. When you enter your health data,
            the system processes this information and provides a prediction based on statistical analysis.
          </p>
          <div className="mt-4">
            <h3 className="font-medium text-lg mb-2">The prediction process:</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 pl-4">
              <li>Select a disease you want to evaluate</li>
              <li>Enter your health metrics and relevant information</li>
              <li>Our AI analyzes your data using trained models</li>
              <li>Receive a prediction indicating likelihood of the disease</li>
            </ol>
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-md mb-6">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-3">Important Disclaimer</h2>
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
            <p className="text-amber-700">
              This tool is for informational purposes only and is not a substitute for professional medical advice, 
              diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider 
              with any questions you may have regarding a medical condition.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-3">Supported Diseases</h2>
          <p className="text-gray-600 mb-4">
            Our system currently supports prediction for these diseases:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "Anemia",
              "Lung Cancer",
              "Hepatitis",
              "Cardiovascular",
              "Thyroid",
              "Heart Disease",
              "Liver Disease",
              "Stroke"
            ].map((disease) => (
              <div
                key={disease}
                className="bg-gray-50 px-4 py-3 rounded-md border border-gray-200"
              >
                <span className="font-medium text-medical-primary">{disease}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutPage;
