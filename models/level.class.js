class Level {
    enemies;
    clouds;
   //bottles;
    backgroundObjects;
    level_end_x = 2200;

    constructor(enemies, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
       //this.bottles = bottles;
        this.backgroundObjects = backgroundObjects;
    }

}