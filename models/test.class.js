class Test {
    
    constructor() {

        console.log('Klasse Test ist hier.');
        this.printConsole();
    }
   
    printConsole() {
        console.log('Keyboard Object:', keyboard);
        console.log('World Object:', world);
        console.log('Canvas:', canvas);
        console.log('world.character:', world.character);
        console.log('world.clouds:', world.clouds);
        console.log('world.enemies[0]:', world.enemies[0]);
    }
}