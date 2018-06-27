var jcdecauxObjet = {

    recupererDonnees : function(){
        
        console.log("toto");
        
        /*$.get(
            "https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=30ba8034c250b5d5247a5f869b0e1b630a263ab4",
            function(reponse){
                console.log(reponse);
            })
        .done(function(){
            console.log("success");
        })*/
            
        
        
        
        $.get(
            "https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=30ba8034c250b5d5247a5f869b0e1b630a263ab4",
            function(reponse) {
                fonction_retour(reponse);
            }
        );
        function fonction_retour(reponse){
            console.log(reponse);
        }
    
        
        
        
        
        
       /* $.ajax({
           url : "https://api.jcdecaux.com/vls/v1/stations?scontract=Lyon&apiKey=30ba8034c250b5d5247a5f869b0e1b630a263ab4",
           type : 'GET',
           dataType : 'json',
           success : function(reponse, statut){
               console.log(reponse);
           },

           error : function(resultat, statut, erreur){
               console.log("erreur lors de la récupération des données : "+ erreur);
           },

           complete : function(resultat, statut){

           }

        });*/
    }

}

