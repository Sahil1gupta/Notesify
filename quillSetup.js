document.addEventListener("DOMContentLoaded", () => {
  // Your script here
  var quill = new Quill("#editor", {
    theme: "snow",
    placeholder: "Audio to Text output will be shown here...",
    modules: {
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"], // Existing options
          [{ background: [] }, { color: [] }], // Background and text color options
          ["link", "image", "video"], // Existing options
          [{ header: [1, 2, 3, 4, 5, 6, false] }], // Existing options
          [{ list: "ordered" }, { list: "bullet" }], // Existing options
          ["code-block"], // Existing options
          ["highlight"], // New highlight option
        ],
        handlers: {
          highlight: function () {
            var selection = quill.getSelection();
            if (selection) {
              var range = quill.getSelection(true);
              quill.formatText(
                range.index,
                range.length,
                "background",
                "yellow"
              );
            }
          },
        },
      },
    },
  });
});
