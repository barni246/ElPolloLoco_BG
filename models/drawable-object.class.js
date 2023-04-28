class DrawableObject {

    x = 120;
    y = 270;
    height = 150;
    width = 120;
    img;
    imageCache = {};
    currentImage = 0;


      // loadImage('img/test.png');
      loadImage(path) {
        this.img = new Image(); // this.img = document.getelementById('image') <img id="image" src>
        this.img.src = path;

    }


    draw(ctx) {
             ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
       
    }


      /**
     * 
     * @param {Array} arr - ['img/image1.png','img/image2.png', ...]
     */
      loadImages(arr) {

        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

     drawFrame(ctx) {


         if (this instanceof Character ||
              this instanceof Endboss || 
              this instanceof Chicken || 
              this instanceof SmallChicken) { // nur diese Objekte werden in Rahmen angezeigt

             ctx.beginPath();
             ctx.lineWidth = '5';
             ctx.strokeStyle = 'blue';
             ctx.rect(this.x, this.y, this.width, this.height);
             ctx.stroke();
         }
     }

} 