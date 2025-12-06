class Dragon extends Pet {
    constructor(petLocked, x, y) {
        super("Dragon", petLocked, x, y);
        
        this.isClick = false;
        this.numFramesFly = 10;
        this.numFrames = 8;
        this.currentFrame = 0;
        this.dragonImages = new Array(this.numFrames);
        this.dragonImages2 = new Array(this.numFrames);
        this.flyImages = new Array(this.numFramesFly);
        this.flyImages2 = new Array(this.numFramesFly);
    }

    draw(p) {
        super.draw(p);

        p.fill(255, 0, 0);
        p.textSize(20);
        if (this.isClick) {
            if (this.movingLeft) {
                if (p.frameCount % 10 === 0) {
                    this.currentFrame = (this.currentFrame + 1) % this.numFramesFly;
                }
                p.image(this.flyImages[this.currentFrame], this.xLocation - 10, this.yLocation - 20);
            } else {
                if (p.frameCount % 10 === 0) {
                    this.currentFrame = (this.currentFrame + 1) % this.numFramesFly;
                }
                p.image(this.flyImages2[this.currentFrame], this.xLocation - 10, this.yLocation - 20);
            }
        } else {
            if (this.movingLeft) {
                if (p.frameCount % 10 === 0) {
                    this.currentFrame = (this.currentFrame + 1) % this.numFrames;
                }
                p.image(this.dragonImages[this.currentFrame], this.xLocation - 5, this.yLocation - 20);
            } else {
                if (p.frameCount % 10 === 0) {
                    this.currentFrame = (this.currentFrame + 1) % this.numFrames;
                }
                p.image(this.dragonImages2[this.currentFrame], this.xLocation - 5, this.yLocation - 20);
            }
        }

        this.drawWindMillHat(p);
        this.drawCollar(p);
        this.drawGentlemanHat(p);
        this.drawSunglass(p);
        this.drawCowboyHat(p);
        this.drawSantaHat(p);
    }

    flies(p) {
        this.isClick = !this.isClick;
        this.currentFrame = 0;
    }

    loadMedia(p) {
        this.dragonImages2[0] = p.loadImage("sprites/Dragon-1.png");
        this.dragonImages2[1] = p.loadImage("sprites/Dragon-2.png");
        this.dragonImages2[2] = p.loadImage("sprites/Dragon-3.png");
        this.dragonImages2[3] = p.loadImage("sprites/Dragon-4.png");
        this.dragonImages2[4] = p.loadImage("sprites/Dragon-1.png");
        this.dragonImages2[5] = p.loadImage("sprites/Dragon-2.png");
        this.dragonImages2[6] = p.loadImage("sprites/Dragon-3.png");
        this.dragonImages2[7] = p.loadImage("sprites/Dragon-4.png");

        this.dragonImages[0] = p.loadImage("sprites/Dragon-1flipped.png");
        this.dragonImages[1] = p.loadImage("sprites/Dragon-2flipped.png");
        this.dragonImages[2] = p.loadImage("sprites/Dragon-3flipped.png");
        this.dragonImages[3] = p.loadImage("sprites/Dragon-4flipped.png");
        this.dragonImages[4] = p.loadImage("sprites/Dragon-1flipped.png");
        this.dragonImages[5] = p.loadImage("sprites/Dragon-2flipped.png");
        this.dragonImages[6] = p.loadImage("sprites/Dragon-3flipped.png");
        this.dragonImages[7] = p.loadImage("sprites/Dragon-4flipped.png");

        for (let i = 0; i < this.dragonImages.length; i++) {
            this.dragonImages[i].resize(25, 20);
            this.dragonImages2[i].resize(25, 20);
        }

        this.flyImages2[0] = p.loadImage("sprites/fly-1.png");
        this.flyImages2[1] = p.loadImage("sprites/fly-2.png");
        this.flyImages2[2] = p.loadImage("sprites/fly-3.png");
        this.flyImages2[3] = p.loadImage("sprites/fly-4.png");
        this.flyImages2[4] = p.loadImage("sprites/fly-1.png");
        this.flyImages2[5] = p.loadImage("sprites/fly-2.png");
        this.flyImages2[6] = p.loadImage("sprites/fly-3.png");
        this.flyImages2[7] = p.loadImage("sprites/fly-4.png");
        this.flyImages2[8] = p.loadImage("sprites/fly-4.png");
        this.flyImages2[9] = p.loadImage("sprites/fly-4.png");

        this.flyImages[0] = p.loadImage("sprites/fly-1flipped.png");
        this.flyImages[1] = p.loadImage("sprites/fly-2flipped.png");
        this.flyImages[2] = p.loadImage("sprites/fly-3flipped.png");
        this.flyImages[3] = p.loadImage("sprites/fly-4flipped.png");
        this.flyImages[4] = p.loadImage("sprites/fly-1flipped.png");
        this.flyImages[5] = p.loadImage("sprites/fly-2flipped.png");
        this.flyImages[6] = p.loadImage("sprites/fly-3flipped.png");
        this.flyImages[7] = p.loadImage("sprites/fly-4flipped.png");
        this.flyImages[8] = p.loadImage("sprites/fly-4flipped.png");
        this.flyImages[9] = p.loadImage("sprites/fly-4flipped.png");

        for (let i = 0; i < this.flyImages.length; i++) {
            this.flyImages[i].resize(50, 30);
            this.flyImages2[i].resize(50, 30);
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
                p.image(this.windmillHat, this.getXLocation() - 5, this.getYLocation() - 25);
            } else {
                p.image(this.windmillHat2, this.getXLocation() + 7, this.getYLocation() - 25);
            }
        }
    }

    drawCollar(p) {
        if (this.showCollar) {
            if (this.movingLeft) {
                p.image(this.collar2, this.getXLocation() - 5, this.getYLocation() - 10);
            } else {
                p.image(this.collar, this.getXLocation() + 7, this.getYLocation() - 10);
            }
        }
    }

    drawGentlemanHat(p) {
        if (this.showGentlemanHat) {
            if (this.movingLeft) {
                p.image(this.gentlemanHat, this.getXLocation() - 5, this.getYLocation() - 25);
            } else {
                p.image(this.gentlemanHat2, this.getXLocation() + 7, this.getYLocation() - 25);
            }
        }
    }

    drawSunglass(p) {
        if (this.showSunglasses) {
            if (this.movingLeft) {
                p.image(this.sunglasses2, this.getXLocation() - 5, this.getYLocation() - 18);
            } else {
                p.image(this.sunglasses, this.getXLocation() + 7, this.getYLocation() - 18);
            }
        }
    }

    drawCowboyHat(p) {
        if (this.showCowboyHat) {
            if (this.movingLeft) {
                p.image(this.cowboyHat, this.getXLocation() - 5, this.getYLocation() - 25);
            } else {
                p.image(this.cowboyHat2, this.getXLocation() + 7, this.getYLocation() - 25);
            }
        }
    }

    drawSantaHat(p) {
        if (this.showSantaHat) {
            if (this.movingLeft) {
                p.image(this.santaHat2, this.getXLocation() - 5, this.getYLocation() - 27);
            } else {
                p.image(this.santaHat, this.getXLocation() + 7, this.getYLocation() - 27);
            }
        }
    }
}
