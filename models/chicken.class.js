class Chicken extends MovableObject {
    width = 60;
    height = 75;
    y = 360;
    x = 1200;
    chickenMoveLeftItv;
    chickenWalkingItv;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    arrayEnemies = [150, 250, 380];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        for (let index = 0; index < this.arrayEnemies.length; index++) {
            const element = this.arrayEnemies[index];
             this.x = element +  (Math.random() * 500);
            // this.x = 200 + ((Math.random() * 500) + 80);
        }
       
        this.animate();
        this.loadImages(this.IMAGES_WALKING);
        this.speed = 0.15 + Math.random() * 0.25;
    }


    animate() {
        this.chickenMoveLeftItv = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);  // 50

        this.chickenWalkingItv = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);

        }, 200);
    }






}