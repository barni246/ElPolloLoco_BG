let canvas;
let world;
let keyboard = new Keyboard();
let headHit = 0;
let endBossStands;
let soundOn = true;
let gameStarted = false;
mariachi = new Audio('audio/mariachi.mp3');
mariachi.volume = 0.1;
mariachi.loop = true;
mariachi.currentTime = 0;
let barni;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


// Starting the game: sound, animation of figure, screen checked
function startGame() {
    gameStarted = true;
    soundMariachi();
    initLevel();
    setTimeout(() => {
        if (checkFullscreenStart || checkFullscreenGame || checkFullscreenGameOver) {
            fullScreenGame();
            init();
            startStyle();
        } else {
            init();
            startStyle();
        }
    }, 100);
}


// The start page doesn't load again, just the game
function startAgain() {
    gameStarted = true;
    soundMariachi();
    headHit = 0;
    checkFullscreenStart = false;
    checkFullscreenGame = false;
    checkFullscreenGameOver = false;
    startGame();
    document.getElementById('gameOverContainer').style.display = "none";
    document.getElementById('gameOverContainer').classList.remove('game-over');
}


// The time for loadig of start page is covered
function startStyle() {
    let startContainer = document.getElementById('startContainer');
    startContainer.classList.add('startOpacity');
    setTimeout(() => { startContainer.style.display = "none"; }, 500);
}


// When sound of game paused, satr it playing
function soundMariachi() {
    if (soundOn) {
        if (mariachi.paused) {
            mariachi.play();
            mariachi.currentTime = 0;
        } else {
            mariachi.play();
        }
    }
}


// Load the start page again
function finish() {
    window.location.href = "index.html"
}


// Show information container
function gameInformation() {
    document.getElementById('popUpContainer').classList.toggle('d-none');
    document.getElementById('gameInformation').classList.toggle('d-none');
    document.getElementById('infoExit').classList.toggle('d-none');
}


// It makes sound off and changes sound icon for off
function doSoundOff() {
    soundOn = false;
    document.getElementById('soundOnIcon').classList.add('d-none');
    document.getElementById('soundOffIcon').classList.remove('d-none');
    mariachi.pause();
}


// It makes sound on and changes sound icon for on
function doSoundOn() {
    soundOn = true;
    document.getElementById('soundOnIcon').classList.remove('d-none');
    document.getElementById('soundOffIcon').classList.add('d-none');
    if (gameStarted) {
        mariachi.play();
    }
}


// Keydown registration for applied keys
window.addEventListener('keydown', (e) => {
    if (e.code == 'ArrowRight') {
        keyboard.RIGHT = true;
        barni = true;
    }

    if (e.code == 'ArrowLeft') {
        keyboard.LEFT = true;
        barni = true;
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


// Keyup registration for applied keys
window.addEventListener('keyup', (e) => {
    if (e.code == 'ArrowRight') {
        keyboard.RIGHT = false;
        barni = false;
    }

    if (e.code == 'ArrowLeft') {
        keyboard.LEFT = false;
        barni = false;
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


// Touchstart registration for applied keys
document.addEventListener('touchstart', e => {
    [...e.changedTouches].forEach(touch => {
        const button = touch.target.id;
        if(button == 'btnRight') {
            keyboard.RIGHT = true;
        }
        if(button == 'btnLeft') {
            keyboard.LEFT = true;
        }
        if(button == 'btnJump') {
            keyboard.SPACE = true;
        }
        if(button == 'btnThrow') {
            keyboard.KEYD = true;
        }
    } )
});


// Touchend registration for applied keys
document.addEventListener('touchend', e => {
    [...e.changedTouches].forEach(touch => {
        const button = touch.target.id;
        if(button == 'btnRight') {
            keyboard.RIGHT = false;
        }
        if(button == 'btnLeft') {
            keyboard.LEFT = false;
        }
        if(button == 'btnJump') {
            keyboard.SPACE = false;
        }
        if(button == 'btnThrow') {
            keyboard.KEYD = false;
        }
    } )
});






