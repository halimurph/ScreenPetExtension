class Cow extends Pet {
    constructor(petLocked, x, y) {
        super("Cow", petLocked, x, y);
        
        this.poopsList = []; // store positions of poop
        this.numFrames = 4;
        this.currentFrame = 0;
        this.cowImages = new Array(this.numFrames);
        this.cowImages2 = new Array(this.numFrames);
        this.poopy = null;
    }

    draw(p) {
        super.draw(p);

        if (this.movingLeft) {
            if (p.frameCount % 10 === 0) {
                this.currentFrame = (this.currentFrame + 1) % this.numFrames;
            }
            p.image(this.cowImages[this.currentFrame], this.xLocation - 15, this.yLocation - 10,30,20);
        } else {
            if (p.frameCount % 10 === 0) {
                this.currentFrame = (this.currentFrame + 1) % this.numFrames;
            }
            p.image(this.cowImages2[this.currentFrame], this.xLocation - 15, this.yLocation - 10,30,20);
        }

        for (let poop of this.poopsList) {
            p.image(this.poopy, poop.x + 20, poop.y);
        }

        this.drawWindMillHat(p);
        this.drawCollar(p);
        this.drawGentlemanHat(p);
        this.drawSunglass(p);
        this.drawCowboyHat(p);
        this.drawSantaHat(p);
    }

    // action: leave a poop at current location
    poops() {
        this.poopsList.push(createVector(this.xLocation, this.yLocation));
    }

    loadMedia(p) {
        this.cowImages[0] = p.loadImage("sprites/Cow-1.png");
        this.cowImages[1] = p.loadImage("sprites/Cow-2.png");
        this.cowImages[2] = p.loadImage("sprites/Cow-3.png");
        this.cowImages[3] = p.loadImage("sprites/Cow-4.png");

        this.cowImages2[0] = p.loadImage("sprites/Cow-1flipped.png");
        this.cowImages2[1] = p.loadImage("sprites/Cow-2flipped.png");
        this.cowImages2[2] = p.loadImage("sprites/Cow-3flipped.png");
        this.cowImages2[3] = p.loadImage("sprites/Cow-4flipped.png");

        this.poopy = p.loadImage("sprites/poop.png");
        this.poopy.resize(10, 10);

        for (let i = 0; i < this.cowImages.length; i++) {
            this.cowImages[i].resize(30, 20);
            this.cowImages2[i].resize(30, 20);
        }

        this.windmillHat = p.loadImage("sprites/windmillHat.png");
        this.windmillHat.resize(12, 12);
        this.windmillHat2 = p.loadImage("sprites/windmillHatflipped.png");
        this.windmillHat2.resize(12, 12);

        this.collar = p.loadImage("sprites/collar.png");
        this.collar.resize(12, 12);
        this.collar2 = p.loadImage("sprites/collarflipped.png");
        this.collar2.resize(12, 12);

        this.gentlemanHat = p.loadImage("sprites/gentlemanHat.png");
        this.gentlemanHat.resize(12, 12);
        this.gentlemanHat2 = p.loadImage("sprites/gentlemanHatflipped.png");
        this.gentlemanHat2.resize(12, 12);

        this.sunglasses = p.loadImage("sprites/sunglasses.png");
        this.sunglasses.resize(12, 12);
        this.sunglasses2 = p.loadImage("sprites/sunglassesflipped.png");
        this.sunglasses2.resize(12, 12);

        this.cowboyHat = p.loadImage("sprites/cowboyHat.png");
        this.cowboyHat.resize(12, 12);
        this.cowboyHat2 = p.loadImage("sprites/cowboyHatflipped.png");
        this.cowboyHat2.resize(12, 12);

        this.santaHat = p.loadImage("sprites/santaHat.png");
        this.santaHat.resize(12, 12);
        this.santaHat2 = p.loadImage("sprites/santaHatflipped.png");
        this.santaHat2.resize(12, 12);
    }

    drawWindMillHat(p) {
        if (this.showWindMillHat) {
            if (this.movingLeft) {
                p.image(this.windmillHat, this.getXLocation() - 7, this.getYLocation() - 25);
            } else {
                p.image(this.windmillHat2, this.getXLocation() + 7, this.getYLocation() - 25);
            }
        }
    }

    drawCollar(p) {
        if (this.showCollar) {
            if (this.movingLeft) {
                p.image(this.collar2, this.getXLocation() - 5, this.getYLocation() - 17);
            } else {
                p.image(this.collar, this.getXLocation() + 5, this.getYLocation() - 17);
            }
        }
    }

    drawGentlemanHat(p) {
        if (this.showGentlemanHat) {
            if (this.movingLeft) {
                p.image(this.gentlemanHat, this.getXLocation() - 7, this.getYLocation() - 27);
            } else {
                p.image(this.gentlemanHat2, this.getXLocation() + 7, this.getYLocation() - 27);
            }
        }
    }

    drawSunglass(p) {
        if (this.showSunglasses) {
            if (this.movingLeft) {
                p.image(this.sunglasses2, this.getXLocation() - 10, this.getYLocation() - 20);
            } else {
                p.image(this.sunglasses, this.getXLocation() + 7, this.getYLocation() - 20);
            }
        }
    }

    drawCowboyHat(p) {
        if (this.showCowboyHat) {
            if (this.movingLeft) {
                p.image(this.cowboyHat, this.getXLocation() - 7, this.getYLocation() - 25);
            } else {
                p.image(this.cowboyHat2, this.getXLocation() + 7, this.getYLocation() - 25);
            }
        }
    }

    drawSantaHat(p) {
        if (this.showSantaHat) {
            if (this.movingLeft) {
                p.image(this.santaHat2, this.getXLocation() - 7, this.getYLocation() - 27);
            } else {
                p.image(this.santaHat, this.getXLocation() + 7, this.getYLocation() - 27);
            }
        }
    }
}
