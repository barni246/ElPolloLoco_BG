class ThrowableObject extends MovableObject {


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
   
    throwItv; 

    constructor(x, y) {
        super().loadImage(this.path);
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        //this.throw();
    }

    throw() {
        if(soundOn) {
            this.throwBottleSound.volume = 0.3;
            this.throwBottleSound.play();
        }
        this.speedY = 35; //30
        this.applayGravity();
        this.throwItv = setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE);
         this.x += 20;
        }, 60);
    }
}
