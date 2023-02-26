class Character extends MovableObject {
  y = 220;
  height = 210;
  width = 80;
  speed = 5;
  IMAGES_WALKING = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png'
  ];
  //world;

  constructor() {
    super().loadImage('img/2_character_pepe/2_walk/W-21.png');
    this.loadImages(this.IMAGES_WALKING);

    this.animate();
  }

  animate() {

    setInterval(() => {
      //if (this.world.keyboard.RIGHT) {
      if (keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.x += this.speed;
        this.otherDirection = false;
      }

      // if (this.world.keyboard.LEFT) {
      if (keyboard.LEFT && this.x > 0 ) {
        this.x -= this.speed;
        this.otherDirection = true;
      }

      if (this.world.keyboard.UP) {
        this.y -= this.speed;
        this.x += this.speed;
      }

      if (this.world.keyboard.DOWN) {
        this.y += this.speed;
      }
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {

      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        let i = this.currentImage % this.IMAGES_WALKING.length;  // let i = 0 % 6; Rest 0
        // i = 0,1,2,3,4,5,0,1,2,3,4,5,0...∞
        let path = this.IMAGES_WALKING[i];
        this.img = this.imageCache[path];
        this.currentImage++;
      }
    }, 50);
  }

  jump() {

  }

}