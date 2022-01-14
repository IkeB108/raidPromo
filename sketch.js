function preload(){
  loadedAllFiles = false;
  /*getSheeped = loadImage('getSheeped.png')

  sheepHead = loadImage('sheepHead.png')
  sheepRear = loadImage('sheepRear.png')
  sheepSide = loadImage('sheepSide.png')
  vignette = loadImage('vignette.png')


  raidLogo = loadImage('raidlogo.png')
  raidCharacters = loadImage('raid_characters.jpg')*/

  raidSprite = loadImage('raidSprite.png')
  dubstep = loadSound('sheepDubstep.mp3')
}
function setup() {
  loadedAllFiles = true;
  myCanvas = createCanvas(800,700)
  myCanvas.id('demo')
  imageMode(CENTER,CENTER)
  angleMode(DEGREES)
  textAlign(CENTER,CENTER)
  smooth()

  searchW = 600;
  searchH = 35;

  getSheepedScale = 0.3;

  animationTimer = -1;
  //set to -1 when animation is not playing
  animationLength = 694
  //round(70 * 11.6)

  flyingSheep = []

}

function draw() {
  background(0)
  //image(raidLogo, width/2, 100, raidLogo.width * 0.09, raidLogo.height * 0.09)
  drawSprite('raidLogo', width/2, 100, 0.6)
  fill(255); textSize(17)
  if(animationTimer > -1)fill(120)
  text('you really want to play this game?', width/2, 200)

  //image(raidCharacters, width/2, 500)
  drawSprite('raidCharacters', width/2, 500, 1.3)
  fill(70); noStroke();
  if(collidePointRect( mouseX, mouseY, width/2 - (searchW/2), 237, searchW, searchH ) && animationTimer == -1){fill(160)}


  rect(width/2 - (searchW/2), 237, searchW, searchH )
  fill(0)
  textSize(20);
  text('> Reveal my promo code', width/2 - (searchW/2) + 125, 255 )

  updateCursor();
  updateAnimation();
}

function updateCursor(){
  if(collidePointRect( mouseX, mouseY, width/2 - (searchW/2), 237, searchW, searchH ) && animationTimer == -1){
    document.getElementById("demo").style.cursor = "pointer";
  } else {
    document.getElementById("demo").style.cursor = "default";
  }
}

function mouseClicked(){
  if(loadedAllFiles && collidePointRect( mouseX, mouseY, width/2 - (searchW/2), 237, searchW, searchH ) && animationTimer == -1){
    animationTimer = 0;
    dubstep.play();
  }
}

function updateAnimation(){
  if(animationTimer > -1){
    animationTimer ++;
    background(0,200)
    if(animationTimer > 230){


      if(animationTimer < 450 && animationTimer % 5 == 0){
        flyingSheep.push({
          'x':0,
          'y':185,
          'xvel': random(7, 13),
          'yvel': random(-7, -10)
        })
        flyingSheep.push({
          'x':width,
          'y':185,
          'xvel': -1 * random(7, 13),
          'yvel': random(-7, -10)
        })
      }
      if(animationTimer >= 430 && animationTimer < 610){
        for(var i = 0; i < 2; i ++){
          flyingSheep.push({
            'x':random(50, width-50),
            'y': random(-20,-25) ,
            'xvel': 0,
            'yvel': -9
          })
        }

      }


      if(flyingSheep.length > 100)flyingSheep.shift();

      for(var i = 0; i < flyingSheep.length; i ++){
        flyingSheep[i].yvel += 0.5;
        flyingSheep[i].x += flyingSheep[i].xvel;
        flyingSheep[i].y += flyingSheep[i].yvel;
        //image(sheepSide, flyingSheep[i].x, flyingSheep[i].y, sheepSide.width * 0.05, sheepSide.height * 0.05)
        drawSprite('sheepSide', flyingSheep[i].x, flyingSheep[i].y, 0.3)
      }

    }
    //image(vignette, width/2, height/2, width, height)
    drawSprite('vignette',width/2,height/2,1)

    if( (withinFlashRange(animationTimer) && frameCount % 2 == 0) || !withinFlashRange(animationTimer) )
    //image(getSheeped, width/2, 150, getSheeped.width * getSheepedScale, getSheeped.height * getSheepedScale);
    drawSprite('getSheeped', width/2, 150, 0.55)
    push();
    translate(width * (1/4) ,height/2)
    rotate(animationTimer%360)
    scale(0.5)
    //image(sheepHead, 0, 0)
    drawSprite('sheepHead',0,0,1.7)
    pop();

    push();
    translate(width * (3/4) ,height/2)
    rotate(animationTimer%360)
    scale(0.5)
    //image(sheepHead, 0, 0)
    drawSprite('sheepHead',0,0,1.7)
    pop();


    var sx = (width-200)/4
    //var iw = sheepRear.width
    //var ih = sheepRear.height
    var is = 0.5 * ( 1 + (animationTimer % 40)/210 )
    var n = 1;
    if(animationTimer % 80 < 40)n = -1;
    for(var i = 0; i < 5; i ++){
      push();
      translate(i * sx + 100, 550)
      scale(is*n, is)
      //image(sheepRear, 0, 0)
      drawSprite('sheepRear',0,0,1.65)
      pop();
    }


  }
  if(animationTimer >= animationLength){
    animationTimer = -1;
    flyingSheep = []
  }
}

function withinFlashRange(n){
  return (n%90) < 20
  //return ( within(n, 0, 20) || within(n, 60, 80) || within(n, 120, 140) )
}

function drawSprite(name, x, y, s){
  var n = sp(name)
  if(name == 'vignette')image(raidSprite, width/2,height/2, width, height, n[0], n[1]+1, n[2]-1, n[3]-2)
  else image(raidSprite, x, y, n[2]*s, n[3]*s, n[0], n[1], n[2], n[3])
}
function sp(name){
  switch(name){
    case 'sheepSide':
    return [187, 0, 221, 228]
    case 'vignette':
    return [0, 860, 174, 174]
    case 'getSheeped':
    return [0, 703, 862, 150]
    case 'raidCharacters':
    return [0, 511, 331, 186]
    case 'sheepHead':
    return [2, 244, 240, 263]
    case 'sheepRear':
    return [2, 0, 181, 244]
    case 'raidLogo':
    return [408, 0, 592, 304]
  }
}
