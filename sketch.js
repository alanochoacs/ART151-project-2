// Original Animation: https://www.youtube.com/watch?v=nks6X_FUWHg
let time = 0;
let timeSpeed = 1; // press space to pause/unpause at a certain act
let checkAct = [false, false, false, false];

// act 1
let ellipseSizes = [1500, 1700, 1900];
let ellipseColorsR;
let ellipseColorsG;
let ellipseColorsB;

// act 2
let rotAct2 = 0;
let rotAct2Speed = 0.1;

// act 3
let rotAct3 = [0, 0];
let rotAct3Speed = [0.125, 0.1];
let triangleColorsR;
let triangleColorsG;
let triangleColorsB;
let squareColorsR;
let squareColorsG;
let squareColorsB;

// act 4
let balls = [];
let chosenOne;

function setup() {
  createCanvas(600, 600);
  ellipseColorsR = [random(255), random(255), random(255)];
  ellipseColorsG = [random(255), random(255), random(255)];
  ellipseColorsB = [random(255), random(255), random(255)];
  
  triangleColorsR = [random(255), random(255), random(255), random(255)];
  triangleColorsG = [random(255), random(255), random(255), random(255)];
  triangleColorsB = [random(255), random(255), random(255), random(255)];
  
  squareColorsR = [random(255), random(255), random(255), random(255)];
  squareColorsG = [random(255), random(255), random(255), random(255)];
  squareColorsB = [random(255), random(255), random(255), random(255)];
  
  chosenOne = round(random(19));
  
  for (let i = 0; i < 50; i++) {
    balls[i] = new Ball(
      random(20, width-20),
      random(20, height-20),
      random(4, 8),
      random(-8, 8),
      random(30, 50)
    );
  }
  chosenOne = round(random(balls.length - 1));
}

function draw() {
  background(0);
  
  if (time < 610) {
    checkAct[3] = true;
    firstAct();
  } else if (time < 2000) {
    checkAct[0] = false;
    secondAct();
  } else if (time < 3000) {
    rotAct2Speed = 0.1;
    thirdAct();   
  } else if (time < 4000) {
    forthAct();
  } else if (time > 4030){
    time = 0;
  }
  
  if (timeSpeed == 0) {
      fill(255);
    rect(5, 5, 3, 12);
    rect(12, 5, 3, 12);
  }
  
  time += timeSpeed;
}

// concentric circles that follow the mouse and shrink to zero and reset
function firstAct() {
  checkAct[0] = true;
  noFill();
  strokeWeight(5);
  
  stroke(ellipseColorsR[0], ellipseColorsG[0], ellipseColorsB[0]);
  ellipse(mouseX, mouseY, ellipseSizes[0], ellipseSizes[0]);
  
  stroke(ellipseColorsR[1], ellipseColorsG[1], ellipseColorsB[1]);
  ellipse(mouseX, mouseY, ellipseSizes[1], ellipseSizes[1]);
  
  stroke(ellipseColorsR[2], ellipseColorsG[2], ellipseColorsB[2]);
  ellipse(mouseX, mouseY, ellipseSizes[2], ellipseSizes[2]);
  
  ellipseSizes[0] -= 20;
  ellipseSizes[1] -= 20;
  ellipseSizes[2] -= 20;

  if (ellipseSizes[0] < 0) {
    ellipseSizes[0] = 1500;
    ellipseColorsR[0] = random(255);
    ellipseColorsG[0] = random(255);
    ellipseColorsB[0] = random(255);
  }
  if (ellipseSizes[1] < 0) {
    ellipseSizes[1] = 1700;
    ellipseColorsR[1] = random(255);
    ellipseColorsG[1] = random(255);
    ellipseColorsB[1] = random(255);
  }
  if (ellipseSizes[2] < 0) {
    ellipseSizes[2] = 1900;
    ellipseColorsR[2] = random(255);
    ellipseColorsG[2] = random(255);
    ellipseColorsB[2] = random(255);
  }
  noStroke();
  for (var i = 0; i < 100; i++) {
    ellipse(random(width), random(height), random(5));
  }
}


// arcs that spin in the middle of screen
// clicking increases the spin speed (resets next act)
function secondAct() {
  checkAct[1] = true;
  rectMode(CENTER);
  if (time > 630) {
    push();
    strokeWeight(5);
    noFill();
    translate(width/2, height/2);
    rotate(rotAct2);
    rotAct2 += rotAct2Speed;

    stroke(255, 0, 255);
    arc(0, 0, 200, 400, PI, 0);
    stroke(0, 255, 255);
    arc(0, 0, 200, 400, 0, PI);

    push();
    rotate(PI/2);
    stroke(0, 255, 0);
    arc(0, 0, 200, 400, PI, 0);

    stroke(0, 0, 255);
    arc(0, 0, 200, 400, 0, PI);
    pop();

    push();
    rotate(PI/4);
    stroke(100, 100, 255);
    arc(0, 0, 200, 400, PI, 0);

    stroke(255, 100, 100);
    arc(0, 0, 200, 400, 0, PI);
    pop();

    push();
    rotate(-PI/4);
    stroke(255, 0, 0);
    arc(0, 0, 200, 400, PI, 0);

    stroke(255, 255, 0);
    arc(0, 0, 200, 400, 0, PI);
    pop();

    pop();
  }
}


// objects rotating around middle in a ring
// inner ring - 3 triangles
// outer ring - 4 squares
// If you click one of the objects in the ring that ring will rotate in the opposite direction and one object will change color
function thirdAct() {
  if (time > 2030) {
    checkAct[2] = true;
    translate(width/2, height/2);

    push()
    rotAct3[0] += rotAct3Speed[0];
    rotate(rotAct3[0]);
    fill(triangleColorsR[0], triangleColorsG[0], triangleColorsB[0]);
    triangle(0, -150, -50, -75, 50, -75);
    fill(triangleColorsR[1], triangleColorsG[1], triangleColorsB[1]);
    triangle(150, 0, 75, 50, 75, -50);
    fill(triangleColorsR[2], triangleColorsG[2], triangleColorsB[2]);
    triangle(0, 150, 50, 75, -50, 75);
    fill(triangleColorsR[3], triangleColorsG[3], triangleColorsB[3]);
    triangle(-150, 0, -75, -50, -75, 50);
    pop();

    push();
    rotAct3[1] += rotAct3Speed[1];
    rotate(-rotAct3[1]);
    rectMode(CENTER);
    fill(squareColorsR[0], squareColorsG[0], squareColorsB[0]);
    rect(150, 150, 75, 75);
    fill(squareColorsR[1], squareColorsG[1], squareColorsB[1]);
    rect(-150, -150, 75, 75);
    fill(squareColorsR[2], squareColorsG[2], squareColorsB[2]);
    rect(150, -150, 75, 75);
    fill(squareColorsR[3], squareColorsG[3], squareColorsB[3]);
    rect(-150, 150, 75, 75);
    pop();
  }
}

// bouncing balls with one singular highlighted
// moving the mouse over the highlighted ball changes the highlighed ball
function forthAct() {
  if (time > 3030 && time < 4000) {
    for (let i = 0; i < balls.length; i++) {
      if (i == chosenOne) {
        fill('#9677CD'); 
        if (mouseX > balls[i].x - balls[i].size && mouseX < balls[i].x + balls[i].size && mouseY > balls[i].y - balls[i].size && mouseY < balls[i].y + balls[i].size) {
          chosenOne = round(random(balls.length - 1));
        }
      } else {
        noStroke();
        fill('#3F51B5');
      }
      balls[i].display();
      strokeWeight(1);
    }
  }
}


function mouseClicked() {
  if (checkAct[1]) {
    if (mouseX > 90 && mouseX < 510 && mouseY > 90 && mouseY < 510) {
      rotAct2Speed *= -1;
      rotAct2Speed += (0.1 * rotAct2Speed);
    }
  }
  if (checkAct[2]) {
    let rand = round(random(3));
    if (mouseX > 150 && mouseX < 450 && mouseY > 150 && mouseY < 450) {
      rotAct3Speed[0] *= -1;
      triangleColorsR[rand] = random(255);
      triangleColorsG[rand] = random(255);
      triangleColorsB[rand] = random(255);
    } else if (mouseX > 50 && mouseX < 550 && mouseY > 50 && mouseY < 550) {
      rotAct3Speed[1] *= -1;   
      squareColorsR[rand] = random(255);
      squareColorsG[rand] = random(255);
      squareColorsB[rand] = random(255);
    }
  }
}

// pauses/unpauses time
function keyPressed() {
  if (key == ' ') {
    if (timeSpeed == 0) {
      timeSpeed = 1;
    } else if (timeSpeed == 1) {
      timeSpeed = 0;
    }
  }
}

// A class that creates a ball object
class Ball {
  constructor(x, y, xSpeed, ySpeed, size) {
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.size = size;
  }
  
  display() {
    ellipse(this.x, this.y, this.size);
    this.move();
    this.bounce();
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  bounce() {
    if (this.x < 0 || this.x > width) {
      this.xSpeed = this.xSpeed * -1;
    }
    if (this.y < 0 || this.y > height) {
      this.ySpeed = this.ySpeed * -1;
    }
  }
}

/* Come Closer (Hy Hirsch, 1952)

  Abstract expressionism is the idea of creating art with the focus of non-human objects that inspire meditation and introspection. This movement was caused because of WW2 and its horrors causing artists to shift from figuration to abstraction. Abstract artists used color fields and mark-making to explore these themes. Hirsh started as a photographer. Hirsh’s photography work was influenced by the artists from Group f64, known for highly detailed and unedited photography, and the Farm Security Administration social documentary approach. Starting in 1951, Hirsh started his journey with film making with the film, “Divertissement Rococo”. In 1952, Hy Hirsch created the animation, “Come Closer”, in the beginning years of the abstract expressionism movement of the 1950s. Hirsch’s films were most notably known for using a device known as an optical printer, which overlays multiple images onto a strip of film. He shared this technique with other peers at the time, mostly Jordan Belson and Harry Smith. In “Come Closer”, Hirsch used many shapes including: circles/hoops, lines, and squares/diamonds. With these shapes he would use the negative space in the middle of shapes to catch the attention of the viewer, to hypnotize them when they stared at the middle of shapes as they moved. The movements that Hirsch used were all sorts of rotations/spins, transformations, waving, and shrinking/expanding. These movements helped the viewers understand to follow the movement of shapes. Bright shapes and dark backgrounds or black shapes and bright backgrounds were also present throughout the animation to catch the viewers attention. All these techniques all help Hirsch to pass the style of abstract expressionism, where the viewer instead focuses on shapes and objects instead of human figures. The animation’s overall theme is reminiscent of a festival or carnival. The beginning calls the viewer to "Come Closer", followed by circles shrinking towards the middle that pull the attention of the viewer. They want to entrance the viewer like many carnivals do with color lights and confetti. Similar effects of rotation to entrance the viewer are seen in Hirsch’s other films like, "Gyromorphis".

Sources:
  Hertzmann, P. M. (2008). Hy Hirsh/Color Photographs. Paul M. Hertzmann, Inc. 
    http://www.hertzmann.net/pages/catalogs/79.pdf 
  Wolfe, S. (2023, March 28). Art Movement: Abstract expressionism. Artland Magazine. 
    https://magazine.artland.com/abstract-expressionism/ 
  YouTube. (2021, October 2). Come closer (hy hirsch, 1952). YouTube. 
    https://www.youtube.com/watch?v=nks6X_FUWHg 
*/