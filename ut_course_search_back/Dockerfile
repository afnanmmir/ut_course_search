# Use an official Python runtime as the base image
FROM python:3.8

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

# Copy app source code
COPY . .

# Expose port
EXPOSE 8000

CMD exec gunicorn --bind :8000 --workers 1 --threads 8 --timeout 0 app:'create_app()'


