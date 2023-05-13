let checkFullscreenStart = false;
let checkFullscreenGame = false;
let checkFullscreenGameOver = false;
let portrait = false;


// It hides fullscreen icon
function fullScreenIconHide() {
    document.getElementById('fullScreenStart').style.display = "none";
    document.getElementById('fullScreenGame').style.display = "none";
    document.getElementById('fullScreenGameOver').style.display = "none";
}


// It makes exit-fullscreen icon visible
function exitFullScrenIconVisible() {
    document.getElementById('exitFullScreenStart').style.display = "block";
    document.getElementById('exitFullScreenGame').style.display = "block";
    document.getElementById('exitFullScreenGameOver').style.display = "block";
}


// It hides exit-fullscreen icon
function exitFullScrenIconHide() {
    document.getElementById('exitFullScreenStart').style.display = "none";
    document.getElementById('exitFullScreenGame').style.display = "none";
    document.getElementById('exitFullScreenGameOver').style.display = "none";
}


// It makes exit-fullscreen icon visible
function fullScreenIconVisible() {
    document.getElementById('fullScreenStart').style.display = "block";
    document.getElementById('fullScreenGame').style.display = "block";
    document.getElementById('fullScreenGameOver').style.display = "block";
}


// It hides title "El Pollo Loco"
function headlineGameHide() {
    document.getElementById('h1').style.display = "none";
}


// It makes title "El Pollo Loco" visible
function headlineGameVisible() {
    document.getElementById('h1').style.display = "block";
}


// It hides wrapper container: border
function wrapperBorderHide() {
    document.getElementById('wrapper').style.border = "unset";
}


// It makes wrapper container wisible: border
function wrapperBorderVisible() {
    document.getElementById('wrapper').style.border = "6px solid #467b46";
}


// Start container set-up for fullscreen modus
function fullScreenStart() {
    checkFullscreenStart = true;
    let startContainer = document.getElementById('wrapper');
    enterFullscreen(startContainer);
    headlineGameHide();
    document.getElementById('startContainer').style.borderRadius = "0px";
    startContainer.style.width = "100%";
    startContainer.style.height = "100%";
    wrapperBorderHide();
    fullScreenIconHide();
    exitFullScrenIconVisible();
}


// Start container set-up for exit-fullscreen modus, canvas is default
function exitFullScreenStart() {
    checkFullscreenStart = false;
    exitFullscreen();
    headlineGameVisible();
    wrapperBorderVisible();
    document.getElementById('startContainer').style.borderRadius = "7px";
    document.getElementById('wrapper').style.width = "720px";
    document.getElementById('wrapper').style.height = "480px";
    exitFullScrenIconHide();
    fullScreenIconVisible();
}


// Game container set-up for fullscreen modus
function fullScreenGame() {
    let wrapper = document.getElementById('wrapper'); // wrapper
    enterFullscreen(wrapper);
    checkFullscreenGame = true;
    headlineGameHide();
    document.getElementById('canvas').style.width = "100%";
    document.getElementById('canvas').style.borderRadius = "0px";
    wrapper.style.width = "100%";
    wrapper.style.height = "100%";
    wrapperBorderHide();
    fullScreenIconHide();
    exitFullScrenIconVisible();
}


// Game container set-up for exit-fullscreen modus, canvas is default
function exitFullScreenGame() {
    exitFullscreen();
    checkFullscreenGame = false;
    headlineGameVisible();
    wrapperBorderVisible();
    document.getElementById('canvas').style.borderRadius = "7px";
    document.getElementById('wrapper').style.borderRadius = "13px";
    document.getElementById('wrapper').style.width = "720px";
    document.getElementById('wrapper').style.height = "480px";
    exitFullScrenIconHide();
    fullScreenIconVisible();
}


// Game over container set-up for fullscreen modus
function fullScreenGameOver() {
    let gameOverContainer = document.getElementById('wrapper');
    enterFullscreen(gameOverContainer);
    checkFullscreenGameOver = true;
    headlineGameHide();
    document.getElementById('canvas').style.width = "100%";
    document.getElementById('wrapper').style.borderRadius = "0px";
    document.getElementById('gameOverContainer').style.borderRadius = "0px";
    gameOverContainer.style.width = "100%";
    gameOverContainer.style.height = "100%";
    wrapperBorderHide();
    fullScreenIconHide();
    exitFullScrenIconVisible();
}


// Game over container set-up for exit-fullscreen modus, canvas is default
function exitFullScreenGameOver() {
    window.exitFullscreen();
    checkFullscreenGameOver = false;
    headlineGameVisible();
    wrapperBorderVisible();
    document.getElementById('canvas').style.borderRadius = "7px";
    document.getElementById('wrapper').style.borderRadius = "13px";
    document.getElementById('gameOverContainer').style.borderRadius = "7px";
    document.getElementById('wrapper').style.width = "720px";
    document.getElementById('wrapper').style.height = "480px";
    exitFullScrenIconHide();
    fullScreenIconVisible();
}


// It makes fullscreen from default canvas
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}


// It makes  canvas size default
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}


// When window is as wide as its height, user gets hint to turn it
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
});


// When the start page loads, it checks whether window orientation,
// if portrait, user gets hint to turn it
function portraitChecker() {
    const portrait = window.matchMedia("(orientation: portrait)").matches;
    if (portrait) {
        document.getElementById('landscapeAlert').style.display = "flex";
    } else {
        document.getElementById('landscapeAlert').style.display = "none";
    }
}


