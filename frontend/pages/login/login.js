const username = document.getElementById("username");
const password = document.getElementById("password");
const passwordShowButton = document.getElementById("password-show-button");

let passwordVisibility = true;
function showPassword(){
    password.type = "text";
}
function hidePassword(){
    password.type = "password";
}
function checkForm(){
    if(username.value.trim() === ''){
        formError("Please enter a username");
    } else if(password.value.trim() === ''){
        formError("Please enter a password");
    } else {
        submit();
    }
}
function formError(message){
    document.getElementById("error-message-container").innerHTML = message;

    document.getElementById("error-message-container").classList.remove("hidden");
}

function submit(){
    const url = 'http://localhost:3001/api/user/login';
    const data = {
      username: document.getElementById("username").value, // Use .value to get the input's value
      password: document.getElementById("password").value, // Use .value to get the input's value
    };

    fetch(url, {
      method: 'POST', // HTTP method
      headers: {
        'Content-Type': 'application/json', // Specify JSON format
      },
      body: JSON.stringify(data), // Convert the object to a JSON string
    })
      .then(response => {
        if (!response.ok) {
          formError("You're password was incorrect. <br> Please try again.");
        }
        return response.json(); // Parse the JSON response
      })
      .then(result => {
        console.log('Login successful:', result); // Handle success
      })
      .catch(error => {
        console.error('Error during login:', error); // Handle errors
      });
}
function handleEnterKey(event) {
    // If the user presses the "Enter" key
    if (event.key === "Enter") {
        // Cancel the default action (form submission or button click)
        event.preventDefault();
        checkForm();
    }
}

// Add event listeners for both username and password
document.getElementById('username').addEventListener("keypress", handleEnterKey);
document.getElementById('password').addEventListener("keypress", handleEnterKey);

document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();

    checkForm();
  });

  passwordShowButton.addEventListener('click', function(event){
    event.preventDefault();

    if(passwordVisibility){
        showPassword();
        passwordVisibility = false;
        passwordShowButton.innerHTML = "Hide";
    } else {
        hidePassword();
        passwordVisibility = true;
        passwordShowButton.innerHTML = "Show";
    }
    
  })
  password.addEventListener('input', function() {
    if (password.value.trim() !== '') {
        passwordShowButton.classList.remove("hidden");
    } else {
        passwordShowButton.classList.add("hidden");
    }
  });

  