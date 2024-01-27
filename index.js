// index.js

// Wrap the entire script in a function
function initialize() {
  console.log("Script initialized");

  const form = document.getElementById("uploadAudio");

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
      let dataCont = document.getElementById("dataContainer");

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

  function htmlTopdf() {
      const element = document.getElementById('editor');
      var opt = {
          margin: 1,
          filename: 'myfile.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      // New Promise-based usage:
      html2pdf().set(opt).from(element).save();
  }

  // Call the function after the document is fully loaded
  initialize();
}
