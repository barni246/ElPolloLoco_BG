class StatusBar extends MovableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png', // Bild 0
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png' // Bild 5
    ];

    percentage = 100;
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 10;
        this.height = 40;
        this.width = 150;
        this.setPercentage(100);

    }


    // setPercentage(50);  // 50%
    setPercentage(percentage) {
        this.percentage = percentage; // => 0 ... 5  
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];

    }


    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5; // Bild 5
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
