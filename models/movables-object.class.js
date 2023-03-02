class MovableObject {
    x = 120;
    y = 270;
    img;
    height = 150;
    width = 120;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;


    applayGravity() {

        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);

    }

    isAboveGround() {
       return this.y < 210;
    }

    // loadImage('img/test.png');
    loadImage(path) {
        this.img = new Image(); // this.img = document.getelementById('image') <img id="image" src>
        this.img.src = path;

    }

    /**
     * 
     * @param {Array} arr - ['img/image1.png','img/image2.png', ...]
     */
    loadImages(arr) {

        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length;  // let i = 0 % 6; Rest 0
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