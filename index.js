window.onload = function(){
    var canvas = document.getElementById('canvas');
    var body = document.getElementsByTagName('body')[0];
    canvas.width = body.clientWidth;
    canvas.height = body.clientHeight;
    var bound = canvas.getBoundingClientRect();
    var ctx = canvas.getContext('2d');
    var width = bound.width, height = bound.height;
    var circleConfig = {
        ballNums: 300,
        fillColor: 'rgba(255, 255, 255, .5)',
        radius: 1
    };
    var circle = new Circle(circleConfig);
    circle.init();
    var zoom=function(e){ 
          var e = e || window.event; 
          if (!e.deltaX) {
              if (e.deltaY < 0) {
                if (circleConfig.radius) {
                    circleConfig.radius = null;
                    var circle = new Circle({
                        ballNums: 300,
                        fillColor: 'rgba(255, 255, 255, .5)',
                        // radius: 1
                    });
                    circle.init();
                }
                
              }
              else {
                if (!circleConfig.radius) {
                    circleConfig.radius = 1;
                    var circle = new Circle({
                        ballNums: 300,
                        fillColor: 'rgba(255, 255, 255, .5)',
                        radius: 1
                    });
                    circle.init();
                }
              }
          }
          if(e.wheelDelta && event.ctrlKey){
               event.returnValue = false
          }else if(e.detail){
              
               event.returnValue = false;
          } 
    }  
    if(document.addEventListener){ 
        document.addEventListener('DOMMouseScroll' , zoom , false); 
    }
    window.onmousewheel = document.onmousewheel = zoom;
    function Circle(o) {
        o = o || {};
        this.instance = [];
        this.maxLineLength = o.maxLineLength || 100;
        function Ball() {
            this.radius = o.radius || (o.MaxRadius || 20) * Math.random();
            this.startDeg = 0;
            this.endDeg = Math.PI * 2;
            this.clockWay = false;
            this.fillColor = o.fillColor || randomColor();
            this.borderColor = 'transparent';
            this.dirX = 1;
            this.dirY = 1;
            this.speed = o.speed || 1 * Math.random() - 0.3;
            this.X = getRandom(width);
            this.Y = getRandom(height);
            this.resetDir = function() {
                if (this.X < this.radius || this.X > width - this.radius) {
                    this.dirX = -this.dirX;
                }
                if (this.Y < this.radius || this.Y > height - this.radius) {
                    this.dirY = -this.dirY;
                }  
            };
            this.init = function() {
                this.move();
            };
            this.move = function() {
                this.resetDir();
                this.X += this.dirX * this.speed;
                this.Y += this.dirY * this.speed;
            };
            
        }
        this.ball = {

        };
        this.arc = function() {
            // ctx.translate(this.X, this.Y);
            for (var i = 0; i < this.instance.length; i++) {
                var ball = this.instance[i];
                ctx.save();
                ctx.fillStyle = ball.fillColor;
                ctx.strokeStyle = ball.borderColor;
                ctx.beginPath();
                ctx.arc(ball.X, ball.Y, ball.radius, ball.startDeg, ball.endDeg, this.clockWay);
                ctx.fill(); 
                ctx.closePath();
                ctx.restore();
                for(var j = i + 1; j < this.instance.length; j++) {
                    var s = Math.pow(ball.X - this.instance[j].X, 2) + Math.pow(ball.Y - this.instance[j].Y, 2);
                        s = Math.sqrt(s);
                    if (s < this.maxLineLength) {
                        ctx.beginPath();
                        ctx.moveTo(ball.X, ball.Y);
                        ctx.lineTo(this.instance[j].X, this.instance[j].Y);
                        ctx.strokeStyle = 'rgba(255, 255, 255, ' + (this.maxLineLength - s) / (this.maxLineLength * 1.3)+')';
                        ctx.strokeWidth = 1;
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }
        };
        this.draw = function() {
            ctx.clearRect(0,0,width,height);
            this.arc();
        };
        this.move = function() {
            for(var i = 0; i < this.instance.length; i++) {
                var ball = this.instance[i];
                ball.init();
                
            }
            this.draw();
            requestAnimationFrame(this.move.bind(this));
        };
        this.init = function() {
            for(var i = 0; i < o.ballNums; i++) {
                this.instance.push(new Ball());                
            }
            this.move();
        };
        
    }
    function getRandom(s) {
        return Math.ceil(Math.random() * s);
    }
    function randomColor() {
        return 'rgba('+getRandom(255)+','+getRandom(255)+','+getRandom(255)+','+Math.random()+')';
    };
  };
  