class World {
    character = new Character();
    statusBar = new StatusBar();
    statusBarBottles = new StatusBarBottles();
    statusBarCoins = new StatusBarCoins();
    arrayBottle = [220, 790, 1390, 1890, 2900];
    arrayCoins = [450, 950, 780, 1700, 2500];
    level = level1;
    throwableObjects = [];
    ground = 425;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    img;
    chickenDeadItv;
    headHitItv;
    endBossDead;
    endBoss = this.level.enemies[5];
    endBossStands = true;
    imageCache = {};
    currentImage;
    indexOfThrowObject = 0;
    runItv;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.run2();
        this.setClouds();
        this.sortBottles();
        this.sortCoins();
    }



    sortBottles() {
        for (let index = 0; index < this.level.bottles.length; index++) {
            const bottle = this.level.bottles[index];
            // bottle.x = bottle.x + (Math.random() * 500);
            bottle.x = bottle.x + this.arrayBottle[index];

        }
    }



    sortCoins() {
        for (let index = 0; index < this.level.coins.length; index++) {
            const coin = this.level.coins[index];
            //coin.x = coin.x + ((Math.random() * 500));
            coin.x = coin.x + this.arrayBottle[index];

        }
    }


    setClouds() {

        this.level.clouds.forEach((cloud, i) => {
            cloud.x = i * 900;
            if (i >= 2) {
                i = 0;
            }
        });
        setInterval(() => {

            for (let index = 0; index < this.level.clouds.length; index++) {
                const cloud = this.level.clouds[index];
                cloud.x -= 1;
                if (cloud.x < this.character.x - 650) {
                    cloud.x = this.character.x + 650;
                }

            }
        }, 25);
    }


    setWorld() {
        this.character.world = this;
    }


    run() {

        this.runItv = setInterval(() => {
            this.checkCollisions();
            this.checkCollisionsSmallChicken();
            this.checkCollisionEndBoss();
            this.checkBottleCollisions();
            this.checkThrowObjects();
            this.checkCoinCollisions();
            this.checkThrowObjectCollision();
            this.operations();
        }, 100);
    }


    run2() {
        setInterval(() => {
            this.checkSmallEnemyDead();
            this.checkEnemyDead();

        }, 40);
    }


    // Character throws a bottle
    throwableBottlesThrow() {
        this.throwableObjects[this.indexOfThrowObject].x = this.character.x + 50;
        this.throwableObjects[this.indexOfThrowObject].y = this.character.y + 50;
        this.throwableObjects[this.indexOfThrowObject].throw();
    }


    // Statusbar reduces thrown bottle
    percentageOfBottles() {
        this.character.percentageOfBottle -= 20;
        this.statusBarBottles.setPercentage(this.character.percentageOfBottle);
    }


    // EndBoss starts to walk left
    endBossNoHit() {
        clearInterval(this.endBoss.endbossWalkingItv);
        this.endBoss.animateBossWalking();
        this.endBossStands = false;
        if (soundOn) {
            if (this.endBoss.endBossBattleSound.paused) {
                this.endBoss.endBossBattleSound.play();
            } else {
                this.endBoss.endBossBattleSound.play();
            }
        }
        setTimeout(() => { this.throwableObjects = []; }, 5000);
    }


    // Is there still a bottle available ? If so than to throw it, if not and
    // not hit, endBoss starts to walk left
    checkThrowObjects() {
        if (this.keyboard.KEYD &&
            this.throwableObjects.length >= 1 &&
            this.indexOfThrowObject < this.throwableObjects.length &&
            this.character.otherDirection == false) {
            this.throwableBottlesThrow()
            this.percentageOfBottles();
            this.indexOfThrowObject++;
        } else if (
            this.indexOfThrowObject == this.throwableObjects.length &&
            this.level.bottles.length == 0 &&
            headHit < 3) {
            setTimeout(() => {
                if (headHit < 3) {
                    this.endBossNoHit();
                }
            }, 1000);
        }
    }


    // Checking collision between character end endBoss
    checkCollisionEndBoss() {
        if (this.character.isColliding(this.endBoss)) {
            clearInterval(this.endBoss.endbossWalkingItv);
            clearInterval(this.endBoss.endBossComesItv);
            setTimeout(() => {
                document.getElementById('gameOverContainer').style.display = "flex";
                mariachi.pause();
                //this.endBoss.endBossBattleSound.pause();
            }, 2000);
            gameStarted = false;

        }
    }


    // If EndBoss dead, game over
    checkEndBossDead() {
        if (headHit >= 3) {

            setTimeout(() => {
                document.getElementById('gameOverContainer').style.display = "flex";
                document.getElementById('gameOverContainer').classList.add('game-over');
                mariachi.pause();
                this.character.energy = 100;
                clearInterval(this.runItv);
            }, 2000);
        }
        gameStarted = false;
    }


    // Checking collision between character and enemies (chicken)  
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.x + this.character.width > enemy.x &&
                this.character.x < enemy.x &&
                this.character.y + this.character.height == enemy.y + enemy.height) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
                this.statusBarBottles.setPercentage(this.character.percentageOfBottle);
                this.statusBarCoins.setPercentageCoins(this.character.percentageOfCoins);
            }


        });
    }


    IMAGES_DEAD_CHICKEN = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];


    // Checking dead from enemies (chicken), playing sound and dead images    ez a jo
    checkEnemyDead() {
        this.level.enemies.forEach((enemy, i) => {
            if (this.character.y + this.character.height > enemy.y &&
                this.character.y + this.character.height < enemy.y + enemy.height) {
                if (this.character.x + this.character.width > enemy.x && this.character.x < enemy.x ||
                    this.character.x + this.character.width > enemy.x + enemy.width && this.character.x < enemy.x ||
                    this.character.x + this.character.width > enemy.x + enemy.width && this.character.x > enemy.x &&
                    this.character.x < enemy.x + enemy.width) {
                    this.stopEnemiesMovingInterval(enemy);
                    this.IMAGES_DEAD_CHICKEN.forEach((path) => {
                        enemy.img.src = path;
                        enemy.speed = 0;
                        if (soundOn) { enemy.chickenDeadSound.play(); }
                        setInterval(() => {
                            if (enemy.y < 500) {
                                enemy.y += 10;
                            }
                        }, 50);
                    });
                }
            }
        });
    }




    // Create Interval from: enemies (chicken)
    stopEnemiesMovingInterval(enemy) {
        clearInterval(enemy.chickenMoveLeftItv);
        clearInterval(enemy.chickenWalkingItv);
    }


    // Checking collision between character and bottle to collect it
    checkBottleCollisions() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                bottle.y = 1000;
                this.character.percentageOfBottle += 20;
                this.statusBarBottles.setPercentage(this.character.percentageOfBottle);
                let bottleThrow = new ThrowableObject(this.character.x, this.character.y + 1000);
                this.throwableObjects.push(bottleThrow);
                this.level.bottles.splice(index, 1);
                if (soundOn) {
                    bottle.bottleSound.play();
                }
            }
        });
    }


    // Checking collision between character and coin to collect it
    checkCoinCollisions() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.character.percentageOfCoins += 20;
                this.statusBarCoins.setPercentageCoins(this.character.percentageOfCoins);
                coin.y = 1000;
                if (soundOn) {
                    coin.coinSound.volume = 0.2;
                    coin.coinSound.play();
                }

            }
        });
    }


    // EndBoss is dead, statusbar to 100%, intervals cleared
    characterKillsEndboss() {
        this.character.energy = 100;
        this.statusBar.setPercentage(this.character.energy);
        clearInterval(this.headHitItv);
        clearInterval(this.endBoss.endbossWalkingItv);
        this.endBoss.animateBoss();
        this.checkEndBossDead();
    }


    // Checking collision between endBoss and throwable bottle
    checkThrowObjectCollision() {
        for (let index = 0; index < this.throwableObjects.length; index++) {
            const throwBottle = this.throwableObjects[index];
            if (throwBottle.isColliding(this.endBoss) &&
                throwBottle.x + throwBottle.width > this.endBoss.x + 20) {
                headHit++;
                if (headHit < 4) {
                    this.headHitItv = setInterval(() => {
                        clearInterval(throwBottle.throwItv);
                        throwBottle.IMAGES_THROW_BOTTLES.forEach((path) => { throwBottle.img.src = path; });

                    }, 200);
                    if (headHit == 3) {
                        setTimeout(() => {
                            this.characterKillsEndboss();
                        }, 500);
                    }
                }
                else {
                    this.characterKillsEndboss();
                }
            }
        }
    }


    // Checking collision between character and small enemies (small chicken)      
    checkCollisionsSmallChicken() {
        this.level.smallEnemies.forEach((enemy) => {
            if (this.character.x + this.character.width > enemy.x &&
                this.character.x < enemy.x &&
                this.character.y + this.character.height == enemy.y + enemy.height) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
                this.statusBarBottles.setPercentage(this.character.percentageOfBottle);
                this.statusBarCoins.setPercentageCoins(this.character.percentageOfCoins);
            }


        });
    }


    // Character kills small chicken     
    checkSmallEnemyDead() {
        this.level.smallEnemies.forEach((smallEnemy) => {
            if (this.character.y + this.character.height > smallEnemy.y &&
                this.character.y + this.character.height < smallEnemy.y + smallEnemy.height) {
                if (this.character.x + this.character.width > smallEnemy.x && this.character.x < smallEnemy.x ||
                    this.character.x + this.character.width > smallEnemy.x + smallEnemy.width && this.character.x < smallEnemy.x ||
                    this.character.x + this.character.width > smallEnemy.x + smallEnemy.width && this.character.x > smallEnemy.x &&
                    this.character.x < smallEnemy.x + smallEnemy.width) {
                    if (soundOn) {
                        smallEnemy.smallChickenDeadSound.play();
                    }
                    smallEnemy.IMAGES_DEAD_SMALL_CHICKEN.forEach((path) => {
                        smallEnemy.img.src = path;
                        smallEnemy.speed = 0;
                        this.stopSmallEnemiesMovingInterval(smallEnemy);
                        setInterval(() => { if (smallEnemy.y < 500) { smallEnemy.y += 10; } }, 50);
                    });
                }
            }
        });
    }


    // Clear Intervall from: small chicken
    stopSmallEnemiesMovingInterval(smallEnemy) {
        clearInterval(smallEnemy.walkingSmallChickenItv);
    }


    // All statusbar add to canvas
    status() {
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarCoins);
    }


    operations() {
        if (innerWidth > 780) {
            this.ctx.font = "18px Londrina Solid";
            this.ctx.fillText("Arrow Left : left", 300, 50);
            this.ctx.fillText("Arrow Right : right", 300, 80);
            this.ctx.fillText("Space : jump", 500, 50);
            this.ctx.fillText("Key D : throw", 500, 80);
            this.ctx.fillStyle = "rgb(168, 43, 43)";
            //this.ctx.textAlign = "center";
        }

    }


    enemies() {
        this.addObjectsToMap(this.level.smallEnemies);
        this.addObjectsToMap(this.level.enemies);
    }


    bottles() {
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.bottles);
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0); // Back
        this.status();
        this.operations();
        this.ctx.translate(this.camera_x, 0); // Forwards

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.coins);
        this.enemies();
        this.bottles();
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);


        if (mo.otherDirection) {

            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }


}