let isRecording = false;
let mediaRecorder;
let chunks = []; // Array to store recorded audio chunks
let timerInterval;
let seconds = 0;

function startRecording() {
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(function (stream) {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      document.getElementById("recordButton").classList.add("recording");
      isRecording = true;

      // Start the timer
      document.getElementById("timer").style.display = "inline"; // Show the timer

      timerInterval = setInterval(function () {
        seconds++;
        document.getElementById("timer").textContent = formatTime(seconds);
      }, 1000);

      mediaRecorder.ondataavailable = function (e) {
        chunks.push(e.data);
      };

      mediaRecorder.onstop = function (e) {
        console.log("Recording stopped");
        isRecording = false;

        document.getElementById("recordButton").textContent = "Start Recording";
        document.getElementById("recordButton").classList.remove("recording");
        document.getElementById("timer").style.display = "none"; // Hide the timer

        // Combine all recorded chunks into a single Blob
        let recordedBlob = new Blob(chunks, { type: "audio/wav" });

        // Create a temporary URL for the recorded audio Blob
        let audioUrl = URL.createObjectURL(recordedBlob);

        // Create a download link for the recorded audio
        let downloadLink = document.createElement("a");
        downloadLink.href = audioUrl;
        downloadLink.download = "recorded_audio.wav";
        downloadLink.textContent = "Download Recorded Audio";
        document.body.appendChild(downloadLink);
        downloadLink.click();

        // Cleanup
        chunks = [];
        URL.revokeObjectURL(audioUrl);
        document.body.removeChild(downloadLink);

        // Stop the timer
        clearInterval(timerInterval);
        seconds = 0;
        document.getElementById("timer").textContent = "0:00";
      };
    })
    .catch(function (err) {
      console.log("Error: " + err);
    });
}

function stopRecording() {
  console.log("stopRecording hit");
  mediaRecorder.stop();
  mediaRecorder.stream.getTracks().forEach((track) => track.stop());
}

function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

document.getElementById("recordButton").addEventListener("click", function () {
  if (!isRecording) {
    startRecording();
    this.textContent = "Stop Recording";
  } else {
    stopRecording();
  }
});

let getSelectedValue;
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Content Loaded");
  const form = document.getElementById("uploadAudio");
  const copyButton = document.querySelector(".copy-button");

  copyButton.addEventListener('click', function() {
    // Get the Quill editor content
    let qlEditor = document.querySelector(".ql-editor");
    let editorContent = qlEditor.innerText;

    // Copy the content to the clipboard
    navigator.clipboard
      .writeText(editorContent)
      .then(function() {
        // Show the alert popup
        let alertPopup = document.getElementById('alertPopup');
        let alertMessage = document.getElementById('alertMessage');
        alertMessage.textContent = 'Text copied!';
        alertPopup.style.display = 'block';

        // Hide the alert popup after 3 seconds
        setTimeout(function() {
          alertPopup.style.display = 'none';
        }, 3000);
      })
      .catch(function(err) {
        console.error('Could not copy text: ', err);
      });
  });

  // Add click event listener to the alert close button
  document.getElementById('alertCloseButton').addEventListener('click', function() {
    document.getElementById('alertPopup').style.display = 'none';
  });

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
    // const audio = document.getElementById("text").files[0];
    // formData.append("audio", audio);

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
      if (document.getElementById("text") && document.getElementById("text").files.length > 0) {
        const audio = document.getElementById("text").files[0];
        formData.append("audio", audio);
    } else {
        console.error('No file selected');
    }
      let response;
      if (currentApi === "toText") {
        response = await axios.post(
          "https://notesify-server.vercel.app/transcript/transcriptAudio",
          formData,
          {
            headers: {
              authorization:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODQ0NDdiNzZlMmM4ZTY4ZmQxNTllZiIsImlhdCI6MTcxMjM4MTYwOCwiZXhwIjoxNzE0OTczNjA4fQ.uK9opv_YI1TyPiFcIKqv8EtKgMh61MblbdlzWXPp-yY", // Replace with your actual token
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
        const formData = new FormData();
        formData.append("text", audio, "text.txt");
      
        const config = {
          headers: {
            authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODQ0NDdiNzZlMmM4ZTY4ZmQxNTllZiIsImlhdCI6MTcxMjM4MTYwOCwiZXhwIjoxNzE0OTczNjA4fQ.uK9opv_YI1TyPiFcIKqv8EtKgMh61MblbdlzWXPp-yY",
            ...formData.getHeaders()
          },
          responseType: "blob",
        };
        response = await axios.post(
          "https://notesify-server.onrender.com/speech/generateSpeech",
          formData,
          config
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