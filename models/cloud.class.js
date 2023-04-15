class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;
  
    x = 100;


    IMAGES_CLOUDS = [

        'img/5_background/layers/4_clouds/1.png',
        'img/5_background/layers/4_clouds/2.png'
        
    ];
    constructor() {
         super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = 200 + Math.random() * 500;
        this.loadImages(this.IMAGES_CLOUDS);
        //this.animate();
       }


    //    animate() {
    //      setInterval(() => {
    //         this.moveLeft();
    //     }, 1000 / 60);  // 50

    //     setInterval(() => {
    //         this.playAnimation(this.IMAGES_CLOUDS);

    //     }, 200);
    // }
    
}

