# Use official Python image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy backend source code
COPY backend/ /app/

# Copy requirements.txt from project root
COPY requirements.txt /app/

# Install dependencies
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# Expose FastAPI port
EXPOSE 8000

# Run the FastAPI app
CMD ["uvicorn", "main_2:app", "--host", "0.0.0.0", "--port", "8000"]
