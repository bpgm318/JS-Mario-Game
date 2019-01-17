
//set up 2d canvas to draw on
canvas = document.getElementById("canvas");
context = canvas.getContext("2d");

//variables used to create animation
var bx = 100;
var by = 120;
var gx = 120;
var g2x = 50;
var time = 3100;
var currentscore = 0;
var sy = 45;
var bbx = 0;






//controller set up
controller = {

  left:false,
  right:false,
  up:false,
  keyListener:function(event) {

    var key_state = (event.type == "keydown")?true:false;

    switch(event.keyCode) {

      case 37:// left key
  		  controller.left = key_state;
  	    break;

      case 32:// up key
        controller.up = key_state;
        break;

      case 39:// right key
        controller.right = key_state;
        break;

    }

  }

};

	
	//set up mario image/give jump condition
	mario = new Image();
	mario.src = "mario.png";
	mario.jumping = false;

	//set up bottom blocks
	block = new Image();
    block.src = "block.png";

    //set up sky
	sky = new Image();
	sky.src = "sky.png"

	//set up cloud
	clouds = new Image();
	clouds.src = "cloud.png";



	//set up first goomba
	goomba1 = new Image();
	goomba1.src = "goomba.png";

	//set up second goomba
	goomba2 = new Image();
	goomba2.src = "goomba.png";

	//set up lakitu
	lakitu = new Image();
	lakitu.src = "lakitu.png"

	//set up spike
	spike = new Image();
	spike.src = "spike.png"
	spike.falling = false;

	//set up bullet bill
	bulletbill = new Image();
	bulletbill.src = "bulletbill.png"

	

	

draw = function(){
	

	
	
	
	//draw blocks on each frame
	for(i = 0; i < 23; i++){
		context.drawImage(block, i*13, 139, 13, 11);
	}

	//draw sky on each frame
	for(i = 0; i < 24; i++){
		context.drawImage(sky, i*13, 0, 50, 139);
	}

	//draw cloud on each frame
	context.drawImage(clouds, 10, 20, 60, 30);

	//draw mario on each frame
	context.drawImage(mario, bx, by, 18, 20);
	
	//draw first goomba on each frame
	context.drawImage(goomba1, gx, 120, 30, 25);

	// draw second gooma on each frame
	context.drawImage(goomba2, g2x, 120, 30, 25);

	// draw bullet bill on each frame
	context.drawImage(bulletbill, bbx, 90, 15, 15);

	//bb velocity
	bbx += 1;

	//loop for bb

	if(bbx >= 285){
		bbx =-20;
	}

	//bb hitbox

	// bb hitbox
	/*function bbRect(){
		context.beginPath();
		context.lineWidth="1";
		context.strokeStyle= "red";
		context.rect(bbx,90,15,13);
		context.stroke();
	}
	bbRect();*/

	

	

	//make goomba2 loop when moving off screen
	if(g2x <= -20){
		g2x = 285;
	}

	//make goomba1 loop when moving off screen
	if(gx >= 285){
		gx =-20;
	}
	
	//make mario loop when moving off screen
	if(bx >= 285){
		bx =-20;
	}
	else if(bx <= -20){
		bx = 285;
	}
	
	//gravity	
	by+= 1;

	//make sure mario doesn't fall through floor from gravity
	if(by > 120) {
		by = 120;
		mario.jumping = false;

    }

    var lx = bx +9;
	var sx = lx;
	var sx2 = 100;

	//spike speed
	sy += 0.19;
	
		
	//conditions for lakitu to drop spike
 	if(lx > 130 && spike.falling == false){
    	spike.falling = true;
    	sy = 45;

    }
   
  	if(bx === 60 && sy > 130){
  		spike.falling = false;
  		
  	}

  	if(bx === 180 && sy > 130){
  		spike.falling = false;
  	}

  	if(spike.falling){
  		// draw spike on each frame
  		context.drawImage(spike, 150 , sy, 16, 12);
  	}

  	// draw lakitu on each frame
	context.drawImage(lakitu, lx, 45, 30, 20);

	//game over conditions for getting hit by spike
	if(bx + 11 > 150 && bx < 159){
		if(by < sy + 9 && sy < 130){
			context.fillText("GAME OVER", 110,90);
			cancelAnimationFrame();

		}
	}

	//conditions for damage from bb
		if(bx +16 > bbx && bx < bbx + 15)  {
			if(by  < 105){
				context.fillText("GAME OVER!", 110,90);
				cancelAnimationFrame();

			
		}
	}

    
   
   	// setting up controller for user inputs
	if(controller.right){
		bx +=2;

	}

	if(controller.left){
		bx +=-2;

	}
	

	if(controller.up && mario.jumping == false){
		
		by +=-30;
		mario.jumping = true;
	
	}

	
	
	

	
	

	//Define hitbox variables for goombas
	var gxh = gx + 8;
	var g2xh = g2x + 8;

	//make goombas move at random speeds across the canvas
    gx += Math.random();
	g2x += -Math.random();

    
	//rectanges used for hit detection coding that were removed for the final game

    /*// Mario hitbox
	function marioRect(){
		context.beginPath();
		context.lineWidth="1";
		context.strokeStyle= "red";
		context.rect(bx,by,16,18);
		context.stroke();
	}
	marioRect();*/

	/*// Goomba 1 hitbox
	function goomba1Rect(){
		context.beginPath();
		context.lineWidth="1";
		context.strokeStyle="green";
		context.rect(gxh,126,13,13);
		context.stroke();
	}
	goomba1Rect();

	// Goomba 2 hitbox
	function goomba2Rect(){
		context.beginPath();
		context.lineWidth="1";
		context.strokeStyle="black";
		context.rect(g2xh,126,13,13);
		context.stroke();
	}
	goomba2Rect();*/

	
	//scoreboard and timer at top of screen
	context.fillText("Score: " + currentscore, 1,10)
	context.fillText("Time Remaining: " + time/100, 180,10);
	time--;

	//let player know when time is up
	if(time === 0){
		context.fillText("TIME IS UP!", 110,90);
		
		cancelAnimationFrame();
	}

	//points awarded for stomping a goomba and reset position of goomba/ending the game if player touches goomba sides

	

	if(bx + 16 > gxh && bx < gxh + 13)  {
		if(by + 18 > 126 && by + 18 < 133){

			currentscore++;
			gx = 1000;
			
		}else if (by + 18 >= 133){
			context.fillText("GAME OVER!", 110,90);
			cancelAnimationFrame();
			
	} 
}	

	if(bx + 16 > g2xh && bx < g2xh + 13)  {
		if(by + 18 > 126 && by + 18 < 133){
			
			currentscore++;
			g2x = -1000;
		}else if (by + 18 >= 133){
			context.fillText("GAME OVER", 110,90);
			cancelAnimationFrame();
			
	} 
}

		

	/*// spike hitbox
	function spikeRect(){
		context.beginPath();
		context.lineWidth="1";
		context.strokeStyle= "red";
		context.rect(150,sy,13,12);
		context.stroke();
	}
	spikeRect();*/

	
	
	//animate
	requestAnimationFrame(draw);
	
	
	}

//listen for key presses and finallly draw all the frames outlined above
window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
draw();

