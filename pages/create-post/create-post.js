function changeToLogin(){
    window.location.href = "../login/login.html";
}
function changeToRegister(){
    window.location.href = "../register/register.html";
}
function createNewPost(){
    window.location.href = "../create-post/create-post.html";
}
function changeToHome(){
    window.location.href = "../../index.html";
}

const form = document.getElementById("create-post-form");
const title = form.elements['title'];
const content = form.elements['content'];

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    let titleValue = title.value;
    let contentValue = content.value;

    //if tests are not valid return blank
    //else submit form

    form.submit();
})