class ThrowableObject extends MovableObject {


    path = 'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png';

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

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
        
        this.speedY = 35; //30
        this.applayGravity();
        this.throwItv = setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE);
         this.x += 20;
        }, 60);
    }
}
