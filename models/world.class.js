class World {
    character = new Character();
    statusBar = new StatusBar();
    statusBarBottles = new StatusBarBottles();
    statusBarCoins = new StatusBarCoins();

    level = level1;
    throwableObjects = [];
    ground = 420;
    canvas; // in dem Variable wird das Parameter "canvas" gespeichert, bzw hinzugefügt
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
    // stop = true
    indexOfThrowObject = 0;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.setClouds();
        this.sortBottles();
        this.sortCoins();
        this.sortSmallEnemies();

    }


    sortSmallEnemies() {
        this.level.smallEnemies.forEach((element, i) => {
            if (i == 1 || i == 3 || i == 5) {
                element.y = 300;
            }
            element.x = 1800 + (Math.random() * 500) + (Math.random() * 500) +
                ((Math.random() * 500)) + ((Math.random() * 500)) + (Math.random() * 1500);

        });

    }



    arrayBottle = [220, 790, 1390, 1890, 2900];
    sortBottles() {
        for (let index = 0; index < this.level.bottles.length; index++) {
            const bottle = this.level.bottles[index];
            // bottle.x = bottle.x + (Math.random() * 500);
            bottle.x = bottle.x + this.arrayBottle[index];

        }
    }


    arrayCoins = [450, 950, 780, 1700, 2500];
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

        setInterval(() => {
            this.checkCollisions();
            this.checkCoinCollisionsSmallChicken();
            this.checkSmallEnemyDead();
            this.checkCollisionEndBoss();
            //this.checkEndBossDead();
            this.checkBottleCollisions();
            this.checkThrowObjects();
            this.checkEnemyDead();
            this.checkCoinCollisions();
            this.checkThrowObjectCollision();

        }, 200);
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
        //this.stop = false;
        clearInterval(this.endBoss.endbossWalkingItv);
        this.endBoss.animateBossWalking();
        this.endBossStands = false;
        //    if(soundOn) {
        //     if(this.endBoss.endBossBattleSound.paused) {
        //       this.endBoss.endBossBattleSound.play();
        //     } else {
        //         this.endBoss.endBossBattleSound.play();
        //     }

        // }
        setTimeout(() => { this.throwableObjects = []; }, 5000);
    }

    // Is there still a bottle available ? If so than to throw it, if not and
    // not hit, endBoss starts to walk left
    checkThrowObjects() {
        if (this.keyboard.KEYD &&
            this.throwableObjects.length >= 1 &&
            this.indexOfThrowObject < this.throwableObjects.length) {
            this.throwableBottlesThrow()
            this.percentageOfBottles();
            this.indexOfThrowObject++;
        } else if (
            this.indexOfThrowObject == this.throwableObjects.length &&
            this.level.bottles.length == 0 &&
            headHit < 3) {
            this.endBossNoHit();

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
            }, 2000);
        }
        gameStarted = false;
    }


    // Checking collision between character and enemies (chicken)
    checkCollisions() {
        if (this.character.y + this.character.height >= this.ground) {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                    this.statusBarBottles.setPercentage(this.character.percentageOfBottle);
                    this.statusBarCoins.setPercentageCoins(this.character.percentageOfCoins);
                }
            });
        }
    }


    // Checking collision between character and small enemies (small chicken)
    checkCoinCollisionsSmallChicken() {
        if (this.character.y + this.character.height >= this.ground) {
            this.level.smallEnemies.forEach((smallEnemy) => {
                if (this.character.isColliding(smallEnemy)) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            });
        }
    }


    // Character kills small chicken
    checkSmallEnemyDead() {
        if (this.character.y + this.character.height < this.ground) {
            this.level.smallEnemies.forEach((smallEnemy) => {
                if (this.character.isColliding(smallEnemy) && smallEnemy.y + smallEnemy.height < this.ground) {
                    if (soundOn) {
                        smallEnemy.smallChickenDeadSound.play();
                    }
                    smallEnemy.IMAGES_DEAD_SMALL_CHICKEN.forEach((path) => {
                        smallEnemy.img.src = path;
                        smallEnemy.speed = 0;
                        this.stopSmallEnemiesMovingInterval(smallEnemy);
                        setInterval(() => { smallEnemy.y += 10; }, 50);
                    });
                }

            });
        }
    }


    // Create Intervall from: small chicken
    stopSmallEnemiesMovingInterval(smallEnemy) {
        clearInterval(smallEnemy.jumpLeftItv);
        clearInterval(smallEnemy.walkingSmallChickenItv);
    }


    // Checking dead from enemies (chicken), playing sound and dead images
    checkEnemyDead() {
        if (this.character.y + this.character.height < this.ground) {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    if (soundOn) {
                        enemy.chickenDeadSound.volume = 0.5;
                        enemy.chickenDeadSound.play();
                    }
                    enemy.IMAGES_DEAD_CHICKEN.forEach((path) => {
                        enemy.img.src = path;
                        enemy.speed = 0;
                        this.stopEnemiesMovingInterval(enemy);
                        this.chickenDeadItv = setInterval(() => { enemy.y += 10; }, 50);
                    });
                }
                clearInterval(this.chickenDeadItv);

            });
        }
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
                if (headHit < 3) {
                    this.headHitItv = setInterval(() => {
                        throwBottle.IMAGES_THROW_BOTTLES.forEach((path) => { throwBottle.img.src = path; });
                    }, 50);
                }
                else {
                    this.characterKillsEndboss();
                }
            }
        }
    }


    // All statusbar add to canvas
    status() {
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarCoins);
    }

    operations() {
        this.ctx.font = "18px Londrina Solid";
        this.ctx.fillText("Arrow Left : left", 300, 50);
        this.ctx.fillText("Arrow Right : right", 300, 80);
        this.ctx.fillText("Space : jump", 500, 50);
        this.ctx.fillText("Key D : throw", 500, 80);
        this.ctx.fillStyle = "rgb(168, 43, 43)";
        //this.ctx.textAlign = "center";
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
        this.bottles();
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.coins);
        this.enemies();
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