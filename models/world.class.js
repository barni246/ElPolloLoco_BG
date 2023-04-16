class World {
    character = new Character();
    level = level1;
    throwableObjects = [];
    ground = 420;
    canvas; // in dem Variable wird das Parameter "canvas" gespeichert, bzw hinzugefügt
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBarBottles = new StatusBarBottles();
    statusBarCoins = new StatusBarCoins();
    img;
    chickenDeadItv;
    headHitItv;
    endBossDead;
    endBoss = this.level.enemies[3];
   
   
    GAME_OVER = false;
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
        this.endBossAttack();
    }


    arrayBottle = [100, 350, 980, 1550, 1800];
    sortBottles() {
         for (let index = 0; index < this.level.bottles.length; index++) {
            const bottle = this.level.bottles[index];
            // bottle.x = bottle.x + (Math.random() * 500);
            bottle.x = bottle.x + this.arrayBottle[index];

        }
    }


    arrayCoins = [150, 250, 780, 1250, 1700];
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
            this.checkBottleCollisions();
            this.checkThrowObjects();
            this.checkEnemyDead();
            this.checkCoinCollisions();
            this.checkThrowObjectCollision();
        }, 200);
    }


    checkThrowObjects() {
        if (this.keyboard.KEYD &&
            this.throwableObjects.length >= 1 &&
            this.indexOfThrowObject < this.throwableObjects.length) {
            this.throwableObjects[this.indexOfThrowObject].x = this.character.x + 50;
            this.throwableObjects[this.indexOfThrowObject].y = this.character.y + 50;
            this.throwableObjects[this.indexOfThrowObject].throw();
            this.character.percentageOfBottle -= 20;
            this.statusBarBottles.setPercentage(this.character.percentageOfBottle);
            this.indexOfThrowObject++;
        } else if (
            this.indexOfThrowObject == this.throwableObjects.length &&
            this.level.bottles.length == 0 &&
            this.endBoss.headHit < 3) {
            this.stop = false;
            this.endBoss.animateBossWalking();
            setTimeout(() => { this.throwableObjects = []; }, 5000);
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


    checkThrowObjectCollision() {
        for (let index = 0; index < this.throwableObjects.length; index++) {
            const throwBottle = this.throwableObjects[index];
            if (throwBottle.isColliding(this.endBoss) &&
                throwBottle.x + throwBottle.width > this.endBoss.x + 20) {
                this.endBoss.headHit++;
                //console.log('Kopf', this.endBoss.headHit);
                if (this.endBoss.headHit < 3) {
                    this.headHitItv = setInterval(() => {
                        throwBottle.IMAGES_THROW_BOTTLES.forEach((path) => { throwBottle.img.src = path; });
                    }, 50);
                }
                else {
                    this.character.energy = 100;
                    this.statusBar.setPercentage(this.character.energy);
                    clearInterval(this.headHitItv);
                    clearInterval(this.endBoss.endbossWalkingItv);
                    this.endBoss.animateBoss();
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
        this.addObjectsToMap(this.level.enemies);
        if (this.GAME_OVER) {
            this.ctx.font = "60px Arial";
            this.ctx.fillText("GAME OVER", this.character.x + 80, this.character.y + 30);
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