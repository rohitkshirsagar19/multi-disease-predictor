# Use a lightweight Python base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies for scikit-learn and other libraries
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements file
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy only necessary files (models, src, and config)
COPY src/ src/
COPY models/ models/
COPY params.yaml .

# Expose port for FastAPI
EXPOSE 8000

# Run the FastAPI application
CMD ["uvicorn", "src.inference:app", "--host", "0.0.0.0", "--port", "8000"]-slim

# Set working directory
WORKDIR /app

# Copy requirements file
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files (excluding those in .gitignore)
COPY . .

# Expose port for FastAPI
EXPOSE 8000

# Run the FastAPI application
CMD ["uvicorn", "src.inference:app", "--host", "0.0.0.0", "--port", "8000"]