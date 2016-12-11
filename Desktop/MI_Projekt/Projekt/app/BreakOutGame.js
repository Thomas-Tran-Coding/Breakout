/*
 * This is the main script for the breakout application.
 *
 * Mouse interaction is captured here and the animation loop runs here, so that
 * the game can be drawn. This is also a good place to calculate random speeds for the
 * ball.
 *
 */
var breakOutGame = (function () {

	// private vars and constants
    var privateContext;
	var privateCanvas;
    
	var GAME_WIDTH = 600;
	var GAME_HEIGHT = 500;
	var BRICK_ROWS = 5;
	var BRICK_COLUMNS = 13;
	var BALLSIZE = 10;
	var BRICK_WIDTH = 40;
	var BRICK_HEIGHT = 10;
    var yPosBall = breakoutcanvas.height -30;
    var xPosBall = breakoutcanvas.width/2;
    
    var xMoveSpeed  = 2;
    var yMoveSpeed = -2;
    
    
	var bricks = [];
	var paddle;
	var ball;
/*
	function privateDraw() {
        console.log("Drawing!");
        privateContext.clearRect(0, 0, breakoutcanvas.width, breakoutcanvas.height);
        ball.bounceHorizontally();
        ball.bounceVertically();
        ball.update();
        ball.draw();
        window.requestAnimationFrame(privateDraw);
	}
*/
	function privateSetContext(canvas) {
		privateCanvas = canvas;
		privateContext = canvas.getContext("2d");
	}

	function publicInit(canvas, difficulty) {
        console.log("Breakout, here we go!");
		privateSetContext(canvas);
        
		window.requestAnimationFrame(privateDraw); // (privatedraw) // (draw)
	}
  
    
    function drawBall() {
        privateContext.beginPath();
        privateContext.arc(xPosBall, yPosBall, BALLSIZE, 0, Math.PI*2);
        privateContext.fillStyle = "red";
        privateContext.fill();
        privateContext.closePath();
    }

    function draw() {
        privateContext.clearRect(0, 0, breakoutcanvas.width, breakoutcanvas.height);
        drawBall();
        if (yPosBall + yMoveSpeed < BALLSIZE  || yPosBall + yMoveSpeed > breakoutcanvas.height - BALLSIZE) {// implementing "bounce" 
           yMoveSpeed = -xMoveSpeed;                                                                        // for the ball -> top and bottom
        }
        if (xPosBall + xMoveSpeed < BALLSIZE || xPosBall + xMoveSpeed > breakoutcanvas.width - BALLSIZE) {  // same for left and right
           xMoveSpeed = yMoveSpeed;
        }
        xPosBall += xMoveSpeed;
        yPosBall += yMoveSpeed;
    }

   setInterval(draw,10); // using the draw function every 10 milliseconds 
    
	return {
		init: publicInit
	};
})();

var canvas = document.getElementById("breakoutcanvas");
breakOutGame.init(canvas);