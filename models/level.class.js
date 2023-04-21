class Level {
    enemies;
    smallEnemies;
    clouds;
    coins
    bottles;
    backgroundObjects;
    //level_end_x = 2165;
    level_end_x = 3615;

    // constructor(enemies, clouds, backgroundObjects,bottles,coins) {
    //     this.enemies = enemies;
    //     this.clouds = clouds;
    //     this.bottles = bottles;
    //     this.coins = coins;
    //     this.backgroundObjects = backgroundObjects;
    // }


    constructor( clouds, backgroundObjects,bottles,coins,enemies,smallEnemies) {
        this.enemies = enemies;
        this.smallEnemies = smallEnemies;
        this.clouds = clouds;
        this.bottles = bottles;
        this.coins = coins;
        this.backgroundObjects = backgroundObjects;
    }
}