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
    //C'est ici que l'on placera tout le code servant à nos dessins.

    
    /*canvas.width = window.innerWidth;
    canvas.height= window.innerHeight;*/
    
    context.lineJoin = "round";
    context.lineCap = "round";
    context.lineWidth = 1;
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
    var lastX = 0;
    var lastY = 0;
    
    function draw(e) {
        if ( isDrawing === false ) {
            return
        }
        else{
            console.log(e);
            console.log("lastX = " + lastX);
            console.log("lastY = " + lastY);
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
        console.log("lastX="+lastX);
        console.log("lastY="+ lastY);
    });
    
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);
    
    var boutonEffacer = document.getElementById("effacer");
    boutonEffacer.addEventListener("click",function(){
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    });
        
    }//FIN de initCanvas
    
}//FIN canvasObjet
