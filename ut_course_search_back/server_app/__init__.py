from flask import Flask, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
import sys

from server_app.models import Response, Course
from server_app.db.faiss.faiss_db import FaissDB
from model.embedding_retriever import EmbeddingRetriever

index_name = "ut-courses"
index = None
response = None
embedding_retriever = None

load_dotenv()
print("Initializing index...")
print("Hello")
# initialize_index(get_course_urls(), os.getenv("INDEX_DIR"))
# index = index_methods.init_pinecone(index_name)
response = Response()
index = FaissDB(index_name, dimension=768)
embedding_retriever = EmbeddingRetriever("sentence-transformers/multi-qa-mpnet-base-dot-v1")
index.init_faiss(file_path=os.getenv("FAISS_BIN"), model=embedding_retriever)
print("Index initialized!")

app = Flask(__name__)
CORS(app)

from server_app import routes