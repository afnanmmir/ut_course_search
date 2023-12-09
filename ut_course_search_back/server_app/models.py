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
    