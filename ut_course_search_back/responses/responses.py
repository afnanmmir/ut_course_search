class Response:
    def __init__(self):
        self.pinecone_response = None
        self.openai_response = None
    # Create getter and setter methods for each attribute
    def get_pinecone_response(self):
        return self.pinecone_response
    def set_pinecone_response(self, pinecone_response):
        self.pinecone_response = pinecone_response
    def get_openai_response(self):
        return self.openai_response
    def set_openai_response(self, openai_response):
        self.openai_response = openai_response
    