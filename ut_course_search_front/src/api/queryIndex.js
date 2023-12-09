export let ResponseSources = {
    text: "",
    doc_id: "",
    start: 0,
    end: 0,
    similarity: 0,
};
  
export let QueryResponse = {
    text: "",
    sources: []
};

let dev = false;
  
const queryIndex = async (query) => {

    const baseURL = (dev === true ? "http://localhost:8000/courses?" : "https://ut-course-search-server-lsti4tutia-uc.a.run.app/courses?");
    const queryURL = new URL(baseURL);
    queryURL.searchParams.append("text", query);
  
    const response = await fetch(queryURL, { mode: "cors" });
    if (!response.ok) {
      return { text: "Error in query", sources: [] };
    }
  
    const queryResponse = (await response.json());
  
    return queryResponse;
};

export const queryChat = async (query) => {

    const baseURL = (dev === true ? "http://localhost:5000/chat?" : "https://ut-course-search-server-lsti4tutia-uc.a.run.app/chat?");
    const queryURL = new URL(baseURL);
    console.log(query)
    queryURL.searchParams.append("text", query);
    console.log(queryURL)
  
    const response = await fetch(queryURL, { mode: "cors" });
    if (!response.ok) {
      return { text: "Error in query", sources: [] };
    }
  
    const queryResponse = (await response.json());
  
    return queryResponse;
}
  
  export default queryIndex;