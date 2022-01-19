const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d");
const pi = 3.1415926535
let px, py, pdx, pdy, pa, rightPressed, leftPressed, upPressed, downPressed, speed, map, mapx, mapy

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
    if (e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    } else if (e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
    if (e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    } else if (e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
    }
}

function init() {
    // Player Positions
    px = 96
    py = 96
    speed = 3
    mapx = 8
    mapy = 8

    map = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 1, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ]
    canvas.style.fill = "white";
}

function drawPlayer() {
    ctx.fillStyle = "#0095DD";
    ctx.beginPath();
    ctx.arc(px, py, 3, 0, 2 * Math.PI, true);
    ctx.fill();
    console.log(pa)
    ctx.beginPath();
    ctx.moveTo(px,py)
    ctx.lineTo(px+pdx*5, py*pdy*5)
    ctx.stroke()
}

function drawMap2D() {
    let xo, yo
    for (let y = 0; y < mapy; y++) {
        for (let x = 0; x < mapx; x++) {
            if (map[y][x] == 1) ctx.fillStyle = "#0095DD"
            if (map[y][x] == 0) ctx.fillStyle = "transparent"

            ctx.beginPath();
            ctx.rect(x * 64, y * 64, 63, 63);
            ctx.fill();
        }
    }
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function movePlayer() {
    if (leftPressed) {pa -= 0.1; if(pa<0){ pa+=2*pi;} pdx = Math.cos(pa) * 5; pdy = Math.sin(pa) * 5}
    if (rightPressed){pa += 0.1; if(pa>2*pi){ pa-=2*pi;} pdx = Math.cos(pa) * 5; pdy = Math.sin(pa) * 5}
    // if (upPressed) px += pdx; py+=pdy
    // if (downPressed) px -= pdx; py-=pdy
}

init()
setInterval(() => {
    clear()
    drawMap2D()
    drawPlayer()
    movePlayer()
}, 1000 / 60);