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
            p.image(this.catImages[this.currentFrame], this.xLocation - 40, this.yLocation - 60);
        } else {
            if (p.frameCount % 10 === 0) {
                this.currentFrame = (this.currentFrame + 1) % this.numFrames;
            }
            p.image(this.catImages2[this.currentFrame], this.xLocation - 40, this.yLocation - 60);
        }
        
        this.windMillHat(p);
        this.drawCollar(p);
        this.cowboyHat(p);
        this.gentlemanHat(p);
        this.sunglass(p);
        this.santaHat(p);
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
        
        this.collarImg = p.loadImage("sprites/collar.png");
        this.collarImg.resize(12, 12);
        this.collar2Img = p.loadImage("sprites/collarflipped.png");
        this.collar2Img.resize(12, 12);

        this.cowboyHatImg = p.loadImage("sprites/cowboyHat.png");
        this.cowboyHatImg.resize(12, 12);
        this.cowboyHat2Img = p.loadImage("sprites/cowboyHatflipped.png");
        this.cowboyHat2Img.resize(12, 12);

        this.gentlemanHatImg = p.loadImage("sprites/gentlemanHat.png");
        this.gentlemanHatImg.resize(12, 12);
        this.gentlemanHat2Img = p.loadImage("sprites/gentlemanHatflipped.png");
        this.gentlemanHat2Img.resize(12, 12);

        this.sunglassesImg = p.loadImage("sprites/sunglasses.png");
        this.sunglassesImg.resize(12, 12);
        this.sunglasses2Img = p.loadImage("sprites/sunglassesflipped.png");
        this.sunglasses2Img.resize(12, 12);

        this.santaHatImg = p.loadImage("sprites/santaHat.png");
        this.santaHatImg.resize(12, 12);
        this.santaHat2Img = p.loadImage("sprites/santaHatflipped.png");
        this.santaHat2Img.resize(12, 12);
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

    drawCollar(p) {
        if (this.showCollar) {
            if (this.movingLeft) {
                p.image(this.collar2Img, this.getXLocation() - 2, this.getYLocation() - 14);
            } else {
                p.image(this.collarImg, this.getXLocation() + 10, this.getYLocation() - 14);
            }
        }
    }

    cowboyHat(p) {
        if (this.showCowboyHat) {
            if (this.movingLeft) {
                p.image(this.cowboyHatImg, this.getXLocation() - 3, this.getYLocation() - 25);
            } else {
                p.image(this.cowboyHat2Img, this.getXLocation() + 10, this.getYLocation() - 25);
            }
        }
    }

    gentlemanHat(p) {
        if (this.showGentlemanHat) {
            if (this.movingLeft) {
                p.image(this.gentlemanHatImg, this.getXLocation() - 3, this.getYLocation() - 25);
            } else {
                p.image(this.gentlemanHat2Img, this.getXLocation() + 10, this.getYLocation() - 25);
            }
        }
    }

    sunglass(p) {
        if (this.showSunglasses) {
            if (this.movingLeft) {
                p.image(this.sunglasses2Img, this.getXLocation() - 3, this.getYLocation() - 18);
            } else {
                p.image(this.sunglassesImg, this.getXLocation() + 10, this.getYLocation() - 18);
            }
        }
    }

    santaHat(p) {
        if (this.showSantaHat) {
            if (this.movingLeft) {
                p.image(this.santaHat2Img, this.getXLocation() - 3, this.getYLocation() - 25);
            } else {
                p.image(this.santaHatImg, this.getXLocation() + 10, this.getYLocation() - 25);
            }
        }
    }
}
