window.onload = function(){// 页面加载完了之后再处理
    var canvas = document.getElementById('canvas');
    var body = document.getElementsByTagName('body')[0];//getElementsByTagName是以标签名获取元素，返回是一个数组，所以用[0]
    canvas.width = body.clientWidth;// 获取body的【客户端宽度】，这个时候body已经加载完成了，页面大小已经形成。
    canvas.height = body.clientHeight;
    var bound = canvas.getBoundingClientRect();// 这个叫做获取边界客户端矩形，可以用来获取canvas的长宽
    var ctx = canvas.getContext('2d');// 获取canvas的上下文环境（可以理解为买下一个画笔）
    var width = bound.width, height = bound.height;
    var circleConfig = {// 配置信息
        ballNums: 300,// 球的数量
        fillColor: 'rgba(255, 255, 255, .5)',// 球的填充颜色
        radius: 1// 球的半径
    };
    var circle = new Circle(circleConfig);// 初始化球
    circle.init();// 初始化
    var zoom=function(e){ // 这个函数是用来缩放球的大小的，简单做了个缩放改变球的效果，目前可能就在chrome下有用
          var e = e || window.event; 
          if (!e.deltaX) {// 缩放的时候这个值是为0或-0的
              if (e.deltaY < 0) {// 小于0好像是放大吧
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
          if(e.wheelDelta && event.ctrlKey){// 禁止网页缩放
               event.returnValue = false
          }else if(e.detail){
              
               event.returnValue = false;
          } 
    }  
    if(document.addEventListener){ 
        document.addEventListener('DOMMouseScroll' , zoom , false); // 兼容火狐
    }
    window.onmousewheel = document.onmousewheel = zoom;// 除火狐之外的浏览器
    function Circle(o) {// 好了，这里才是故事真正开始的地方
        o = o || {};
        this.instance = [];// 可以理解为实例数组，用来存球的
        this.maxLineLength = o.maxLineLength || 100;// 最大线长度，就是2个球在这个距离内会在之间画根线
        function Ball() {
            this.radius = o.radius || (o.MaxRadius || 20) * Math.random();
            this.startDeg = 0;// 开始角度
            this.endDeg = Math.PI * 2;// 终结角度
            this.clockWay = false; // 顺时针还是逆时针
            this.fillColor = o.fillColor || randomColor();// 填充颜色
            this.borderColor = 'transparent';// 球的border设置为透明的不然难看
            this.dirX = 1;// 球的水平方向（控制正反）
            this.dirY = 1;// 如上
            this.speed = o.speed || 1 * Math.random() - 0.3;// 球的移动速度
            this.X = getRandom(width);// 这里是初始化球的起始位置，值是0-width
            this.Y = getRandom(height);
            this.resetDir = function() {// 控制方向
                // X的位置如果小于半径或者大于canvas的宽度-半径就改变方向，Y同理
                if (this.X < this.radius || this.X > width - this.radius) {
                    this.dirX = -this.dirX;
                }
                if (this.Y < this.radius || this.Y > height - this.radius) {
                    this.dirY = -this.dirY;
                }  
            };
            this.init = function() {// 球的初始化
                this.move();
            };
            this.move = function() {// 这个就是移动球，每执行一次就检查方向和改变XY的带系喔啊
                this.resetDir();
                this.X += this.dirX * this.speed;// 移动
                this.Y += this.dirY * this.speed;
            };
            
        }
        this.ball = {

        };
        this.arc = function() {// 画圆函数
            // ctx.translate(this.X, this.Y);
            for (var i = 0; i < this.instance.length; i++) {
                var ball = this.instance[i];// 从实例数组中取出来
                // ctx.save();// 保存状态
                ctx.fillStyle = ball.fillColor;// 球的填充颜色 (准备好填充颜料)
                ctx.strokeStyle = ball.borderColor;// 球的线就是border（理解为准备好颜料）
                ctx.beginPath();// 开始路径，可以理解为拿起画笔
                ctx.arc(ball.X, ball.Y, ball.radius, ball.startDeg, ball.endDeg, this.clockWay);// 画圆
                ctx.fill(); // 填充圆（就相当于给圆上色）
                ctx.closePath();// 放下笔
                // ctx.restore();
                for(var j = i + 1; j < this.instance.length; j++) {
                    var s = Math.pow(ball.X - this.instance[j].X, 2) + Math.pow(ball.Y - this.instance[j].Y, 2);
                        s = Math.sqrt(s);// 获取圆与圆之间的距离，x的平方加y的平方然后开根号，初中数学知识
                    if (s < this.maxLineLength) {// 判断什么时候可以画线
                        ctx.beginPath();
                        ctx.moveTo(ball.X, ball.Y);// 把笔移动到
                        ctx.lineTo(this.instance[j].X, this.instance[j].Y);// 画线到这个位置
                        ctx.strokeStyle = 'rgba(255, 255, 255, ' + (this.maxLineLength - s) / (this.maxLineLength * 1.3)+')';
                        // 上面是调整线的颜色
                        ctx.strokeWidth = 1;// 线宽
                        ctx.stroke();// 画
                        ctx.closePath();
                    }
                }
            }
        };
        this.draw = function() {
            ctx.clearRect(0,0,width,height);// 你要是把这个给注了你会发现不一样的世界
            this.arc();// 执行画圆函数
        };
        this.move = function() {
            for(var i = 0; i < this.instance.length; i++) {
                var ball = this.instance[i];
                ball.init();// 球的初始化函数，其实跟ball.move()是一样的，就是改变球的位置
                
            }
            this.draw();
            requestAnimationFrame(this.move.bind(this));// 这里用bind是强行改变move函数的上下文环境，不然在requestAnimationFrame中的this会变得
            // requestAnimationFrame 请求动画帧，可以理解为控制函数执行的频率（本来这里可以用递归执行，但是递归控制不了频率，会卡死页面的，setTimeout也可以实现类似的效果）
        };
        this.init = function() {
            for(var i = 0; i < o.ballNums; i++) {
                this.instance.push(new Ball()); // 初始化球               
            }
            this.move();
        };
        
    }
    function getRandom(s) {
        return Math.ceil(Math.random() * s);// 获取0 -（s-1）之间的值
    }
    function randomColor() {
        return 'rgba('+getRandom(255)+','+getRandom(255)+','+getRandom(255)+','+Math.random()+')';
    };
  };
  