class Chicken extends MovableObject {
    width = 60;
    height = 75;
    y = 350;
    x;
    chickenMoveLeftItv;
    chickenWalkingItv;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD_CHICKEN = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    chickenDeadSound = new Audio('audio/chicken_1.mp3');

    arrayEnemies = [50, 550, 1500, 2260, 3500];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 500 + ((Math.random() * 500)) + ((Math.random() * 200))
            + ((Math.random() * 200)) + ((Math.random() * 200)) + ((Math.random() * 200));
        this.animate();
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD_CHICKEN);
        this.speed = 0.15 + Math.random() * 0.55;
    }


    animate() {
        this.chickenMoveLeftItv = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        this.chickenWalkingItv = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);

        }, 200);

    }






}