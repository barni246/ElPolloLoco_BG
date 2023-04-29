class Endboss extends MovableObject {

  height = 340;
  width = 280;
  y = 85;
  speed = 0.05;

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
    'img/4_enemie_boss_chicken/3_attack/G13.png',
    'img/4_enemie_boss_chicken/3_attack/G14.png',
    'img/4_enemie_boss_chicken/3_attack/G15.png',
    'img/4_enemie_boss_chicken/3_attack/G16.png',
    'img/4_enemie_boss_chicken/3_attack/G17.png',
    'img/4_enemie_boss_chicken/3_attack/G18.png',
    'img/4_enemie_boss_chicken/3_attack/G19.png',
    'img/4_enemie_boss_chicken/3_attack/G20.png',
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
    'img/4_enemie_boss_chicken/1_walk/G4.png'
  ];


  endBossBattleSound = new Audio('audio/endboss_1.mp3');

  constructor() {

    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_BOSS_DEAD);
    this.loadImages(this.IMAGES_ENDBOSS_WALKING);
    this.x = 3940;
    this.animate();

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
      //this.x += 10;
    }, 200);
  }


  animateBossWalking() {

    setInterval(() => {
      this.moveLeft();
    }, 50);

    this.endBossComesItv = setInterval(() => {
      this.playAnimation(this.IMAGES_ENDBOSS_WALKING);
    }, 1500);

  }



}