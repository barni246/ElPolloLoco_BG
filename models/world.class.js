class World {

    character = new Character();
    level = level1;
    // enemies = level1.enemies ;
    // clouds = level1.clouds ;
    // backgroundObjects = level1.backgroundObjects ;

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
        this.checkCollisions();
    }


    setWorld() {
        this.character.world = this;
    }

    checkCollisions() {
        setInterval(() => {
          this.level.enemies.forEach( (enemy)=>  {
                  if(this.character.isColliding(enemy))  {
                    //console.log('Collosion with Character ', enemy);
                    this.character.energy -= 5;
                    console.log('Collosion with Character, energy ', this.character.energy);
                  } 
          }); 
        }, 200);
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
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



        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
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
       mo.drawFrame(this.ctx);


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