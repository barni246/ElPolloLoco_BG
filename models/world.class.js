class World {
    character = new Character();
    level = level1;
    throwableObjects = [];
    bottles = [new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle()];
    coins = [new Coin(), new Coin(), new Coin(), new Coin(),new Coin()];
   
    ground = 420;
    //enemyDead = new Chicken();
    // enemies = level1.enemies ;
    // clouds = level1.clouds ;
    // backgroundObjects = level1.backgroundObjects ;
    canvas; // in dem Variable wird das Parameter "canvas" gespeichert, bzw hinzugefügt
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBarBottles = new StatusBarBottles();
    statusBarCoins = new StatusBarCoins();
    img;
    imageCache = {};
    chickenDeadItv;
    headHit = 0;
    headHitItv;
    endBossDead;

    IMAGES_DEAD_CHICKEN = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    IMAGES_THROW_BOTTLES = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    IMAGES_BOSS_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'

    ];


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
    }


    sortBottles() {
        for (let index = 0; index < this.bottles.length; index++) {
            const bottle = this.bottles[index];
            bottle.x = bottle.x + (Math.random() * 500);

        }
    }


    sortCoins() {
        for (let index = 0; index < this.coins.length; index++) {
            const coin = this.coins[index];
            coin.x = coin.x +  ((Math.random() * 500));

        }
    }



    setClouds() {
        setInterval(() => {
            for (let index = 0; index < this.level.clouds.length; index++) {
                const cloud = this.level.clouds[index];
                cloud.x -= 1;

                if (cloud.x < this.character.x - 550) {
                    cloud.x = this.character.x + 600;
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
            this.checkThrowObjects();
            this.checkEnemyDead();
            this.checkBottleCollisions();
            this.checkCoinCollisions();
            this.checkThrowObjectCollision();
        }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.KEYD && this.throwableObjects.length != 0) {

            this.throwableObjects[0].x = this.character.x + 50;
            this.throwableObjects[0].y = this.character.y + 50;
            this.throwableObjects[0].throw();
            setTimeout(() => {
                this.character.percentageOfBottle -= 20;
                this.statusBarBottles.setPercentage(this.character.percentageOfBottle);

                this.throwableObjects.splice(0, 1);
            }, 1000);

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
                    this.IMAGES_DEAD_CHICKEN.forEach((path) => {
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
        this.bottles.forEach(bottle => {
            if (this.character.isColliding(bottle, this.index)) {
                bottle.y = 1000;
                this.character.percentageOfBottle += 20;
                this.statusBarBottles.setPercentage(this.character.percentageOfBottle);
                let bottleThrow = new ThrowableObject(this.character.x, this.character.y + 1000);
                this.throwableObjects.push(bottleThrow);

            }
        });
    }


    checkCoinCollisions() {
        this.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.character.percentageOfCoins += 20;
                console.log('hurra hhh');
               this.statusBarCoins.setPercentageCoins(this.character.percentageOfCoins);
                coin.y = 1000;
               //this.coins.splice(index, 1);
               
            }
        });
    }

   

    checkThrowObjectCollision() {
        for (let index = 0; index < this.throwableObjects.length; index++) {
            const throwBottle = this.throwableObjects[index];
            if (throwBottle.isColliding(this.level.enemies[3]) &&
                throwBottle.x + throwBottle.width > this.level.enemies[3].x + 20) {
                this.headHit++;
                console.log('Kopf', this.headHit);
                if (this.headHit < 3) {
                    this.headHitItv = setInterval(() => {
                        this.IMAGES_THROW_BOTTLES.forEach((path) => { throwBottle.img.src = path; });
                    }, 50);

                } else {
                    this.character.energy = 100;
                    this.statusBar.setPercentage(this.character.energy);
                    clearInterval(this.headHitItv);
                    clearInterval(this.level.enemies[3].endbossWalkingItv);
                    this.endBossDead = setInterval(() => {
                        this.level.enemies[3].y += 5;
                        this.level.enemies[3].img.src = 'img/4_enemie_boss_chicken/5_dead/G26.png';
                 }, 20);

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


        this.ctx.translate(this.camera_x, 0); // Forwards
        this.addObjectsToMap(this.bottles);

        this.addToMap(this.character);


        //this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        // this.enemies.forEach(enemy => {
        //     this.addToMap(enemy);
        //     //this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
        // });

        // this.clouds.forEach(cloud => {
        //     this.addToMap(cloud);
        //     //this.ctx.drawImage(cloud.img, cloud.x, cloud.y, cloud.width, cloud.height);
        // });




        //this.addToMap(this.statusBar);
        this.addObjectsToMap(this.coins);
        this.addObjectsToMap(this.level.enemies);
        //this.addObjectsToMap(this.path);
        //this.addToMap(this.enemyDead);
        this.addObjectsToMap(this.throwableObjects);

        // this.backgroundObjects.forEach((bgo) => {
        //      this.addToMap(bgo);
        // });

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