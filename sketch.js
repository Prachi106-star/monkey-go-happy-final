var monkey, monkey_running, monkey_collided;
var ground, invisibleGround, groundImage, background,backgroundground;

var rockImage, banImage;
var obstaclesGroup, banana, rock;
var score = 0 ;

var PLAY=1
var END=0;
var gameState=PLAY;

  function preload(){
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  monkey_collided = loadAnimation("Monkey_01.png");
  
  backgroundimg = loadImage ("jungle.jpg");
  // backgroundground = loadImage ("jungle.img");
  
  banImage = loadImage("banana.png");
  rockImage=loadImage("stone.png");
  //obstacle1 = loadImage("obstacle1.png");
 
}

function setup() {
  createCanvas(600, 400);
  
   backg = createSprite(200,180,400,20);
 backg.addImage("back",backgroundimg);
  backg.scale=1.2;
  backg.x = backg.width /2;
 backg.velocityX = -4;
  
   
  banGroup = new Group();
 rockGroup = new Group();
  monkeyGroup = new Group();
  
  monkey = createSprite(50,350,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("collided", monkey_collided);
  monkey.scale = 0.1;
  monkey.debug = true ;
  monkeyGroup.add(monkey); 
  
 
  
  invisibleGround = createSprite(200,390,400,10);
  invisibleGround.visible = false;
  
 
}

function draw() {
  background(180);
  
  
  
 if(gameState===PLAY){
   
if(keyDown("space")&& monkey.y >= 330 ) {
    monkey.velocityY = -15;
  }
  
   
  monkey.velocityY = monkey.velocityY + 0.8;
   
 //  score = score + Math.round(getFrameRate()/60);
   //console.log(score);
  
       if (backg.x < 0){
  backg.x = backg.width/2;
    }
  
  monkey.collide(invisibleGround);
   
  spawnBananas();
  spawnRocks();
   
    if (monkeyGroup.isTouching(banGroup)){
    score = score + 1;
    banGroup.setVisibleEach(false);
    //console.log(score);
   } 
   
  // switch(score)
   
    if(monkey.isTouching(rockGroup)){
      gameState  = END;
    }
   
 }
 if (gameState === END){
     backg.velocityX = 0;
    monkey.velocityY = 0;
    banGroup.setVelocityXEach ( 0);
    rockGroup.setVelocityXEach  (0);
    monkey.changeAnimation("collided",monkey_collided);
    banGroup.setLifetimeEach(-1);
    rockGroup.setLifetimeEach(-1);
   }
  drawSprites();
  text("Score: "+ score, 500,50);
}

function spawnBananas() {
  if (frameCount % 100 === 0) {
    var banana = createSprite(600,300,40,10);
    banana.y = Math.round(random(250,300));
    banana.addImage(banImage);
   banana.scale = 0.1;
    banana.velocityX = -3;
   banana.lifetime = 200;
    
    
    banana.depth = monkey.depth;
    banana.depth = monkey.depth + 1;
  }
  
}

function spawnRocks() {
  if(frameCount % 60 === 0) {
    rock = createSprite(600,365,10,40);
    rock.addImage(rockImage);
    rock.velocityX = -4;           
    rock.scale = 0.1;
    rock.lifetime = 300;
    rockGroup.add(rock);
    rock.debug = true;
  }
}
