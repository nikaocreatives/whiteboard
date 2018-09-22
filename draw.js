var drawingApp = (function () {

	"use strict";

	var canvas,
		context,
		canvasWidth = 600,
		canvasHeight = 250,
		clickX = [],
		clickY = [],
		clickSize = [],
		clickDrag = [],
		paint = false,
		curSize = "normal",

		// Creates a canvas element, loads images, adds events, and draws the canvas for the first time.
		init = function () {

			// Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
			var canvasDiv = document.createElement('canvasDiv');
			canvas = document.createElement('canvas');
			canvas.setAttribute('width', canvasWidth);
			canvas.setAttribute('height', canvasHeight);
			canvas.setAttribute('id', 'canvas');
			document.getElementById('canvasDiv').appendChild(canvas);
			if (typeof G_vmlCanvasManager != "undefined") {
				canvas = G_vmlCanvasManager.initElement(canvas);
			}
			context = canvas.getContext("2d"); // Grab the 2d canvas context

			createUserEvents();

			document.getElementById('clear').addEventListener('click', function(){
			clickX = new Array();
			clickY = new Array();
			clickDrag = new Array();
			clearCanvas(); 
		});

		},

		// Clears the canvas.
		clearCanvas = function () {

			context.clearRect(0, 0, canvasWidth, canvasHeight);

		},

		// Adds a point to the drawing array.
		// @param x
		// @param y
		// @param dragging
		addClick = function (x, y, dragging) {

			clickX.push(x);
			clickY.push(y);
			clickSize.push(curSize);
			clickDrag.push(dragging);
		},

		// Redraws the canvas.
		redraw = function () {

			clearCanvas();

			var radius = 5;
			context.strokeStyle = "black";
			context.lineJoin = "round";
			context.lineWidth = radius;
					
			for(var i=0; i < clickX.length; i++)
			{		
				context.beginPath();
				if(clickDrag[i] && i){
					context.moveTo(clickX[i-1], clickY[i-1]);
				}else{
					context.moveTo(clickX[i]-1, clickY[i]);
				}
				context.lineTo(clickX[i], clickY[i]);
				context.closePath();
				context.stroke();
			}


		},

		// Add mouse and touch event listeners to the canvas
		createUserEvents = function () {

			var press = function (e) {
				// Mouse down location
				var sizeHotspotStartX,
					mouseX = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX) - this.offsetLeft,
					mouseY = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY) - this.offsetTop;

				paint = true;
				addClick(mouseX, mouseY, false);
				redraw();
			},

			drag = function (e) {
				
				var mouseX = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX) - this.offsetLeft,
					mouseY = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY) - this.offsetTop;
				
				if (paint) {
					addClick(mouseX, mouseY, true);
					redraw();
				}
				// Prevent the whole page from dragging if on mobile
				e.preventDefault();
			},

			release = function () {
				paint = false;
				redraw();
			},

			cancel = function () {
				paint = false;
			};

			// Add mouse event listeners to canvas element
			canvas.addEventListener("mousedown", press, false);
			canvas.addEventListener("mousemove", drag, false);
			canvas.addEventListener("mouseup", release);
			canvas.addEventListener("mouseout", cancel, false);

			// Add touch event listeners to canvas element
			canvas.addEventListener("touchstart", press, false);
			canvas.addEventListener("touchmove", drag, false);
			canvas.addEventListener("touchend", release, false);
			canvas.addEventListener("touchcancel", cancel, false);
		};

		
	return {
		init: init
	};
}());