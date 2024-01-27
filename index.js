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
      // "https://notesify-server.vercel.app/speech/generateSpeech",
      "https://cors-anywhere.herokuapp.com/https://notesify-server.vercel.app/transcript/transcriptAudio",
      formData,
      {
        headers: {
          authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODQ0NDdiNzZlMmM4ZTY4ZmQxNTllZiIsImlhdCI6MTcwNjMzODk5OCwiZXhwIjoxNzA2MzYwNTk4fQ.KIZsWifauaXQhSBkZRVTk0_JfD62Gw1IF2g-0u3Du8c"
        },
        // responseType: "data"
      }
    );
      console.log("axios hit")
    // const audioUrl = URL.createObjectURL(response.data);
    // const audio = new Audio(audioUrl);
    // audio.play();
    console.log(response);
  } catch (error) {
    console.error("error uploding file", error);
  }
});
//git add -A //stage
//git commit -m ''
//git status 
