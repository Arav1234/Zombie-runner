var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bg,bgImg;
var bg2,bg2Img;
var player, shooterImg, shooter_shooting;
var bullet, bullet_image
var zombieGroup, zombieImage
var Gunsound

function preload(){
  
  zombieImage = loadImage("assets/zombie.png")
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  bullet_image = loadImage("assets/Gun B.png")
  bgImg = loadImage("assets/bg.jpeg")
  Gunsound = loadSound("assets/Gun sound.mp3")
  bg2Img = loadImage("assets/bg1.jpg")

}

function setup() {

createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1

/*bg2 = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg2.addImage(bg2Img)
bg2.scale = 1.1*/
  
/*bullet = createSprite()
bullet.addImage(bullet_image)
bullet.scale = 0.05*/
                          
//creating the player sprite
player = createSprite(displayWidth-1230  , displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)



   zombieGroup = new Group();

}

function draw() {
  background(bgImg) 


if(gameState === PLAY){

//moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
  Gunsound.play();
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

if(player.isTouching(zombieGroup)){

 gameState = END;
  
}

spawnzombie();

}else if(gameState === END){
 background(bg2Img);
  zombieGroup.setLifetimeEach(-1);
  
}
  



drawSprites();
text("X"+mouseX+","+"Y"+mouseY,mouseX,mouseY);
}

function spawnzombie() {
  //write code here to spawn the zombies
  if (frameCount % 90 === 0) {
    zombie = createSprite(1200,1300)
    zombie.y = Math.round(random(90,800));
    zombie.addImage(zombieImage);
    zombie.scale = 0.2;
    zombie.velocityX = -3;
    
     //assign lifetime to the variable
     zombie.lifetime = 400;
    
    //adjust the depth
    zombie.depth = zombie.depth;
    player.depth = player.depth + 1;
    
  }
}