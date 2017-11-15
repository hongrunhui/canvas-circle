window.onload = function(){
    var canvas = document.getElementById('canvas');
    var body = document.getElementsByTagName('body')[0];
    canvas.width = body.clientWidth;
    canvas.height = body.clientHeight / 2;
    var bound = canvas.getBoundingClientRect();
    var ctx = canvas.getContext('2d');
    var width = bound.width, height = bound.height;
    
    var circle = new Circle();
    circle.init();
    circle.init();
    
    function Circle(o) {
        o = o || {};
        this.radius = o.radius || 10;
        this.startDeg = 0;
        this.endDeg = Math.PI * 2;
        this.clockWay = false;
        this.fillColor = o.fillColor || 'rgba(255, 255, 255,.6)';
        this.borderColor = 'transparent';
        this.dirX = 1;
        this.dirY = 1;
        this.speed = 2;
        this.angle = 0;
        this.arc = function() {
            // ctx.translate(this.X, this.Y);
            ctx.fillStyle = this.fillColor;
            ctx.strokeStyle = this.borderColor;
            ctx.beginPath();
            ctx.arc(this.X, this.Y, this.radius, this.startDeg, this.endDeg, this.clockWay);
            ctx.fill(); 
            ctx.closePath();
            ctx.restore();
            
        };
        this.draw = function() {
            ctx.save(); 
            ctx.clearRect(0,0,width,height);
            this.arc();
        };
        this.resetDir = function() {
            if (this.X < 10 || this.X > width - 10) {
                this.dirX = -this.dirX;
            }
            if (this.Y < 10 || this.Y > height - 10) {
                this.dirY = -this.dirY;
            }    
        }
        this.move = function() {
            this.resetDir();
            this.X += this.dirX * this.speed;
            this.Y += this.dirY * this.speed;
            this.draw();
            requestAnimationFrame(this.move.bind(this));
        };
        this.init = function() {
            this.X = getRandom(width);
            this.Y = getRandom(height);
            this.move();
        };
    }
    // init();
    // function init() {
    //     x = getRandom(width),
    //     y = getRandom(height);
    //     px = 1, py = 1;
    //     moveCircle();
    // }
    // function resetXY() {
    //     if (x < 10 || x > width - 10) {
    //         px = -px;
    //     }
    //     if (y < 10 || y > height - 10) {
    //         py = -py;
    //     }
    //     return {
    //         px: px,
    //         py: py
    //     }        
    // }
    // function moveHandle() {
    //     // x += 1;
    //     // y += 1;
    //     var p = resetXY();
    //     x += p.px;
    //     y += p.py;
    //     console.log(p);
    //     circle(x, y);
    //     requestAnimationFrame(moveHandle);
    // }
    // function moveCircle(){
        
        
    //     requestAnimationFrame(moveHandle);
    // }
    function getRandom(s) {
        return Math.ceil(Math.random() * s);
    }
  };
  