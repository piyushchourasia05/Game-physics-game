//Made By Piyush chourasia 20BCG10054
var game;



var crateGroup;
var planetGroup;



var forceReducer = 0.005;


var gravityGraphics;

window.onload = function() {	
	game = new Phaser.Game(800, 600, Phaser.AUTO, "");
     game.state.add("PlayGame",playGame);
     game.state.start("PlayGame");
}
	
var playGame = function(game){};

playGame.prototype = {
	preload: function(){
		game.load.image("crate", "crate.png");
		game.load.image("planet", "planet.png");
		game.load.image("bigplanet", "bigplanet.png"); 
	},
  	create: function(){
  		
  	
  		
  		crateGroup = game.add.group();
  		planetGroup = game.add.group();
  
		
		gravityGraphics = game.add.graphics(0, 0);
    		gravityGraphics.lineStyle(2,0xffffff,0.5);
  	
		
		game.stage.backgroundColor = "#222222";
		

		
		game.physics.startSystem(Phaser.Physics.BOX2D);
    		
		
    		
		addPlanet(180, 200, 250, 150, "planet");
    		addPlanet(570, 350, 400, 250, "bigplanet");
		
		
		game.input.onDown.add(addCrate, this);
	},
	update: function(){
	
		
		for(var i=0;i<crateGroup.total;i++){	
			var c = crateGroup.getChildAt(i);
			
			
			
			for(var j=0;j<planetGroup.total;j++){ 
				var p = planetGroup.getChildAt(j);
				
				
				var distance = Phaser.Math.distance(c.x,c.y,p.x,p.y);
				
				
				
				if(distance<p.width/2+p.gravityRadius/2){
					
					
					
					var angle = Phaser.Math.angleBetween(c.x,c.y,p.x,p.y);
					
					
					
					c.body.applyForce(p.gravityForce*Math.cos(angle)*forceReducer,p.gravityForce*Math.sin(angle)*forceReducer);
				}
			}
		}
	}
}


function addCrate(e){	
	var crateSprite = game.add.sprite(e.x, e.y, "crate");
	crateGroup.add(crateSprite);
    	game.physics.box2d.enable(crateSprite);
}


function addPlanet(posX, posY, gravityRadius, gravityForce, asset){
	var planet = game.add.sprite(posX, posY, asset);
	planet.gravityRadius = gravityRadius;
	planet.gravityForce = gravityForce
	planetGroup.add(planet);
	game.physics.box2d.enable(planet);
	planet.body.static = true;
	
	
	
	planet.body.setCircle(planet.width / 2);
	gravityGraphics.drawCircle(planet.x, planet.y, planet.width+planet.gravityRadius);
}