class SmallChicken extends MovableObject {

    width = 50;
    height = 50;
    y = 385;
    x = 100;
   speed = 50;
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


    smallChickenArrayX =[10,250,500,1600,2600];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
       
       
        this.loadImages(this.IMAGES_SMALL_CHICKEN_WALKING);
        this.animate();
    }


   


    
   

    animate() {
      this.jumpLeftItv = setInterval(() => {
       
     if(this.y > 370 && this.y < 400) {
        this.y -= 50;
        this.x -= (Math.random() * 15);
        //this.y += 10; 
     }
     
     else {
      //this.y += 20; 
      this.y += 5;  
        this.x -=  (Math.random() * 20);
     }

     
      
       
   }, 200);  // 50

   this.walkingSmallChickenItv = setInterval(() => {
       this.playAnimation(this.IMAGES_SMALL_CHICKEN_WALKING);

   }, 200);
  
}
}