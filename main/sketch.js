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
  RrectH: 60,
  RrectW: 10,
  LrectH: 60,
  LrectW: 10,
};

var ballXspeed = 4;
var ballYspeed = 4;
var hitRightPaddle = false;
var hitLeftPaddle = false;

//var z = keyCode = 90 for azerty keyboards
var w = keyCode = 87;
var s = keyCode = 83;


var leftscore = 0;
var rightscore = 0;
var failsound, hitsound;
var SEC = 0;
var MIN = 0;
var FPS = 60;

var R, G, B;

function preload(){
  failsound = loadSound('main/assets/fail.wav');
  hitsound = loadSound('main/assets/hit_sound.wav');
}

function setup() {
  var canvas =  createCanvas(600, 400);
  canvas.parent('sketch-holder')
  ballX = random(canvasWidth/2, 150);
  ballY = random(canvasWidth/2, 150);
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
}, 1000/FPS);

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
  for (var i = 0; i < canvasHeight; i += 15) {
    rect(canvasWidth/2-1, i, 3, 10);
  }
  //rect(width/2, 50, 4, 15);

  push();
  stroke(255);
  strokeWeight(0.5);
  fill(255); //R,G,B for multicolor ball
  rect(ballX, ballY, 10, 10);
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
  }else if (ballX > canvasWidth) {
     ballXspeed = -ballXspeed;
  }else if (ballY < 0) {
    ballYspeed = -ballYspeed;
  }else if (ballY > canvasHeight) {
    ballYspeed = -ballYspeed;
 }
}

//W_S_and_arrows_pressed
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
    rectMove.RMoveY += canvasHeight;
 }else if (rectMove.RMoveY > canvasHeight) {
    rectMove.RMoveY -= canvasHeight;
 }if (rectMove.LMoveY < 0) {
     rectMove.LMoveY += canvasHeight;
 }if (rectMove.LMoveY > canvasHeight) {
     rectMove.LMoveY -= canvasHeight;
     //ballx - ballspeedx < paddleX + paddle width =)
 }

 hitRightPaddle = collideRectCircle(rectMove.RMoveX, rectMove.RMoveY, rectSize.RrectW, rectSize.RrectH, ballX, ballY, 15, 15);
 hitLeftPaddle = collideRectCircle(rectMove.LMoveX, rectMove.LMoveY, rectSize.LrectW, rectSize.LrectH, ballX, ballY, 15, 15);
 if (hitRightPaddle) {
   ballXspeed = -ballYspeed;
   hitsound.play();
 }else if (hitLeftPaddle) {
   ballXspeed = -ballXspeed;
   hitsound.play();
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

  if (ballX > canvasWidth) {
     failsound.play();
  }else if (ballX < 0) {
     failsound.play();
  }if (ballX > canvasWidth) {
    leftscore += 1;
  }else if (ballX < 0) {
    rightscore += 1;
  }
}
