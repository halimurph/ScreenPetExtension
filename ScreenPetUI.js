// ScreenPetUI.js - Main p5.js sketch file
let screenPet;
const fileSeparator = "/"; // Use forward slash for web paths

function setup() {
    createCanvas(windowWidth, windowHeight);
    screenPet = new ScreenPetGame();
    screenPet.loadMedia(window);
}

function draw() {
    background(255);
    screenPet.draw(window);
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function mouseClicked() {
    screenPet.mouseClicked(window);
}

function keyPressed() {
    screenPet.keyPressed(window);
}

function mousePressed() {
    screenPet.mousePressed(window, mouseX, mouseY);
}

function mouseDragged() {
    screenPet.mouseDragged(window, mouseX, mouseY);
}

function mouseReleased() {
    screenPet.mouseReleased(window, mouseX, mouseY);
}
