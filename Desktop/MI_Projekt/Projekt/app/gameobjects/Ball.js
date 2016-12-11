/* The ball in the game */
var ball = function(xPosBall, yPosBall, BALLSIZE, xMoveSpeed, yMoveSpeed, privateContext) {
    this.xPosBall = xPosBall;
    this.yPosBall = yPosBall;
    this.BALLSIZE = BALLSIZE;
    this.xMoveSpeed = xMoveSpeed;
    this.yMoveSpeed = yMoveSpeed;
    this.privateContext = privateContext;
};

ball.prototype.draw = function() {
        privateContext.beginPath();
        privateContext.arc(xPosBall, yPosBall, BALLSIZE, 0, Math.PI*2);
        privateContext.fillStyle = "red";
        privateContext.fill();
        privateContext.closePath();
}

ball.prototype.bounceHorizontally = function() {
    if (xPosBall + xMoveSpeed < BALLSIZE || xPosBall + xMoveSpeed > breakoutcanvas.width - BALLSIZE) {     // same for left and right
           xMoveSpeed = yMoveSpeed;
}

ball.prototype.bounceVertically = function() {
      if (yPosBall + yMoveSpeed < BALLSIZE  || yPosBall + yMoveSpeed > breakoutcanvas.height - BALLSIZE) {
           yMoveSpeed = -xMoveSpeed;                                                               
}

ball.prototype.update = function() {
        xPosBall += xMoveSpeed;
        yPosBall += yMoveSpeed;
}

