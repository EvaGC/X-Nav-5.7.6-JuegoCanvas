// Original game from:
// http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
// Slight modifications by Gregorio Robles <grex@gsyc.urjc.es>
// to meet the criteria of a canvas class for DAT @ Univ. Rey Juan Carlos

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// princess image
var princessReady = false;
var princessImage = new Image();
princessImage.onload = function () {
	princessReady = true;
};
princessImage.src = "images/princess.png";

// Stone image
var stoneReady = false;
var stoneImage = new Image();
stoneImage.onload = function () {
	stoneReady = true;
};
stoneImage.src = "images/stone.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};
var stone = {};
var monster = {};
var princess = {};
var stones = [];
var monsters = [];
var princessesCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);


// Reset the game when the player catches a princess
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	stones = [];
	monsters = [];

	// Throw the princess somewhere on the screen randomly

	princess.x = 32 + (Math.random() * (canvas.width - 64));
	princess.y = 32 + (Math.random() * (canvas.height - 64));

	//crear varias piedras y que no toquen los árboles
	for (var i = 0; i < 3; i++) {
    		stone.x = 32 + (Math.random() * (canvas.width - 64));
		stone.y = 32 + (Math.random() * (canvas.height - 64));
		if(stone.x>450) 
        	stone.x=450;
   		if(stone.y>420) 
        	stone.y=420;
   		if(stone.x<30) 
        	stone.x=30; 
    	if(stone.y<30) 
      		stone.y=30;
		stones.push([stone.x,stone.y]);
	}

	for (var i = 0; i < 2; i++) {
    	monster.x = 32 + (Math.random() * (canvas.width - 64));
		monster.y = 32 + (Math.random() * (canvas.height - 64));
		if(monsters.x>450) 
        	monster.x=450;
   		if(monster.y>420) 
        	monster.y=420;
   		if(monster.x<30) 
        	monster.x=30; 
    	if(monster.y<30) 
			monster.y=30;
		monsters.push([monster.x,monster.y]);
	}

	if(princess.x>450) 
        princess.x=450;
    if(princess.y>420) 
        princess.y=420;
    if(princess.x<30) 
        princess.x=30; 
    if(princess.y<30) 
        princess.y=30; 

 

};

var colision = function ()
{
  for (var i = 0; i < stones.length; i++) 
    {
      if(stones[i].x <= parseInt(hero.x + 28)
         && parseInt(hero.x) <= (stones[i].x + 28)
  	     && stones[i].y <= parseInt(hero.y + 28)
		     && parseInt(hero.y) <= (stones[i].y + 28))
        {
          return true;
        }
    }  
  return false;
}


// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		hero.y -= hero.speed * modifier;
		if(colision())
      	{
        	hero.y += hero.speed * modifier;
      	} 
	}
	if (40 in keysDown) { // Player holding down
		hero.y += hero.speed * modifier;
		if(colision())
	      {
	        hero.y -= hero.speed * modifier;
	      }
	}
	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
		if(colision())
	      {
	        hero.x += hero.speed * modifier;
	      }
	}
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
		if(colision())
	      {
	        hero.x -= hero.speed * modifier;
	      }
	}


	if(hero.x>450) 
        hero.x=450;
    if(hero.y>420) 
        hero.y=420;
    if(hero.x<30) 
        hero.x=30; 
    if(hero.y<30) 
        hero.y=30; 


	// Are they touching?
	if (
		hero.x <= (princess.x + 16)
		&& princess.x <= (hero.x + 16)
		&& hero.y <= (princess.y + 16)
		&& princess.y <= (hero.y + 32)
	) {
		++princessesCaught;
		reset();
	}

	for(i=0;i<monsters.length;i++){
		
		if (
		hero.x <= (monsters[i].x + 16)
		&& monsters[i].x <= (hero.x + 16)
		&& hero.y <= (monsters[i].y + 16)
		&& monsters[i].y <= (hero.y + 32)
	) {
		princessesCaught=0;
		level = 1;
		monsters=[]
		reset();
	}
		
	}

};


// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (princessReady) {
		ctx.drawImage(princessImage, princess.x, princess.y);
	}

	if (stoneReady) {
		for (var i = 0; i < stones.length; i++) {
			ctx.drawImage(stoneImage, stones[i][0], stones[i][1]);
		}
		
	}

	if (monsterReady) {
		for (var i = 0; i < monsters.length; i++) {
			ctx.drawImage(monsterImage, monsters[i][0], monsters[i][1]);
			monsters[i][0] -= 0.1;
			monsters[i][1] += 0.1;

			if ((monsters[i][0] < 30) || (monsters[i][1] > 420)){
				monsters[i][0] += 0.1;
				monsters[i][1] -= 0.1;
			}
		}
				

	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Princesses caught: " + princessesCaught, 32, 32);
	
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
};

// Let's play this game!
reset();
var then = Date.now();
//The setInterval() method will wait a specified number of milliseconds, and then execute a specified function, and it will continue to execute the function, once at every given time-interval.
//Syntax: setInterval("javascript function",milliseconds);
setInterval(main, 1); // Execute as fast as possible
