class MovableObject extends DrawableObject {
   
   
    
   
    
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    percentageOfBottle = 0;
    percentageOfCoins = 0;
    lastHit = 0;
    headHit = 0;
   


    applayGravity() {

        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);

    }

    isAboveGround() {
        if(this instanceof ThrowableObject) {
            return true;
        }else {
            return this.y < 210;
        }
        
    }

  //character.isColliding(chicken);
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x  &&
           this.y < mo.y + mo.height;
    }


    // isEnemyDead(mo) {
    //     return this.x + this.width  > mo.x &&
    //     (this.y + this.height) > mo.y &&
    //     this.x  < mo.x  &&
    //     this.y + this.height / 2 < mo.y ;
    // }



    hit() {
        this.energy -= 5;
        if(this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit ;// Difference in ms
        timepassed = timepassed / 1000;  // Difference in sekunden
        return timepassed < 0.5;  
    }

    isDead() {
        return this.energy == 0;
    }


  

    playAnimation(images) {
        let i = this.currentImage % images.length;  // let i = 0 % 6; Rest 0
        // i = 0,1,2,3,4,5,0,1,2,3,4,5,0...∞
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;


 
    }

     moveLeft() {

        this.x -= this.speed;


    }

    jump() {
        this.speedY = 30;
    }


   
}