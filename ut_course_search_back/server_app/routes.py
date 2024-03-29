from flask import request
import timeit

from server_app import app, embedding_retriever, index, response
import db.pinecone.index_methods as index_methods
from models import Response

index_name = "ut-courses"

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

def get_course_and_description_from_faiss(query_response, top_k: int = 20, similarity_threshold: float = 0.70):
    courses_and_descriptions = []
    response = {}
    for course in query_response:
        course_title = course.get_title()
        course_description = course.get_description()
        course_and_description = {"title": course_title, "description": course_description}
        courses_and_descriptions.append(course_and_description)
    response["response"] = courses_and_descriptions
    return response

@app.route("/courses", methods=["GET"])
def get_courses():
    global index, response
    # try:
    #     query = request.args.get("text")
    #     query_response = index_methods.query_index(index, query, top_k=20)
    #     response.set_pinecone_response(query_response)
    #     courses_and_descriptions = get_course_and_description(response.get_pinecone_response())
    #     return courses_and_descriptions, 200
    # except Exception as e:
    #     print(f"Exception: {e}")
    #     return {"message": "Error in getting courses"}, 500
    try:
        print("Getting courses...")
        query = request.args.get("text")
        start = timeit.default_timer()
        query_embed = embedding_retriever.get_embeddings(query)
        courses = index.query_index(query_embed)
        print("Got courses!")
        courses_and_descriptions = get_course_and_description_from_faiss(courses)
        stop = timeit.default_timer()
        print(f"Time taken to query: {stop - start}")
        response.set_index_response(courses_and_descriptions)
        return courses_and_descriptions, 200
    except Exception as e:
        print(f"Exception: {e}")
        return {"message": f"{e}"}, 500

@app.route("/chat", methods=["GET"])
def get_chat():
    global index, response
    try:
        query = request.args.get("text")
        query_response = response.get_index_response()
        context = index_methods.extract_context(query_response)
        chat_response = index_methods.query_chat(context, query)
        response.set_openai_response(chat_response)
        text = chat_response.choices[0].message.content
        return {"text": text}, 200
    except Exception as e:
        print(f"Exception: {e}")
        # print stack trace of exception
        import traceback
        traceback.print_exc()
        return {"message": "Error in getting chat"}, 500