# Use a small Python base image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy & install dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy your application code
COPY . .

# Run with uvicorn on port 8080
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]