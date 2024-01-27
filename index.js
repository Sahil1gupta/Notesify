document.addEventListener('DOMContentLoaded', () => {
  console.log("Hit 1");
  const form = document.getElementById("uploadAudio");
  let dataCont = document.getElementById("dataContainer");
  let data = {
    text: ""
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
            authorization: "your_token_here"  // Replace with your actual token
          },
        }
      );
      console.log("axios hit");
      console.log(response.data);

      data.text = response.data.data.text;

      console.log("dataText:", data.text);

      // Update the dataContainer only if it exists
      if (dataCont) {
        dataCont.innerHTML += `<p>${data.text}</p>`;
      } else {
        console.error("dataContainer is null or undefined. Check your HTML structure.");
      }

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
});
