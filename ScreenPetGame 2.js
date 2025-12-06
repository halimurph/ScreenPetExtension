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
        this.pets();
    }

    createAvatar() {
        this.thePet.getName();
        this.thePet.isPetLocked();
    }

    pets() {
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
        this.totalCoins = Math.floor(Math.random() * 20) + 1; // Random number between 1 and 20
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
        if (currentTime - this.lastCoinGenerationTime >= 30000) { // 30 seconds
            this.createCoins(); // Regenerate coins
            this.lastCoinGenerationTime = currentTime; // Update the last coin generation time
        }
    }

    moveTowardsCoin() {
        if (this.coins.length > 0) {
            let nearestCoin = null;
            let shortestDistance = Number.MAX_VALUE;
            let radius = 100;

            for (let c of this.coins) {
                let distance = dist(this.currentPet.xLocation, this.currentPet.yLocation, c.getxLocation(), c.getyLocation());

                if (distance < shortestDistance && distance <= radius) {
                    shortestDistance = distance;
                    nearestCoin = c;
                }
            }

            if (nearestCoin !== null) {
                this.currentPet.xTarget = nearestCoin.getxLocation();
                this.currentPet.yTarget = nearestCoin.getyLocation();

                if (this.currentPet.getXLocation() === nearestCoin.getxLocation() &&
                    this.currentPet.getYLocation() === nearestCoin.getyLocation()) {
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
        image(this.background, 0, 0);
        fill(255);
        rect(this.getRectX(), this.getRectY(), 50, 25);  // Always draw the box

        fill(0);
        textSize(12);
        textAlign(CENTER, CENTER);
        text("Pet", this.getRectX() + 25, this.getRectY() + 12);  // Always say "Pet"

        // Now handle contents inside
        if (this.isClicked) {
            fill(200);
            rect(this.getRectX(), this.getRectY(), 50, 25);

            fill(0);
            textSize(12);
            textAlign(CENTER, CENTER);
            text("Pet", this.getRectX() + 25, this.getRectY() + 12);
            // Show pets
            textAlign(LEFT, CENTER);
            for (let i = 0; i < this.pets.length; i++) {
                let y = this.getRectY() + 30 + i * 20;
                fill(this.selectedPetIndex === i ? 200 : 255);
                rect(this.getRectX(), y, 120, 20); // Widen box to fit key label

                let petCommands = [
                    "click/drag", "key A", "click",
                    "space", "click", "key D"
                ];

                fill(0);
                let label = "Press " + (i + 1) + ": " + this.pets[i].getName() + "- " + petCommands[i];
                text(label, this.getRectX() + 5, y + 10);
            }
        } else {
            // Always draw the box
            fill(0);
            textSize(12);
            textAlign(CENTER, CENTER);
            text("Pet", this.getRectX() + 25, this.getRectY() + 12);
            // Show store
            this.theStore.draw(p);  // Store still only draws when not in pet mode
        }

        this.babyDuck(p);
        this.currentPet.draw(p);
        for (let aCoin of this.coins) {
            aCoin.draw(p);
        }

        fill(0);
        textSize(20);
        textAlign(CENTER, CENTER);
        text("Collected " + this.collectedCoinCount + " coins", 100, 500);

        this.moveTowardsCoin();

        fill(0);
        textSize(20);
        textAlign(LEFT, CENTER);
        text(this.message, 30, 550);

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

        this.coinImages[0] = loadImage("ScreenPet IMG" + fileSeparator + "coin-1.png");
        this.coinImages[1] = loadImage("ScreenPet IMG" + fileSeparator + "coin-2.png");
        this.coinImages[2] = loadImage("ScreenPet IMG" + fileSeparator + "coin-3.png");
        this.coinImages[3] = loadImage("ScreenPet IMG" + fileSeparator + "coin-4.png");
        this.coinImages[4] = loadImage("ScreenPet IMG" + fileSeparator + "coin-5.png");
        this.coinImages[5] = loadImage("ScreenPet IMG" + fileSeparator + "coin-6.png");
        this.coinImages[6] = loadImage("ScreenPet IMG" + fileSeparator + "coin-7.png");
        this.coinImages[7] = loadImage("ScreenPet IMG" + fileSeparator + "coin-8.png");
        this.coinImages[8] = loadImage("ScreenPet IMG" + fileSeparator + "coin-9.png");
        this.coinImages[9] = loadImage("ScreenPet IMG" + fileSeparator + "coin-10.png");
        this.coinImages[10] = loadImage("ScreenPet IMG" + fileSeparator + "coin-11.png");
        this.coinImages[11] = loadImage("ScreenPet IMG" + fileSeparator + "coin-12.png");
        this.coinImages[12] = loadImage("ScreenPet IMG" + fileSeparator + "coin-13.png");
        this.coinImages[13] = loadImage("ScreenPet IMG" + fileSeparator + "coin-14.png");
        this.coinImages[14] = loadImage("ScreenPet IMG" + fileSeparator + "coin-15.png");
        this.coinImages[15] = loadImage("ScreenPet IMG" + fileSeparator + "coin-16.png");
        this.coinImages[16] = loadImage("ScreenPet IMG" + fileSeparator + "coin-17.png");
        this.coinImages[17] = loadImage("ScreenPet IMG" + fileSeparator + "coin-18.png");
        this.coinImages[18] = loadImage("ScreenPet IMG" + fileSeparator + "coin-19.png");
        this.coinImages[19] = loadImage("ScreenPet IMG" + fileSeparator + "coin-20.png");
        this.coinImages[20] = loadImage("ScreenPet IMG" + fileSeparator + "coin-21.png");
        this.coinImages[21] = loadImage("ScreenPet IMG" + fileSeparator + "coin-22.png");
        this.coinImages[22] = loadImage("ScreenPet IMG" + fileSeparator + "coin-23.png");
        this.coinImages[23] = loadImage("ScreenPet IMG" + fileSeparator + "coin-24.png");
        this.coinImages[24] = loadImage("ScreenPet IMG" + fileSeparator + "coin-25.png");
        this.coinImages[25] = loadImage("ScreenPet IMG" + fileSeparator + "coin-26.png");
        this.coinImages[26] = loadImage("ScreenPet IMG" + fileSeparator + "coin-27.png");
        this.coinImages[27] = loadImage("ScreenPet IMG" + fileSeparator + "coin-28.png");
        this.coinImages[28] = loadImage("ScreenPet IMG" + fileSeparator + "coin-29.png");
        this.coinImages[29] = loadImage("ScreenPet IMG" + fileSeparator + "coin-30.png");
        this.coinImages[30] = loadImage("ScreenPet IMG" + fileSeparator + "coin-31.png");
        this.coinImages[31] = loadImage("ScreenPet IMG" + fileSeparator + "coin-32.png");
        this.coinImages[32] = loadImage("ScreenPet IMG" + fileSeparator + "coin-33.png");
        this.coinImages[33] = loadImage("ScreenPet IMG" + fileSeparator + "coin-34.png");
        this.coinImages[34] = loadImage("ScreenPet IMG" + fileSeparator + "coin-35.png");
        this.coinImages[35] = loadImage("ScreenPet IMG" + fileSeparator + "coin-36.png");

        for (let i = 0; i < this.coinImages.length; i++) {
            this.coinImages[i].resize(10, 10);
        }

        this.babyDuckImages[0] = loadImage("ScreenPet IMG" + fileSeparator + "babyDuck-1.png");
        this.babyDuckImages[1] = loadImage("ScreenPet IMG" + fileSeparator + "babyDuck-2.png");
        this.babyDuckImages[2] = loadImage("ScreenPet IMG" + fileSeparator + "babyDuck-3.png");
        this.babyDuckImages[3] = loadImage("ScreenPet IMG" + fileSeparator + "babyDuck-4.png");
        this.babyDuckImages[4] = loadImage("ScreenPet IMG" + fileSeparator + "babyDuck-5.png");
        this.babyDuckImages[5] = loadImage("ScreenPet IMG" + fileSeparator + "babyDuck-6.png");
        this.babyDuckImages[6] = loadImage("ScreenPet IMG" + fileSeparator + "babyDuck-7.png");
        this.babyDuckImages[7] = loadImage("ScreenPet IMG" + fileSeparator + "babyDuck-8.png");
        this.babyDuckImages[8] = loadImage("ScreenPet IMG" + fileSeparator + "babyDuck-9.png");
        this.babyDuckImages[9] = loadImage("ScreenPet IMG" + fileSeparator + "babyDuck-10.png");

        this.babyDuckImages2[0] = loadImage("ScreenPet IMG" + fileSeparator + "babyDuck-1flipped.png");
        this.babyDuckImages2[1] = loadImage("ScreenPet IMG" + fileSeparator + "babyDuck-2flipped.png");
        this.babyDuckImages2[2] = loadImage("ScreenPet IMG" + fileSeparator + "babyDuck-3flipped.png");
        this.babyDuckImages2[3] = loadImage("ScreenPet IMG" + fileSeparator + "babyDuck-4flipped.png");
        this.babyDuckImages2[4] = loadImage("ScreenPet IMG" + fileSeparator + "babyDuck-5flipped.png");
        this.babyDuckImages2[5] = loadImage("ScreenPet IMG" + fileSeparator + "babyDuck-6flipped.png");
        this.babyDuckImages2[6] = loadImage("ScreenPet IMG" + fileSeparator + "babyDuck-7flipped.png");
        this.babyDuckImages2[7] = loadImage("ScreenPet IMG" + fileSeparator + "babyDuck-8flipped.png");
        this.babyDuckImages2[8] = loadImage("ScreenPet IMG" + fileSeparator + "babyDuck-9flipped.png");
        this.babyDuckImages2[9] = loadImage("ScreenPet IMG" + fileSeparator + "babyDuck-10flipped.png");

        for (let i = 0; i < this.babyDuckImages.length; i++) {
            this.babyDuckImages[i].resize(10, 10);
            this.babyDuckImages2[i].resize(10, 10);
        }
        this.background = loadImage("ScreenPet IMG" + fileSeparator + "background.jpg");
    }

    unlockPetsBasedOnItems() {
        // Unlock pets when certain items are unlocked
        if (this.isCowboyHatUnlocked) {
            this.thePig.setPetLocked(false); // Unlock pig when cowboy hat is unlocked
        }
        if (this.isGentlemanHatUnlocked) {
            this.theDragon.setPetLocked(false); // Unlock dragon when gentleman hat is unlocked
        }
        if (this.isWindMillHatUnlocked) {
            this.theChicken.setPetLocked(false);  // Unlock chicken when windmill hat is unlocked
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
        this.thePig.mouseClicked(p); // <- Delegation: Controller tells the model to feed the pet
        this.thePig.chaseMouse(p);
        this.theChicken.mouseClicked(p);
        this.theChicken.runAway(p);
        if (mouseX >= this.theStore.getRectX() && mouseX <= this.theStore.getRectX() + 50 &&
            mouseY >= this.theStore.getRectY() && mouseY <= this.theStore.getRectY() + 25) {
            this.theStore.storeBox(p);
        } else if (mouseX >= this.getRectX() && mouseX <= this.getRectX() + 50 &&
                   mouseY >= this.getRectY() && mouseY <= this.getRectY() + 25) {
            this.petBox(p);
        }
    }

    mousePressed(p, x, y) {
        this.thePet.mousePressed(p, x, y);

        let foundItem = this.theStore.findItem(x, y);
        if (foundItem.getItemName() !== "NOTFOUND") {

            console.log("FOUND: " + foundItem.getItemName());
            if (foundItem.getItemLocked() && this.getCollectedCoinCount() >= foundItem.getPrice()) {
                foundItem.setItemLocked(false);
                this.collectedCoinCount -= foundItem.getPrice();
                this.message = foundItem.getItemName() + " unlocked!";
                this.unlockPetsBasedOnItems();
            } else if (foundItem.getItemLocked()) {
                this.message = "Not enough coins to unlock " + foundItem.getItemName();
            }
            if (!foundItem.getItemLocked()) {
                let isAlreadyOn = false;

                switch (foundItem.getItemName()) {
                    case "Baby Duck":
                        isAlreadyOn = this.showBabyDuck;
                        break;
                    case "Gentleman Hat":
                        isAlreadyOn = this.currentPet.showGentlemanHat;
                        break;
                    case "Santa Hat":
                        isAlreadyOn = this.currentPet.showSantaHat;
                        break;
                    case "Cowboy Hat":
                        isAlreadyOn = this.currentPet.showCowboyHat;
                        break;
                    case "Collar":
                        isAlreadyOn = this.currentPet.showCollar;
                        break;
                    case "Windmill Hat":
                        isAlreadyOn = this.currentPet.showWindMillHat;
                        break;
                    case "Sunglasses":
                        isAlreadyOn = this.currentPet.showSunglasses;
                        break;
                }

                // Turn all off first
                this.showBabyDuck = false;
                this.currentPet.showGentlemanHat = false;
                this.currentPet.showSantaHat = false;
                this.currentPet.showCowboyHat = false;
                this.currentPet.showCollar = false;
                this.currentPet.showWindMillHat = false;
                this.currentPet.showSunglasses = false;

                // If it wasn't already on, turn it on
                if (!isAlreadyOn) {
                    switch (foundItem.getItemName()) {
                        case "Baby Duck":
                            this.showBabyDuck = true;
                            break;
                        case "Gentleman Hat":
                            this.currentPet.showGentlemanHat = true;
                            break;
                        case "Santa Hat":
                            this.currentPet.showSantaHat = true;
                            break;
                        case "Cowboy Hat":
                            this.currentPet.showCowboyHat = true;
                            break;
                        case "Collar":
                            this.currentPet.showCollar = true;
                            break;
                        case "Windmill Hat":
                            this.currentPet.showWindMillHat = true;
                            break;
                        case "Sunglasses":
                            this.currentPet.showSunglasses = true;
                            break;
                    }
                }
            }
        }
    }

    babyDuck(p) {
        if (this.showBabyDuck) {
            let easing = 0.05;

            // Determine direction BEFORE updating the position
            this.movingLeft = this.babyDuckX > this.currentPet.getXLocation();

            let dx = this.currentPet.getXLocation() - this.babyDuckX;
            this.babyDuckX += dx * easing;

            let dy = this.currentPet.getYLocation() - this.babyDuckY;
            this.babyDuckY += dy * easing;

            if (frameCount % 10 === 0) {
                this.currentFrame = (this.currentFrame + 1) % this.numFrames;
            }

            if (this.movingLeft) {
                image(this.babyDuckImages[this.currentFrame], this.babyDuckX + 5, this.babyDuckY - 10);
            } else {
                image(this.babyDuckImages2[this.currentFrame], this.babyDuckX + 5, this.babyDuckY - 10);
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
        if (key === 'A' || key === 'a') {
            this.theCow.poops();
        }

        if (key === '1') {
            this.currentPet = this.thePet;
        }

        if (key === '2') {
            this.currentPet = this.theCow;
        }

        if (key === '3') {
            this.currentPet = this.theChicken;
        }

        if (key === '4') {
            this.currentPet = this.theHorse;
        }

        if (key === '5') {
            this.currentPet = this.thePig;
        }

        if (key === '6') {
            this.currentPet = this.theDragon;
        } else if (key === ' ') {
            this.theHorse.unicorn(p);
        } else if (key === 'D' || key === 'd') {
            this.theDragon.flies(p);
        }
    }

    toString() {
        let s = "Game:\n";
        s += "Total Coins Generated: " + this.coins.length + "\n";
        s += "Collected Coins Generated: " + this.collectedCoinCount + "\n";

        s += this.theStore;

        s += "Pet: " + this.thePet + "\n";
        if (this.thePet.getPetLocked()) {
            s += "Pet is unlocked\n";
        } else {
            s += "Pet is locked\n";
        }

        return s;
    }

    runTests() {
        console.assert(this.collectedCoinCount === 0);
        console.assert(this.coins.length > 0 && this.coins.length <= 20);
        console.assert(this.coins[0] !== null);
        console.assert(this.coins[this.coins.length - 1] !== null);
        console.assert(this.totalCoins === this.coins.length);

        this.theStore.runTests();
        this.thePet.runTests();
    }
}
