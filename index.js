window.onload = function(){
    var canvas = document.getElementById('canvas');
    var body = document.getElementsByTagName('body')[0];
    canvas.width = body.clientWidth;
    canvas.height = body.clientHeight / 2;
    var bound = canvas.getBoundingClientRect();
    var ctx = canvas.getContext('2d');
    
    var width = bound.width, height = bound.height;
    console.log(width,height);
    // return;
    var x = getRandom(width),
    y = getRandom(height);
    var px = 1, py = 1;
    
    
    moveCircle();

    function circle(x, y, r, startDeg, endDeg){
        ctx.clearRect(0,0,width,height);
        console.log(width,height);
        // var ctxGradient = ctx.createLinearGradient(0,0,width/2,width,height/2,width/2);
        // ctxGradient.addColorStop(0,'#79f1a4');
        // ctxGradient.addColorStop(0.5,'red');
        // ctxGradient.addColorStop(1,'#0e5cad');
        // ctx.fillStyle = ctxGradient;
        // ctx.fillRect(0,0,width, height);
        ctx.save(); 
        ctx.beginPath();
        ctx.translate(x,y);
        ctx.arc(0,0,r||10,startDeg||0,endDeg||Math.PI*2,false);
        ctx.fillStyle = 'RGBa(255, 255, 255,.6)';
        ctx.strokeStyle = 'transparent';
        // ctx.stroke();
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
    function resetXY() {
        if (x < 10 || x > width - 10) {
            px = -px;
        }
        if (y < 10 || y > height - 10) {
            py = -py;
        }
        return {
            px: px,
            py: py
        }        
    }
    function moveHandle() {
        // x += 1;
        // y += 1;
        var p = resetXY();
        x += p.px;
        y += p.py;
        console.log(p);
        circle(x, y);
        requestAnimationFrame(moveHandle);
    }
    function moveCircle(){
        
        
        requestAnimationFrame(moveHandle);
    }
    function getRandom(s) {
        return Math.ceil(Math.random() * s);
    }
  };
  