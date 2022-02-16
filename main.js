const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d");
const PI = 3.14159
let px, py, pdx, pdy, pa, r, mx, my, mp, dof, rx, ry, ra, xo, yo, rightPressed, leftPressed, upPressed, downPressed, speed, map, mapx, mapy

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
    pa = 0
    pdx = 0
    pdy = 0

    px = 96
    py = 96

    speed = 3

    mapx = 8
    mapy = 8

    pdx = Math.cos(pa);
    pdy = Math.sin(pa) * 5
    r = 0
    mx = 0
    my = 0
    rx = 0
    ry = 0
    dof = 0
    xo = 0 
    yo = 0 
    mp = 0
    map = [
        1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1,
    ]
    canvas.style.fill = "white";
}

function drawPlayer() {
    ctx.fillStyle = "#0095DD";
    ctx.beginPath();
    ctx.arc(px, py, 3, 0, 2 * Math.PI, true);
    ctx.fill();
    console.log(ry)
    ctx.beginPath();
    ctx.moveTo(px, py)
    ctx.lineTo(px + pdx * 5, py + pdy * 5)
    ctx.stroke()
    ctx.fillStyle = "red";

    ctx.beginPath();
    ctx.moveTo(px, py)
    ctx.lineTo(rx, ry)
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(rx,ry, 3, 0, 2 * Math.PI, true);
    ctx.fill();


}

function degToRad(a) {
    return a * PI / 180.0;
}

function radToDeg(a) {
    return a / 180.0 / PI;
}

function drawMap2D() {
    let xo, yo
    for (let y = 0; y < mapy; y++) {
        for (let x = 0; x < mapx; x++) {
            if (map[y*mapx+x] == 1) ctx.fillStyle = "#0095DD"
            if (map[y*mapy+x] == 0) ctx.fillStyle = "transparent"

            ctx.beginPath();
            ctx.rect(x * 64, y * 64, 63, 63);
            ctx.fill();
        }
    }
}
function drawRays3D(){
    ra=pa
    for (let r = 0; r < 1; r++) {
        dof=0;
        let aTan=-1/Math.tan(ra);

        if(ra>PI){ry = Math.round(py>>6)<<6 - 0.0001; rx=(py-ry)*aTan+px; yo= 64; xo=-yo*aTan;}
        if(ra<PI){ry = Math.round(py>>6)<<6 + 64; rx=(py-ry)*aTan+px; yo= 64; xo=-yo*aTan;}
        if(ra==0 || ra==PI){rx=px; ry=py;dof=8;}
        while(dof<8){
            mx=rx>>6;my=ry>>6;mp=my*mapx+mx
            if(mp<mapx*mapy && map[mp]==1){dof = 8}
            else{ rx+=xo; ry+=yo; dof+=1}
        }
        }
    }
function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function movePlayer() {
    if (leftPressed) {
        pa -= 0.1;
        if (pa < 0) {
            pa += 2 * PI;
        }
        pdx = Math.cos(pa) * 5;
        pdy = Math.sin(pa) * 5
    }
    if (rightPressed) {
        pa += 0.1;
        if (pa > 2 * PI) {
            pa -= 2 * PI;
        }
        pdx = Math.cos(pa) * 5;
        pdy = Math.sin(pa) * 5
    }
    if (upPressed) {
        px += pdx;
        py += pdy
    }
    if (downPressed) {
        px -= pdx;
        py -= pdy
    }
}

init()
setInterval(() => {
    clear()
    drawRays3D()
    movePlayer()
    drawMap2D()
    drawPlayer()
}, 1000 / 60);