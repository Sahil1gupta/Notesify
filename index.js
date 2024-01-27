console.log("Hit 1");
const form = document.getElementById("uploadAudio");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log("form clicked")
  console.log(event)
  const formData = new FormData();
  const audio = document.getElementById("text").files[0];
  formData.append("audio",audio);

  try {
    const response = await axios.post(
      "https://notesify-server.vercel.app/transcript/transcriptAudio",
      formData,
      {
        headers: {
          authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODQ0NDdiNzZlMmM4ZTY4ZmQxNTllZiIsImlhdCI6MTcwNjMzODk5OCwiZXhwIjoxNzA2MzYwNTk4fQ.KIZsWifauaXQhSBkZRVTk0_JfD62Gw1IF2g-0u3Du8c"
        },
      }
    );
      console.log("axios hit")
    
    console.log(response.data.text);
  }  catch (error) {
    console.error("Error uploading file", error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Server responded with data:", error.response.data);
      console.error("Server responded with status:", error.response.status);
      console.error("Server responded with headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received from the server");
      console.error("Request data:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up the request", error.message);
    }
  }
  
});
