console.log("index included");
console.log("running");
const audiofil = document.getElementById("audio").value;
console.log(audiofil);
const form = document.getElementById("uploadAudio");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData();
  const audio = document.getElementById("audio").files[0];
  formData.append("audio", audio);

  try {
    const response = await axios.post(
      "https://notesify-server.vercel.app/speech/generateSpeech",
      formData,
      {
        headers: {
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzVhYTFjNTk4ZWJlMmQyNGVhNTZkMyIsImlhdCI6MTcwMjM2NjUxMywiZXhwIjoxNzAyMzg4MTEzfQ.oGQKtkBTeiDYJup1alONQKd4t8-ocJnFc_bANS7R2Xw"
        }
      }
    );
    console.log(response.data.notes);
  } catch (error) {
    console.error("error uploding file", error);
  }
});
