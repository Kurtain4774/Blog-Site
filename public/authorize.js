window.addEventListener("load", (event) => {
    const token = localStorage.getItem("token");
    if(!token){
        console.log("NO TOKEN FOUND IN STORAGE");
        showLogin();
        return;
    }
    
    let url = window.location.hostname === '127.0.0.1' 
        ? 'http://localhost:3000' 
        : 'https://' + window.location.hostname;
        
    url += "/user/verify";


    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }).then(response => {
        console.log("request received");
        if(!response.ok){
            console.error("Response not OK:", response.json());

            showLogin();
            return;
        }
        return response.json();
    }).then(data => {
        if(data){
            //console.log(data.user.username + " " + data.user.id);
            showLogout();
        }
        

    }).catch(error =>{
        console.error("ERROR in AUTH.js: ", error);
    });
});

function showLogin(){
    document.getElementById("login-menu-container").classList.remove("hidden");
    document.getElementById("logout-menu").classList.add("hidden");
}

function showLogout(){
    document.getElementById("login-menu-container").classList.add("hidden");
    document.getElementById("logout-menu").classList.remove("hidden");
}