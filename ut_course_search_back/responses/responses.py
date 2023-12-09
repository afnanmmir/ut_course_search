class Response:
    def __init__(self):
        self.index_response = None
        self.openai_response = None
    # Create getter and setter methods for each attribute
    def get_index_response(self):
        return self.index_response
    def set_index_response(self, index_response):
        self.index_response = index_response
    def get_openai_response(self):
        return self.openai_response
    def set_openai_response(self, openai_response):
        self.openai_response = openai_response
    