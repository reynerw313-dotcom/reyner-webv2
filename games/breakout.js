window.initBreakout = function() {
    const arena = document.getElementById('game-content');
    arena.innerHTML = '<canvas id="breakout-canvas" width="480" height="320" class="bg-slate-900 border-2 border-slate-700 shadow-xl rounded-lg"></canvas>';
    const canvas = document.getElementById('breakout-canvas');
    const ctx = canvas.getContext('2d');

    let x = canvas.width / 2;
    let y = canvas.height - 30;
    let dx = 3;
    let dy = -3;
    const ballRadius = 8;
    const paddleHeight = 10;
    const paddleWidth = 75;
    let paddleX = (canvas.width - paddleWidth) / 2;
    let rightPressed = false;
    let leftPressed = false;
    let score = 0;
    let gameLoop;
    let gameOver = false;

    const brickRowCount = 4;
    const brickColumnCount = 6;
    const brickWidth = 65;
    const brickHeight = 20;
    const brickPadding = 10;
    const brickOffsetTop = 30;
    const brickOffsetLeft = 20;

    let bricks = [];
    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }

    const keyDownHandler = (e) => {
        if (e.key === "Right" || e.key === "ArrowRight") rightPressed = true;
        else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = true;
    };
    const keyUpHandler = (e) => {
        if (e.key === "Right" || e.key === "ArrowRight") rightPressed = false;
        else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = false;
    };
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    function collisionDetection() {
        for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
                let b = bricks[c][r];
                if (b.status == 1) {
                    if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                        dy = -dy;
                        b.status = 0;
                        score++;
                        document.getElementById('game-score').innerText = score;
                        if (window.SoundManager) window.SoundManager.playClick();
                        if (window.AchievementManager) window.AchievementManager.trackScore('breakout', score);
                        
                        if (score == brickRowCount * brickColumnCount) {
                            if (window.SoundManager) window.SoundManager.playWin();
                            if (window.AchievementManager) window.AchievementManager.trackWin('breakout');
                            gameOver = true;
                            alert("YOU WIN, CONGRATS!");
                        }
                    }
                }
            }
        }
    }

    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#38bdf8";
        ctx.fill();
        ctx.closePath();
    }

    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#818cf8";
        ctx.fill();
        ctx.closePath();
    }

    function drawBricks() {
        for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
                if (bricks[c][r].status == 1) {
                    let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                    let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    const colors = ["#ef4444", "#f97316", "#eab308", "#22c55e"];
                    ctx.fillStyle = colors[r];
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }

    function draw() {
        if (gameOver) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks();
        drawBall();
        drawPaddle();
        collisionDetection();

        if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) dx = -dx;
        if (y + dy < ballRadius) dy = -dy;
        else if (y + dy > canvas.height - ballRadius) {
            if (x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            } else {
                if (window.SoundManager) window.SoundManager.playLose();
                if (window.AchievementManager) window.AchievementManager.trackLoss('breakout');
                gameOver = true;
                ctx.fillStyle = "rgba(0,0,0,0.5)";
                ctx.fillRect(0,0,canvas.width,canvas.height);
                ctx.fillStyle = "white";
                ctx.font = "30px Inter";
                ctx.fillText("Game Over", 160, 160);
                return;
            }
        }

        if (rightPressed && paddleX < canvas.width - paddleWidth) paddleX += 7;
        else if (leftPressed && paddleX > 0) paddleX -= 7;

        x += dx;
        y += dy;
        gameLoop = requestAnimationFrame(draw);
    }

    document.getElementById('game-restart-btn').onclick = () => {
        cancelAnimationFrame(gameLoop);
        window.initBreakout();
    };

    draw();

    return {
        cleanup: () => {
            cancelAnimationFrame(gameLoop);
            document.removeEventListener("keydown", keyDownHandler);
            document.removeEventListener("keyup", keyUpHandler);
        }
    };
};
