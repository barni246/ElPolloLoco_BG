class MovableObject extends DrawableObject {


    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    percentageOfBottle = 0;
    percentageOfCoins = 0;
    lastHit = 0;


    // It moves object down
    applayGravity() {

        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);

    }


    // It checks whether object is over the ground
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 210;
        }

    }


    // It checks whether two objects have collided
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
    }


    // It reduces the energy from character
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * let timepassed;
     * The value of this variable is the time for hurt
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;// Difference in ms
        timepassed = timepassed / 1000;  // Difference in sekunden
        return timepassed < 0.5;
    }


    // If the energy like null, character is dead
    isDead() {
        return this.energy == 0;
    }


    /**
     * With the help of modulo,
     * the animation repeats itself again and again
     * @param {*} images 
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    // The object moves right, x coordinate is increased
    moveRight() {
        this.x += this.speed;
    }


    // The object moves left, x coordinate is reduced
    moveLeft() {
        this.x -= this.speed;
    }


    // The object is jumping, y coordinate changes with value speedY
    jump() {
        this.speedY = 30;
    }



}