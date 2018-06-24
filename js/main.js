$(document).ready(function(){
    // Instanciation de mon slider de présentation du site
    var sliderAccueil = Object.create(sliderObjet);
    sliderAccueil.init("#accueil_panorama",".slide");
        
    //Création des évènements pour animer le slider en utilisant les méthodes de sliderObject
    $("#flecheDroite").on("click", function(){
        sliderAccueil.next();
        sliderAccueil.afficher();
    });
    $("#flecheGauche").on("click", function(){
        sliderAccueil.prev();
        sliderAccueil.afficher();
        
    });
    
    $("#accueil_panorama").on("click",".boule", function(){
        console.log(this);
        sliderAccueil.changerNumBoule(this);
        sliderAccueil.afficher();
    });
    
        
    $(document).keyup(function(touche){ 
        var appui = touche.which || touche.keyCode; // le code est compatible tous navigateurs grâce à ces deux propriétés
        if(appui == 39){ //Appui sur flèche DROITE
            sliderAccueil.next();
            sliderAccueil.afficher();
        }
    });

    $(document).keyup(function(touche){ 
        var appui = touche.which || touche.keyCode;
        if(appui == 37){ // Appui sur flèche GAUCHE
            sliderAccueil.prev();
            sliderAccueil.afficher();
        }
    });
    
    
    //Création d'un objet Google map
    var carteVelos = Object.create(mapObjet);
    carteVelos.initMap();

    $("#close").on("click", function(){
        $("#panneauInfos").css("display","none");
        $("#reservation").css("display","none"); $("#reserverVelo").css("display","block");
    });

    
    //création de l'objet Canvas
    var signature= Object.create(canvasObjet);
    signature.initCanvas("#canvas");
    
        
    //Gestion des boutons de réservation
    var $reservation = $("#reservation");
        
    var $reseverVelo = $("#reserverVelo");
    $reseverVelo.click(function(){
        $reservation.css("display","block");
        $reseverVelo.css("display","none");
    });
        
    
    //Effacer le contenu du canvas
    var $boutonEffacer = $("#effacer");
    $boutonEffacer.on("click",function(){
        signature.effacerCanvas();
    });
    
    //Validation de la réservation
    var $valider = $("#valider");
    $valider.click(function(){
        signature.validerReservation();
    });
    
    
    
});//FIN
    
