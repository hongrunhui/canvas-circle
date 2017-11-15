var blobs = [];
var count = 0;
var x, y;
var cellSz = 96;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  
  // create random blobs
  for (x = 0; x < width + cellSz; x += cellSz) {
    for (y = 0; y < height + cellSz; y += cellSz) {
      rect(x, y, cellSz, cellSz);

      blobSz = random(20, cellSz - cellSz / 6);
      blobs[count] = new Blob(x, y, blobSz);

      count++;
    }
  }

}

function draw() {
  background(0);

  // draw grid
  for (x = 0; x < width + cellSz; x += cellSz) {
    for (y = 0; y < height + cellSz; y += cellSz) {
      fill(255, 15);
      rect(x, y, cellSz - 2, cellSz - 2); // minus 2 to create small gutter
    }
  }

  // draw faux metaballs
  for (var i = 0; i < blobs.length; i++) {
    blobs[i].displayOutline();
  }

  //check for collision
  for (var i = 0; i < blobs.length; i++) {
    for (var j = 0; j < blobs.length; j++) {
      if (i != j && blobs[i].intersects(blobs[j])) {
        blobs[i].changeColor();
        blobs[j].changeColor();
      } 
    }
  }
  
  // draw faux metaballs and animate
 for (var i = 0; i < blobs.length; i++) {
    blobs[i].display();
    blobs[i].update();
  }
}

// OBJECT
function Blob(_x, _y, _sz, _speed) {
  this.x = _x;
  this.y = _y;
  this.sz = _sz;

  this.vx = random(-0.8, 0.8);
  this.vy = random(-0.8, 0.8);

  this.colorOutline = 150; //color(255, 255, 255);
  this.colorFill = 0; //color(0, 0, 0);

  this.limitLeft = this.x - cellSz / 2;
  this.limitRight = this.x + cellSz / 2;
  this.limitTop = this.y - cellSz / 2;
  this.limitBottom = this.y + cellSz / 2;

  this.displayCell = function() {
    fill(this.colorFill);
    rect(this.x, this.y, cellSz - 2, cellSz - 2);
  };

  this.changeColor = function() {
    // this.col = color(random(255), random(255), random(255));
    //this.colorOutline = 255; //color(0,0,255)
    //this.ColorOutline = this.colorOutline + 10;
    this.colorOutline =255;
    this.colorFill= 15;
  };
  this.restoreColor = function() {
    this.colorOutline = color(0,255,0);
  };
  this.intersects = function(other) {
    var d = dist(this.x, this.y, other.x, other.y);
    if (d < this.sz/2  + other.sz/2 + 10) { // + 10 is outlines
      return true;
     //this.changeColor();
    // other.changeColor();
    } else {
       return false;
    //  this.restoreColor();
     // other.restoreColor();
    }
  };

  this.display = function() {
    noStroke();
    fill(this.colorFill);
    this.colorFill = 10;
    ellipse(this.x, this.y, this.sz, this.sz);
  };

  this.displayOutline = function() {
    noStroke();
    fill(this.colorOutline);
    this.colorOutline = (100);
    ellipse(this.x, this.y, this.sz + 10, this.sz + 10);
  };

  this.update = function() {
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    // constrain
    // remove calc to keep blobs edge within cell
    // leave to overlap

    if (this.x > this.limitRight) { //- this.sz 
      this.x = this.limitRight; //  - this.sz 
      this.vx *= -1.0;
    }

    if (this.x < this.limitLeft) { // + this.sz / 2
      this.x = this.limitLeft; // + this.sz / 2
      this.vx *= -1.0;
    }
    if (this.y > this.limitBottom) { // - this.sz / 2
      this.y = this.limitBottom; // - this.sz / 2
      this.vy *= -1.0;
    }
    if (this.y < this.limitTop) { // + this.sz / 2
      this.y = this.limitTop; // + this.sz / 2
      this.vy *= -1.0;
    }
  };


} // Blob


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}