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
    stop = true
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


    throwableBottlesThrow() {
        this.throwableObjects[this.indexOfThrowObject].x = this.character.x + 50;
        this.throwableObjects[this.indexOfThrowObject].y = this.character.y + 50;
        this.throwableObjects[this.indexOfThrowObject].throw();
    }


    percentageOfBottles() {
        this.character.percentageOfBottle -= 20;
        this.statusBarBottles.setPercentage(this.character.percentageOfBottle);
    }


    endBossNoHit() {
        this.stop = false;
        clearInterval(this.endBoss.endbossWalkingItv);
        this.endBoss.animateBossWalking();
        this.endBossStands = false;
        setTimeout(() => { this.throwableObjects = []; }, 5000);
    }


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


    checkCollisionEndBoss() {
        if (this.character.isColliding(this.endBoss)) {
            clearInterval(this.endBoss.endbossWalkingItv);
            clearInterval(this.endBoss.endBossComesItv);
            setTimeout(() => {
                document.getElementById('gameOverContainer').style.display = "flex";
            }, 2000);

        }
    }



    // If EndBoss dead
    checkEndBossDead() {
        if (headHit >= 3) {
            setTimeout(() => {
                document.getElementById('gameOverContainer').style.display = "flex";
                document.getElementById('gameOverContainer').classList.add('game-over');
            }, 2000);
        }
    }


    endBossAttack() {
        if (this.stop) {
            this.endBoss.animate();
        }
    }


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


    checkSmallEnemyDead() {
        if (this.character.y + this.character.height < this.ground) {
            this.level.smallEnemies.forEach((smallEnemy) => {
                if (this.character.isColliding(smallEnemy) && smallEnemy.y + smallEnemy.height < this.ground) {
                    console.log(smallEnemy.y + smallEnemy.height);
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

    stopSmallEnemiesMovingInterval(smallEnemy) {
        clearInterval(smallEnemy.jumpLeftItv);
        clearInterval(smallEnemy.walkingSmallChickenItv);
    }


    checkEnemyDead() {
        if (this.character.y + this.character.height < this.ground) {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
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


    stopEnemiesMovingInterval(enemy) {
        clearInterval(enemy.chickenMoveLeftItv);
        clearInterval(enemy.chickenWalkingItv);
    }


    checkBottleCollisions() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                bottle.y = 1000;
                this.character.percentageOfBottle += 20;
                this.statusBarBottles.setPercentage(this.character.percentageOfBottle);
                let bottleThrow = new ThrowableObject(this.character.x, this.character.y + 1000);
                this.throwableObjects.push(bottleThrow);
                this.level.bottles.splice(index, 1);

            }
        });
    }


    checkCoinCollisions() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.character.percentageOfCoins += 20;
                this.statusBarCoins.setPercentageCoins(this.character.percentageOfCoins);
                coin.y = 1000;
            }
        });
    }


    characterKillsEndboss() {
        this.character.energy = 100;
        this.statusBar.setPercentage(this.character.energy);
        clearInterval(this.headHitItv);
        clearInterval(this.endBoss.endbossWalkingItv);
        this.endBoss.animateBoss();
        this.checkEndBossDead();
    }


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


    draw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        //(space for fixed objects)
        this.ctx.translate(-this.camera_x, 0); // Back 

        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarCoins);
        this.ctx.font = "22px Arial";
        this.ctx.fillText("left", 300, 50);
        this.ctx.fillText("right", 400, 50);
        this.ctx.fillText("jump", 500, 50);
        this.ctx.fillText("throw", 600, 50);

        this.ctx.translate(this.camera_x, 0); // Forwards

        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.smallEnemies);
        this.addObjectsToMap(this.level.enemies);

        if (this.GAME_OVER) {
            this.ctx.font = "70px Arial";
            this.ctx.fillText("Congratulation!", this.character.x + 80, this.character.y + 30);
            this.ctx.fillStyle = "red";
            //this.ctx.textAlign = "center";
        }
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);

        // draw() wird immer wieder aufgerufen, und this ist unbekannt für function von requestAnimationFrame(), deshalb ist self da
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