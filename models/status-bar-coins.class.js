class StatusBarCoins extends MovableObject {

    percentage = 0 ;
    IMAGES_STATUS_COINS = [
      'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    constructor () {
        super();
        this.loadImages(this.IMAGES_STATUS_COINS);
        this.x = 40;
        this.y = 90;
        this.height = 40;
        this.width = 150;
        this.setPercentageCoins(this.percentage);
    }

    setPercentageCoins(percentage) {
        this.percentage = percentage; // => 0 ... 5  
        let path = this.IMAGES_STATUS_COINS[this.resolveImageIndex()];
        this.img = this.imageCache[path];

    }


    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5; // Bild 5
        } else if (this.percentage == 80) {
            return 4;
        } else if (this.percentage == 60) {
            return 3;
        } else if (this.percentage == 40) {
            return 2;
        } else if (this.percentage == 20) {
            return 1;
        } else {
            return 0;
        }
    }
}