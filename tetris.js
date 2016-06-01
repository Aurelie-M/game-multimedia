/* game
*
* /tetris.js - Tetris main class
*
* coded by Mairesse Aurelie 2384
* started at 30/05/16
*/

(function(){

	"use strict";

	var Tetris;

	// Game

	Tetris = function(oApp){

		var game = this,
			block;

		this.app = oApp;

		this.time = {
			"start": null,
			"current": null
		};

		// Starting Screen
        this.starting = {
            "frames": {
                "level": {
                    "sx": 669,
                    "sy": 66,
                    "sw": 19,
                    "sh": 20,
                    "dx": game.app.width/2 + 180,
                    "dy": game.app.height/2 - 53,
                    "dw": 19,
                    "dh": 20
                },
                "lines": {
                    "sx": 669,
                    "sy": 66,
                    "sw": 19,
                    "sh": 20,
                    "dx": game.app.width/2 + 180,
                    "dy": game.app.height/2 - 8,
                    "dw": 19,
                    "dh": 20
                },
                "score": {
                    "sx": 669,
                    "sy": 66,
                    "sw": 19,
                    "sh": 20,
                    "dx": game.app.width/2 + 180,
                    "dy": game.app.height/2 + 35,
                    "dw": 19,
                    "dh": 20
                }
            },
            "draw": function() {
                game._drawSpriteFromFrame( this.frames.level );
                game._drawSpriteFromFrame( this.frames.lines );
                game._drawSpriteFromFrame( this.frames.score );
            }
        };

		// Background
		this.background = {
			"frame": {
				"sx": 16,
				"sy": 16,
				"sw": 565, // 581,
				"sh": 545, //558,
				"dx": 0,
				"dy": 0,
				"dw": game.app.width,
				"dh": game.app.height
			},
			"draw": function(){
				game._drawSpriteFromFrame(this.frame);
			}
		};

		// Ground
		this.ground = {
            "frame": {
                "sx": 41,
                "sy": 585,
                "sw": 204,
                "sh": 3,
                "dx": game.app.width/7 - 41,
                "dy": game.app.height/2 + 182,
                "dw": 204,
                "dh": 3
            },
            "speed":0,
            "draw": function() {
                game._drawSpriteFromFrame( this.frame );
            }
        };

        /*Block = function(iDx){

        	this.frame = {
        		"one": {
                    "sx": 15,
                    "sy": 671,
                    "sw": 123,
                    "sh": 31,
                    "dx": 0,
                    "dy": 0,
                    "dw": 123,
                    "dh": 31
                }
        	};
        };

        Block.prototype.draw = function(){
        	game._drawSpriteFromFrame(this.frame.one);
        };

        Block.prototype.update = function(){

        	var iBlock;

        	this.frame.one.dy += game.ground.speed;

        	if(this.frame.one.dy < (this.frame.one.dh * -1)){

        		this.frame.one.dy = game.app.height;
        		iBlock = Block.generateBlock();
        		this.frame.one.dx = iBlock;
        	}

        	this.draw();
        };

        Block.lastGeneratedBlock = -1 * ( 50 + Math.floor( Math.random() * 250 ) );

        Block.generateBlock = function() {
            var iMultiplier = Math.round( Math.random() ) % 2 ? 1 : -1,
                iMaxGap = 100,
                iNewValue = Block.lastGeneratedBlock + Math.floor( Math.random() * iMaxGap ) * iMultiplier;

            ( iNewValue > -50 ) && ( iNewValue = -50 );
            ( iNewValue < -300 ) && ( iNewValue = -300 );

            Block.lastGeneratedBlock = iNewValue;

            return iNewValue;
        };

        Block.generate = function( iAmount ) {
            var i = 0,
                iBlockStartingPosition = 0,
                iBlockGap = 180;

            for ( ; i < iAmount; i++ ) {
                game.block.push( new Block( iBlockStartingPosition + ( i * iBlockGap ) ) );
            }
        };*/


		// Utils
		this._drawSpriteFromFrame = function(oFrame){

			this.app.context.drawImage(
				this.spriteSheet,
				oFrame.sx,
				oFrame.sy,
				oFrame.sw,
				oFrame.sh,
				oFrame.dx,
				oFrame.dy,
				oFrame.dw,
				oFrame.dh
			);
		};

		// Setup Animation loop
		this.animate = function(){

			this.time.current = Date.now();
			this.animationRequestID = window.requestAnimationFrame(this.animate.bind(this));

			// draw clear
			this.app.context.clearRect(0, 0, this.app.width, this.app.height );

			// draw background
			this.background.draw();

			/*// draw & animate: block
            this.block.forEach( function( oBlock ) {
                oBlock.update();
            } );*/

			// draw & animate: ground
            this.ground.draw();

			// draw start screen if needed
            if ( !game.started ) {
                this.starting.draw();
            }

		};

		// Init game
        this.init = function() {
            
            // reset some variables
            this.started = false;
            this.ended = false;
            this.time.start = Date.now();
            // launch animation
            this.animate();
        };

		// Load spritesheet
		this.spriteSheet = new Image();
		this.spriteSheet.addEventListener("load", this.init.bind(this));
		this.spriteSheet.src = "./img/sprite.png";


	};	

	window.Tetris = Tetris;

})();
