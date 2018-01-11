$(document).ready(function(){

//********** inloggning ********
var users;


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


//******* Slide Down *********


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

//*******  fetchar  *************

var subCategories;
var prodName;

fetch("underkategorier.json") 
        .then(function(response) {
            return response.json();
        })

    .then(function(data) {
        subCategories = data;
        console.log(subCategories);
    });

    fetch("produkter.json")
.then(function(response) {
return response.json();
})

.then(function(data) {
prodName = data;
console.log(prodName);
});

//******** huvudkategorier *********

fetch("huvudkategorier.json")
        .then(function(response) {
            return response.json();
        
        })

        .then(function(data) {
            var mainCategories = data;
            console.log(mainCategories);


            for (i = 0; i < mainCategories.length; i++) {
                console.log("funka");
                console.log(mainCategories[i].mainCategory);
                //$("#Handla").append('<button class="grej">' + mainCategories[i].mainCategory + '</button>');
                var $button = $('<button id="'+mainCategories[i].id + '" class="grej">' + mainCategories[i].mainCategory + '</button>');
                $button.on("click", function()
            {
                console.log(this.id);
                $("#underkategori").empty();
                for (i = 0; i < subCategories.length; i++) {


                    if(subCategories[i].huvudkategori == this.id){
                    $("#underkategori").append(subCategories[i].subCategory);
                    }

                }



                $("#underkategori").slideDown();

            });                    

    $("#Handla").append($button);

    $('#underkategori').hide();

};
});



//********    underkategorier Handla   ************

        fetch("underkategorier.json")
        .then(function(response) {
            return response.json();
        
        })

/*$("button").click(function(){
    $.getJSON("./huvudkategorier.json", function(result){
        $.each(result, function(i, field){
            $(".shop").append(field.mainCategory + " ");

           
        });
    });*/
});










