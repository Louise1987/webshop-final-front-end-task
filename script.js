var Users = [];
var Products = [];
var mainCategories = [];
var subCategories = [];
var saveUser;
var cartArray = [];

$(document).ready(function(){
    showStart();
    
    if(localStorage.cartArray) cartArray = JSON.parse(localStorage.cartArray);
    if(cartArray.length) $("#counter").text(cartArray.length);
    else $("#counter").text('');
    
    fetch("huvudkategorier.json") 
    .then(function(response) {
        return response.json();
    }).then(function(data) {
        mainCategories = data;
        for(var i = 0; i < mainCategories.length; i++) {
            $('#mainkat').append('<button class="button" onclick="showSubCategories('+mainCategories[i].id+')">'+mainCategories[i].mainCategory+'</button>');
        }
    });
    
    fetch("underkategorier.json") 
    .then(function(response) {
        return response.json();
    }).then(function(data) {
        subCategories = data;
    });
    
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

    fetch("produkter.json") 
    .then(function(response) {
        return response.json();
    }).then(function(data) {
        Products = data;
    });
    
    $("#loggaut").click(function(){
         sessionStorage.removeItem("saveUser");
         location.reload();
    });
    
    $("#loggain").click(function(){
        var username = $("#email").val();
        var password = $("#losenord").val();
        
        for(var i = 0; i < Users.length; i++) {
            if(username == Users[i].email && password == Users[i].password) {
                sessionStorage.saveUser = username;
                return location.reload();
            }
        }
        
        alert('Fel användarnamn eller lösenord!');
    });
});

function AddCart(prodID) {
    cartArray.push(prodID);
    localStorage.cartArray = JSON.stringify(cartArray);
    if(cartArray.length) $("#counter").text(cartArray.length);
    else $("#counter").text('');
}

function showStart() {
    $("#content").empty();
    $('#underkat').slideUp();
    $("#content").append('<h1>Välkommen!</h1>');
}

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