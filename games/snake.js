window.initSnake = function() {
    const arena = document.getElementById('game-content');
    arena.innerHTML = '<canvas id="snake-canvas" width="400" height="400" class="bg-black border-2 border-slate-700 shadow-[0_0_15px_rgba(34,197,94,0.3)] rounded-lg"></canvas>';
    const canvas = document.getElementById('snake-canvas');
    const ctx = canvas.getContext('2d');
    
    let box = 20;
    let snake = [{x: 9 * box, y: 10 * box}];
    let food = {
        x: Math.floor(Math.random() * 19 + 1) * box,
        y: Math.floor(Math.random() * 19 + 1) * box
    };
    let score = 0;
    let d;
    let gameLoop;
    
    document.getElementById('game-score').innerText = score;

    const handleKey = (event) => {
        if(event.keyCode == 37 && d != "RIGHT") d = "LEFT";
        else if(event.keyCode == 38 && d != "DOWN") d = "UP";
        else if(event.keyCode == 39 && d != "LEFT") d = "RIGHT";
        else if(event.keyCode == 40 && d != "UP") d = "DOWN";
    };
    document.addEventListener("keydown", handleKey);
    
    document.getElementById('game-restart-btn').onclick = () => {
        clearInterval(gameLoop);
        window.initSnake();
    };

    function collision(head, array) {
        for(let i = 0; i < array.length; i++){
            if(head.x == array[i].x && head.y == array[i].y) return true;
        }
        return false;
    }

    function draw() {
        ctx.fillStyle = "#0f172a"; // navy-900
        ctx.fillRect(0, 0, 400, 400);

        for( let i = 0; i < snake.length ; i++){
            ctx.fillStyle = (i == 0) ? "#22c55e" : "#16a34a";
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
            ctx.strokeStyle = "#0f172a";
            ctx.strokeRect(snake[i].x, snake[i].y, box, box);
        }

        ctx.fillStyle = "#ef4444"; // red-500
        ctx.fillRect(food.x, food.y, box, box);

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if(d == "LEFT") snakeX -= box;
        if(d == "UP") snakeY -= box;
        if(d == "RIGHT") snakeX += box;
        if(d == "DOWN") snakeY += box;

        if(snakeX == food.x && snakeY == food.y){
            score++;
            if (window.SoundManager) window.SoundManager.playClick();
            document.getElementById('game-score').innerText = score;
            if (window.AchievementManager) window.AchievementManager.trackScore('snake', score);
            
            food = {
                x: Math.floor(Math.random() * 19 + 1) * box,
                y: Math.floor(Math.random() * 19 + 1) * box
            };
        } else {
            snake.pop();
        }

        let newHead = {x: snakeX, y: snakeY};

        if(snakeX < 0 || snakeX >= 400 || snakeY < 0 || snakeY >= 400 || collision(newHead, snake)){
            clearInterval(gameLoop);
            if (window.SoundManager) window.SoundManager.playLose();
            if (window.AchievementManager) window.AchievementManager.trackLoss('snake');
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fillRect(0,0,400,400);
            ctx.fillStyle = "white";
            ctx.font = "30px Inter";
            ctx.fillText("Game Over", 120, 200);
            return;
        }

        snake.unshift(newHead);
    }

    gameLoop = setInterval(draw, 100);

    return {
        cleanup: () => {
            clearInterval(gameLoop);
            document.removeEventListener("keydown", handleKey);
        }
    };
};
