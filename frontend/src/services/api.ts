interface PredictionResponse {
  prediction: number;
}

export const API_BASE_URL = "http://localhost:8000";

export const fetchPrediction = async (
  disease: string,
  formData: Record<string, number>
): Promise<number> => {
  try {
    // === 1. Get prediction
    const response = await fetch(`${API_BASE_URL}/predict/${disease}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.detail || `Error: ${response.status} ${response.statusText}`
      );
    }

    const data = (await response.json()) as PredictionResponse;

    // === 2. Submit data for retraining
    await fetch(`${API_BASE_URL}/submit_data/${disease}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    return data.prediction;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred");
  }
};
