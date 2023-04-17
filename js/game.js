let canvas;
let world;
let keyboard = new Keyboard();
let checkFullscreenStart = false;
let checkFullscreenGame = false;
let checkFullscreenGameOver = false;
let portrait = false;
//const portrait = window.matchMedia("(orientation: portrait)").matches;




function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

}

function startAgain() {
    checkFullscreenStart = false;
    checkFullscreenGame = false;
    checkFullscreenGameOver = false;
    startGame();
    document.getElementById('gameOverContainer').style.display = "none";
}

function startGame() {
    let startContainer = document.getElementById('startContainer');
    initLevel();
    setTimeout(() => {
        if (checkFullscreenStart) {
            fullScreenGame();
            init();
            startContainer.classList.add('startOpacity');
            setTimeout(() => { startContainer.style.display = "none"; }, 500);
        } else {
            init();
            startContainer.classList.add('startOpacity');
            setTimeout(() => { startContainer.style.display = "none"; }, 500);
        }
    }, 100);
}


function fullScreenStart() {
    checkFullscreenStart = true;
    let startContainer = document.getElementById('wrapper');
    enterFullscreen(startContainer);
    document.getElementById('h1').style.display = "none";
    //document.getElementById('fullScreenStart').style.display = "none";
    document.getElementById('startContainer').style.borderRadius = "0px";
    document.getElementById('exitFullScreenStart').style.display = "flex";
    document.getElementById('canvas').style.width = "100%";
    document.getElementById('wrapper').style.border = "unset";

    document.getElementById('fullScreenStart').style.display = "none";
    document.getElementById('fullScreenGame').style.display = "none";
    document.getElementById('fullScreenGameOver').style.display ="none";

    document.getElementById('exitFullScreenStart').style.display = "block";
    document.getElementById('exitFullScreenGame').style.display = "block";
    document.getElementById('exitFullScreenGameOver').style.display = "block";

}


function exitFullScreenStart() {
    checkFullscreenStart = false;
    exitFullscreen();
    document.getElementById('exitFullScreenStart').style.display = "none";
    document.getElementById('h1').style.display = "block";
    document.getElementById('fullScreenStart').style.display = "flex";
    document.getElementById('wrapper').style.border = " 6px solid #467b46";
    document.getElementById('startContainer').style.borderRadius = "13px";

    document.getElementById('exitFullScreenStart').style.display = "none";
    document.getElementById('exitFullScreenGame').style.display = "none";
    document.getElementById('exitFullScreenGameOver').style.display = "none";

    document.getElementById('fullScreenStart').style.display = "block";
    document.getElementById('fullScreenGame').style.display = "block";
    document.getElementById('fullScreenGameOver').style.display ="block";


}


function fullScreenGame() {
    let wrapper = document.getElementById('wrapper');
    enterFullscreen(wrapper);
    checkFullscreenGame = true;
    document.getElementById('h1').style.display = "none";
   // document.getElementById('fullScreenGame').style.display = "none";
   // document.getElementById('exitFullScreenGame').style.display = "block";
    document.getElementById('canvas').style.width = "100%";
    document.getElementById('canvas').style.borderRadius = "0px";
    document.getElementById('wrapper').style.border = "unset";
   // document.getElementById('fullScreenGameOver').classList.add('d-none');
    //document.getElementById('exitFullScreenGameOver').style.display = "block";

    document.getElementById('fullScreenStart').style.display = "none";
    document.getElementById('fullScreenGame').style.display = "none";
    document.getElementById('fullScreenGameOver').style.display ="none";

    document.getElementById('exitFullScreenStart').style.display = "block";
    document.getElementById('exitFullScreenGame').style.display = "block";
    document.getElementById('exitFullScreenGameOver').style.display = "block";
}


function exitFullScreenGame() {
    exitFullscreen();
    checkFullscreenGame = false;
    document.getElementById('exitFullScreenGame').style.display = "none";
    document.getElementById('h1').style.display = "block";
    document.getElementById('fullScreenGame').style.display = "flex";
    document.getElementById('wrapper').style.border = " 6px solid #467b46";
    document.getElementById('canvas').style.borderRadius = "8px";
    document.getElementById('wrapper').style.borderRadius = "13px";
    document.getElementById('exitFullScreenGameOver').style.display = "none";
    document.getElementById('fullScreenGameOver').classList.remove('d-none');

    document.getElementById('exitFullScreenStart').style.display = "none";
    document.getElementById('exitFullScreenGame').style.display = "none";
    document.getElementById('exitFullScreenGameOver').style.display = "none";

    document.getElementById('fullScreenStart').style.display = "block";
    document.getElementById('fullScreenGame').style.display = "block";
    document.getElementById('fullScreenGameOver').style.display ="block";
}


function fullScreenGameOver() {
    let gameOverContainer = document.getElementById('wrapper');
    enterFullscreen(gameOverContainer);
    checkFullscreenGameOver = true;
    document.getElementById('h1').style.display = "none";
    //document.getElementById('fullScreenGameOver').style.display ="none";
   // document.getElementById('exitFullScreenGameOver').style.display = "block";
    document.getElementById('canvas').style.width = "100%";
    document.getElementById('wrapper').style.borderRadius = "0px";
    document.getElementById('gameOverContainer').style.borderRadius = "0px";
    document.getElementById('wrapper').style.border = "unset";
    //document.getElementById('exitFullScreenGame').style.display = "block";

    document.getElementById('fullScreenStart').style.display = "none";
    document.getElementById('fullScreenGame').style.display = "none";
    document.getElementById('fullScreenGameOver').style.display ="none";

    document.getElementById('exitFullScreenStart').style.display = "block";
    document.getElementById('exitFullScreenGame').style.display = "block";
    document.getElementById('exitFullScreenGameOver').style.display = "block";
}


function exitFullScreenGameOver() {
    window.exitFullscreen();
    checkFullscreenGameOver = false;
    //document.getElementById('exitFullScreenGameOver').style.display = "none";
    document.getElementById('h1').style.display = "block";
   // document.getElementById('fullScreenGameOver').style.display = "block";
    document.getElementById('wrapper').style.border = " 6px solid #467b46";
    document.getElementById('wrapper').style.borderRadius = "13px";
    //document.getElementById('exitFullScreenGame').style.display = "none";
    document.getElementById('fullScreenGame').style.display = "flex";
    document.getElementById('gameOverContainer').style.borderRadius = "8px";

    document.getElementById('exitFullScreenStart').style.display = "none";
    document.getElementById('exitFullScreenGame').style.display = "none";
    document.getElementById('exitFullScreenGameOver').style.display = "none";

    document.getElementById('fullScreenStart').style.display = "block";
    document.getElementById('fullScreenGame').style.display = "block";
    document.getElementById('fullScreenGameOver').style.display = "block";
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


window.matchMedia("(orientation: portrait)").addEventListener("change", screen => {
    const landscapeAlert = document.getElementById('landscapeAlert')
    portrait = screen.matches;
    if (portrait) {
        if (checkFullscreenStart) {
            exitFullScreenStart();
            landscapeAlert.style.display = "flex";
        } else if (checkFullscreenGame) {
            exitFullScreenGame();
        } else if (checkFullscreenGameOver) {
            exitFullScreenGameOver();
        }
        landscapeAlert.style.display = "flex";
    } else {
        landscapeAlert.style.display = "none";
    }
})


