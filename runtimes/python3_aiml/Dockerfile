# Use the official Python image as the base
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /var/task

# Install system dependencies
RUN apt-get update && apt-get install -y \
  build-essential \
  curl \
  git \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Install essential global Python packages
RUN pip install --upgrade pip setuptools wheel

# Install commonly used Python libraries
RUN pip install \
  numpy \
  pandas \
  scipy \
  scikit-learn \
  tensorflow \
  keras \
  torch \
  torchvision \
  jupyter \
  notebook \
  matplotlib \
  seaborn \
  plotly \
  flask \
  requests \
  aiohttp \
  fastapi \
  pydantic \
  sqlalchemy \
  psycopg2-binary \
  mysqlclient \
  redis \
  pymongo \
  elasticsearch \
  pillow \
  beautifulsoup4 \
  lxml \
  pytest \
  black \
  pylint \
  gunicorn \
  uvicorn \
  pytest-cov \
  boto3 \
  passlib \
  cryptography \
  opencv-python-headless \
  tqdm \
  pyyaml \
  h5py \
  nltk \
  spacy \
  gensim \
  transformers \
  ray \
  dask \
  celery \
  rq \
  rq-dashboard

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Copy your application code
COPY . .

# Default command to run the application
CMD ["python", "index.py"]
