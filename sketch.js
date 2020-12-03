
var monkey , monkey_running
var banana ,bananaImage, obstacleImage
var bananaGroup, obstacleGroup
var score=0, ground, survivalTime=0
var PLAY = 1
var END = 0
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(1000, 600)
  
  monkey = createSprite(100, 500, 10, 10)
  monkey.addAnimation('running', monkey_running)
  monkey.scale = 0.3
  
  bananaGroup = new Group()
  obstacleGroup = new Group()
  
  ground = createSprite(500, 595, 1000, 10)
 
  
}


function draw() {
background('white')
  
  if(gameState === PLAY){
    spawnObstacles()
    spawnBanana()
  }
  
  ground.velocityX = -4
    if (ground.x < 400 ){
      ground.x = ground.width/2;
    }
  
  
  if(keyDown("space") && monkey.y >= 495) {
    
    monkey.velocityY = -20
    
    console.log(monkey.y)
    
  }
  
  
  if(bananaGroup.isTouching(monkey)){

  score = score + 2
    bananaGroup.destroyEach()  
  
  
  }
  
  if(obstacleGroup.isTouching(monkey)){
    
    gameState = END;    
    
  }
  
  
  if(gameState === END){
    
    bananaGroup.setVelocityEach(0)
    obstacleGroup.setVelocityEach(0)
    bananaGroup.destroyEach()
    obstacleGroup.destroyEach()
    
  }
  
  stroke('red')
  textSize(20)
  fill('red')
   text("Score: " + score, 100, 100)
  
  
  
   survivalTime=  Math.ceil(frameCount/frameRate())
  stroke('Blue')
  textSize(20)
  fill('red')
  text("Survival Time: " + survivalTime, 100, 150)
  
  
  
  monkey.velocityY = monkey.velocityY + 0.8
  
  monkey.collide(ground)
  
  
  drawSprites()
}

function spawnObstacles(){

  if(frameCount % 300 === 0){
  var obstacle = createSprite(1010, 535, 10, 10)
  obstacle.addImage(obstacleImage)
  obstacle.velocityX = -6
  obstacle.scale = 0.3
    obstacleGroup.add(obstacle)

}

 

}

function spawnBanana(){
  if(frameCount % 80 === 0){
  banana = createSprite(1010, 280, 10, 10)
    banana.y = Math.round(random(120, 300))
  banana.addImage(bananaImage)
  banana.velocityX = -6
    banana.scale =0.2
    bananaGroup.add(banana)
    banana.lifetime = width/6
  }


  
}








