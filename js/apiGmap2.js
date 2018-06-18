var mapObjet = {


     initMap : function () {
        // Définition du centre de la carte
    var lyonCentre = {
          lat: 45.753, 
          lng: 4.826};
    
    //Création d'un objet Google map centré sur lyonCentre
    var map = new google.maps.Map(
        $("#map").get(0), {
            zoom: 14, 
            center: lyonCentre});
    

    
     //Récupération des données de l'API JCDECAUX    
    ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=30ba8034c250b5d5247a5f869b0e1b630a263ab4", function(reponse){
        var listeStations = JSON.parse(reponse);
        var markers =[];

        //Création d'un marker pour chaque station
        for (i=0 ; i < 100 ; i++){
                       
            if ( listeStations[i].available_bikes > 0){
                var markerImage = "../images/marker_vert.png"
            }
            else{
                var markerImage = "../images/marker_rouge.png"
            };
            
            var marker = new google.maps.Marker({
                position: listeStations[i].position, 
                icon: markerImage,
                map: map,
                title:String(listeStations[i].name).split("-")[1]
            });
            markers.push(marker);
            afficherTableau(marker,listeStations[i]);
          
        }//FIN boucle for
    
        //Personnalisation des markerCluster
        var clusterStyles = [
          {
            textColor: 'white',
            textSize: 14,
            url: '../images/cluster/m1.png',
            backgroundPosition : 'center',
              backgroundSize: 'cover',
            height: 45,
            width: 45
          },
         {
            textColor: 'yellow',
            textSize: 15,
            url: '../images/cluster/m1.png',
            backgroundPosition:'center',
            height: 50,
            width: 50
          },
         {
            textColor: 'orange',
            textSize: 14,
            url: '../images/cluster/m1.png',
            backgroundPosition:'center',
            height: 50,
            width: 50
          }
        ];
        var mcOptions = {
            gridSize: 50,
            styles: clusterStyles,
            maxZoom: 15
        };
        //Création d'un objet markerCluster pour regrouper les markers
        var markerCluster = new MarkerClusterer(map, markers, mcOptions);
           
     });//Fin ajaxGet
         console.log($("#suiviResa"));
         
}//FIN initMap

}//FIN mapObjet


//Fonction d'affichage du tableau d'information
function afficherTableau (marker, station){

    marker.addListener("click", function(){
        
        document.getElementById("panneauInfos").style.display = "block";
        document.getElementById("nomStation").innerHTML = String(station.name).split("-")[1] + " - n° " + String(station.name).split("-")[0] ;
        document.getElementById("adresseStation").innerHTML = String(station.address);
        document.getElementById("velosDispo").innerHTML = Number(station.available_bikes);
        document.getElementById("placesLibres").innerHTML = Number(station.available_bike_stands);
       

    });
};

