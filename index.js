window.onload = function(){
    var canvas = document.getElementById('canvas');
    var body = document.getElementsByTagName('body')[0];
    canvas.width = body.clientWidth;
    canvas.height = body.clientHeight / 2;
    var bound = canvas.getBoundingClientRect();
    var ctx = canvas.getContext('2d');
    var width = bound.width, height = bound.height;
    
    var circle = new Circle({
        ballNums: 2
    });
    circle.init();
    function Circle(o) {
        o = o || {};
        this.instance = [];
        function Ball() {
            this.radius = o.radius || (o.MaxRadius || 20) * Math.random(),
            this.startDeg = 0,
            this.endDeg = Math.PI * 2,
            this.clockWay = false,
            this.fillColor = o.fillColor || randomColor(),
            this.borderColor = 'transparent',
            this.dirX = 1,
            this.dirY = 1,
            this.speed = o.speed || 5 * Math.random(),
            this.X = getRandom(width),
            this.Y = getRandom(height),
            this.resetDir = function() {
                if (this.X < 10 || this.X > width - 10) {
                    this.dirX = -this.dirX;
                }
                if (this.Y < 10 || this.Y > height - 10) {
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
            for (var i = 0; i< this.instance.length; i++) {
                var ball = this.instance[i];
                ctx.save();
                ctx.fillStyle = ball.fillColor;
                ctx.strokeStyle = ball.borderColor;
                ctx.beginPath();
                ctx.arc(ball.X, ball.Y, ball.radius, ball.startDeg, ball.endDeg, this.clockWay);
                ctx.fill(); 
                ctx.closePath();
                ctx.restore();
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
  