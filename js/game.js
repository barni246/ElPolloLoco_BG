let canvas;
let world;
let keyboard = new Keyboard();
let checkFullscreen = false;



function init() {

    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);


}

function startGame() {
    if(checkFullscreen) {
        fullScreenGame();
         init();
    document.getElementById('startContainer').style.display ="none";
}else {
    init();
    document.getElementById('startContainer').style.display ="none";
}
    }
   



function fullScreenStart() {
    checkFullscreen = true;
    //let fullscreen = document.getElementById('fullScreen');
    let fullscreen = document.getElementById('startContainer');
   // enterFullscreen(fullscreen);
    enterFullscreen(fullscreen);

    document.getElementById('h1').style.display = "none" ;
    document.getElementById('buttonStart').style.display = "none";
    document.getElementById('exitStart').style.display = "block";
    document.getElementById('canvas').style.width = "100%";
    document.getElementById('fullScreen').style.border = "unset";
    console.log('Fullscreen')
}

function exitFullScreenStart() {
    checkFullscreen = false;
    exitFullscreen();
    document.getElementById('exitStart').style.display = "none";
    document.getElementById('h1').style.display = "block";
    document.getElementById('buttonStart').style.display = "flex";
    document.getElementById('fullScreen').style.border = " 6px solid #467b46";

}

function fullScreenGame() {
    //let fullscreen = document.getElementById('fullScreen');
    let fullscreen = document.getElementById('fullScreen');
   // enterFullscreen(fullscreen);
    enterFullscreen(fullscreen);

    document.getElementById('h1').style.display = "none";
    document.getElementById('buttonGame').style.display = "none";
    document.getElementById('exitGame').style.display = "block";
    document.getElementById('canvas').style.width = "100%";
    document.getElementById('fullScreen').style.border = "unset";
}

function exitFullScreenGame() {
    exitFullscreen();
    document.getElementById('exitGame').style.display = "none";
    document.getElementById('h1').style.display = "block";
    document.getElementById('buttonGame').style.display = "flex";
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


    if (e.code == 'KeyD') {
        keyboard.KEYD = false;
    }
});


