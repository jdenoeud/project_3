

function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 3,
          center: {lat: 45.753, lng: 4.826}
        });
    
    ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=30ba8034c250b5d5247a5f869b0e1b630a263ab4", function(reponse){
        var listeStations = JSON.parse(reponse);
        var locations = [];
                
         //Création d'un marker pour chaque station
        for (i=0 ; i <10 ; i++){
            locations.push(listeStations[i].position);
       
      
        }//FIN boucle for
              console.log(locations);
                     
        var markers = locations.map(function(location, i) {
            return new google.maps.Marker({
            position: location,
            });
        });
        
        var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
           
           
           
     });//Fin ajaxGet
     
 }//FIN initMap
      
    