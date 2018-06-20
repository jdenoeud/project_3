console.log("webstorage OK");

function garderDate(){
    var dateResa = new Date();
  
    if(typeof(Storage) !== "undefined") {
        sessionStorage.date = dateResa.getTime();
        console.log(sessionStorage.date);
    } 
    else {
        console.log("Désole, votre navigateur ne supporte pas WebStorage");
    }
}

function decompter(){
    var $dureeRestante = $("#dureeRestante");
    var date = new Date();
    var remainingTimeMs = 30000 - (date.getTime() - Number(sessionStorage.date));
    var remainingTimeDate = new Date();
    remainingTimeDate.setTime(remainingTimeMs);
   
    if (remainingTimeMs > 0){
        
        var min = remainingTimeDate.getMinutes();
        var sec = remainingTimeDate.getSeconds();
        $dureeRestante.text(min + " minutes et " + sec + " secondes");
        
    }
    else{
        clearInterval(intervalId);
        $("#infosResa").css("display","none");
        /*var $annulation = $("<p>Délai écoulé, votre réservation a expiré</p>");
        $annulation.appendTo($("footer"));
            
        setTimeout(function(){
           $annulation.remove();
        },3000)*/
    }
}//FIN function decompter




/*var storageObjet = {

    initStorage : function(){
        
        if(typeof(Storage) !== "undefined") {
            sessionStorage.setItem("couleur","vert");
            var couleur = sessionStorage.getItem("couleur");
            console.log(couleur);
        } 
        else {
            console.log("Désole, votre navigateur ne supporte pas WebStorage");
    }

}//FIN de initStorage
}//FIN de Storage objet*/

