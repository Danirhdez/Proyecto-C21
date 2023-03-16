var backGround , backGroundImg;
var rocket , rocketImg , meteors , meteorsImg1 , meteorsImg2 , meteorsImg3 , meteorsGroup;
var gameState = 1;
var gameOver , gameOverImg , resetButton;
var score = 0 , distance = 0;
var coin , coinImg , coinGroup;
var upBorder , downBorder , leftBorder , rightBorder;

function preload(){
backGroundImg = loadImage("1.png");
rocketImg = loadImage("2.png");
meteorsImg1 = loadImage("3.png");
meteorsImg2 = loadImage("4.png");
meteorsImg3 = loadImage("5.png");
gameOverImg = loadImage("6.png");
coinImg = loadImage("7.png");
}

function setup() {
 createCanvas(1600,800);

 backGround = createSprite(800,400,1600,800);
 backGround.addImage("si" , backGroundImg);
 backGround.scale = 0.9;
 
 rocket = createSprite(100,400,100,100);
 rocket.addImage("no" , rocketImg);
 rocket.scale = 0.3;
 rocket.setCollider("rectangle",0,0,620,200);
 rocket.debug = true;

 gameOver = createSprite(800,350,300,50);
 gameOver.addImage("s" , gameOverImg);
 gameOver.visible = false;

 resetButton = createSprite(800,400,1600,800);
 resetButton.visible = false;

 upBorder = createSprite(800,0,1600,10);
 upBorder.visible = false;

 downBorder = createSprite(800,800,1600,10);
 downBorder.visible = false;

 leftBorder = createSprite(0,400,10,800);
 leftBorder.visible = false;

 rightBorder = createSprite(1600,400,10,800);
 rightBorder.visible = false;

 meteorsGroup = createGroup();
 coinGroup = createGroup();
}

function draw() {
background(1);

if(gameState === 1){

distance = distance+1

if(keyDown(UP_ARROW)){
  rocket.y = rocket.y - 10;
}

if(keyDown(DOWN_ARROW)){
  rocket.y = rocket.y + 10;
}

if(keyDown(LEFT_ARROW)){
  rocket.x = rocket.x - 3;
}

if(keyDown(RIGHT_ARROW)){
  rocket.x = rocket.x + 3;
}

rocket.collide(upBorder);
rocket.collide(downBorder);
rocket.collide(leftBorder);
rocket.collide(rightBorder);

drawMeteors();
drawCoins();

if(coinGroup.isTouching(rocket)){
  score = score + 100;
  coinGroup.destroyEach();
}

if(meteorsGroup.isTouching(rocket)){
  gameState = 2;
} 
}

if(gameState === 2){
  meteorsGroup.setVelocityXEach(0);
  coinGroup.setVelocityXEach(0);
  meteorsGroup.setLifetimeEach(-1);
  coinGroup.setLifetimeEach(-1);
  gameOver.visible = true;
  text("Click everywhere to restart",800,400)
  if(mousePressedOver(resetButton)){
    reset();
  }
}

 drawSprites();
 x();

}

function drawMeteors () {
 if(frameCount %60 == 0){
     meteors = createSprite (1700,Math.round(random(50,750)),100,100);
     meteors.velocityX = -5;
     var Random = Math.round(random(1,3))
     switch(Random){
      case 1: meteors.addImage("s" , meteorsImg1);
              break;
      case 2: meteors.addImage("r" , meteorsImg2);
              break;
      case 3: meteors.addImage("f" , meteorsImg3);
              break;

      default: break;
     }
     meteors.scale = 0.2;
     meteors.lifetime = 400;

     meteors.debug = true;
     meteorsGroup.add(meteors);
 }

}

function drawCoins () {
  if(frameCount %480 == 0){
  coin = createSprite (1830,Math.round(random(50,750)),100,100);
  coin.velocityX = -5;
  coin.addImage("t" , coinImg);
  coin.scale = 0.1;
  coin.lifetime = 600;
  coin.debug = true;
  coinGroup.add(coin);
  }

}

function reset () {
  gameState = 1;
  meteorsGroup.destroyEach();
  coinGroup.destroyEach();
  gameOver.visible = false;
  distance = 0;
  score = 0;
  rocket.y = 400;
  rocket.x = 100;
  frameCount = 0;
}

function x (){
  text("Score: "+ score,50,50);
  text("Distance: "+ distance,130,50);
  if(gameState === 2){
    text("press everywhere to restart",230,50);
  }
}