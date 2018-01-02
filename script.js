$(document).ready(function(){


var users;
var products;

fetch("./kunder.json")
.then(function(response) {
    return response.json();
})
.then(function(ourUsers) {
    users = ourUsers;
});

$(".button").show();
$(".forgotPassword").hide();
$(".logOutButton").hide();


if(sessionStorage.saveUser != null ){
    thisUserIsLoggedIn();
}else{

    $(".buttonForm").click(function(){
        for(var i = 0; i < users.length; i++){
            $(".button").hide();
            $(".forgotPassword").hide();
            $(".logOutButton").show();


        //Om password och username stämmer loggas användare in och sparas i sessionstorage
        if( $(".mailForm").val() == users[i].username && $(".passwordForm").val() == users[i].password){

            thisUserIsLoggedIn();
            sessionStorage.saveUser = users[i].username;

            }else{
                
                $(".forgotPassword").show();
            }
        }
    })
}

$(".logOutButton").click(function(){
    sessionStorage.removeItem("saveUser");
    location.reload();
    $(".logOutButton").show();
    $(".button").hide();
    $(".forgotPassword").hide();


});

$(".div2").hide();
$(".div3").hide();
$(".div4").hide();
$(".div5").hide();


$(".knapp1").click(function(){
    $(".div1").slideDown("1000");
    $(".div2").hide();
    $(".div3").hide();
    $(".div4").hide();
    $(".div5").hide();
});

$(".knapp2").click(function(){
    $(".div2").slideDown("1000");
    $(".div1").hide();
    $(".div3").hide();
    $(".div4").hide();
    $(".div5").hide();
});

$(".knapp3").click(function(){
    $(".div3").slideDown("1000");
    $(".div1").hide();
    $(".div2").hide();
    $(".div4").hide();
    $(".div5").hide();
});

$(".knapp4").click(function(){
    $(".div4").slideDown("1000");
    $(".div1").hide();
    $(".div2").hide();
    $(".div3").hide();
    $(".div5").hide();
});

$(".knapp5").click(function(){
    $(".div5").slideDown("1000");
    $(".div1").hide();
    $(".div2").hide();
    $(".div3").hide();
    $(".div4").hide();
});
});
