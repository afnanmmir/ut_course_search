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
  
const queryIndex = async (query) => {
    const queryURL = new URL("http://localhost:5601/query?text=1");
    queryURL.searchParams.append("text", query);
  
    const response = await fetch(queryURL, { mode: "cors" });
    if (!response.ok) {
      return { text: "Error in query", sources: [] };
    }
  
    const queryResponse = (await response.json());
  
    return queryResponse;
};
  
  export default queryIndex;