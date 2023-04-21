class Endboss extends MovableObject {

  height = 450;
  width = 300;
  y = 10;


  IMAGES_WALKING = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png'

  ];

  IMAGES_BOSS_DEAD = [
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G25.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png'
  ];

  IMAGES_ENDBOSS_WALKING = [
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
    'img/4_enemie_boss_chicken/1_walk/G4.png'
  ];

  constructor() {

    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_BOSS_DEAD);
    this.loadImages(this.IMAGES_ENDBOSS_WALKING);
    //this.x = 2500;
    this.x = 3940;
    //this.animate();

  }
  endBossComesItv;
  endbossWalkingItv;
  animate() {

    this.endbossWalkingItv = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);

    }, 200);
  }


  animateBoss() {

    setInterval(() => {
      this.playAnimation(this.IMAGES_BOSS_DEAD);
      this.x += 10;
    }, 200);
  }


  animateBossWalking() {
   
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

   this.endBossComesItv = setInterval(() => {
      this.playAnimation(this.IMAGES_ENDBOSS_WALKING);
      //  this.x -= 1;
      //  console.log('x:', this.x);
    }, 200);

  }



}