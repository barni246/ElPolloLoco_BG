class Bottle extends DrawableObject {


height = 100;
width = 80;
x = 400;
y = 330;

IMAGES_BOTTLE = ['img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
                'img/6_salsa_bottle/1_salsa_bottle_on_ground.png'
];

constructor () {
    super().loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
    this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
    this.loadImages(this.IMAGES_BOTTLE);
    this.IMAGES_BOTTLE.forEach((bottle,i) => {
        this.x = 400 + ((Math.random() * 500));
    });
    
}


}





