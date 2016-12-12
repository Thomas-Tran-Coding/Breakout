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
    
	var GAME_WIDTH = 500;
	var GAME_HEIGHT = 500;
    
	var BRICK_ROWS = 5;
	var BRICK_COLUMNS = 13;
    var BRICK_WIDTH = 40;
	var BRICK_HEIGHT = 10;
    var BRICK_GAP_TOP = 5;
    var BRICK_GAP_LEFT = 5;
    var BRICK_PADDING = 5;

    
    var PADDLE_HEIGHT = 10;
    var PADDLE_WIDTH = 70;
    var PLAY_PADDLE = (GAME_WIDTH - PADDLE_WIDTH)/2;
    var rightKeyPressed = false;
    var leftKeyPressed = false;
    
	var BALLSIZE = 10;
	var yPosBall = GAME_HEIGHT -30;
    var xPosBall = GAME_WIDTH/2;
    var xMoveSpeed  = 2;
    var yMoveSpeed = -2;
    
    
	var bricks = [];
	var paddle;
	var ball;
 /*   
	function privateDraw() {
        console.log("Drawing!");
        ball.draw();
        ball.bounceHorizontally();
        ball.bounceVertically();
        ball.update();
        setInterval(privateDraw,10); // using the draw function every 10 milliseconds 
	}
*/
    for(var c = 0; c < BRICK_COLUMNS; c++) {            // creating bricks which have x- and yPositions
        bricks[c] = [];
        for(r = 0; r < BRICK_ROWS; r++) {
            bricks[c][r] = {x: 0, y: 0}; 
        }
    }
    
    function drawBricks() {
        for(c = 0; c < BRICK_COLUMNS; c++) {
            for(r = 0; r < BRICK_ROWS; r++) {
                bricks[c][r].x = 0;
                bricks[c][r].y = 0;
                privateContext.beginPath();
                privateContext.rect(0, 0, BRICK_WIDTH, BRICK_HEIGHT);
                privateContext.fillStyle = "1E90FF";
                privateContext.fill();
                privateContext.closePath();
            }
        }
    }
    
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    
    function keyDownHandler(event) {    //   gedrückter Knopf
        if(event.keyCode == 39) {
            rightKeyPressed = true;
        }
        else if(event.keyCode == 37) {
            leftKeyPressed = true;
        }
    }
    
    function keyUpHandler(event) {      // losgelassener Knopf
        if(event.keyCode == 39) {
            rightKeyPressed = false;
        }
        else if(event.keyCode == 37) {
            leftKeyPressed = false;
        }
    }
    
    
	function privateSetContext(canvas) {
		privateCanvas = canvas;
		privateContext = canvas.getContext("2d");
	}

	function publicInit(canvas, difficulty) {
        console.log("Breakout, here we go!");
		privateSetContext(canvas);
        privateContext.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        setInterval(draw,10); // using the draw function every 10 milliseconds 
	}
    
    function drawBall() {
        privateContext.beginPath();
        privateContext.arc(xPosBall, yPosBall, BALLSIZE, 0, Math.PI*2);
        privateContext.fillStyle = "red";
        privateContext.fill();
        privateContext.closePath();
    }

    function draw() {
        privateContext.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        drawBall();
        drawPaddle();
        if (yPosBall + yMoveSpeed < BALLSIZE){// implementing "bounce" effect
           yMoveSpeed = -xMoveSpeed;
        }
        else if( yPosBall + yMoveSpeed > GAME_HEIGHT - BALLSIZE) {
            if(xPosBall > PLAY_PADDLE && xPosBall < PLAY_PADDLE * PADDLE_WIDTH) {
                yMoveSpeed = -yMoveSpeed;
            }
            else {
                alert("LARRY CONFIRMED!!!");
                document.location.reload();
            }
        }
        
        if (xPosBall + xMoveSpeed < BALLSIZE || xPosBall + xMoveSpeed > GAME_WIDTH - BALLSIZE) { // same for left and right
           xMoveSpeed = yMoveSpeed;
        }
        if(rightKeyPressed && PLAY_PADDLE < GAME_WIDTH - PADDLE_WIDTH) {
           PLAY_PADDLE += 8;
        }
        if(leftKeyPressed && PLAY_PADDLE > 0) {
            PLAY_PADDLE -= 8;
        }
        
        xPosBall += xMoveSpeed;
        yPosBall += yMoveSpeed;
    }
    
    function drawPaddle() {
        privateContext.beginPath();
        privateContext.rect(PLAY_PADDLE, GAME_HEIGHT - PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT);
        privateContext.fillStyle = "orange";
        privateContext.fill();
        privateContext.closePath();
    }
    
  
	return {
		init: publicInit
	};
})();

var canvas = document.getElementById("breakoutcanvas");
breakOutGame.init(canvas);