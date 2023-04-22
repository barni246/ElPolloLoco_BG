let canvas;
let world;
let keyboard = new Keyboard();
let headHit = 0;
let endBossStands;
let soundOn = true;
mariachi = new Audio('audio/mariachi.mp3');
mariachi.volume = 0.1;
mariachi.loop = true;
mariachi.currentTime = 0;
let gameStarted = false;


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

 function startAgain() {
    gameStarted = true;
    soundCheck();
     if(soundOn) {
        if(mariachi.paused) {
            mariachi.play();
             mariachi.currentTime = 0;
        }else {
            mariachi.play(); 
        }
    }
    headHit = 0;
    checkFullscreenStart = false;
    checkFullscreenGame = false;
    checkFullscreenGameOver = false;
    startGame();
    document.getElementById('gameOverContainer').style.display = "none";
    document.getElementById('gameOverContainer').classList.remove('game-over');
   }



function startGame() {
    gameStarted = true;
    soundCheck();
    if(soundOn) {
        if(mariachi.paused) {
          
             mariachi.play();
             mariachi.currentTime = 0;
        }else {
            mariachi.play(); 
        }
    }
   
   
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
 
function soundCheck() {
    setInterval(() => {
        soundOn;
}, 50);
}

function setSoundMariachi(){
    
}


function doSoundOff() {
    soundOn = false;
    document.getElementById('soundOnIcon').classList.add('d-none');
    document.getElementById('soundOffIcon').classList.remove('d-none');
    mariachi.pause();
}

function doSoundOn() {
    soundOn = true;
    document.getElementById('soundOnIcon').classList.remove('d-none');
    document.getElementById('soundOffIcon').classList.add('d-none');
    if( gameStarted ) {
         mariachi.play();
    }
   
    //mariachi.currentTime = 0;
}





