console.log("Hit 1");
const form = document.getElementById("uploadAudio");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData();
  const text = document.getElementById("text").files[0];
  formData.append("text", text);

  try {
    const response = await axios.post(
      // "https://notesify-server.vercel.app/speech/generateSpeech",
      "https://notesify-server.vercel.app//transcript/transcriptAudio",
      formData,
      {
        headers: {
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzVhYTFjNTk4ZWJlMmQyNGVhNTZkMyIsImlhdCI6MTcwMjM2NjUxMywiZXhwIjoxNzAyMzg4MTEzfQ.oGQKtkBTeiDYJup1alONQKd4t8-ocJnFc_bANS7R2Xw"
        },
        responseType: "blob"
      }
    );

    const audioUrl = URL.createObjectURL(response.data);
    const audio = new Audio(audioUrl);
    audio.play();
    console.log(response);
  } catch (error) {
    console.error("error uploding file", error);
  }
});
//git add -A //stage
//git commit -m ''
//git status 