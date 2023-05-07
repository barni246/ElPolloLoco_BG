class Level {
    enemies;
    smallEnemies;
    clouds;
    coins
    bottles;
    backgroundObjects;
    level_end_x = 3920;

    constructor(clouds, backgroundObjects, bottles, coins, enemies, smallEnemies) {
        this.enemies = enemies;
        this.smallEnemies = smallEnemies;
        this.clouds = clouds;
        this.bottles = bottles;
        this.coins = coins;
        this.backgroundObjects = backgroundObjects;
    }
}