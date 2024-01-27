document.addEventListener('DOMContentLoaded', () => {
  console.log("Hit 1");
  const form = document.getElementById("uploadAudio");
  let dataCont = document.getElementById("dataContainer");
  let data = {
    text:""
  };
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("form clicked");
    console.log(event);
    const formData = new FormData();
    const audio = document.getElementById("text").files[0];
    formData.append("audio", audio);
    
    try {
      const response = await axios.post(
        "https://notesify-server.vercel.app/transcript/transcriptAudio",
        formData,
        {
          headers: {
            authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODQ0NDdiNzZlMmM4ZTY4ZmQxNTllZiIsImlhdCI6MTcwNjMzODk5OCwiZXhwIjoxNzA2MzYwNTk4fQ.KIZsWifauaXQhSBkZRVTk0_JfD62Gw1IF2g-0u3Du8c"
          },
        }
      );
      console.log("axios hit");
      console.log(response.data);
      
       data.text= response.data.data.text
    

      console.log("dataText:", data.text);
     

      // console.log(data.text);
    } catch (error) {
      console.error("Error uploading file", error);
      if (error.response) {
        console.error("Server responded with data:", error.response.data);
        console.error("Server responded with status:", error.response.status);
        console.error("Server responded with headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received from the server");
        console.error("Request data:", error.request);
      } else {
        console.error("Error setting up the request", error.message);
      }
    }
   
  });
  dataCont.innerHTML += `<p>${data.text}</p>`;
});
