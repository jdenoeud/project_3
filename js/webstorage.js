console.log("webstorage OK");

var storageObjet = {


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
     
    }//FIN de getData
    

}//FIN de Storage objet











