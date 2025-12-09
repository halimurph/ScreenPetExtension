// ScreenPetGame.js - EXTENSION VERSION with transparent background

class ScreenPetGame {
    constructor() {
        this.totalCoins = 0;
        this.collectedCoinCount = 0;
        this.coins = [];
        this.message = "";

        this.numFramesC = 36;
        this.pets = [];
        this.coinImages = new Array(this.numFramesC);

        this.babyDuckX = 250;
        this.babyDuckY = 250;
        this.showBabyDuck = false;

        this.lastCoinGenerationTime = 0;

        this.isClicked = false;

        this.rectX = 450;
        this.rectY = 10;

        // No background image for extension!
        this.background = null;

        this.isGentlemanHatUnlocked = false;
        this.isCowboyHatUnlocked = false;
        this.isWindMillHatUnlocked = false;
        this.isCollarUnlocked = false;
        this.isSantaHatUnlocked = false;
        this.isSunglassesUnlocked = false;

        this.numFrames = 10;
        this.currentFrame = 0;
        this.babyDuckImages = new Array(this.numFrames);
        this.babyDuckImages2 = new Array(this.numFrames);

        this.theStore = new Store();

        this.thePet = new Cat(false, 400, 190);
        this.theDragon = new Dragon(true, 400, 230);
        this.theChicken = new Chicken(true, 400, 250);
        this.theHorse = new Horse(true, 400, 270);
        this.thePig = new Pig(true, 400, 290);
        this.theCow = new Cow(true, 400, 210);

        this.currentPet = this.thePet; // the cat

        this.movingLeft = true;
        this.selectedPetIndex = -1;

        this.createAvatar();
        this.createCoins();
        this.createStore();
        this.addPets();
    }

    createAvatar() {
        this.thePet.getName();
        this.thePet.isPetLocked();
    }

    addPets() {
        this.pets.push(this.thePet);
        this.pets.push(this.theCow);
        this.pets.push(this.theChicken);
        this.pets.push(this.theHorse);
        this.pets.push(this.thePig);
        this.pets.push(this.theDragon);
    }

    createCoins() {
        if (this.coins.length > 20) {
            this.coins = [];
        }
        this.totalCoins = Math.floor(Math.random() * 20) + 1;
        console.log("Creating coins with size: " + this.coins.length + " total: " + this.totalCoins);

        for (let i = 1; i <= this.totalCoins; i++) {
            let randX = Math.floor(Math.random() * 800);
            let randY = Math.floor(Math.random() * 600);
            let c = new Coin(i, randX, randY, this.coinImages);
            this.coins.push(c);
        }
    }

    regenerateCoinsIfNeeded() {
        let currentTime = Date.now();
        if (currentTime - this.lastCoinGenerationTime >= 30000) {
            this.createCoins();
            this.lastCoinGenerationTime = currentTime;
        }
    }

    moveTowardsCoin(p) {
        if (this.coins.length > 0) {
            let nearestCoin = null;
            let shortestDistance = Number.MAX_VALUE;
            let radius = 100;

            for (let c of this.coins) {
                let distance = p.dist(
                    this.currentPet.getXLocation(), 
                    this.currentPet.getYLocation(), 
                    c.getxLocation(), 
                    c.getyLocation()
                );

                if (distance < shortestDistance && distance <= radius) {
                    shortestDistance = distance;
                    nearestCoin = c;
                }
            }

            if (nearestCoin !== null) {
                this.currentPet.xTarget = nearestCoin.getxLocation();
                this.currentPet.yTarget = nearestCoin.getyLocation();

                let dx = Math.abs(this.currentPet.getXLocation() - nearestCoin.getxLocation());
                let dy = Math.abs(this.currentPet.getYLocation() - nearestCoin.getyLocation());
                
                if (dx < 15 && dy < 15) {
                    let index = this.coins.indexOf(nearestCoin);
                    if (index > -1) {
                        this.coins.splice(index, 1);
                    }
                    this.collectedCoinCount++;
                }
            }
        }
    }

    createStore() {
        this.theStore.createItems();
    }

    getCollectedCoinCount() {
        return this.collectedCoinCount;
    }

    setCollectedCoinCount(x) {
        this.collectedCoinCount = x;
    }

    setRectX(rectX) {
        this.rectX = rectX;
    }

    setRectY(rectY) {
        this.rectY = rectY;
    }

    getRectX() {
        return this.rectX;
    }

    getRectY() {
        return this.rectY;
    }

    petBox(p) {
        this.isClicked = !this.isClicked;
    }

    draw(p) {
        // TRANSPARENT BACKGROUND - No background image!
        p.clear();
        
        // Draw coins
        for (let aCoin of this.coins) {
            aCoin.draw(p);
        }

        // Draw baby duck
        this.babyDuck(p);
        
        // Draw current pet
        this.currentPet.draw(p);

        // Optional: Draw coin counter (semi-transparent background)
        p.fill(0, 0, 0, 100);
        p.rect(10, 10, 150, 30, 5);
        p.fill(255);
        p.textSize(16);
        p.textAlign(p.LEFT, p.CENTER);
        p.text("🪙 " + this.collectedCoinCount, 20, 25);

        this.moveTowardsCoin(p);
        this.regenerateCoinsIfNeeded();
        this.unlockPetsBasedOnItems();
    }

    loadMedia(p) {
        this.thePet.loadMedia(p);
        this.theCow.loadMedia(p);
        this.theChicken.loadMedia(p);
        this.theHorse.loadMedia(p);
        this.theDragon.loadMedia(p);
        this.thePig.loadMedia(p);

        this.coinImages[0] = p.loadImage("sprites/coin-1.png");
        this.coinImages[1] = p.loadImage("sprites/coin-2.png");
        this.coinImages[2] = p.loadImage("sprites/coin-3.png");
        this.coinImages[3] = p.loadImage("sprites/coin-4.png");
        this.coinImages[4] = p.loadImage("sprites/coin-5.png");
        this.coinImages[5] = p.loadImage("sprites/coin-6.png");
        this.coinImages[6] = p.loadImage("sprites/coin-7.png");
        this.coinImages[7] = p.loadImage("sprites/coin-8.png");
        this.coinImages[8] = p.loadImage("sprites/coin-9.png");
        this.coinImages[9] = p.loadImage("sprites/coin-10.png");
        this.coinImages[10] = p.loadImage("sprites/coin-11.png");
        this.coinImages[11] = p.loadImage("sprites/coin-12.png");
        this.coinImages[12] = p.loadImage("sprites/coin-13.png");
        this.coinImages[13] = p.loadImage("sprites/coin-14.png");
        this.coinImages[14] = p.loadImage("sprites/coin-15.png");
        this.coinImages[15] = p.loadImage("sprites/coin-16.png");
        this.coinImages[16] = p.loadImage("sprites/coin-17.png");
        this.coinImages[17] = p.loadImage("sprites/coin-18.png");
        this.coinImages[18] = p.loadImage("sprites/coin-19.png");
        this.coinImages[19] = p.loadImage("sprites/coin-20.png");
        this.coinImages[20] = p.loadImage("sprites/coin-21.png");
        this.coinImages[21] = p.loadImage("sprites/coin-22.png");
        this.coinImages[22] = p.loadImage("sprites/coin-23.png");
        this.coinImages[23] = p.loadImage("sprites/coin-24.png");
        this.coinImages[24] = p.loadImage("sprites/coin-25.png");
        this.coinImages[25] = p.loadImage("sprites/coin-26.png");
        this.coinImages[26] = p.loadImage("sprites/coin-27.png");
        this.coinImages[27] = p.loadImage("sprites/coin-28.png");
        this.coinImages[28] = p.loadImage("sprites/coin-29.png");
        this.coinImages[29] = p.loadImage("sprites/coin-30.png");
        this.coinImages[30] = p.loadImage("sprites/coin-31.png");
        this.coinImages[31] = p.loadImage("sprites/coin-32.png");
        this.coinImages[32] = p.loadImage("sprites/coin-33.png");
        this.coinImages[33] = p.loadImage("sprites/coin-34.png");
        this.coinImages[34] = p.loadImage("sprites/coin-35.png");
        this.coinImages[35] = p.loadImage("sprites/coin-36.png");

        for (let i = 0; i < this.coinImages.length; i++) {
            this.coinImages[i].resize(10, 10);
        }

        this.babyDuckImages[0] = p.loadImage("sprites/babyDuck-1.png");
        this.babyDuckImages[1] = p.loadImage("sprites/babyDuck-2.png");
        this.babyDuckImages[2] = p.loadImage("sprites/babyDuck-3.png");
        this.babyDuckImages[3] = p.loadImage("sprites/babyDuck-4.png");
        this.babyDuckImages[4] = p.loadImage("sprites/babyDuck-5.png");
        this.babyDuckImages[5] = p.loadImage("sprites/babyDuck-6.png");
        this.babyDuckImages[6] = p.loadImage("sprites/babyDuck-7.png");
        this.babyDuckImages[7] = p.loadImage("sprites/babyDuck-8.png");
        this.babyDuckImages[8] = p.loadImage("sprites/babyDuck-9.png");
        this.babyDuckImages[9] = p.loadImage("sprites/babyDuck-10.png");

        this.babyDuckImages2[0] = p.loadImage("sprites/babyDuck-1flipped.png");
        this.babyDuckImages2[1] = p.loadImage("sprites/babyDuck-2flipped.png");
        this.babyDuckImages2[2] = p.loadImage("sprites/babyDuck-3flipped.png");
        this.babyDuckImages2[3] = p.loadImage("sprites/babyDuck-4flipped.png");
        this.babyDuckImages2[4] = p.loadImage("sprites/babyDuck-5flipped.png");
        this.babyDuckImages2[5] = p.loadImage("sprites/babyDuck-6flipped.png");
        this.babyDuckImages2[6] = p.loadImage("sprites/babyDuck-7flipped.png");
        this.babyDuckImages2[7] = p.loadImage("sprites/babyDuck-8flipped.png");
        this.babyDuckImages2[8] = p.loadImage("sprites/babyDuck-9flipped.png");
        this.babyDuckImages2[9] = p.loadImage("sprites/babyDuck-10flipped.png");

        for (let i = 0; i < this.babyDuckImages.length; i++) {
            this.babyDuckImages[i].resize(10, 10);
            this.babyDuckImages2[i].resize(10, 10);
        }
    }

    unlockPetsBasedOnItems() {
        if (this.isCowboyHatUnlocked) {
            this.thePig.setPetLocked(false);
        }
        if (this.isGentlemanHatUnlocked) {
            this.theDragon.setPetLocked(false);
        }
        if (this.isWindMillHatUnlocked) {
            this.theChicken.setPetLocked(false);
        }
        if (this.isCollarUnlocked) {
            this.theHorse.setPetLocked(false);
        }
        if (this.isSantaHatUnlocked) {
            this.theChicken.setPetLocked(false);
        }
        if (this.isSunglassesUnlocked) {
            this.theCow.setPetLocked(false);
        }
    }

    mouseClicked(p) {
        let dPig = p.dist(p.mouseX, p.mouseY, this.thePig.xLocation, this.thePig.yLocation);
        if (dPig < 30 && this.currentPet === this.thePig) {
            this.thePig.mouseClicked(p);
            this.thePig.chaseMouse(p);
        }
        
        let dChicken = p.dist(p.mouseX, p.mouseY, this.theChicken.xLocation, this.theChicken.yLocation);
        if (dChicken < 30 && this.currentPet === this.theChicken) {
            this.theChicken.mouseClicked(p);
            this.theChicken.runAway(p);
        }
    }

    mousePressed(p, x, y) {
        this.thePet.mousePressed(p, x, y);
    }

    babyDuck(p) {
        if (this.showBabyDuck) {
            let easing = 0.05;

            this.movingLeft = this.babyDuckX > this.currentPet.getXLocation();

            let dx = this.currentPet.getXLocation() - this.babyDuckX;
            this.babyDuckX += dx * easing;

            let dy = this.currentPet.getYLocation() - this.babyDuckY;
            this.babyDuckY += dy * easing;

            if (p.frameCount % 10 === 0) {
                this.currentFrame = (this.currentFrame + 1) % this.numFrames;
            }

            if (this.movingLeft) {
                p.image(this.babyDuckImages[this.currentFrame], this.babyDuckX + 5, this.babyDuckY - 10, 10, 10);
            } else {
                p.image(this.babyDuckImages2[this.currentFrame], this.babyDuckX + 5, this.babyDuckY - 10, 10, 10);
            }
        }
    }

    mouseDragged(p, x, y) {
        this.thePet.mouseDragged(p, x, y);
    }

    mouseReleased(p, x, y) {
        this.thePet.mouseReleased(p, x, y);
    }

    keyPressed(p) {
        if (p.key === 'A' || p.key === 'a') {
            this.theCow.poops(p);
        }

        if (p.key === '1') {
            this.currentPet = this.thePet;
        }

        if (p.key === '2') {
            this.currentPet = this.theCow;
        }

        if (p.key === '3') {
            this.currentPet = this.theChicken;
        }

        if (p.key === '4') {
            this.currentPet = this.theHorse;
        }

        if (p.key === '5') {
            this.currentPet = this.thePig;
        }

        if (p.key === '6') {
            this.currentPet = this.theDragon;
        } else if (p.key === ' ') {
            this.theHorse.unicorn(p);
        } else if (p.key === 'D' || p.key === 'd') {
            this.theDragon.flies(p);
        }
    }
}
