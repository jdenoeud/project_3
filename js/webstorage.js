var storageObjet = {

    initData : function(){

        //récuperer les données au moment du chargement
        var valeurStation = this.getData("nomStation");
        var valeurDateResa = this.getData("date");
        if ((valeurStation === "null") || (valeurStation === null)){
            console.log("Pas de réservation en mémoire");
            var memoire = false;
        }
        else{
            console.log("1 réservation en mémoire");
            var dateFinResa = Number(valeurDateResa) + Number(1200000);
            var datePresent = new Date();
            var datePresentMs = datePresent.getTime();
            //On vérifie si la réservation a expirée ou non
            if ( dateFinResa > datePresentMs){
                var memoire = true;
                }
            else{
                var memoire = false;
            }  
        };
        return memoire;
    },
    
    saveData : function(cle,valeur){
        
        if(typeof(Storage) !== "undefined") {
            sessionStorage.setItem(cle, valeur);
        } 
        else {
            console.log("Désole, votre navigateur ne supporte pas WebStorage");
        }
    },//FIN de saveData
    
    getData : function(cle){
   
        var valeur = sessionStorage.getItem(cle);
        return valeur;
     
    },//FIN de getData
    deleteData : function (cle){
        sessionStorage.setItem(cle, "null");
    },

}//FIN de Storage objet











