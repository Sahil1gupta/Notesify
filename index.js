// import axios from 'axios'; // Import axios library

const form=document.getElementById("registerForm");

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    let RegisterData = new FormData();

    let firstname = document.getElementById('firstname').value;
    let lastname = document.getElementById('lastname').value;
    let email = document.getElementById('email').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    RegisterData.append("firstName", firstname);
    RegisterData.append("lastName", lastname);
    RegisterData.append("userName", username);
    RegisterData.append("email", email);
    RegisterData.append("password", password);

    try {
        const response = await axios.post("https://notesify-server.vercel.app/user/signup", RegisterData, {
            headers: {
                // authorization: "ACCESS_TOKEN"  
            },
            // responseType: "json"
        });
        const jwtToken =  response.data;
        console.log(jwtToken);
        window.location.href = "login.html";
    } catch (error) {
        console.error("Error:", error);
        // Handle registration error here
    }
});
