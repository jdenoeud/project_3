var canvasObjet = {

    initCanvas : function(){
        
        var canvas = document.getElementById("canvas");
            if(!canvas)
            {
                alert("Impossible de récupérer le canvas");
                return;
            }

        var context = canvas.getContext('2d');
            if(!context)
            {
                alert("Impossible de récupérer le context du canvas");
                return;
            }
        /*canvas.width = window.innerWidth;
        canvas.height= window.innerHeight;*/

        context.lineJoin = "round";
        context.lineCap = "round";
        context.lineWidth = "1";
        context.strokeStyle = "black";

        /*context.beginPath();
        context.moveTo(0,100);
        context.lineTo(125,0);
        context.lineTo(250,100);
        context.lineTo(0,100);
        context.stroke();
        context.closePath();*/

        //Evènements et fonctions permettant de signer
        var isDrawing= false;
        var signer =false;
        var lastX = 0;
        var lastY = 0;

        function draw(e) {
            if ( isDrawing === false ) {
                return
            }
            else{
                signer = true;
                context.beginPath();
                context.moveTo(lastX, lastY);
                context.lineTo(e.offsetX, e.offsetY);
                context.stroke();
                [lastX, lastY] = [e.offsetX, e.offsetY];

            }
        }

        canvas.addEventListener('mousedown',function (e) {
            isDrawing = true;
            [lastX,lastY]= [e.offsetX, e.offsetY];
            
        });

        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', () => isDrawing = false);
        canvas.addEventListener('mouseout', () => isDrawing = false);

        //Gestion des boutons de la réservation
        var $reservation = $("#reservation");
        
        var $reseverVelo = $("#reserverVelo");
        $reseverVelo.click(function(){
            $reservation.css("display","block");
            $reseverVelo.css("display","none");
        });
        
        var $boutonEffacer = $("#effacer");
        $boutonEffacer.on("click",function(){
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            signer = false;
            clearInterval(compteur);
        });
        
        

        var $valider = $("#valider");
        $valider.click(function(){
            if (!signer){
                $reservation.css("display","none");
                var $divAlerte =$("#alerteSignature");
                var $alerte = $("<h4>Veuillez signer pour réserver un vélo</h4>");
                $alerte.prependTo($divAlerte);
                
                setTimeout(function(){
                    $divAlerte.html(" ");
                    $reservation.css("display","block");
                },2000);
            }
            else{
                console.log("signé");
                //On vide le canvas
                context.clearRect(0, 0, context.canvas.width, context.canvas.height);
                //On ferme les infos sur la station
                $("#panneauInfos").css("display","none");
                
                garderDate();
                var intervalId = setInterval(decompter,1000);
              
                
                
            }
        });
        
        function alerter(){
            $reservation.css("display","none");
        }

        
    }//FIN de initCanvas 
}//FIN canvasObjet
