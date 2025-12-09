// content.js - INJECT INTO PAGE CONTEXT VERSION

(function() {
    'use strict';
    
    console.log('Screen Pet Extension: Starting...');
    
    // Only run once
    if (window.screenPetExtensionLoaded) return;
    window.screenPetExtensionLoaded = true;

    // Create container for the pet
    const container = document.createElement('div');
    container.id = 'screen-pet-container';
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 2147483647;
    `;
    
    // Wait for body to exist
    function addContainer() {
        if (document.body) {
            document.body.appendChild(container);
            console.log('✓ Container added to page');
            loadScriptsIntoPage();
        } else {
            setTimeout(addContainer, 100);
        }
    }
    addContainer();

    // Inject script into PAGE context (not extension context!)
    function injectScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            
            // Fetch the script content from the extension
            fetch(chrome.runtime.getURL(src))
                .then(response => response.text())
                .then(scriptContent => {
                    // Create a script element with the actual code
                    const inlineScript = document.createElement('script');
                    inlineScript.textContent = scriptContent;
                    
                    // Add to page (runs in page context, not extension context!)
                    document.head.appendChild(inlineScript);
                    
                    console.log('✓ Injected:', src);
                    
                    // Small delay to let script execute
                    setTimeout(resolve, 50);
                })
                .catch(error => {
                    console.error('✗ Failed to inject:', src, error);
                    reject(error);
                });
        });
    }

    // Load all scripts in proper order INTO PAGE CONTEXT
    async function loadScriptsIntoPage() {
        try {
            console.log('=== INJECTING SCRIPTS INTO PAGE ===');
            
            // 1. Load p5 first
            await injectScript('p5.min.js');
            
            // 2. Wait for p5 to be ready
            await new Promise(resolve => {
                let attempts = 0;
                const check = setInterval(() => {
                    attempts++;
                    
                    // Check in PAGE context using eval (necessary for cross-context check)
                    const p5Exists = document.head.querySelector('script[data-p5-check]') === null;
                    
                    if (!p5Exists) {
                        // Inject a test script to check if p5 exists
                        const testScript = document.createElement('script');
                        testScript.setAttribute('data-p5-check', 'true');
                        testScript.textContent = `
                            if (typeof p5 !== 'undefined') {
                                window.__p5Ready = true;
                                console.log('✓ p5 is ready in page context!');
                            }
                        `;
                        document.head.appendChild(testScript);
                    }
                    
                    if (window.__p5Ready || attempts > 30) {
                        console.log(window.__p5Ready ? '✓ p5 confirmed!' : '⚠ Proceeding without p5 confirmation');
                        clearInterval(check);
                        resolve();
                    }
                }, 100);
            });
            
            // 3. Load base classes
            await injectScript('Pet.js');
            await injectScript('Item.js');
            await injectScript('Coin.js');
            
            // 4. Load pet types
            await injectScript('Cat.js');
            await injectScript('Cow.js');
            await injectScript('Pig.js');
            await injectScript('Chicken.js');
            await injectScript('Horse.js');
            await injectScript('Dragon.js');
            
            // 5. Load game systems
            await injectScript('Store.js');
            await injectScript('ScreenPetGame.js');
            
            console.log('=== ALL SCRIPTS INJECTED ===');
            
            // 6. Initialize in PAGE context
            const initScript = document.createElement('script');
            initScript.textContent = `
                console.log('=== CHECKING TYPES IN PAGE ===');
                console.log('typeof p5:', typeof p5);
                console.log('typeof Pet:', typeof Pet);
                console.log('typeof Cat:', typeof Cat);
                console.log('typeof ScreenPetGame:', typeof ScreenPetGame);
                
                if (typeof p5 === 'undefined') {
                    console.error('❌ p5 is not defined in page context!');
                } else if (typeof ScreenPetGame === 'undefined') {
                    console.error('❌ ScreenPetGame is not defined in page context!');
                } else {
                    console.log('✓ Creating p5 sketch in page context...');
                    
                    new p5(function(p) {
                        let screenPet;

                        p.setup = function() {
                            console.log('✓ p5 setup running...');
                            let canvas = p.createCanvas(window.innerWidth, window.innerHeight);
                            canvas.parent('screen-pet-container');
                            canvas.style('pointer-events', 'auto');
                            
                            screenPet = new ScreenPetGame();
                            screenPet.loadMedia(p);
                            
                            console.log('🎉 SCREEN PET INITIALIZED! 🎉');
                        };

                        p.draw = function() {
                            p.clear();
                            screenPet.draw(p);
                        };

                        p.windowResized = function() {
                            p.resizeCanvas(window.innerWidth, window.innerHeight);
                        };

                        p.mouseClicked = function() {
                            screenPet.mouseClicked(p);
                        };

                        p.keyPressed = function() {
                            screenPet.keyPressed(p);
                        };

                        p.mousePressed = function() {
                            screenPet.mousePressed(p, p.mouseX, p.mouseY);
                        };

                        p.mouseDragged = function() {
                            screenPet.mouseDragged(p, p.mouseX, p.mouseY);
                        };

                        p.mouseReleased = function() {
                            screenPet.mouseReleased(p, p.mouseX, p.mouseY);
                        };
                    });
                }
            `;
            document.head.appendChild(initScript);
            
        } catch (error) {
            console.error('Failed to inject scripts:', error);
        }
    }

    // Listen for messages from popup
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        console.log('📨 Message received:', message);
        
        // Forward message to page context
        window.postMessage({
            source: 'screen-pet-extension',
            ...message
        }, '*');
        
        sendResponse({status: 'ok'});
        return true;
    });
})();
