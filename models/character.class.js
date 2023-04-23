class Character extends MovableObject {
  y = 80;
  height = 210;
  width = 110;
  speed = 5;
  interval = 50;
  world;
  deadItv;
  characterWalking = new Audio('audio/character_walking.mp3');

  IMAGES_WALKING = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png'
  ];


  IMAGES_JUMPING = [
    'img/2_character_pepe/3_jump/J-31.png',
    'img/2_character_pepe/3_jump/J-32.png',
    'img/2_character_pepe/3_jump/J-33.png',
    'img/2_character_pepe/3_jump/J-34.png',
    'img/2_character_pepe/3_jump/J-35.png',
    'img/2_character_pepe/3_jump/J-36.png',
    'img/2_character_pepe/3_jump/J-37.png',
    'img/2_character_pepe/3_jump/J-38.png',
    'img/2_character_pepe/3_jump/J-39.png'
  ];

  IMAGES_DEAD = [
    'img/2_character_pepe/5_dead/D-51.png',
    'img/2_character_pepe/5_dead/D-52.png',
    'img/2_character_pepe/5_dead/D-53.png',
    'img/2_character_pepe/5_dead/D-54.png',
    'img/2_character_pepe/5_dead/D-55.png',
    'img/2_character_pepe/5_dead/D-56.png',
    'img/2_character_pepe/5_dead/D-57.png'
  ];

  IMAGES_HURT = [
    'img/2_character_pepe/4_hurt/H-41.png',
    'img/2_character_pepe/4_hurt/H-42.png',
    'img/2_character_pepe/4_hurt/H-43.png'
  ];


  constructor() {
    super().loadImage('img/2_character_pepe/2_walk/W-21.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.applayGravity();
    this.animate();
  }


  setWalkingSound() {
    this.characterWalking.volume = 0.1;
    this.characterWalking.playbackRate = 6;
    this.characterWalking.play();
  }


  animate() {

    setInterval(() => {
      if (this.world.keyboard.RIGHT &&
        this.x < this.world.level.level_end_x &&
        !this.isDead()) {
        this.moveRight();
        this.otherDirection = false;
        if (soundOn) {
          this.setWalkingSound();
        }
      }

      if (this.world.keyboard.LEFT && this.x > 0 && !this.isDead()) {
        this.moveLeft();
        this.otherDirection = true;
        if (soundOn) {
          this.setWalkingSound();
        }
      }

      if (this.world.keyboard.SPACE &&
        !this.isAboveGround() &&
        !this.isDead() &&
        this.world.endBossStands) {
        this.jump();
      }

      if (this.world.keyboard.DOWN) {
      }
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    this.deadItv = setInterval(() => {
      if (this.isDead()) {
        gameStarted = false;
        this.playAnimation(this.IMAGES_DEAD);


        //  setTimeout(() => {

        document.getElementById('gameOverContainer').style.display = "flex";
        mariachi.pause();
        // this.world.endBoss.endBossBattleSound.pause();
        // }, 2000);
        clearInterval(this.deadItv);

      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      }
      else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.playAnimation(this.IMAGES_WALKING);
        }
      }

    }, this.interval);

  }


  jump() {
    this.speedY = 30;
  }

}

