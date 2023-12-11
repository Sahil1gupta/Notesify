
import axios from 'axios';
console.log("index included")
console.log("running")
const audiofil=document.getElementById('audiofile').value;
console.log(audiofil)
const form=document.getElementById("uploadAudio")

form.addEventListener('submit',async(event)=>{
    event.preventDefault();
    const formData=new FormData();
    const audiofile=document.getElementById('audiofile').files[0];
    formData.append('audiofile',audiofile);


    try{
        const response=await axios.post('https://notesify-server.vercel.app/transcript/transcriptAudio',formData,{
           
        headers:{
                'Content-Type':'multipart/form-data',
                'authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzVhYTFjNTk4ZWJlMmQyNGVhNTZkMyIsImlhdCI6MTcwMjMxOTgxNiwiZXhwIjoxNzAyMzQxNDE2fQ.9ABNiNpy92eQ5jNv_cBgT5GTzdcJaiJC6rwLG0_A7Jg'

            }
        })
        console.log("File uploaded successfully",response)
    }
    catch(error){
        console.error("error uploding file",error)
    }

})