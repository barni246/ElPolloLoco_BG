let canvas;
let world;
let keyboard = new Keyboard();
let headHit = 0;
let endBossStands;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

 function startAgain() {
    headHit = 0;
    checkFullscreenStart = false;
    checkFullscreenGame = false;
    checkFullscreenGameOver = false;
    startGame();
    document.getElementById('gameOverContainer').style.display = "none";
    document.getElementById('gameOverContainer').classList.remove('game-over');
   
  
}


function startGame() {
    headHit = 0;
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





