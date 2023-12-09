from bs4 import BeautifulSoup
import requests
import re
import pickle

BASE_URL = "https://catalog.utexas.edu/general-information/coursesatoz"

def get_course_urls():
    """
    Scrapes the UT Austin course catalog for all course urls
    """
    pattern = r"/general-information/coursesatoz/[a-zA-Z0-9\-]{1,3}/?"
    page = requests.get(BASE_URL).text
    soup = BeautifulSoup(page, 'html.parser')
    course_tags = soup.find_all("a", href=re.compile("/general-information/coursesatoz/[a-zA-Z0-9\-]{1,3}/?"))
    filtered_courses_tags = []
    for tag in course_tags:
        candidate = tag["href"]
        if (re.fullmatch(pattern, candidate)):
            filtered_courses_tags.append(tag)
        else:
            print("No match: " + candidate)
    links = [BASE_URL + tag["href"][32:] for tag in filtered_courses_tags]
    links = [link[:-1] if link[-1] == "/" else link for link in links]
    return list(set(links))

# print(get_course_urls())
# print(len(get_course_urls()))

links = get_course_urls()
# pickle the links
with open("../data/course_links.pkl", "wb") as f:
    pickle.dump(links, f)
print(links)

