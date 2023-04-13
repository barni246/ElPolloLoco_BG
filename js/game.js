let canvas;
let world;
let keyboard = new Keyboard();




function init() {

    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);


}



function fullScreenToggle() {
    let fullscreen = document.getElementById('fullScreen');
    enterFullscreen(fullscreen);

    document.getElementById('h1').style.display = "none";
    document.getElementById('button').style.display = "none";
    document.getElementById('exit').style.display = "flex";
    document.getElementById('canvas').style.width = "100%";
    document.getElementById('fullScreen').style.border = "unset";
    console.log('Fullscreen')
}

function exit() {
    exitFullscreen();
    document.getElementById('exit').style.display = "none";
    document.getElementById('h1').style.display = "block";
    document.getElementById('button').style.display = "flex";
    document.getElementById('fullScreen').style.border = " 6px solid #467b46";

}
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();

    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();

    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();

    }


}


window.addEventListener('keydown', (e) => {
    if (e.code == 'ArrowRight') {
        keyboard.RIGHT = true;

    }

    if (e.code == 'ArrowLeft') {
        keyboard.LEFT = true;
    }

    if (e.code == 'ArrowUp') {
        keyboard.UP = true;
    }

    if (e.code == 'ArrowDown') {
        keyboard.DOWN = true;
    }

    if (e.code == 'Space') {
        keyboard.SPACE = true;
    }
    // if (e.code == 'KeyB') {
    //     keyboard.KEYB = true;
    // }
    if (e.code == 'KeyD') {
        keyboard.KEYD = true;
    }
    // console.log(e);
});

window.addEventListener('keyup', (e) => {
    if (e.code == 'ArrowRight') {
        keyboard.RIGHT = false;
    }

    if (e.code == 'ArrowLeft') {
        keyboard.LEFT = false;
    }

    if (e.code == 'ArrowUp') {
        keyboard.UP = false;
    }

    if (e.code == 'ArrowDown') {
        keyboard.DOWN = false;
    }

    if (e.code == 'Space') {
        keyboard.SPACE = false;
    }

    // if (e.code == 'KeyB') {
    //     keyboard.KEYB = false;
    // }

    if (e.code == 'KeyD') {
        keyboard.KEYD = false;
    }
});

//console.log('game.js: ',level1.clouds);

