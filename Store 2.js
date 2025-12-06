class Store {
    constructor() {
        this.items = [];
        this.game = null;
        this.itemName = " ";
        this.isClicked = false;

        this.rectX = 400;
        this.rectY = 10;

        this.createItems();
    }

    createItems() {
        let itemStartX = this.rectX; // Distance from store button to right
        let itemStartY = this.rectY + 20; // Starting Y below the store button
        let itemSpacing = 30;        // Vertical spacing between items

        let itemNames = [
            "Gentleman Hat", "Santa Hat", "Sunglasses",
            "Cowboy Hat", "Baby Duck", "Collar", "Windmill Hat"
        ];

        let itemPrices = [
            3, 5, 2,
            6, 10, 7, 8
        ];

        for (let i = 0; i < itemNames.length; i++) {
            let x = itemStartX;
            let y = itemStartY + i * itemSpacing;
            this.items.push(new Item(itemNames[i], itemPrices[i], true, x, y));
        }
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

    draw(p) {
        p.fill(255);
        p.rect(this.getRectX(), this.getRectY(), 50, 25);

        p.fill(0);
        p.textSize(12);
        p.text("Store", this.getRectX() + 25, this.getRectY() + 12);  // Always say "Store"

        // Draw store items if clicked
        if (this.isClicked) {
            for (let item of this.items) {
                item.draw(p);
                p.fill(200);  // Shaded for unlocked
                p.rect(this.getRectX(), this.getRectY(), 50, 25);
                p.textAlign(p.CENTER, p.CENTER);
                p.fill(0);
                p.textSize(12);
                p.text("Store", this.getRectX() + 25, this.getRectY() + 12);
            }
        } else {
            p.fill(255);  // Regular white for locked items
            p.rect(this.getRectX(), this.getRectY(), 50, 25);
            p.fill(0);
            p.textSize(12);
            p.text("Store", this.getRectX() + 25, this.getRectY() + 12);
        }
    }

    storeBox(p) {
        this.isClicked = !this.isClicked;
    }

    findItem(x, y) {
        let tempItem = new Item("NOTFOUND", 0, false, 0, 0);

        for (let item of this.items) {
            if (item.wasClicked(x, y)) {
                tempItem = item;
            }
        }
        return tempItem;
    }

    toString() {
        let s = "Store:\n";

        for (let item of this.items) {
            s += item.toString() + "\n";
        }
        return s;
    }

    runTests() {
        console.assert(this.items.length === 7);
        for (let b of this.items) {
            b.runTests();
        }
    }
}
