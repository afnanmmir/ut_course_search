from bs4 import BeautifulSoup
import requests
import re
import pickle

BASE_URL = "https://catalog.utexas.edu/general-information/coursesatoz"

def get_course_urls():
    """
    Scrapes the UT Austin course catalog for all course urls
    """
    page = requests.get(BASE_URL).text
    soup = BeautifulSoup(page, 'html.parser')
    course_tags = soup.find_all("a", href=re.compile("/general-information/coursesatoz/"))
    links = [BASE_URL + tag["href"][32:] for tag in course_tags]
    links = [link[:-1] if link[-1] == "/" else link for link in links]
    return list(set(links))

# print(get_course_urls())
# print(len(get_course_urls()))

links = get_course_urls()
# pickle the links
with open('course_links.pkl', 'wb') as f:
    pickle.dump(links, f)

