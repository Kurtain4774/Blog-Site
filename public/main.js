function changeToLogin(){
    window.location.href = "./pages/login/login.html";
}
function changeToRegister(){
    window.location.href = "./pages/register/register.html";
}
function createNewPost(){
    window.location.href = "./pages/create-post/create-post.html";
}
function changeToHome(){
    window.location.href = "./index.html";
}
function logout(){
    localStorage.clear();
    document.getElementById("logout-menu").classList.add("hidden");
    document.getElementById("login-menu-container").classList.remove("hidden");
}
