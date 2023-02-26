class World {

    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    clouds = [
        new Cloud()
       
    ];
    backgroundObjects = [

        new BackgroundObject('img/5_background/layers/air.png', -719 ),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719 ),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719 ),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719 ),
       
        new BackgroundObject('img/5_background/layers/air.png', 0 ),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0 ),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0 ),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0 ),
        new BackgroundObject('img/5_background/layers/air.png', 719 ),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 ),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 ),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 ),

        new BackgroundObject('img/5_background/layers/air.png', 719*2 ),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*2 ),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*2 ),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*2 ),
        new BackgroundObject('img/5_background/layers/air.png', 719*3 ),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*3 ),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*3 ),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*3 ),
    ];
    canvas; // in dem Variable wird das Parameter "canvas" gespeichert, bzw hinzugefügt
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }


    setWorld() {
        this.character.world = this;
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.backgroundObjects);
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


        
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.enemies);
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
        if(mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);

        if(mo.otherDirection) {
            this.ctx.restore();
            mo.x = mo.x * -1;
            
        }
    }
}