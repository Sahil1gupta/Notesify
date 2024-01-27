

 document.addEventListener('DOMContentLoaded', () => {
    // Your script here
    var quill = new Quill('#editor', {
        theme: 'snow',
        modules: {
         toolbar: {
           container: [
             ['bold', 'italic', 'underline', 'strike'],  // Existing options
             [{ 'background': [] }, { 'color': [] }],   // Background and text color options
             ['link', 'image', 'video'],                // Existing options
             [{ 'header': [1, 2, 3, 4, 5, 6, false] }], // Existing options
             [{ 'list': 'ordered' }, { 'list': 'bullet' }], // Existing options
             ['code-block'],                            // Existing options
             ['highlight']                              // New highlight option
           ],
           handlers: {
             'highlight': function () {
               var selection = quill.getSelection();
               if (selection) {
                 var range = quill.getSelection(true);
                 quill.formatText(range.index, range.length, 'background', 'yellow');
               }
             }
           }
         }
       }
     });
     
     
     function htmlTopdf(){
       const element= document.getElementById('editor');
       var opt = {
         margin:       1,
         filename:     'myfile.pdf',
         image:        { type: 'jpeg', quality: 0.98 },
         html2canvas:  { scale: 2 },
         jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
       };
       
       // New Promise-based usage:
       html2pdf().set(opt).from(element).save();
     }
    
  });
  