console.log("index included");
console.log("running");
const audiofile = document.getElementById("audiofile").value;
console.log(audiofile);
const form = document.getElementById("uploadAudio");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData();
  const audiofile = document.getElementById("audiofile").files[0];
  formData.append("audiofile", audiofile);

  try {
    const response = await axios.post(
      "https://notesify-server.vercel.app/transcript/transcriptAudio",
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
