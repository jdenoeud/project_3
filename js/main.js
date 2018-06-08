$(document).ready(function(){
    // Instanciation de mon slider de présentation du site
    var sliderAccueil = Object.create(sliderObjet);
    sliderAccueil.init("#accueil_panorama",".slide");
        
    //Création des évènements pour animer le slider en utilisant les méthodes de sliderObject
    $("#flecheDroite").on("click", function(){
        sliderAccueil.next()
    });
    $("#flecheGauche").on("click", function(){
        sliderAccueil.prev()
    });
        
    $(document).keyup(function(touche){ 
        var appui = touche.which || touche.keyCode; // le code est compatible tous navigateurs grâce à ces deux propriétés
        if(appui == 39){ //Appui sur flèche DROITE
            sliderAccueil.next()
        }
    });

    $(document).keyup(function(touche){ 
        var appui = touche.which || touche.keyCode;
        if(appui == 37){ // Appui sur flèche GAUCHE
            sliderAccueil.prev()  
        }
    });
    
    var carteVelos = Object.create(mapObjet);
    carteVelos.initMap();

    
 
});//FIN
    

