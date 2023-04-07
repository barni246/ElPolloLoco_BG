class Level {
    enemies;
    clouds;
    coins
    bottles;
    backgroundObjects;
    level_end_x = 2200;

    constructor(enemies, clouds, backgroundObjects,bottles,coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.bottles = bottles;
        this.coins = coins;
        this.backgroundObjects = backgroundObjects;
    }

}