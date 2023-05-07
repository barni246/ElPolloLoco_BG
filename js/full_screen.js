let checkFullscreenStart = false;
let checkFullscreenGame = false;
let checkFullscreenGameOver = false;
let portrait = false;


function fullScreenIconHide() {
    document.getElementById('fullScreenStart').style.display = "none";
    document.getElementById('fullScreenGame').style.display = "none";
    document.getElementById('fullScreenGameOver').style.display = "none";
}


function exitFullScrenIconVisible() {
    document.getElementById('exitFullScreenStart').style.display = "block";
    document.getElementById('exitFullScreenGame').style.display = "block";
    document.getElementById('exitFullScreenGameOver').style.display = "block";
}


function exitFullScrenIconHide() {
    document.getElementById('exitFullScreenStart').style.display = "none";
    document.getElementById('exitFullScreenGame').style.display = "none";
    document.getElementById('exitFullScreenGameOver').style.display = "none";
}


function fullScreenIconVisible() {
    document.getElementById('fullScreenStart').style.display = "block";
    document.getElementById('fullScreenGame').style.display = "block";
    document.getElementById('fullScreenGameOver').style.display = "block";
}

function headlineGameHide() {
    document.getElementById('h1').style.display = "none";
}

function headlineGameVisible() {
    document.getElementById('h1').style.display = "block";
}


function wrapperBorderHide() {
    document.getElementById('wrapper').style.border = "unset";
}


function wrapperBorderVisible() {
    document.getElementById('wrapper').style.border = "6px solid #467b46";
}

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


function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
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


function portraitChecker() {
    const portrait = window.matchMedia("(orientation: portrait)").matches;
    if (portrait) {
        document.getElementById('landscapeAlert').style.display = "flex";
    } else {
        document.getElementById('landscapeAlert').style.display = "none";
    }
}


