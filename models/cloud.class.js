class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;
  
    x = 100;
    constructor() {
         super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = 200 + Math.random() * 500;
    
    }
    
}