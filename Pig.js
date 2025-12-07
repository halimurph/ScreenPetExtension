class Pig extends Pet {
    constructor(petLocked, x, y) {
        super("Pig", petLocked, x, y);
        
        this.isClick = false;
        this.startTime = 5; // FIXED: 5 seconds instead of 4
        this.timeStart = 0;
        this.timerStarted = false;
        this.timer = this.startTime;
        this.numFrames = 4;
        this.currentFrame = 0;
        this.pigImages = new Array(this.numFrames);
        this.pigImages2 = new Array(this.numFrames);
        this.normalSpeed = 2; // Normal movement speed
        this.chaseSpeed = 20; // FAST chase speed!
    }

    draw(p) {
        super.draw(p);

        if (this.movingLeft) {
            if (p.frameCount % 10 === 0) {
                this.currentFrame = (this.currentFrame + 1) % this.numFrames;
            }
            p.image(this.pigImages[this.currentFrame], this.xLocation - 15, this.yLocation - 10, 30, 20);
        } else {
            if (p.frameCount % 10 === 0) {
                this.currentFrame = (this.currentFrame + 1) % this.numFrames;
            }
            p.image(this.pigImages2[this.currentFrame], this.xLocation - 15, this.yLocation - 10, 30, 20);
        }

        // CHASE MOUSE BEHAVIOR
        if (this.isClick === true) {
            if (this.timerStarted) {
                // Update timer
                let current = Math.floor((p.millis() - this.timeStart) / 1000);
                this.timer = this.startTime - current;

                // Set target to mouse position
                this.xTarget = p.mouseX;
                this.yTarget = p.mouseY;
                
                // INCREASE SPEED during chase!
                this.speed = this.chaseSpeed;

                // Check if timer expired
                if (this.timer <= 0) {
                    this.timerStarted = false;
                    this.isClick = false;
                    this.speed = this.normalSpeed; // Reset to normal speed
                    this.timer = this.startTime; // Reset timer
                }
            }
        } else {
            // Not chasing, use normal speed
            this.speed = this.normalSpeed;
        }

        this.drawWindMillHat(p);
        this.drawCollar(p);
        this.drawGentlemanHat(p);
        this.drawSunglass(p);
        this.drawCowboyHat(p);
        this.drawSantaHat(p);
    }

    mouseClicked(p) {
        this.timeStart = p.millis();
        this.timerStarted = true;
        this.timer = this.startTime; // Reset timer to 5
    }

    chaseMouse(p) {
        this.isClick = true;
    }

    loadMedia(p) {
        this.pigImages[0] = p.loadImage("sprites/Pig-1.png");
        this.pigImages[1] = p.loadImage("sprites/Pig-2.png");
        this.pigImages[2] = p.loadImage("sprites/Pig-3.png");
        this.pigImages[3] = p.loadImage("sprites/Pig-4.png");

        this.pigImages2[0] = p.loadImage("sprites/Pig-1flipped.png");
        this.pigImages2[1] = p.loadImage("sprites/Pig-2flipped.png");
        this.pigImages2[2] = p.loadImage("sprites/Pig-3flipped.png");
        this.pigImages2[3] = p.loadImage("sprites/Pig-4flipped.png");

        for (let i = 0; i < this.pigImages.length; i++) {
            this.pigImages[i].resize(30, 20);
            this.pigImages2[i].resize(30, 20);
        }

        this.windmillHat = p.loadImage("sprites/windmillHat.png");
        this.windmillHat.resize(15, 15);
        this.windmillHat2 = p.loadImage("sprites/windmillHatflipped.png");
        this.windmillHat2.resize(15, 15);

        this.collar = p.loadImage("sprites/collar.png");
        this.collar.resize(15, 15);
        this.collar2 = p.loadImage("sprites/collarflipped.png");
        this.collar2.resize(15, 15);

        this.gentlemanHat = p.loadImage("sprites/gentlemanHat.png");
        this.gentlemanHat.resize(15, 15);
        this.gentlemanHat2 = p.loadImage("sprites/gentlemanHatflipped.png");
        this.gentlemanHat2.resize(15, 15);

        this.sunglasses = p.loadImage("sprites/sunglasses.png");
        this.sunglasses.resize(15, 15);
        this.sunglasses2 = p.loadImage("sprites/sunglassesflipped.png");
        this.sunglasses2.resize(15, 15);

        this.cowboyHat = p.loadImage("sprites/cowboyHat.png");
        this.cowboyHat.resize(15, 15);
        this.cowboyHat2 = p.loadImage("sprites/cowboyHatflipped.png");
        this.cowboyHat2.resize(15, 15);

        this.santaHat = p.loadImage("sprites/santaHat.png");
        this.santaHat.resize(15, 15);
        this.santaHat2 = p.loadImage("sprites/santaHatflipped.png");
        this.santaHat2.resize(15, 15);
    }

    drawWindMillHat(p) {
        if (this.showWindMillHat) {
            if (this.movingLeft) {
                p.image(this.windmillHat, this.getXLocation() - 14, this.getYLocation() - 24, 15, 15);
            } else {
                p.image(this.windmillHat2, this.getXLocation() + 3, this.getYLocation() - 24, 15, 15);
            }
        }
    }

    drawCollar(p) {
        if (this.showCollar) {
            if (this.movingLeft) {
                p.image(this.collar2, this.getXLocation() - 10, this.getYLocation() - 2, 15, 15);
            } else {
                p.image(this.collar, this.getXLocation() + 3, this.getYLocation() - 2, 15, 15);
            }
        }
    }

    drawGentlemanHat(p) {
        if (this.showGentlemanHat) {
            if (this.movingLeft) {
                p.image(this.gentlemanHat, this.getXLocation() - 14, this.getYLocation() - 24, 15, 15);
            } else {
                p.image(this.gentlemanHat2, this.getXLocation() + 3, this.getYLocation() - 24, 15, 15);
            }
        }
    }

    drawSunglass(p) {
        if (this.showSunglasses) {
            if (this.movingLeft) {
                p.image(this.sunglasses2, this.getXLocation() - 15, this.getYLocation() - 10, 15, 15);
            } else {
                p.image(this.sunglasses, this.getXLocation() + 4, this.getYLocation() - 10, 15, 15);
            }
        }
    }

    drawCowboyHat(p) {
        if (this.showCowboyHat) {
            if (this.movingLeft) {
                p.image(this.cowboyHat, this.getXLocation() - 14, this.getYLocation() - 24, 15, 15);
            } else {
                p.image(this.cowboyHat2, this.getXLocation() + 1, this.getYLocation() - 24, 15, 15);
            }
        }
    }

    drawSantaHat(p) {
        if (this.showSantaHat) {
            if (this.movingLeft) {
                p.image(this.santaHat2, this.getXLocation() - 14, this.getYLocation() - 24, 15, 15);
            } else {
                p.image(this.santaHat, this.getXLocation() + 3, this.getYLocation() - 24, 15, 15);
            }
        }
    }
}
