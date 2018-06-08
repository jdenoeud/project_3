$(document).ready(function(){
    // Instanciation de mon slider de présentation du site
    var sliderPresentation = new sliderObjet("#accueil_panorama",false);
    



    
 
});//FIN


//Création des flèches de navigation
var $flecheGauche = $("<div />", {
        id : "flecheGauche", //Son style css est défini dans projet3.css
    });
    $flecheGauche.html('<i class="fa fa-chevron-left">   </i>');

var $flecheDroite = $("<div />", {
        id : "flecheDroite", // style css de l'élément défini dans projet3.css
    });
    $flecheDroite.html('<i class="fa fa-chevron-right">   </i>');

//Création des "boules de navigation" du slider
var $navSlider = $("<ul />", {
        id : "navSlider", // style css de l'élément défini dans projet3.css
    });
function ajouterBouleNav (parent,n){
    for (i=0; i<n; i++){
        var nouvelleBoule =$("<li />",{
            "class":"boule",
        });
        nouvelleBoule.appendTo(parent);
    }
} 

//Fonction d'affichage des slides
 function afficher (nb,liste,navig){
   
     liste.animate({
         opacity:"0",
     },"fast");
    liste.eq(nb).animate({
         opacity:"1",
   
     },"fast");
    navig.css({
        backgroundColor:"#646464",
        border:"2px #f5f5f5 solid",
    });
    navig.eq(nb).css({
        backgroundColor:"#f5f5f5",
        border:"2px #646464 solid",
    });
}

//Englober cette function dans un objet
//création d'un objet slider 
var sliderObjet = function(id,automatique){
    thisSlider=this;//Pour pouvoir l'utiliser dans des fonctions
        
    this.div = $(id);
    this.carousel = $("#carousel");
    this.carouselContainer = $("#carousel_container");
    this.i = 0;//compteur
    this.slides=$(".slide");
   
    this.nbSlides = $(".slide").length;
    this.largeurCarousel = this.carousel.width();
  
    //Ajouts des boutons suivant/précédent
    this.precedent=$flecheGauche;
    this.div.append(this.precedent);
    
    this.suivant= $flecheDroite;
    this.div.append(this.suivant);
    
    this.navigation = $navSlider;
    this.div.append(this.navigation);
    ajouterBouleNav(this.navigation,this.nbSlides);
    
    this.boules = $(".boule");
    
    //Initialisation des boules de navigation
    
    
    
    //Création des évènements au clic sur les flèches
    this.div.on("click","#flecheDroite", function(){
        if(thisSlider.i < thisSlider.nbSlides - 1){
            thisSlider.i++;
            }
        else{
            thisSlider.i=0;
        };
        afficher(thisSlider.i,thisSlider.slides,thisSlider.boules);
    });
    
    this.div.on("click","#flecheGauche", function(){
        if(thisSlider.i > 0){
            thisSlider.i--;
        }
        else{
            thisSlider.i=thisSlider.nbSlides - 1;
        }
       afficher(thisSlider.i,thisSlider.slides,thisSlider.boules);
    });
    
    
    //Création des évènements clavier
    $(document).keyup(function(touche){ 
        var appui = touche.which || touche.keyCode; // le code est compatible tous navigateurs grâce à ces deux propriétés
        if(appui == 39){ //Appui sur flèche DROITE
            if(thisSlider.i < thisSlider.nbSlides - 1){
                thisSlider.i++;
            }
            else{
                thisSlider.i=0;
            };
        afficher(thisSlider.i,thisSlider.slides,thisSlider.boules);
            }
    });
    
    $(document).keyup(function(touche){ 
        var appui = touche.which || touche.keyCode;
        if(appui == 37){ // Appui sur flèche GAUCHE
           if(thisSlider.i > 0){
                thisSlider.i--;
            }
            else{
                thisSlider.i=thisSlider.nbSlides - 1;
            }
        afficher(thisSlider.i,thisSlider.slides,thisSlider.boules); 
        }
    });
    
    //Fonctionnement des boules de NAVIGATION
    this.div.on("click",".boule", function(){
        var index= $(".boule").index(this);
        afficher(index,thisSlider.slides,thisSlider.boules);
    });
   
    //Défilement automatique (si demandé en paramètre)
    if (automatique === true){
        function defiler(){
            setTimeout(function(){
                if(thisSlider.i < thisSlider.nbSlides - 1){
                    thisSlider.i++;
                }
                else{
                    thisSlider.i=0;
                };
                afficher(thisSlider.i,thisSlider.slides,thisSlider.boules);
                defiler();
            }, 6000);
            };
        defiler();
        }
    else{ console.log("false")}

};//fin de slideObjet


    


