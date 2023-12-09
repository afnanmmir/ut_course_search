import faiss
import numpy as np
import os
import pickle
import sys
from tqdm import tqdm
from dotenv import load_dotenv
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from server_app.models import Course
from model.embedding_retriever import EmbeddingRetriever

# TODO: Make it so that the Course class is imported from utils.Course

class FaissDB:
    def __init__(self, index_name, dimension=786):
        self.index_name = index_name
        self.dimension = dimension
        self.index = None
        self.index_to_course = {}

    def init_faiss(self, file_path: str, model: EmbeddingRetriever):
        print("init FAISS")
        if os.path.exists('data/classes_index.bin'):
            self.index = self._load_index('data/classes_index.bin')
            with open('data/index_to_course.pkl', "rb") as f:
                index_to_course_dict = pickle.load(f)
            for i, course in index_to_course_dict.items():
                self.index_to_course[i] = Course(course["name"], course["description"], course["plain_text"])
        else:
            self.index = self.create_index('data/courses_list.pkl', model)
    
    def _load_index(self, file_path: str):
        index = faiss.read_index(file_path)
        return index
    
    def create_index(self, file_path: str, model: EmbeddingRetriever):
        print("Creating index...")
        index = faiss.IndexHNSWFlat(self.dimension, 32)
        with open(file_path, "rb") as f:
            courses_list = pickle.load(f)
        for i, course in enumerate(courses_list):
            self.index_to_course[i] = Course(course["name"], course["description"], course["plain_text"])
            index.add(model.get_embeddings(course["plain_text"]))
        print("Created index!")
        index.save_index("data/classes_index.bin")
        return index
    
    def query_index(self, query_embedding: np.array, top_k: int = 20):
        distances, indices = self.index.search(query_embedding, top_k)
        courses = []
        for i in indices[0]:
            courses.append(self.index_to_course[i])

        return courses


