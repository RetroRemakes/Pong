var canvasWidth = 600;
var canvasHeight = 400;

var ballX;
var ballY;

var rectMove = {
  RMoveY: 150,
  RMoveX: 10,
  LMoveY: 150,
  LMoveX: 580,
};
var rectSize = {
  RrectH: 80,
  RrectW: 10,
  LrectH: 80,
  LrectW: 10,
};

var ballXspeed = 5;
var ballYspeed = 5;
var hitRightPaddle = false;
var hitLeftPaddle = false;

//var z = keyCode = 90 for azerty keyboards
var w = keyCode = 87;
var s = keyCode = 83;


var leftscore = 0;
var rightscore = 0;
var failsound;
var SEC = 0;
var MIN = 0;
var FPS = 60;

var R, G, B;

function preload(){
  failsound = loadSound('assets/fail.wav');
}

function setup() {
  var canvas =  createCanvas(600, 400);
  canvas.parent('sketch-holder')
   ballX = random(width/2, 150);
   ballY = random(width/2, 150);
   //timeIt();

 }

setInterval(function draw() {
  background(0);
  keysPressed();
  moveBall();
  drawObjects();
  score();
  paddleInteract();
  randomThings();
  consoleThings();
}, 1000/FPS);

function consoleThings(){
//console.log("ballX:" + ballX + " " + "ballY:" + ballY);
}

// Time the game
// function timeIt(){
//   SEC += 1;
//   setTimeout(timeIt, 1000);
//   if (SEC == 60) {
//     SEC = 0;
//     MIN += 1;
//   }
// }

//Random things here!
function randomThings(){
  R = random(0, 255);
  G = random(0, 255);
  B = random(0, 255);
}

//Draw everything
function drawObjects(){
  fill(255)
  for (var i = 0; i < height; i += 15) {
    rect(width/2-1, i, 3, 10);
  }
  //rect(width/2, 50, 4, 15);

  push();
  stroke(255);
  strokeWeight(0.5);
  fill(255); //R,G,B for multicolor ball
  ellipse(ballX, ballY, 20, 20);
  pop();

  //Right
  fill(255);
  rect(rectMove.LMoveX, rectMove.LMoveY, rectSize.LrectW, rectSize.LrectH);
  //Left
  fill(255);
  rect(rectMove.RMoveX, rectMove.RMoveY, rectSize.RrectW, rectSize.RrectH);

 }

//Ball move & speed interaction with canvas
function moveBall(){
  ballX = ballX + ballXspeed;
  ballY = ballY + ballYspeed;
  if (ballX < 0) {
     ballXspeed = -ballXspeed;
  }else if (ballX > width) {
     ballXspeed = -ballXspeed;
  }else if (ballY < 0) {
    ballYspeed = -ballYspeed;
  }else if (ballY > height) {
    ballYspeed = -ballYspeed;
 }
}

//W_S_arrows_pressed
function keysPressed(){
  if (keyIsDown(UP_ARROW)) {
    	rectMove.LMoveY -= 10;
  }if (keyIsDown(DOWN_ARROW)) {
      rectMove.LMoveY += 10;
  }if (keyIsDown(w)) {
      rectMove.RMoveY -= 10;
  }if (keyIsDown(s)) {
      rectMove.RMoveY += 10;
  }
}

//Paddle
function paddleInteract(){
 if (rectMove.RMoveY < 0) {
    rectMove.RMoveY += 10;
    console.log("Left paddle up");
 }if (rectMove.RMoveY > height/1.4) {
    rectMove.RMoveY -= 10;
    console.log("Left paddle down");
 }if (rectMove.LMoveY < 0) {
     rectMove.LMoveY += 10;
     console.log("Right paddle up");
 }if (rectMove.LMoveY > height/1.4) {
      rectMove.LMoveY -= 10;
     console.log("Right paddle down");
     //ballx - ballspeedx < paddleX + paddle width =)
 }
 //hit right paddle
 hitRightPaddle = collideRectCircle(rectMove.RMoveX, rectMove.RMoveY, rectSize.RrectW, rectSize.RrectH, ballX, ballY, 20, 20);
 if (hitRightPaddle) {
   ballXspeed = -ballYspeed;
   console.log("ball hit right paddle");
 }
}


//Score & sound
function score(){
  textSize(25);
  fill(255);
  text(leftscore,150,50);

  fill(255);
  text(rightscore,450,50);

  // fill(255);
  // text(MIN+" : "+SEC,280,30);

  if (ballX > width) {
     failsound.play();
     console.log("fail sound right");
  }else if (ballX < 0) {
     failsound.play();
      console.log("fail sound left");
  }if (ballX > width) {
    leftscore += 1;
     console.log("Left:" + leftscore);
  }else if (ballX < 0) {
    rightscore += 1;
     console.log("Right:" + rightscore);
  }
}
