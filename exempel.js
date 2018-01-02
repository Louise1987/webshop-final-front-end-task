/*fetch("./huvudkategorier.json")
.then(function(response) {
    return response.json();
})
.then(function(products) {
    listOfProducts = products;
    createUIFromLoadedProducts();
});

json huvudflikar

$window.localStorage.huvudkategorier = JSON.stringify(huvudkategorier);

var huvudkategorier = JSON.parse($window.localStorage.huvudkategorier);*/
//****************************************

var huvudflikar = "main";

if (localStorage.flikar == ) {

    var produktFlikar = [
        "Sadel",
        "Träns",
        "Hästtäcken",
        "Stryckkappor"
    ];

    var json_str = JSON.stringify(produktFlikar);
    localStorage.flikar = json_str;

    
};



});
});