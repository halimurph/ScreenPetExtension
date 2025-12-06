class Pet {
    constructor(s, petLocked, x, y) {
        this.petName = s;
        this.petLocked = petLocked;
        this.xLocation = x;
        this.yLocation = y;
        this.coordinates = 0;
        this.message = "";
        this.movingLeft = true;

        this.xTarget = x;
        this.yTarget = y;

        this.easing = 0.05;
        this.isBeingDragged = false;

        this.timeStart = 0;
        this.moving = true;
        this.fast = false;
        this.cat = null;
        this.cow = null;

        this.windmillHat = null;
        this.windmillHat2 = null;
        this.showWindMillHat = false;

        this.collar = null;
        this.collar2 = null;
        this.showCollar = false;

        this.gentlemanHat = null;
        this.gentlemanHat2 = null;
        this.showGentlemanHat = false;

        this.sunglasses = null;
        this.sunglasses2 = null;
        this.showSunglasses = false;

        this.cowboyHat = null;
        this.cowboyHat2 = null;
        this.showCowboyHat = false;

        this.santaHat = null;
        this.santaHat2 = null;
        this.showSantaHat = false;

        this.moveSomewhere();
    }

    setName(s) {
        this.petName = s;
    }

    getName() {
        return this.petName;
    }

    isPetLocked() {
        return this.petLocked;
    }

    getPetLocked() {
        return this.petLocked;
    }

    setPetLocked(locked) {
        this.petLocked = locked;
    }

    poops() {
        // Override in subclasses
    }

    setLocation(x, y) {
        this.xLocation = x;
        this.yLocation = y;
    }

    getXLocation() {
        return this.xLocation;
    }

    getYLocation() {
        return this.yLocation;
    }

    moveSomewhere() {
        this.xTarget = Math.floor(Math.random() * 800);
        this.yTarget = Math.floor(Math.random() * 600);
    }

    draw(p) {
        p.fill(13, 133, 4);
        // p.fill(0);
        p.textSize(20);
        p.text(this.message, 100, 450);

        if (this.moving) {
            if (this.xLocation < this.xTarget) {
                this.xLocation++;
                this.movingLeft = false;
            } else if (this.xLocation > this.xTarget) {
                this.xLocation--;
                this.movingLeft = true;
            }

            if (this.yLocation < this.yTarget) {
                this.yLocation++;
            } else if (this.yLocation > this.yTarget) {
                this.yLocation--;
            }
        }

        if (this.xLocation === this.xTarget && this.yLocation === this.yTarget) {
            this.moveSomewhere();
        }
    }

    mousePressed(p, x, y) {
        let clickableRadius = 30; // Adjust this for how "big" the pet feels

        let d = p.dist(x, y, this.xLocation, this.yLocation);

        if (d < clickableRadius) {
            this.moving = false;
            this.isBeingDragged = true;
            this.timeStart = p.millis();
            // this.message = "Mouse pressed at " + x + "/" + y;
        }
    }

    loadMedia(p) {
        if (this.cat) {
            this.cat.loadMedia(p);
        }
        if (this.cow) {
            this.cow.loadMedia(p);
        }
    }

    mouseDragged(p, x, y) {
        this.xLocation = x;
        this.yLocation = y;
    }

    mouseReleased(p, x, y) {
        let clickableRadius = 30; // same radius as used in mousePressed

        let d = p.dist(x, y, this.xLocation, this.yLocation);

        if (d < clickableRadius) {
            this.moving = true;

            this.xLocation = x;
            this.yLocation = y;
            let time = p.millis() - this.timeStart;

            let s1 = x < 0 ? "Left" : "Right";
            let s2 = y < 0 ? "Up" : "Down";
            let s = "Mouse moved " + s1 + " and " + s2;
            s += " released at " + p.mouseX + "/" + p.mouseY;
            s += " after " + time + " milliseconds";
            // or
            // this.message = "Mouse released at (" + this.getXLocation() + ", " + this.getYLocation() + ")";
        }
    }

    toString() {
        let s = this.petName + (this.petLocked ? " (Locked)" : " (Unlocked)");
        return s;
    }

    runTests() {
        console.assert(this.petLocked === true);
        console.assert(this.petName !== null);
    }
}
