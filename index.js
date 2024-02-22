const form = document.getElementById("registerForm");

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    let RegisterData = new FormData();

    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let userName = document.getElementById('userName').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    RegisterData.append("firstName", firstName);
    RegisterData.append("lastName", lastName);
    RegisterData.append("userName", userName);
    RegisterData.append("email", email);
    RegisterData.append("password", password);

    try {
        const response = await fetch("https://notesify-server.vercel.app/user/signup", {
            method: 'POST',
            body: RegisterData,
            // headers: {
            //     // You can include headers here if needed
            // }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const jwtToken = await response.json();
        console.log(jwtToken);
        window.location.href = "login.html";
    } catch (error) {
        console.error("Error:", error);
        // Handle registration error here
    }
});
