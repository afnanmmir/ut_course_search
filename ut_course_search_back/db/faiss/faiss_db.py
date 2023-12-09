import faiss
import numpy as np
import os
import pickle
import sys
from tqdm import tqdm
from dotenv import load_dotenv
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from utils.Course import Course
from model.embedding_retriever import EmbeddingRetriever

# TODO: Make it so that the Course class is imported from utils.Course
class Course():
    def __init__(self, title: str, description: str, plain_text: str):
        self.title = title
        self.description = description
        self.plain_text = plain_text

    # Create getter and setter methods for each attribute
    def get_title(self):
        return self.title
    
    def set_title(self, title):
        self.title = title
    
    def get_description(self):
        return self.description
    
    def set_description(self, description):
        self.description = description

    def get_plain_text(self):
        return self.plain_text
    
    def set_plain_text(self, plain_text):
        self.plain_text = plain_text

    # Create a method to return a dictionary of the object
    def to_dict(self):
        return {
            'title': self.title,
            'description': self.description,
            'plain_text': self.plain_text
        }
    
    def __str__(self):
        return f"Course(title={self.title}, description={self.description}, plain_text={self.plain_text})"

class FaissDB:
    def __init__(self, index_name, dimension=786):
        self.index_name = index_name
        self.dimension = dimension
        self.index = None
        self.index_to_course = {}

    def init_faiss(self, file_path: str, model: EmbeddingRetriever):
        if os.path.exists(file_path):
            self.index = self._load_index(file_path)
            with open(os.getenv("COURSES_INDEX"), "rb") as f:
                self.index_to_course = pickle.load(f)
        else:
            self.index = self.create_index(os.getenv('COURSES'), model)
    
    def _load_index(self, file_path: str):
        index = faiss.read_index(file_path)
        return index
    
    def create_index(self, file_path: str, model: EmbeddingRetriever):
        print("Creating index...")
        index = faiss.IndexHNSWFlat(self.dimension, 32)
        with open(file_path, "rb") as f:
            courses_list = pickle.load(f)
        for i, course in tqdm(enumerate(courses_list)):
            self.index_to_course[i] = course
            index.add(model.get_embeddings(course.get_plain_text()))
        print("Created index!")
        index.save_index("data/classes_index.bin")
        return index
    
    def query_index(self, query_embedding: np.array, top_k: int = 20):
        distances, indices = self.index.search(query_embedding, top_k)
        courses = []
        for i in indices[0]:
            courses.append(self.index_to_course[i])

        return courses


