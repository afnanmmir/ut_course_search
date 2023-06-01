from flask import Flask, request, jsonify, make_response
from llama_index import GPTVectorStoreIndex, TrafilaturaWebReader, LangchainEmbedding, ServiceContext, embeddings, LLMPredictor, StorageContext, load_index_from_storage
from llama_index.storage.docstore import SimpleDocumentStore
from llama_index.storage.index_store import SimpleIndexStore
from llama_index.vector_stores import SimpleVectorStore
import openai
from dotenv import load_dotenv
import os
from flask_cors import CORS
import pinecone
import db.index_methods as index_methods
from responses.responses import Response



index = None
index_name = "ut-courses"
response = None



# @app.route("/")
# def home():
#     return "This is a test"

# def get_course_and_description(query_response, top_k: int = 20, similarity_threshold: float = 0.70):
#     courses_and_descriptions = []
#     response = {}
#     matches = query_response['results'][0]['matches'][0:top_k]
#     for match in matches:
#         if(match['score'] > similarity_threshold):
#             course_title = match['metadata']['title']
#             course_description = match['metadata']['description']
#             course_and_description = {"title": course_title, "description": course_description}
#             courses_and_descriptions.append(course_and_description)
#     response["response"] = courses_and_descriptions
#     return response

# @app.route("/courses", methods=["GET"])
# def get_courses():
#     global index, response
#     query = request.args.get("text")
#     query_response = index_methods.query_index(index, query, top_k=20)
#     response.set_pinecone_response(query_response)
#     courses_and_descriptions = get_course_and_description(response.get_pinecone_response())
#     return courses_and_descriptions, 200

# @app.route("/chat", methods=["GET"])
# def get_chat():
#     global index, response
#     query = request.args.get("text")
#     query_response = response.get_pinecone_response()
#     context = index_methods.extract_context(query_response)
#     chat_response = index_methods.query_chat(context, query)
#     response.set_openai_response(chat_response)
#     text = chat_response['choices'][0]['message']['content']
#     return {"text": text}, 200




# if __name__ == "__main__":
def create_app():
    global index, response
    app = Flask(__name__)
    CORS(app)

    @app.route("/")
    def home():
        return "This is a test"

    def get_course_and_description(query_response, top_k: int = 20, similarity_threshold: float = 0.70):
        courses_and_descriptions = []
        response = {}
        matches = query_response['results'][0]['matches'][0:top_k]
        for match in matches:
            if(match['score'] > similarity_threshold):
                course_title = match['metadata']['title']
                course_description = match['metadata']['description']
                course_and_description = {"title": course_title, "description": course_description}
                courses_and_descriptions.append(course_and_description)
        response["response"] = courses_and_descriptions
        return response

    @app.route("/courses", methods=["GET"])
    def get_courses():
        global index, response
        try:
            query = request.args.get("text")
            query_response = index_methods.query_index(index, query, top_k=20)
            response.set_pinecone_response(query_response)
            courses_and_descriptions = get_course_and_description(response.get_pinecone_response())
            print(f"Query: {query}")
            return courses_and_descriptions, 200
        except Exception as e:
            print(f"Exception: {e}")
            return {"message": "Error in getting courses"}, 500

    @app.route("/chat", methods=["GET"])
    def get_chat():
        global index, response
        try:
            query = request.args.get("text")
            query_response = response.get_pinecone_response()
            context = index_methods.extract_context(query_response)
            chat_response = index_methods.query_chat(context, query)
            response.set_openai_response(chat_response)
            text = chat_response['choices'][0]['message']['content']
            print(f"Text: {text}")
            return {"text": text}, 200
        except Exception as e:
            print(f"Exception: {e}")
            return {"message": "Error in getting chat"}, 500
    load_dotenv()
    print("Initializing index...")
    # initialize_index(get_course_urls(), os.getenv("INDEX_DIR"))
    index = index_methods.init_pinecone(index_name)
    response = Response()
    print("Index initialized!")
    return app