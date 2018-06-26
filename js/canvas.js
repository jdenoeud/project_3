var canvasObjet = {

    initCanvas : function (selecteurCanvas) {
  
        thisCanvas = this;
        /*this.canvas = document.getElementById("canvas");*/
        this.canvas = $(selecteurCanvas).get(0);
        if (!this.canvas) {
            alert("Impossible de récupérer le canvas");
            return;
        };

        this.context = this.canvas.getContext('2d');
        if (!this.context) {
            alert("Impossible de récupérer le context du canvas");
            return;
        };

        this.context.lineJoin = "round";
        this.context.lineCap = "round";
        this.context.lineWidth = "1";
        this.context.strokeStyle = "black";

        //Evènements et fonctions permettant de signer ds le canvas
        var isDrawing= false;
        this.signer = false;
        var lastX = 0;
        var lastY = 0;
        this.intervalId = 0;

        function draw(e) {
            if ( isDrawing === false ) {
                return
            }
            else{
                thisCanvas.signer = true;
                thisCanvas.context.beginPath();
                thisCanvas.context.moveTo(lastX, lastY);
                thisCanvas.context.lineTo(e.offsetX, e.offsetY);
                thisCanvas.context.stroke();
                lastX = e.offsetX;
                lastY = e.offsetY;
                //[lastX, lastY] = [e.offsetX, e.offsetY];

            }
        }

        this.canvas.addEventListener('mousedown',function (e) {
            isDrawing = true;
            lastX = e.offsetX;
            lastY = e.offsetY;
            
        });

        this.canvas.addEventListener('mousemove', draw);
        this.canvas.addEventListener('mouseup', function(){ 
            isDrawing = false;
        });
        this.canvas.addEventListener('mouseout', function() { 
            isDrawing = false;
        });
        
    },//FIN de initCanvas 
    
    //Pour effacer le contenu du Canvas
    effacerCanvas : function(){
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.signer = false;
    },//FIN fonction effacerCanvas
           
    //Validation de la réservation et décompte temps restant
    validerReservation : function(){
        if (!thisCanvas.signer){
            $("#reservation").css("display","none");
            var $divAlerte =$("#alerteSignature");
            var $alerte = $("<h4>Veuillez signer pour réserver un vélo</h4>");
            $alerte.prependTo($divAlerte);
            setTimeout(function(){
                $divAlerte.html(" ");
                $("#reservation").css("display","block");
            },2000);
        }
        else{
            console.log("validerReservation this.intervalId=" +this.intervalId);
            clearInterval(this.intervalId);
            
            //On vide le canvas et on n'affiche plus le canvas
            $("#reservation").css("display","none");
            this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
            this.signer= false;
            
            //On ferme le panneau d'infos sur la station
            $("#reserverVelo").css("display","block");
            $("#panneauInfos").css("display","none");
            
            //Affichage dans le pied de page
            $("#aucuneResa").css("display","none");
            $("#infosResa").css("display","block");
                        
           //On recupère le nom de la station pour l'afficher   
            var stationObjet = Object.create(storageObjet);
            var stationSelectionnee = stationObjet.getData("nomStation");
            $("#stationReservee").text(stationSelectionnee.split("-")[1]);
                    
            //Mise en place du compteur
            var dateResa = new Date();
            var dateObjet = Object.create(storageObjet);
            dateObjet.saveData("date",dateResa.getTime());
            var dateDebutResa = dateObjet.getData("date");
            this.intervalId = setInterval(function(){
                thisCanvas.decompter(dateDebutResa)
            },1000);
        };
    },//FIN fonction validerReservation
    
    //Décompte du temps restant
    decompter : function(dateDebut){
            var $dureeRestante = $("#dureeRestante");
            var date = new Date();
            var remainingTimeMs = 60000 - (date.getTime() - dateDebut);
            var remainingTimeDate = new Date();
            remainingTimeDate.setTime(remainingTimeMs);
            if (remainingTimeMs > 0){
                var min = remainingTimeDate.getMinutes();
                var sec = remainingTimeDate.getSeconds();
                $dureeRestante.text(min + " minutes et " + sec + " secondes");
            }
            else{
                clearInterval(this.intervalId);
                
                $("#infosResa").css("display","none");
                var $alerteDelai =$("#alerteDelai");
                var $alerteDelaiText = $("<p>Délai écoulé, votre réservation a expiré</p>");
                $alerteDelaiText.prependTo($alerteDelai);
                setTimeout(function(){
                    $alerteDelai.html(" ");
                    $("#aucuneResa").css("display","block");
                },2000);
                //on efface les données en mémoire dans sessionStorage
                var stockage = Object.create(storageObjet);
                stockage.deleteData("date");
                stockage.deleteData("nomStation");
            }
    },//FIN function decompter     
           
}//FIN canvasObjet