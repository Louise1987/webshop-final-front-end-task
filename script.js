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


$(".knapp1").click(function(){
    $(".div1").slideDown("1000");
    $(".div2").hide();
    $(".div3").hide();
    $(".div4").hide();
});

$(".knapp2").click(function(){
    $(".div2").slideDown("1000");
    $(".div1").hide();
    $(".div3").hide();
    $(".div4").hide();
});

$(".knapp3").click(function(){
    $(".div3").slideDown("1000");
    $(".div1").hide();
    $(".div2").hide();
    $(".div4").hide();
});

$(".knapp4").click(function(){
    $(".div4").slideDown("1000");
    $(".div1").hide();
    $(".div2").hide();
    $(".div3").hide();
});

var date = new Date;
var todaysDate = date.getDate();
console.log(todaysDate);

for (i = 1; i < 25; i++) {
$(".flex-calender").append('<div class="lucka" id=' + i + '>Lucka ' + [i] + '</div>');      //for loop
};

$(".lucka").click(function() {          //funktion lucka
console.log(this.id);
console.log(todaysDate);

if(todaysDate == this.id) {

    fetch("http://quotes.stormconsultancy.co.uk/random.json")
    .then(function(response) {
        return response.json();
    
    })

    .then(function(data) {
        var quote = data;
        console.log(quote.quote);


        alert(quote.quote);

    })
} else {
    alert("Fel Datum");

}


});

});
