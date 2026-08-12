window.initFlappy = function() {
    const arena = document.getElementById('game-content');
    arena.innerHTML = '<canvas id="flappy-canvas" width="320" height="480" class="bg-sky-900 border-2 border-slate-700 shadow-[0_0_15px_rgba(234,179,8,0.3)] rounded-lg cursor-pointer"></canvas>';
    const canvas = document.getElementById('flappy-canvas');
    const ctx = canvas.getContext('2d');
    
    let frames = 0;
    let score = 0;
    let gameOver = false;
    let gameLoop;
    
    document.getElementById('game-score').innerText = score;

    const bird = {
        x: 50, y: 150, w: 20, h: 20,
        gravity: 0.25, velocity: 0, jump: -4.6,
        draw() {
            ctx.fillStyle = "#eab308";
            ctx.fillRect(this.x, this.y, this.w, this.h);
        },
        update() {
            this.velocity += this.gravity;
            this.y += this.velocity;
            if (this.y + this.h >= canvas.height || this.y <= 0) {
                gameOver = true;
            }
        },
        flap() { this.velocity = this.jump; }
    };

    const pipes = {
        position: [],
        w: 40, gap: 120, dx: 2,
        draw() {
            for (let i = 0; i < this.position.length; i++) {
                let p = this.position[i];
                let topY = p.y;
                let bottomY = p.y + this.gap;
                ctx.fillStyle = "#22c55e";
                ctx.fillRect(p.x, 0, this.w, topY);
                ctx.fillRect(p.x, bottomY, this.w, canvas.height - bottomY);
            }
        },
        update() {
            if (frames % 100 == 0) {
                this.position.push({
                    x: canvas.width,
                    y: Math.max(50, Math.random() * (canvas.height - this.gap - 50))
                });
            }
            for (let i = 0; i < this.position.length; i++) {
                let p = this.position[i];
                p.x -= this.dx;

                // Collision
                let bottomPipeYPos = p.y + this.gap;
                if (bird.x + bird.w > p.x && bird.x < p.x + this.w && 
                    (bird.y < p.y || bird.y + bird.h > bottomPipeYPos)) {
                    gameOver = true;
                }

                if (p.x == 50) {
                    score++;
                    if (window.SoundManager) window.SoundManager.playClick();
                    document.getElementById('game-score').innerText = score;
                    if (window.AchievementManager) window.AchievementManager.trackScore('flappy', score);
                }

                if (p.x + this.w <= 0) {
                    this.position.shift();
                }
            }
        }
    };

    const handleClick = () => {
        if (!gameOver) bird.flap();
    };
    canvas.addEventListener('mousedown', handleClick);
    
    document.getElementById('game-restart-btn').onclick = () => {
        cancelAnimationFrame(gameLoop);
        window.initFlappy();
    };

    function loop() {
        if (gameOver) {
            if (window.SoundManager) window.SoundManager.playLose();
            if (window.AchievementManager) window.AchievementManager.trackLoss('flappy');
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fillRect(0,0,canvas.width,canvas.height);
            ctx.fillStyle = "white";
            ctx.font = "30px Inter";
            ctx.fillText("Game Over", 80, 240);
            return;
        }

        ctx.fillStyle = "#0ea5e9";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        bird.draw();
        bird.update();
        pipes.draw();
        pipes.update();

        frames++;
        gameLoop = requestAnimationFrame(loop);
    }

    loop();

    return {
        cleanup: () => {
            cancelAnimationFrame(gameLoop);
            canvas.removeEventListener('mousedown', handleClick);
        }
    };
};
