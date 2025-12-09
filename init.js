// init.js - Runs in PAGE context to initialize the screen pet

(function() {
    console.log('=== INIT.JS RUNNING ===');
    
    // Wait for p5 to be available
    let attempts = 0;
    const maxAttempts = 50;
    
    const checkP5 = setInterval(() => {
        attempts++;
        
        console.log(`Checking for p5... attempt ${attempts}, typeof p5 = ${typeof p5}`);
        
        if (typeof p5 !== 'undefined') {
            clearInterval(checkP5);
            console.log('✓ p5 is ready!');
            
            // Check for other classes
            console.log('typeof Pet:', typeof Pet);
            console.log('typeof ScreenPetGame:', typeof ScreenPetGame);
            
            if (typeof ScreenPetGame === 'undefined') {
                console.error('❌ ScreenPetGame not available yet, waiting more...');
                setTimeout(initializePet, 500);
            } else {
                initializePet();
            }
        } else if (attempts >= maxAttempts) {
            clearInterval(checkP5);
            console.error('❌ p5 never loaded after', maxAttempts, 'attempts');
        }
    }, 100);
    
    function initializePet() {
        console.log('=== INITIALIZING PET ===');
        
        if (typeof p5 === 'undefined') {
            console.error('❌ p5 still not available!');
            return;
        }
        
        if (typeof ScreenPetGame === 'undefined') {
            console.error('❌ ScreenPetGame not available!');
            return;
        }
        
        // Get extension URL from container data attribute
        const container = document.getElementById('screen-pet-container');
        const EXTENSION_URL = container ? container.getAttribute('data-extension-url') : null;
        
        console.log('✓ Extension URL from data attr:', EXTENSION_URL);
        
        if (!EXTENSION_URL) {
            console.error('❌ EXTENSION_URL not found in container! Images will fail!');
            return;
        }
        
        console.log('✓ Creating p5 sketch...');
        
        new p5(function(p) {
            let screenPet;
            
            // Override loadImage to use extension URLs!
            const originalLoadImage = p.loadImage;
            p.loadImage = function(path, successCallback, failureCallback) {
                console.log('🖼️ BEFORE:', path);
                
                // If path starts with "sprites/", prepend extension URL
                if (path.startsWith('sprites/')) {
                    path = EXTENSION_URL + path;
                }
                
                console.log('🖼️ AFTER:', path);
                
                return originalLoadImage.call(p, path, 
                    function(img) {
                        console.log('✓ Image loaded:', path);
                        if (successCallback) successCallback(img);
                    },
                    function(err) {
                        console.error('✗ Image failed:', path, err);
                        if (failureCallback) failureCallback(err);
                    }
                );
            };

            p.setup = function() {
                console.log('✓ p5.setup running');
                let canvas = p.createCanvas(window.innerWidth, window.innerHeight);
                canvas.parent('screen-pet-container');
                
                // Make p5 functions available globally for pet classes (they expect global mode)
                window.createVector = p.createVector.bind(p);
                window.random = p.random.bind(p);
                window.dist = p.dist.bind(p);
                window.map = p.map.bind(p);
                window.constrain = p.constrain.bind(p);
                window.noise = p.noise.bind(p);
                window.floor = p.floor.bind(p);
                window.ceil = p.ceil.bind(p);
                window.round = p.round.bind(p);
                window.abs = p.abs.bind(p);
                window.sq = p.sq.bind(p);
                window.sqrt = p.sqrt.bind(p);
                window.pow = p.pow.bind(p);
                window.sin = p.sin.bind(p);
                window.cos = p.cos.bind(p);
                window.tan = p.tan.bind(p);
                window.radians = p.radians.bind(p);
                window.degrees = p.degrees.bind(p);
                
                screenPet = new ScreenPetGame();
                screenPet.loadMedia(p);
                
                // Monitor coin collection
                let lastCoinCount = screenPet.collectedCoinCount;
                setInterval(function() {
                    if (screenPet.collectedCoinCount > lastCoinCount) {
                        const coinsCollected = screenPet.collectedCoinCount - lastCoinCount;
                        lastCoinCount = screenPet.collectedCoinCount;
                        
                        // Notify content script of coin collection
                        window.postMessage({
                            source: 'screen-pet-game',
                            action: 'coinCollected',
                            amount: coinsCollected
                        }, '*');
                    }
                }, 100);
                
                console.log('🎉 SCREEN PET ACTIVE! 🎉');
            };

            p.draw = function() {
                p.clear();
                screenPet.draw(p);
            };

            p.windowResized = function() {
                p.resizeCanvas(window.innerWidth, window.innerHeight);
            };

            p.mouseClicked = function() {
                // Handled by document listener below
            };

            p.keyPressed = function() {
                // p5 built-in handler - we handle keys with document listener instead
                // Don't return false - that would block ALL keyboard input!
            };
            
            // Document-level keyboard listener (ensures keyboard works with pointer-events: none)
            // ONLY listen for specific pet control keys
            document.addEventListener('keydown', function(e) {
                if (!screenPet) return;
                
                // ONLY handle specific pet control keys: a, d, space, and number keys
                const isPetControlKey = ['a', 'A', 'd', 'D', ' ', '1', '2', '3', '4', '5', '6'].includes(e.key);
                
                if (!isPetControlKey) {
                    // Not a pet control key - let it pass through for typing
                    return;
                }
                
                // Update p5's key property for pet control keys only
                p.key = e.key;
                p.keyCode = e.keyCode;
                
                // Call game's keyPressed handler
                screenPet.keyPressed(p);
                
                // DON'T prevent default - allow typing even for these keys
            });

            p.mousePressed = function() {
                // Handled by document listener below
            };

            p.mouseDragged = function() {
                // Handled by document listener below
            };

            p.mouseReleased = function() {
                // Handled by document listener below
            };
            
            // Since canvas has pointer-events: none, manually capture events and update p5 coordinates
            document.addEventListener('click', function(e) {
                if (!screenPet) return;
                const rect = p.canvas.getBoundingClientRect();
                p.mouseX = e.clientX - rect.left;
                p.mouseY = e.clientY - rect.top;
                
                // Check if click is near current pet - if so, stop propagation and handle click
                if (screenPet.currentPet) {
                    const dist = p.dist(p.mouseX, p.mouseY, screenPet.currentPet.xLocation, screenPet.currentPet.yLocation);
                    if (dist < 60) {
                        e.stopPropagation();
                        e.preventDefault();
                        screenPet.mouseClicked(p);
                    }
                }
                // If not near pet, let click pass through to page
            }, true); // Use capture phase
            
            let isDragging = false;
            document.addEventListener('mousedown', function(e) {
                if (!screenPet) return;
                const rect = p.canvas.getBoundingClientRect();
                p.mouseX = e.clientX - rect.left;
                p.mouseY = e.clientY - rect.top;
                
                // Check if click is near current pet (for dragging cat or clicking other pets)
                if (screenPet.currentPet) {
                    const dist = p.dist(p.mouseX, p.mouseY, screenPet.currentPet.xLocation, screenPet.currentPet.yLocation);
                    if (dist < 60) {
                        e.stopPropagation();
                        e.preventDefault();
                        screenPet.mousePressed(p, p.mouseX, p.mouseY);
                        isDragging = true;
                    }
                }
            }, true);
            
            document.addEventListener('mousemove', function(e) {
                const rect = p.canvas.getBoundingClientRect();
                p.mouseX = e.clientX - rect.left;
                p.mouseY = e.clientY - rect.top;
                
                if (isDragging && screenPet) {
                    e.stopPropagation();
                    e.preventDefault();
                    screenPet.mouseDragged(p, p.mouseX, p.mouseY);
                }
            }, true);
            
            document.addEventListener('mouseup', function(e) {
                if (isDragging && screenPet) {
                    const rect = p.canvas.getBoundingClientRect();
                    p.mouseX = e.clientX - rect.left;
                    p.mouseY = e.clientY - rect.top;
                    e.stopPropagation();
                    e.preventDefault();
                    screenPet.mouseReleased(p, p.mouseX, p.mouseY);
                }
                isDragging = false;
            }, true);
            
            // Listen for messages from popup (forwarded by content script)
            window.addEventListener('message', function(event) {
                // Only accept messages from the same window
                if (event.source !== window) return;
                
                // Check if it's from our extension
                if (event.data.source === 'screen-pet-extension') {
                    console.log('📨 Page received message:', event.data);
                    
                    switch(event.data.action) {
                        case 'changePet':
                            const petType = event.data.pet;
                            console.log('Changing pet to:', petType);
                            
                            // Hide all pets
                            screenPet.thePet.isHidden = true;
                            screenPet.theCow.isHidden = true;
                            screenPet.theChicken.isHidden = true;
                            screenPet.theHorse.isHidden = true;
                            screenPet.thePig.isHidden = true;
                            screenPet.theDragon.isHidden = true;
                            
                            // Show selected pet
                            switch(petType) {
                                case 'cat':
                                    screenPet.currentPet = screenPet.thePet;
                                    screenPet.thePet.isHidden = false;
                                    break;
                                case 'cow':
                                    screenPet.currentPet = screenPet.theCow;
                                    screenPet.theCow.isHidden = false;
                                    break;
                                case 'chicken':
                                    screenPet.currentPet = screenPet.theChicken;
                                    screenPet.theChicken.isHidden = false;
                                    break;
                                case 'horse':
                                    screenPet.currentPet = screenPet.theHorse;
                                    screenPet.theHorse.isHidden = false;
                                    break;
                                case 'pig':
                                    screenPet.currentPet = screenPet.thePig;
                                    screenPet.thePig.isHidden = false;
                                    break;
                                case 'dragon':
                                    screenPet.currentPet = screenPet.theDragon;
                                    screenPet.theDragon.isHidden = false;
                                    break;
                            }
                            console.log('✓ Pet changed!');
                            break;
                            
                        case 'toggleCoins':
                            console.log('Toggling coins...');
                            if (screenPet.coins.length > 0) {
                                screenPet.coins = [];
                            } else {
                                // Generate some coins
                                for (let i = 0; i < 5; i++) {
                                    screenPet.coins.push(new Coin(
                                        Math.random() * p.width,
                                        Math.random() * p.height
                                    ));
                                }
                            }
                            break;
                            
                        case 'showCoins':
                            console.log('Showing coins...');
                            if (screenPet.coins.length === 0) {
                                // Generate coins
                                for (let i = 0; i < 5; i++) {
                                    screenPet.coins.push(new Coin(
                                        Math.random() * p.width,
                                        Math.random() * p.height
                                    ));
                                }
                            }
                            break;
                            
                        case 'hideCoins':
                            console.log('Hiding coins...');
                            screenPet.coins = [];
                            break;
                            
                        case 'resetPosition':
                            console.log('Resetting position...');
                            screenPet.currentPet.x = p.width / 2;
                            screenPet.currentPet.y = p.height / 2;
                            break;
                            
                        case 'hidePet':
                            console.log('Hiding pet...');
                            screenPet.currentPet.isHidden = true;
                            break;
                            
                        case 'showPet':
                            console.log('Showing pet...');
                            screenPet.currentPet.isHidden = false;
                            break;
                            
                        case 'equipItem':
                            console.log('Equipping item:', event.data.item);
                            const equipItem = event.data.item;
                            
                            // Set global unlock flags
                            switch(equipItem) {
                                case 'gentlemanHat':
                                    screenPet.isGentlemanHatUnlocked = true;
                                    break;
                                case 'cowboyHat':
                                    screenPet.isCowboyHatUnlocked = true;
                                    break;
                                case 'windmillHat':
                                    screenPet.isWindMillHatUnlocked = true;
                                    break;
                                case 'santaHat':
                                    screenPet.isSantaHatUnlocked = true;
                                    break;
                                case 'collar':
                                    screenPet.isCollarUnlocked = true;
                                    break;
                                case 'sunglasses':
                                    screenPet.isSunglassesUnlocked = true;
                                    break;
                                case 'babyDuck':
                                    screenPet.showBabyDuck = true;
                                    break;
                            }
                            
                            // Equip on ALL pets (except baby duck which is a companion)
                            if (equipItem !== 'babyDuck') {
                                const allPets = [
                                    screenPet.thePet,
                                    screenPet.theCow,
                                    screenPet.theChicken,
                                    screenPet.theHorse,
                                    screenPet.thePig,
                                    screenPet.theDragon
                                ];
                                
                                allPets.forEach(pet => {
                                    switch(equipItem) {
                                        case 'gentlemanHat':
                                            pet.showGentlemanHat = true;
                                            break;
                                        case 'cowboyHat':
                                            pet.showCowboyHat = true;
                                            break;
                                        case 'windmillHat':
                                            pet.showWindMillHat = true;
                                            break;
                                        case 'santaHat':
                                            pet.showSantaHat = true;
                                            break;
                                        case 'collar':
                                            pet.showCollar = true;
                                            break;
                                        case 'sunglasses':
                                            pet.showSunglasses = true;
                                            break;
                                    }
                                });
                            }
                            
                            console.log('✓ Item equipped!');
                            break;
                            
                        case 'unequipItem':
                            console.log('Unequipping item:', event.data.item);
                            const unequipItem = event.data.item;
                            
                            // Handle baby duck specially
                            if (unequipItem === 'babyDuck') {
                                screenPet.showBabyDuck = false;
                            } else {
                                // Unequip on ALL pets
                                const allPetsUnequip = [
                                    screenPet.thePet,
                                    screenPet.theCow,
                                    screenPet.theChicken,
                                    screenPet.theHorse,
                                    screenPet.thePig,
                                    screenPet.theDragon
                                ];
                                
                                allPetsUnequip.forEach(pet => {
                                    switch(unequipItem) {
                                        case 'gentlemanHat':
                                            pet.showGentlemanHat = false;
                                            break;
                                        case 'cowboyHat':
                                            pet.showCowboyHat = false;
                                            break;
                                        case 'windmillHat':
                                            pet.showWindMillHat = false;
                                            break;
                                        case 'santaHat':
                                            pet.showSantaHat = false;
                                            break;
                                        case 'collar':
                                            pet.showCollar = false;
                                            break;
                                        case 'sunglasses':
                                            pet.showSunglasses = false;
                                            break;
                                    }
                                });
                            }
                            
                            console.log('✓ Item unequipped!');
                            break;
                            
                        case 'unlockItem':
                            // Legacy support - just call equipItem
                            console.log('unlockItem called, redirecting to equipItem');
                            window.postMessage({
                                source: 'screen-pet-extension',
                                action: 'equipItem',
                                item: event.data.item
                            }, '*');
                            break;
                    }
                }
            });
        });
    }
})();
