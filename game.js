/* game
*
* /game.js - Canvas initialisation
*
* coded by Mairesse Aurelie 2384
* started at 30/05/16
*/

(function(Tetris){

	"use strict";

	var oApp = {

			"canvas": null,
			"context": null,
			"width": null,
			"height": null
	},
	_isCanvasSupported;

	_isCanvasSupported = function($CanvasElt){

		return !!$CanvasElt.getContext;
	};

	oApp.setup = function(){

		this.canvas = document.querySelector("#game");

		if(!_isCanvasSupported(this.canvas)){

			return console.error("Canvas isn't supported ! ");
		}

		this.context = this.canvas.getContext("2d");
		this.width = this.canvas.width;
		this.height = this.canvas.height;

		window.game = new Tetris(this);
	};

	oApp.setup();

})(window.Tetris);