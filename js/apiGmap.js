var mapObjet = {


     initMap : function () {
        // Définition du centre de la carte
    var lyonCentre = {
          lat: 45.753, 
          lng: 4.826};
    
    //Création d'un objet Google map centré sur lyonCentre
    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 14, 
            center: lyonCentre});
    
    
     var infowindow = new google.maps.InfoWindow({
        content: ""
      });


     //Ajout de markers 100% personnalisés
    var markerPerso;
    //Création d'un objet overlayView
    veloMarker.prototype = new google.maps.OverlayView();
    
    
    /** @constructeur */
    function veloMarker(details, map) {

        this.pos_ = details.position;
        this.nom_ = details.name;
        this.adresse_ = details.address;
        this.places_ = details.bike_stands;
        this.placesLibres_ = details.available_bikes;
        this.map_ = map;
        this.div_ = null;
        this.setMap(map);
        this.nbPlacesLibres_ = details.available_bikes;
       
      }

    
    veloMarker.prototype.onAdd = function() {
        var div = document.createElement("div");
        div.style.borderStyle = "solid";
        div.classList.add("veloMarker");
        var thisveloMarker = this;
        this.div_ = div;

        var p = document.createElement("p"); 
        if(this.nbPlacesLibres_ > 0)
            {
                p.style.backgroundColor ="green"
            }
        else{
                p.style.backgroundColor ="red"
            }
        p.textContent = this.nbPlacesLibres_;
  
        div.appendChild(p);
            
        var panes = this.getPanes();
        panes.overlayLayer.appendChild(div);
        panes.overlayMouseTarget.appendChild(div);
    
        google.maps.event.addDomListener(div, 'click', function() {
            console.log(thisveloMarker.nom_ );
            console.log(thisveloMarker.adresse_ );
   
         
            document.getElementById("panneauInfos").style.display = "block";
        
            document.getElementById("nomStation").textContent += String(thisveloMarker.nom_);
            document.getElementById("adresseStation").textContent += String(thisveloMarker.adresse_);
            document.getElementById("placesTotales").textContent += Number(thisveloMarker.places_);
            /*
            document.getElementById("velosDispo").textContent += Number(thisveloMarker.placesLibres_);*/
           
           
                
            });

      };
    
    veloMarker.prototype.draw = function() {

            var overlayProjection = this.getProjection();
            var latitude = this.pos_.lat;
            var longitudinale = this.pos_.lng;
            var curPosition = new google.maps.LatLng(latitude,longitudinale);
            var position = overlayProjection.fromLatLngToDivPixel(curPosition);
            this.div_.style.left = position.x + 'px';
            this.div_.style.top = position.y + 'px';
      };
    
    veloMarker.prototype.onRemove = function() {
        this.div_.parentNode.removeChild(this.div_);
        this.div_ = null;
      };
    
    
     //Récupération des données de l'API JCDECAUX    
    ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=30ba8034c250b5d5247a5f869b0e1b630a263ab4", function(reponse){
        var listeStations = JSON.parse(reponse);
        console.log(listeStations[1]);
                
         //Création d'un marker pour chaque station
        for (i=0 ; i < 10 ; i++){
           /* var coords = listeStations[i].position;*/
            markerPerso = new veloMarker(listeStations[i],  map);

      
        }//FIN boucle for
    

           
           
           
     });//Fin ajaxGet
},//FIN initMap

}//FIN mapObjet