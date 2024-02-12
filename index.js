let getSelectedValue;
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Content Loaded");
  const form = document.getElementById("uploadAudio");

  let data = {
    text: "",
  };
  let currentApi;
  getSelectedValue = function () {
    const selectedOption = document.getElementById("selectApi");
    currentApi = selectedOption.value;
    console.log(currentApi);
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("form clicked");
    console.log(event);

    const formData = new FormData();
    const audio = document.getElementById("text").files[0];
    formData.append("audio", audio);

    let editor = document.getElementById("editor");
    var childElements = editor.children;

    // Log or process each child element
    console.log("hii");
    for (var i = 0; i < childElements.length; i++) {
      console.log(childElements[i]);
    }
    let qlEditor = document.querySelector(".ql-editor");
    console.log(qlEditor.children[0]);
    console.log(editor);
    var dataContainer = document.createElement("div");
    dataContainer.id = "dataContainer";
    dataContainer.innerHTML = "hii";
    qlEditor.appendChild(dataContainer);

    console.log(qlEditor);
    let dataCont = document.getElementById("dataContainer");
    console.log(editor);
    console.log(dataCont);
    let luli = qlEditor.children[0];
    try {
      let response;
      if (currentApi === "toText") {
        response = await axios.post(
          "https://notesify-server.vercel.app/transcript/transcriptAudio",
          formData,
          {
            headers: {
              authorization:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODQ0NDdiNzZlMmM4ZTY4ZmQxNTllZiIsImlhdCI6MTcwNzY2MjE3MiwiZXhwIjoxNzEwMjU0MTcyfQ.0pr27n7__W9WNqV7dd2oD7r3MyzZqaztKrmUq7kxAPw", // Replace with your actual token
            },
          }
        );

        data.text = response.data.data.text;
        luli.textContent = data.text;
        console.log("dataText:", data.text);

        // Update the dataContainer only if it exists
        if (dataCont) {
          dataCont.innerHTML += `<p>${data.text}</p>`;
        } else {
          console.error(
            "dataContainer is null or undefined. Check your HTML structure."
          );
        }
      } else if (currentApi === "toAudio") {
        response = await axios.post(
          "https://notesify-server.vercel.app/speech/generateSpeech",
          formData,
          {
            headers: {
              authorization:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODQ0NDdiNzZlMmM4ZTY4ZmQxNTllZiIsImlhdCI6MTcwNzY2MjE3MiwiZXhwIjoxNzEwMjU0MTcyfQ.0pr27n7__W9WNqV7dd2oD7r3MyzZqaztKrmUq7kxAPw", // Replace with your actual token
            },
            responseType: "blob",
          }
        );
        const audioUrl = URL.createObjectURL(response.data);
        const audio = new Audio(audioUrl);
        audio.play();
        console.log(response);
      }

      console.log("axios hit");
      console.log(response.data);
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
