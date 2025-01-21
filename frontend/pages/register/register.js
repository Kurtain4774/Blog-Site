const registerForm = document.getElementById("register-form");
const username = document.getElementById("username");
const password = document.getElementById("password");
const errorMessage = document.getElementById("error-message-container");
const passwordShowButton = document.getElementById("password-show-button");

let passwordVisibility = true;
function showPassword(){
    password.type = "text";
}
function hidePassword(){
    password.type = "password";
}
function formError(message) {
    document.getElementById("error-message-text").innerHTML = message;
  errorMessage.classList.remove("hidden");
}
function formGood(){
    errorMessage.classList.add("hidden");
}
function checkForm() {
  if (username.value.trim() === "") {
    formError("Please enter a username");
  } else if (password.value.trim() === "") {
    formError("Please enter a password");
  } else {
    submitForm();
  }
}
function submitForm() {
  const data = {
    username: username.value.trim(),
    password: password.value.trim(),
  };
  fetch("http://localhost:3000/user/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        formError("Username has already been taken. <br> Please try again.");
      } else {
        return response.json();
      }
    }).then(data => {
      formGood();

      const token = data.token;
      localStorage.setItem('token', token);
      console.log("TOKEN: " + token);
      console.log("Registration successful:", response.json()); // Handle success
      changeToHome();
    }).catch((error) => {
      console.error("Error during creating user:", error); // Handle errors
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

registerForm.addEventListener("submit", function (e) {
  e.preventDefault();

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


  function changeToHome(){
    window.location.href = "../../index.html";
}