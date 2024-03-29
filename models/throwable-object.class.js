class ThrowableObject extends MovableObject {

    world;
    throwItv;
    path = 'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png';

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_THROW_BOTTLES = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'

    ];

    throwBottleSound = new Audio('audio/throw_bottle_2.mp3');


    constructor(x, y) {
        super().loadImage(this.path);
        this.loadImages(this.IMAGES_BOTTLE);
        this.loadImages(this.IMAGES_THROW_BOTTLES);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
    }

    // It throws bottle right, values from variable speedY and x
    throw() {
        this.soundCheckerThrowBottle();
        this.speedY = 35;
        this.applayGravity();
        this.throwItv = setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE);
            this.x += 18;
        }, 60);
    }


    // It throws bottle left, values from variable speedY and x
    throwLeft() {
        this.soundCheckerThrowBottle();
        this.speedY = 35;
        this.applayGravity();
        this.throwItv = setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE);
            this.x -= 18;
        }, 60);
    }


    // It plays sound of throwable object
    soundCheckerThrowBottle() {
        if (soundOn) {
            this.throwBottleSound.volume = 0.2;
            this.throwBottleSound.play();
        }
    }


}
