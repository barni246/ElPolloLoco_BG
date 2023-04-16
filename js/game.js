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

async function startAgain() {
   if(checkFullscreenGameOver)  {
    fullScreenGame();
   }
   //window.location.reload();
  await  startGame();
  //document.getElementById('endContainer').style.display = "none";
  document.getElementById('gameOverContainer').style.display = "none";
}

function startGame() {
   
    initLevel();
    setTimeout(() => {
        if (checkFullscreenStart) {
            fullScreenGame();
            init();

           
            document.getElementById('startContainer').classList.add('startOpacity');
            setTimeout(() => {
                 document.getElementById('startContainer').style.display = "none";
            }, 500);
        } else {

            init();
            document.getElementById('startContainer').classList.add('startOpacity');
            setTimeout(() => {
                 document.getElementById('startContainer').style.display = "none";
            }, 500);
           
        }
    }, 100);

}


// Start-Seite
function fullScreenStart() {
    checkFullscreenStart = true;
    let startContainer = document.getElementById('wrapper');
    enterFullscreen(startContainer);

    document.getElementById('h1').style.display = "none";
    document.getElementById('fullScreenStart').style.display = "none";
    document.getElementById('startContainer').style.borderRadius = "0px";
    document.getElementById('exitFullScreenStart').style.display = "flex";
    document.getElementById('canvas').style.width = "100%";
    document.getElementById('wrapper').style.border = "unset";
}

function exitFullScreenStart() {
    checkFullscreenStart = false;
    exitFullscreen();
    document.getElementById('exitFullScreenStart').style.display = "none";
    document.getElementById('h1').style.display = "block";
    document.getElementById('fullScreenStart').style.display = "flex";
    document.getElementById('wrapper').style.border = " 6px solid #467b46";
    document.getElementById('startContainer').style.borderRadius = "13px";

}


// Das Spiel
function fullScreenGame() {
    let wrapper = document.getElementById('wrapper');
    enterFullscreen(wrapper);
    checkFullscreenGame = true;
    document.getElementById('h1').style.display = "none";
    document.getElementById('fullScreenGame').style.display = "none";
    document.getElementById('exitFullScreenGame').style.display = "block";
    document.getElementById('canvas').style.width = "100%";
    document.getElementById('canvas').style.borderRadius = "0px";
    document.getElementById('wrapper').style.border = "unset";
}

function exitFullScreenGame() {
    exitFullscreen();
    checkFullscreenGame = false;
    document.getElementById('exitFullScreenGame').style.display = "none";
    document.getElementById('h1').style.display = "block";
    document.getElementById('fullScreenGame').style.display = "flex";
    document.getElementById('wrapper').style.border = " 6px solid #467b46";
    document.getElementById('canvas').style.borderRadius = "13px";

}


function fullScreenGameOver() {

    let gameOverContainer = document.getElementById('gameOverContainer');
    enterFullscreen(gameOverContainer);
    checkFullscreenGameOver = true;
    document.getElementById('h1').style.display = "none";
    document.getElementById('fullScreenGameOver').style.display = "none";
    document.getElementById('exitFullScreenGameOver').style.display = "block";
    document.getElementById('canvas').style.width = "100%";
    document.getElementById('gameOverContainer').style.borderRadius = "0px";
    document.getElementById('wrapper').style.border = "unset";
}


function exitFullScreenGameOver() {
    exitFullscreen();
    checkFullscreenGameOver = false;
    document.getElementById('exitFullScreenGameOver').style.display = "none";
    document.getElementById('h1').style.display = "block";
    document.getElementById('fullScreenGameOver').style.display = "flex";
    document.getElementById('gameOverContainer').style.border = " 6px solid #467b46";
    document.getElementById('gameOverContainer').style.borderRadius = "13px";
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


// window.addEventListener("fullscreenchange", function() {
//   console.log('width',window.innerWidth);
//   console.log('height',window.innerHeight);

//     if (window.innerWidth <  window.innerHeight) {
// console.log('igen');
// exitFullScreenStart();
// exitFullScreenGame()
//     } else {
//         document.getElementById('landscapeAlert').style.display = "none";
//     }
//   });

//;
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


