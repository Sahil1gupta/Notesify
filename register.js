const form=document.getElementById("registerForm");

form.addEventListener('submit',async(event)=>{

    event.preventDefault();
    let RegisterData=new FormData();

    let firstname=document.getElementById('firstname').value
    let lastname=document.getElementById('lastname').value
    let email=document.getElementById('email').value
    let username=document.getElementById('username').value
    let password=document.getElementById('password').value

    RegisterData.append("firstname",firstname);
    RegisterData.append("lastname",lastname);
    RegisterData.append("email",email);
    RegisterData.append("username",username);
    RegisterData.append("password",password);

    try{
        const response=await axios.post("url",RegisterData,
        {
            headers: {
                authorization: "ACCESS_TOKEN"  
            },
            responseType: "json"
          }
        )
        window.location.href="login.html"
    }
    catch(error){

    }
})