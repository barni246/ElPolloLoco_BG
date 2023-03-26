class Chicken extends MovableObject {
    width = 60;
    height = 75;
    y = 360;
    x = 500;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
       
        
    ];

    IMAGE_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png ',
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png '

]; 

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
       
        this.x = 200 + ((Math.random() * 500) + 80 );
        this.animate();
        //this.animateEnemyDead();
        this.loadImages(this.IMAGE_DEAD);
        this.loadImages(this.IMAGES_WALKING);
        this.speed = 0.15 + Math.random() * 0.25;
    }

    pepe1;
    pepe2;
    
    animate() {

       

       this.pepe1 = setInterval(() => {
                this.moveLeft();
        }, 1000 / 60);  // 50
        
       
       this.pepe2 =  setInterval(() => {
         this.playAnimation(this.IMAGES_WALKING);

         },200);

      

   
  }

//    animateEnemyDead() {
//      console.log('hurrrra1!');
//      setInterval(() => {
//          console.log('hurrrra2!',this.isEnemyDead(this));
//          if(false) {
//              console.log('hurrrra3!');
//          this.playAnimation(this.IMAGE_DEAD);
//          this.speed = 0;
//       }
//      },50);
    
//    }
   



}