class Cat extends Pet {
    constructor(petLocked, x, y) {
        super("Cat", petLocked, x, y);
        
        this.numFrames = 3;
        this.currentFrame = 0;
        this.catImages = new Array(this.numFrames);
        this.catImages2 = new Array(this.numFrames);
    }

    draw(p) {
    super.draw(p);

    if (this.movingLeft) {
        if (p.frameCount % 10 === 0) {
            this.currentFrame = (this.currentFrame + 1) % this.numFrames;
        }
        p.image(this.catImages[this.currentFrame], this.xLocation - 50, this.yLocation - 50, 100, 100);
        //                                                              ↑-50           ↑-50    ↑100 ↑100
    } else {
        if (p.frameCount % 10 === 0) {
            this.currentFrame = (this.currentFrame + 1) % this.numFrames;
        }
        p.image(this.catImages2[this.currentFrame], this.xLocation - 50, this.yLocation - 50, 100, 100);
        //                                                               ↑-50           ↑-50    ↑100 ↑100
    }
    
    this.drawWindMillHat(p);
    this.drawCollar(p);
    this.drawCowboyHat(p);
    this.drawGentlemanHat(p);
    this.drawSunglass(p);
    this.drawSantaHat(p);
}
    

    loadMedia(p) {
        this.windmillHat = p.loadImage("sprites/windmillHat.png");
        this.windmillHat.resize(12, 12);
        this.windmillHat2 = p.loadImage("sprites/windmillHatflipped.png");
        this.windmillHat2.resize(12, 12);

        this.catImages[0] = p.loadImage("sprites/Gato-1.png");
        this.catImages[1] = p.loadImage("sprites/Gato-2.png");
        this.catImages[2] = p.loadImage("sprites/Gato-3.png");

        this.catImages2[0] = p.loadImage("sprites/Gato-1flipped.png");
        this.catImages2[1] = p.loadImage("sprites/Gato-2flipped.png");
        this.catImages2[2] = p.loadImage("sprites/Gato-3flipped.png");
        
        for (let i = 0; i < this.catImages.length; i++) {
            this.catImages[i].resize(100, 100);
            this.catImages2[i].resize(100, 100);
        }
        
        this.collar = p.loadImage("sprites/collar.png");
        this.collar.resize(12, 12);
        this.collar2 = p.loadImage("sprites/collarflipped.png");
        this.collar2.resize(12, 12);

        this.cowboyHat = p.loadImage("sprites/cowboyHat.png");
        this.cowboyHat.resize(12, 12);
        this.cowboyHat2 = p.loadImage("sprites/cowboyHatflipped.png");
        this.cowboyHat2.resize(12, 12);

        this.gentlemanHat = p.loadImage("sprites/gentlemanHat.png");
        this.gentlemanHat.resize(12, 12);
        this.gentlemanHat2 = p.loadImage("sprites/gentlemanHatflipped.png");
        this.gentlemanHat2.resize(12, 12);

        this.sunglasses = p.loadImage("sprites/sunglasses.png");
        this.sunglasses.resize(12, 12);
        this.sunglasses2 = p.loadImage("sprites/sunglassesflipped.png");
        this.sunglasses2.resize(12, 12);

        this.santaHat = p.loadImage("sprites/santaHat.png");
        this.santaHat.resize(12, 12);
        this.santaHat2 = p.loadImage("sprites/santaHatflipped.png");
        this.santaHat2.resize(12, 12);
    }

    drawWindMillHat(p) {
        if (this.showWindMillHat) {
            if (this.movingLeft) {
                p.image(this.windmillHat, this.getXLocation() - 3, this.getYLocation() - 15,12,12);
            } else {
                p.image(this.windmillHat2, this.getXLocation() + 10, this.getYLocation() - 15,12,12);
            }
        }
    }

    drawCollar(p) {
        if (this.showCollar) {
            if (this.movingLeft) {
                p.image(this.collar2, this.getXLocation() - 2, this.getYLocation() - 5,12,12);
            } else {
                p.image(this.collar, this.getXLocation() + 10, this.getYLocation() - 5,12,12);
            }
        }
    }

    drawCowboyHat(p) {
        if (this.showCowboyHat) {
            if (this.movingLeft) {
                p.image(this.cowboyHat, this.getXLocation() - 3, this.getYLocation() - 15,12,12);
            } else {
                p.image(this.cowboyHat2, this.getXLocation() + 10, this.getYLocation() - 15,12,12);
            }
        }
    }

    drawGentlemanHat(p) {
        if (this.showGentlemanHat) {
            if (this.movingLeft) {
                p.image(this.gentlemanHat, this.getXLocation() - 3, this.getYLocation() - 15,12,12);
            } else {
                p.image(this.gentlemanHat2, this.getXLocation() + 10, this.getYLocation() - 15,12,12);
            }
        }
    }

    drawSunglass(p) {
        if (this.showSunglasses) {
            if (this.movingLeft) {
                p.image(this.sunglasses2, this.getXLocation() - 3, this.getYLocation() - 10,12,12;
            } else {
                p.image(this.sunglasses, this.getXLocation() + 10, this.getYLocation() - 10,12,12);
            }
        }
    }

    drawSantaHat(p) {
        if (this.showSantaHat) {
            if (this.movingLeft) {
                p.image(this.santaHat2, this.getXLocation() - 3, this.getYLocation() - 15,12,12);
            } else {
                p.image(this.santaHat, this.getXLocation() + 10, this.getYLocation() - 15,12,12);
            }
        }
    }
}
