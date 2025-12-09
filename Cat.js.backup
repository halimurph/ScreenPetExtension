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
        // p.text("movingLeft=" + this.movingLeft, 50, 100);

        if (this.movingLeft) {
            if (p.frameCount % 10 === 0) {
                this.currentFrame = (this.currentFrame + 1) % this.numFrames;  // Loop back to 0 after last frame
            }
            p.image(this.catImages[this.currentFrame], this.xLocation - 40, this.yLocation - 60);
            // p.text("leftImage", 50, 50);
        } else {
            if (p.frameCount % 10 === 0) {
                this.currentFrame = (this.currentFrame + 1) % this.numFrames;
            }
            p.image(this.catImages2[this.currentFrame], this.xLocation - 40, this.yLocation - 60);
            // p.text("rightImage", 50, 50);
        }
        
        this.windMillHat(p);
        this.collar(p);
        this.cowboyHat(p);
        this.gentlemanHat(p);
        this.sunglass(p);
        this.santaHat(p);
    }

    loadMedia(p) {
        this.windmillHat = p.loadImage("sprites" + fileSeparator + "windmillHat.png");
        this.windmillHat.resize(12, 12);
        this.windmillHat2 = p.loadImage("sprites" + fileSeparator + "windmillHatflipped.png");
        this.windmillHat2.resize(12, 12);

        this.catImages[0] = p.loadImage("sprites" + fileSeparator + "Gato-1.png");
        this.catImages[1] = p.loadImage("sprites" + fileSeparator + "Gato-2.png");
        this.catImages[2] = p.loadImage("sprites" + fileSeparator + "Gato-3.png");

        this.catImages2[0] = p.loadImage("Ssprites" + fileSeparator + "Gato-1flipped.png");
        this.catImages2[1] = p.loadImage("sprites" + fileSeparator + "Gato-2flipped.png");
        this.catImages2[2] = p.loadImage("sprites" + fileSeparator + "Gato-3flipped.png");
        
        for (let i = 0; i < this.catImages.length; i++) {
            this.catImages[i].resize(100, 100);
            this.catImages2[i].resize(100, 100);
            // Resize each image one by one
        }
        
        this.collar = p.loadImage("sprites" + fileSeparator + "collar.png");
        this.collar.resize(12, 12);
        this.collar2 = p.loadImage("sprites" + fileSeparator + "collarflipped.png");
        this.collar2.resize(12, 12);

        this.cowboyHat = p.loadImage("sprites" + fileSeparator + "cowboyHat.png");
        this.cowboyHat.resize(12, 12);
        this.cowboyHat2 = p.loadImage("sprites" + fileSeparator + "cowboyHatflipped.png");
        this.cowboyHat2.resize(12, 12);

        this.gentlemanHat = p.loadImage("sprites" + fileSeparator + "gentlemanHat.png");
        this.gentlemanHat.resize(12, 12);
        this.gentlemanHat2 = p.loadImage("sprites" + fileSeparator + "gentlemanHatflipped.png");
        this.gentlemanHat2.resize(12, 12);

        this.sunglasses = p.loadImage("sprites" + fileSeparator + "sunglasses.png");
        this.sunglasses.resize(12, 12);
        this.sunglasses2 = p.loadImage("sprites" + fileSeparator + "sunglassesflipped.png");
        this.sunglasses2.resize(12, 12);

        this.santaHat = p.loadImage("sprites" + fileSeparator + "santaHat.png");
        this.santaHat.resize(12, 12);
        this.santaHat2 = p.loadImage("sprites" + fileSeparator + "santaHatflipped.png");
        this.santaHat2.resize(12, 12);
    }

    windMillHat(p) {
        if (this.showWindMillHat) {
            if (this.movingLeft) {
                p.image(this.windmillHat, this.getXLocation() - 3, this.getYLocation() - 25);
            } else {
                p.image(this.windmillHat2, this.getXLocation() + 10, this.getYLocation() - 25);
            }
        }
    }

    collar(p) {
        if (this.showCollar) {
            if (this.movingLeft) {
                p.image(this.collar2, this.getXLocation() - 2, this.getYLocation() - 14);
            } else {
                p.image(this.collar, this.getXLocation() + 10, this.getYLocation() - 14);
            }
        }
    }

    cowboyHat(p) {
        if (this.showCowboyHat) {
            if (this.movingLeft) {
                p.image(this.cowboyHat, this.getXLocation() - 3, this.getYLocation() - 25);
            } else {
                p.image(this.cowboyHat2, this.getXLocation() + 10, this.getYLocation() - 25);
            }
        }
    }

    gentlemanHat(p) {
        if (this.showGentlemanHat) {
            if (this.movingLeft) {
                p.image(this.gentlemanHat, this.getXLocation() - 3, this.getYLocation() - 25);
            } else {
                p.image(this.gentlemanHat2, this.getXLocation() + 10, this.getYLocation() - 25);
            }
        }
    }

    sunglass(p) {
        if (this.showSunglasses) {
            if (this.movingLeft) {
                p.image(this.sunglasses2, this.getXLocation() - 3, this.getYLocation() - 18);
            } else {
                p.image(this.sunglasses, this.getXLocation() + 10, this.getYLocation() - 18);
            }
        }
    }

    santaHat(p) {
        if (this.showSantaHat) {
            if (this.movingLeft) {
                p.image(this.santaHat2, this.getXLocation() - 3, this.getYLocation() - 25);
            } else {
                p.image(this.santaHat, this.getXLocation() + 10, this.getYLocation() - 25);
            }
        }
    }
}
