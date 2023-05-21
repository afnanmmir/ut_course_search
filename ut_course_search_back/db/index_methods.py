import pinecone
from dotenv import load_dotenv
import os
import openai

def init_pinecone(index_name):
    load_dotenv()
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
    PINECONE_ENVIRONMENT = os.getenv("PINECONE_ENV")
    EMBED_DIM = 1536
    pinecone.init(
        api_key=PINECONE_API_KEY,
        environment=PINECONE_ENVIRONMENT
    )

    if index_name not in pinecone.list_indexes():
        pinecone.create_index(
            name=index_name,
            dimension=EMBED_DIM,
            metric="cosine",
        )

    pinecone_index = pinecone.Index(index_name)

    return pinecone_index

def query_index(pinecone_index, query, top_k=20):
    EMBED_MODEL = "text-embedding-ada-002"
    res_embed = openai.Embedding.create(input=[query], model=EMBED_MODEL)
    query_embedding = res_embed['data'][0]['embedding']
    res_query = pinecone_index.query(queries=[query_embedding], top_k=top_k, include_metadata=True)
    return res_query

def extract_context_from_match(match):
    course_title = match['metadata']['title']
    course_description = match['metadata']['description']
    course_plain_text = f"{course_title}: {course_description}"
    return course_plain_text

def extract_context(request_result, top_k = 20, similarity_threshold = 0.79):
    matches = request_result['results'][0]['matches'][0:top_k]
    context_text = ""
    for match in matches:
        if(match['score'] > similarity_threshold):
            context_text += extract_context_from_match(match)
    return context_text

def create_query(query: str, context: str):
    formatted_query = (
        "Here are the context information for the query:"
        "\n-------------------------------------------\n"
        f"{context}"
        "\n-------------------------------------------\n"
        f"Answer the following questions based on the context above. If the context does not help you, please answer with 'Sorry, I could not find any information on this query':{query}\n"
    )
    return formatted_query

def query_chat(context_text: str, query: str):
    openai.api_key = os.getenv("OPENAI_API_KEY")
    query_with_context = create_query(query, context_text)
    messages = [
        {"role": "system", "content": "Your job is to only answer queries about information about college courses."},
        {"role": "system", "content": "If the query does not pertain to this topic, answer with 'I apologize, but that is not related to the University of Texas Course Catalog. As an AI language model, I can answer queries related to courses, professors, and departments at the University of Texas. Please let me know if you have any course-related questions.'"},
        {"role": "user", "content": query_with_context},
    ]
    response = openai.ChatCompletion.create(
        model = 'gpt-3.5-turbo',
        messages = messages
    )
    return response
