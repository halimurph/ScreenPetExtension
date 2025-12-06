class Chicken extends Pet {
    constructor(petLocked, x, y) {
        super("Chicken", petLocked, x, y);
        
        this.isClick = false;
        this.startTime = 4;
        this.timeStart = 0;
        this.timerStarted = false;
        this.timer = this.startTime;
        this.numFrames = 4;
        this.currentFrame = 0;
        this.chickenImages = new Array(this.numFrames);
        this.chickenImages2 = new Array(this.numFrames);
    }

    draw(p) {
        super.draw(p);

        if (this.movingLeft) {
            if (p.frameCount % 10 === 0) {
                this.currentFrame = (this.currentFrame + 1) % this.numFrames;
            }
            p.image(this.chickenImages[this.currentFrame], this.xLocation - 10, this.yLocation - 8,20,15);
        } else {
            if (p.frameCount % 10 === 0) {
                this.currentFrame = (this.currentFrame + 1) % this.numFrames;
            }
            p.image(this.chickenImages2[this.currentFrame], this.xLocation - 10, this.yLocation - 8,20,15);
        }

        if (this.isClick === true) {
            if (this.timerStarted) {
                let current = Math.floor((p.millis() - this.timeStart) / 1000);
                this.timer = this.startTime - current;

                let dx = this.xLocation - p.mouseX;
                let dy = this.yLocation - p.mouseY;

                let dist = p.dist(this.xLocation, this.yLocation, p.mouseX, p.mouseY);
                if (dist !== 0) {
                    dx /= dist;
                    dy /= dist;
                }

                let repelSpeed = p.map(dist, 0, 200, 10, 2);
                repelSpeed = p.constrain(repelSpeed, 2, 10);

                this.xLocation += dx * repelSpeed;
                this.yLocation += dy * repelSpeed;

                this.xLocation = p.constrain(this.xLocation, 0, p.width - 50);
                this.yLocation = p.constrain(this.yLocation, 0, p.height - 50);
            }
        }

        if (this.timer === 0) {
            this.timerStarted = false;
            this.fast = false;
        }

        this.drawWindMillHat(p);
        this.drawCollar(p);
        this.drawGentlemanHat(p);
        this.drawSunglass(p);
        this.drawCowboyHat(p);
        this.drawSantaHat(p);
    }

    loadMedia(p) {
        this.chickenImages[0] = p.loadImage("sprites/Chicken-1.png");
        this.chickenImages[1] = p.loadImage("sprites/Chicken-2.png");
        this.chickenImages[2] = p.loadImage("sprites/Chicken-3.png");
        this.chickenImages[3] = p.loadImage("sprites/Chicken-4.png");

        this.chickenImages2[0] = p.loadImage("sprites/Chicken-1flipped.png");
        this.chickenImages2[1] = p.loadImage("sprites/Chicken-2flipped.png");
        this.chickenImages2[2] = p.loadImage("sprites/Chicken-3flipped.png");
        this.chickenImages2[3] = p.loadImage("sprites/Chicken-4flipped.png");

        for (let i = 0; i < this.chickenImages.length; i++) {
            this.chickenImages[i].resize(20, 15);
            this.chickenImages2[i].resize(20, 15);
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

    mouseClicked(p) {
        this.timeStart = p.millis();
        this.timerStarted = true;
        this.fast = true;
    }

    runAway(p) {
        this.isClick = true;
    }

    drawWindMillHat(p) {
        if (this.showWindMillHat) {
            if (this.movingLeft) {
                p.image(this.windmillHat, this.getXLocation() - 5, this.getYLocation() - 19,12,12);
            } else {
                p.image(this.windmillHat2, this.getXLocation() - 2, this.getYLocation() - 19,12,12);
            }
        }
    }

    drawCollar(p) {
        if (this.showCollar) {
            if (this.movingLeft) {
                p.image(this.collar2, this.getXLocation() + 10, this.getYLocation() - 7,12,12);
            } else {
                p.image(this.collar, this.getXLocation() - 12, this.getYLocation() - 7,12,12);
            }
        }
    }

    drawGentlemanHat(p) {
        if (this.showGentlemanHat) {
            if (this.movingLeft) {
                p.image(this.gentlemanHat, this.getXLocation() - 10, this.getYLocation() - 19,12,12);
            } else {
                p.image(this.gentlemanHat2, this.getXLocation() - 2, this.getYLocation() - 19,12,12);
            }
        }
    }

    drawSunglass(p) {
        if (this.showSunglasses) {
            if (this.movingLeft) {
                p.image(this.sunglasses2, this.getXLocation() - 10, this.getYLocation() - 10,12,12);
            } else {
                p.image(this.sunglasses, this.getXLocation() - 2, this.getYLocation() - 10,12,12);
            }
        }
    }

    drawCowboyHat(p) {
        if (this.showCowboyHat) {
            if (this.movingLeft) {
                p.image(this.cowboyHat, this.getXLocation() - 10, this.getYLocation() - 19,12,12);
            } else {
                p.image(this.cowboyHat2, this.getXLocation() - 2, this.getYLocation() - 19,12,12);
            }
        }
    }

    drawSantaHat(p) {
        if (this.showSantaHat) {
            if (this.movingLeft) {
                p.image(this.santaHat2, this.getXLocation() - 10, this.getYLocation() - 19,12,12);
            } else {
                p.image(this.santaHat, this.getXLocation() - 2, this.getYLocation() - 19,12,12);
            }
        }
    }
}
