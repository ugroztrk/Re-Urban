var loginButton = document.getElementById("loginButton");
var textbox = document.querySelectorAll(".textbox")
var input = document.getElementsByClassName("input")


var members = [
    {
        username: "UgrOztrk",
        password: "ugr1234"
    },
    {
        username: "SbrOztrk",
        password: "sbr1234"
    }
]

function login () {
    var username = document.getElementById("usernameİnput").value;
    var password = document.getElementById("passwordİnput").value;
    

    for (i=0 ; i< members.length; i++) {
        if (username == members[i].username && password == members[i].password){
            window.location.href="C:/Users/Dell/Desktop/TezYedek/Map/Map.html"
            console.log(username + "Giriş Yaptı")
            return
        }
    }
    for (var i = 0; i < textbox.length; i++) {
        textbox[i].classList.add("inputAnimate");
        input[i].classList.add("inputColor")
    }
    addEventListener("animationend", function() {
            for (var i = 0; i < textbox.length; i++) {
            textbox[i].classList.remove("inputAnimate");
            input[i].classList.remove("inputColor");}
    });
    
    document.getElementById("usernameİnput").value = "";
    document.getElementById("passwordİnput").value = "";
    console.log("Kullanıcı Adı ya da Şifre hatalı!") ;
    document.getElementById  ("errMsg").style.display = "block";
}