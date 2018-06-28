var sliderObjet = {
    
    //Fonction d'initialisation d'un carousel
    init : function(selecteurCarousel, selecteurSlide){
        
        thisSlider=this;
        this.div = $(selecteurCarousel);
        this.i = 0;//compteur
        this.slides=$(selecteurSlide);
        this.nbSlides = this.slides.length;
         
        //Création de la navigation sous le slider
        this.navSlider = $("<ul />", {
            id : "navSlider", // style css de l'élément défini dans projet3.css
        });
        this.navSlider.appendTo(this.div);
  
        for (i=0; i<this.nbSlides; i++){
            var nouvelleBoule =$("<li />",{
                "class":"boule",
            });
            nouvelleBoule.appendTo(this.navSlider);
        }
        this.boules=$(".boule");
        
        this.boules.eq(0).css({
            backgroundColor:"#f5f5f5",
            border:"2px #646464 solid",
        });
    },//FIN init
    

    //Fonction diapo suivante
    next: function(){
        if(this.i < this.nbSlides - 1){
            this.i++;
            }
        else{
            this.i=0;
        };
    },
        
    //Fonction diapo précédente
    prev: function(){
        if(this.i > 0){
            this.i--;
        }
        else{
            this.i=this.nbSlides - 1;
        }
    },
    
    changerNumBoule: function(elementClique) {
        this.i = $(".boule").index(elementClique);
        console.log(this.i);
    },
    
    //Fonction d'affichage des slides
    afficher: function(){
        this.slides.animate({
             opacity:"0",
         },"fast");
     
        this.slides.eq(this.i).animate({
            opacity:"1",
        },"fast");
     
        this.boules.css({
            backgroundColor:"#646464",
            border:"2px #f5f5f5 solid",
        });
        this.boules.eq(this.i).css({
                backgroundColor:"#f5f5f5",
                border:"2px #646464 solid",
        });
    },
    
    
}//FIN de sliderObjet