# Use an official Python runtime as the base image
FROM --platform=linux/amd64 python:3.10-slim-buster

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY requirements.txt ./
RUN pip3 install -r requirements.txt --trusted-host pypi.org --trusted-host pypi.python.org --trusted-host=files.pythonhosted.org

# Set environment variables
ENV FLASK_APP=app.py
ENV OPENAI_API_KEY=OPENAI_API_KEY
ENV INDEX_DIR=INDEX_DIR
ENV PINECONE_API_KEY=PINECONE_API_KEY
ENV PINECONE_ENV=PINECONE_ENV
ENV FAISS_BIN=FAISS_BIN
ENV COURSES=COURSES
ENV COURSES_INDEX=COURSES_INDEX

ENV PYTHONPATH=/usr/src/app

# Copy app source code
COPY . .

# Expose port
EXPOSE 8000

CMD exec gunicorn --bind :8000 --workers 1 --threads 8 --timeout 0 server_app:'app'


