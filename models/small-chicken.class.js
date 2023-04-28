class SmallChicken extends MovableObject {

    width = 50;
    height = 50;
    y = 375;
    x = 100;
   speed = 1.5;
   jumpLeftItv;
   walkingSmallChickenItv;
   level;
   world;


    IMAGES_SMALL_CHICKEN_WALKING = [

        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGES_DEAD_SMALL_CHICKEN = [

        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];


    smallChickenDeadSound = new Audio('audio/small_chicken_3.mp3');

    smallChickenArrayX =[10,250,500,1600,2600];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
       
       this.x = 1800 + (Math.random() * 500) + (Math.random() * 500) +
       ((Math.random() * 500)) + ((Math.random() * 500)) + (Math.random() * 1500);
        this.loadImages(this.IMAGES_SMALL_CHICKEN_WALKING);
        this.animate();
    }


   animate() {
      setInterval(() => {
        this.moveLeft();
      }, 50);
   this.walkingSmallChickenItv = setInterval(() => {
       this.playAnimation(this.IMAGES_SMALL_CHICKEN_WALKING);

   }, 200);
  
}

// animate() {
//     this.jumpLeftItv = setInterval(() => {
     
//    if(this.y > 370 && this.y < 400) {
//       this.y -= 50;
//       this.x -= (Math.random() * 10);
//    }
   
//    else {
//     this.y += 5;  
//       this.x -=  (Math.random() * 15);
//    }

   

   
    
     
//  }, 200);  // 50

//  this.walkingSmallChickenItv = setInterval(() => {
//      this.playAnimation(this.IMAGES_SMALL_CHICKEN_WALKING);

//  }, 200);

// }
}