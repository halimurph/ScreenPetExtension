class Horse extends Pet {
    constructor(petLocked, x, y) {
        super("Horse", petLocked, x, y);
        
        this.isClick = false;
        this.numFramesUni = 8;
        this.numFrames = 4;
        this.currentFrame = 0;
        this.horseImages = new Array(this.numFrames);
        this.horseImages2 = new Array(this.numFrames);
        this.unicornImages = new Array(this.numFramesUni);
        this.unicornImages2 = new Array(this.numFramesUni);
    }

    draw(p) {
        super.draw(p);

        if (this.isClick) {
            if (this.movingLeft) {
                if (p.frameCount % 10 === 0) {
                    this.currentFrame = (this.currentFrame + 1) % this.numFramesUni;
                }
                p.image(this.unicornImages[this.currentFrame], this.xLocation - 10, this.yLocation - 20);
            } else {
                if (p.frameCount % 10 === 0) {
                    this.currentFrame = (this.currentFrame + 1) % this.numFramesUni;
                }
                p.image(this.unicornImages2[this.currentFrame], this.xLocation - 10, this.yLocation - 20);
            }
        } else {
            if (this.movingLeft) {
                if (p.frameCount % 10 === 0) {
                    this.currentFrame = (this.currentFrame + 1) % this.numFrames;
                }
                p.image(this.horseImages[this.currentFrame], this.xLocation - 10, this.yLocation - 20);
            } else {
                if (p.frameCount % 10 === 0) {
                    this.currentFrame = (this.currentFrame + 1) % this.numFrames;
                }
                p.image(this.horseImages2[this.currentFrame], this.xLocation - 10, this.yLocation - 20);
            }
        }

        this.drawWindMillHat(p);
        this.drawCollar(p);
        this.drawGentlemanHat(p);
        this.drawSunglass(p);
        this.drawCowboyHat(p);
        this.drawSantaHat(p);
    }

    unicorn(p) {
        this.isClick = !this.isClick;
        this.currentFrame = 0;
    }

    loadMedia(p) {
        this.horseImages2[0] = p.loadImage("sprites/Horse-1.png");
        this.horseImages2[1] = p.loadImage("sprites/Horse-2.png");
        this.horseImages2[2] = p.loadImage("sprites/Horse-3.png");
        this.horseImages2[3] = p.loadImage("sprites/Horse-4.png");

        this.horseImages[0] = p.loadImage("sprites/Horse-1flipped.png");
        this.horseImages[1] = p.loadImage("sprites/Horse-2flipped.png");
        this.horseImages[2] = p.loadImage("sprites/Horse-3flipped.png");
        this.horseImages[3] = p.loadImage("sprites/Horse-4flipped.png");

        for (let i = 0; i < this.horseImages.length; i++) {
            this.horseImages[i].resize(35, 25);
            this.horseImages2[i].resize(35, 25);
        }

        this.unicornImages[0] = p.loadImage("sprites/Unicorn-1.png");
        this.unicornImages[1] = p.loadImage("sprites/Unicorn-2.png");
        this.unicornImages[2] = p.loadImage("sprites/Unicorn-3.png");
        this.unicornImages[3] = p.loadImage("sprites/Unicorn-4.png");
        this.unicornImages[4] = p.loadImage("sprites/Unicorn-1.png");
        this.unicornImages[5] = p.loadImage("sprites/Unicorn-2.png");
        this.unicornImages[6] = p.loadImage("sprites/Unicorn-3.png");
        this.unicornImages[7] = p.loadImage("sprites/Unicorn-4.png");

        this.unicornImages2[0] = p.loadImage("sprites/Unicorn-1flipped.png");
        this.unicornImages2[1] = p.loadImage("sprites/Unicorn-2flipped.png");
        this.unicornImages2[2] = p.loadImage("sprites/Unicorn-3flipped.png");
        this.unicornImages2[3] = p.loadImage("sprites/Unicorn-4flipped.png");
        this.unicornImages2[4] = p.loadImage("sprites/Unicorn-1flipped.png");
        this.unicornImages2[5] = p.loadImage("sprites/Unicorn-2flipped.png");
        this.unicornImages2[6] = p.loadImage("sprites/Unicorn-3flipped.png");
        this.unicornImages2[7] = p.loadImage("sprites/Unicorn-4flipped.png");

        for (let i = 0; i < this.unicornImages.length; i++) {
            this.unicornImages[i].resize(35, 25);
            this.unicornImages2[i].resize(35, 25);
        }

        this.windmillHat = p.loadImage("sprites/windmillHat.png");
        this.windmillHat.resize(12, 12);
        this.windmillHat2 = p.loadImage("sprites/windmillHatflipped.png");
        this.windmillHat2.resize(12, 12);

        this.collar = p.loadImage("sprites/collar.png");
        this.collar.resize(10, 10);
        this.collar2 = p.loadImage("sprites/collarflipped.png");
        this.collar2.resize(10, 10);

        this.gentlemanHat = p.loadImage("sprites/gentlemanHat.png");
        this.gentlemanHat.resize(10, 10);
        this.gentlemanHat2 = p.loadImage("sprites/gentlemanHatflipped.png");
        this.gentlemanHat2.resize(10, 10);

        this.sunglasses = p.loadImage("sprites/sunglasses.png");
        this.sunglasses.resize(10, 10);
        this.sunglasses2 = p.loadImage("sprites/sunglassesflipped.png");
        this.sunglasses2.resize(10, 10);

        this.cowboyHat = p.loadImage("sprites/cowboyHat.png");
        this.cowboyHat.resize(10, 10);
        this.cowboyHat2 = p.loadImage("sprites/cowboyHatflipped.png");
        this.cowboyHat2.resize(10, 10);

        this.santaHat = p.loadImage("sprites/santaHat.png");
        this.santaHat.resize(10, 10);
        this.santaHat2 = p.loadImage("sprites/santaHatflipped.png");
        this.santaHat2.resize(10, 10);
    }

    drawWindMillHat(p) {
        if (this.showWindMillHat) {
            if (this.movingLeft) {
                p.image(this.windmillHat, this.getXLocation() - 8, this.getYLocation() - 27);
            } else {
                p.image(this.windmillHat2, this.getXLocation() + 12, this.getYLocation() - 27);
            }
        }
    }

    drawCollar(p) {
        if (this.showCollar) {
            if (this.movingLeft) {
                p.image(this.collar2, this.getXLocation() - 4, this.getYLocation() - 14);
            } else {
                p.image(this.collar, this.getXLocation() + 8, this.getYLocation() - 14);
            }
        }
    }

    drawGentlemanHat(p) {
        if (this.showGentlemanHat) {
            if (this.movingLeft) {
                p.image(this.gentlemanHat, this.getXLocation() - 8, this.getYLocation() - 27);
            } else {
                p.image(this.gentlemanHat2, this.getXLocation() + 12, this.getYLocation() - 27);
            }
        }
    }

    drawSunglass(p) {
        if (this.showSunglasses) {
            if (this.movingLeft) {
                p.image(this.sunglasses2, this.getXLocation() - 10, this.getYLocation() - 22);
            } else {
                p.image(this.sunglasses, this.getXLocation() + 12, this.getYLocation() - 22);
            }
        }
    }

    drawCowboyHat(p) {
        if (this.showCowboyHat) {
            if (this.movingLeft) {
                p.image(this.cowboyHat, this.getXLocation() - 8, this.getYLocation() - 27);
            } else {
                p.image(this.cowboyHat2, this.getXLocation() + 12, this.getYLocation() - 27);
            }
        }
    }

    drawSantaHat(p) {
        if (this.showSantaHat) {
            if (this.movingLeft) {
                p.image(this.santaHat2, this.getXLocation() - 8, this.getYLocation() - 27);
            } else {
                p.image(this.santaHat, this.getXLocation() + 12, this.getYLocation() - 27);
            }
        }
    }
}
