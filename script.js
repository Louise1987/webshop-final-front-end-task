var Users = [];
var Products = [];
var mainCategories = [];
var subCategories = [];
var saveUser;
var cartArray = [];


$(document).ready(function(){
    showStart();

    if(localStorage.basket) cartArray = JSON.parse(localStorage.basket);
    if(cartArray.length) $("#counter").text(cartArray.length);
    else $("#counter").text('');
    
    //hämtar Huvudkategorier
    fetch("huvudkategorier.json") 
    .then(function(response) {
        return response.json();
    }).then(function(data) {
        mainCategories = data;
        for(var i = 0; i < mainCategories.length; i++) {
            $('#mainkat').append('<button class="button" onclick="showSubCategories('+mainCategories[i].id+')">'+mainCategories[i].mainCategory+'</button>');
        }

    });

    

    //hämtar Underkategorier
    fetch("underkategorier.json") 
    .then(function(response) {
        return response.json();
    }).then(function(data) {
        subCategories = data;
    });
    
    //hämtar Kunder
    fetch("kunder.json") 
    .then(function(response) {
        return response.json();
    }).then(function(data) {
        Users = data;
        saveUser = sessionStorage.saveUser;
        if(saveUser == null) {
            $('#email, #losenord, #loggain').show();
            $('#loggaut').hide();
            
        } else {
            $('#email, #losenord, #loggain').hide();
            $('#loggaut').show();
        }
    });

    //hämtar Produkter
    fetch("produkter.json") 
    .then(function(response) {
        return response.json();
    }).then(function(data) {
        Products = data;

        // Om det finns $('#addBasket') i sidan
        // Det betyder att vi är i shop.html
        // Vi måste checka om $('#addBasket').length > 0
        if($('#addBasket').length > 0) visaVarukorg();
    });

    
    //Logga ut funktion
    $("#loggaut").click(function(){
         sessionStorage.clear("saveUser");
         location.reload();
        
    });
    
    
    //Logga in funktion
    $("#loggain").click(function(){
        console.log("funka");
        var username = $("#email").val();
        var password = $("#losenord").val();
       // $('#send').hide();

    
    
    
        
        for(var i = 0; i < Users.length; i++) {
            if(username == Users[i].email && password == Users[i].password) {
                sessionStorage.saveUser = username;
                return location.reload();
            }
        }
        
        alert('Fel användarnamn eller lösenord!');

    });
    
});


// Visa alla produkter i varukorgen
function visaVarukorg() {
    var html = '<h1>Varukorg</h1>';
    for(var i = 0; i < cartArray.length; i++) {
        for(var j = 0; j < Products.length; j++) {
            if(cartArray[i] == Products[j].id) {
                //skapa html för Products[j]
                html += '<div class="product">';
                html += '<div class="pimg"><img src="image/'+Products[j].image+'"></div>';
                html += '<h4 class="red">'+Products[j].prodPrice+' kr</h4>'; 
                html += '<h4 class="blue">'+Products[j].prodName+'</h4>';
                html += '<button class="prodButton" onclick="taBort('+Products[j].id+')">Ta bort</button>';
                html += '</div>';
                break;
            }
        }
    }
    $('#addBasket').html(html);
}


//Ta bort en produkt i varukorgen
function taBort(prodID) {
    //Hitta indexen till prodID i cartArray
    var index = cartArray.indexOf(prodID);
    
    //Ta bort prodID från cartArray
    cartArray.splice(index, 1);
    
    // stringifya cartArray och
    // spara den i localStorage.basket
    localStorage.basket = JSON.stringify(cartArray);
    
    // ändra counter texten
    if(cartArray.length) $("#counter").text(cartArray.length);
    else $("#counter").text('');
    
    //updatera varukorgen
    visaVarukorg();
}




//lägga till i kundvagn
//och spara den till localStorage
function AddCart(prodID) {
    // push produkt-id till cartArray
    cartArray.push(prodID);
    
    // stringifya cartArray och
    // spara den i localStorage.basket
    localStorage.basket = JSON.stringify(cartArray);
    
    // ändra counter texten
    if(cartArray.length) $("#counter").text(cartArray.length);
    else $("#counter").text('');
}

//Skicka order
//Inloggad state



function send(){
if (sessionStorage.saveUser == null) {
    alert("För att skicka order måste ni vara inloggad");
} else {
    cartArray = [];
    localStorage.basket = 
    JSON.stringify(cartArray);
    alert("Tack för din beställning!");
}
};

/*send = function(){
    console.log("hej");
if (sessionStorage.saveUser == null){
alert ("För att skicka order måste ni vara inloggad");
} else {
    cartArray = [];
    location.reload;
    //cartArray.clear();

}
}; */

//Admin sida
function showAdmin(){
    $('.ad').append();
    $("#content").empty();
    $('#underkat').slideUp();
    $("#content").show('<h1>Välkommen!</h1>');
}

//Startknapp
function showStart() {
    $("#content").empty();
    $('#underkat').slideUp();
    $("#content").append('<h1>Välkommen!</h1>');
}

//Visa huvudprodukter knapp
function showMainProducts(mainID) {
    $("#content").empty();
    
    for(var i = 0; i < mainCategories.length; i++)  {
        if(mainCategories[i].id == mainID) {
            $("#content").append('<h1 class="title">'+mainCategories[i].mainCategory+'</h1>');
            break;
        }
    }
    
    for(var i = 0; i < Products.length; i++) {
        if(Products[i].huvudKat == mainID) {
            var element = $('<div class="product"></div>');
            element.append('<div class="pimg"><img src="image/'+Products[i].image+'" /></div>');
            element.append('<h4 class="red">'+Products[i].prodPrice+' kr</h4>');
            element.append('<h4 class="blue">'+Products[i].prodName+'</h4>');
            element.append('<button class="prodButton" onclick="AddCart('+Products[i].id+')">Lägg i kundvagn</button>');
            $("#content").append(element);
        }
    }
}

//Visa underprodukter
function showSubProducts(subID) {
    $("#content").empty();
    
    for(var i = 0; i < subCategories.length; i++)  {
        if(subCategories[i].id == subID) {
            $("#content").append('<h1 class="title">'+subCategories[i].subCategory+'</h1>');
            break;
        }
    }
    
    for(var i = 0; i < Products.length; i++) {
        if(Products[i].underKat == subID) {
            var element = $('<div class="product"></div>');
            element.append('<div class="pimg"><img src="image/'+Products[i].image+'" /></div>');
            element.append('<h4 class="red">'+Products[i].prodPrice+' kr</h4>');
            element.append('<h4 class="blue">'+Products[i].prodName+'</h4>'); 
            element.append('<button class="prodButton" onclick="AddCart('+Products[i].id+')">Lägg i kundvagn</button>');
            $("#content").append(element);

    
        }
    }
}

//Visa underkategorier
function showSubCategories(mainID) {
    $('#underkat').empty();
    for(var i = 0; i < subCategories.length; i++) {
        if(mainID == subCategories[i].huvudkategori) {
            $('#underkat').append('<button class="button" onclick="showSubProducts('+subCategories[i].id+')">'+subCategories[i].subCategory+'</button>');
        }
    }
    $('#underkat').slideDown();
    showMainProducts(mainID);
}



