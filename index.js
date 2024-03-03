// import axios from 'axios'; // Import axios library

const form = document.getElementById("registerForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  let RegisterData = new FormData();

  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let userName = document.getElementById("userName").value;
  let email = document.getElementById("email").value;

  let password = document.getElementById("password").value;

  RegisterData.append("firstName", firstName);
  RegisterData.append("lastName", lastName);
  RegisterData.append("userName", userName);
  RegisterData.append("email", email);
  RegisterData.append("password", password);

  try {
    const url = "https://notesify-server.vercel.app/user/signup";
    const method = "post";
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer null",
    };

    const data = RegisterData;

    const responseType = "json";

    const response = await axios({ url, method, headers, data, responseType });

    console.log(response);
    if (response.status !== 200) {
      console.log("network issue");
    } else {
        // console.log(response.data);
      // const jwtToken = response.data.token;
      // document.cookie = `token=${jwtToken}; path=/`;
      // console.log(jwtToken);
      window.location.href = "main.html";
    }
  } catch (error) {
    console.error("Error:", error);
    // Handle registration error here
  }
});
