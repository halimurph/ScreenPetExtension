// content.js - Injects scripts into page context (NO inline scripts!)

(function() {
    'use strict';
    
    console.log('🐾 Screen Pet Extension: Starting...');
    
    // Only run once
    if (document.documentElement.hasAttribute('data-screen-pet-injected')) {
        console.log('Already injected, skipping...');
        return;
    }
    document.documentElement.setAttribute('data-screen-pet-injected', 'true');

    // Create container
    const container = document.createElement('div');
    container.id = 'screen-pet-container';
    container.setAttribute('data-extension-url', chrome.runtime.getURL(''));
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 2147483647;
    `;
    
    // Wait for body
    function addContainer() {
        if (document.body) {
            document.body.appendChild(container);
            console.log('✓ Container added');
            injectScripts();
        } else {
            setTimeout(addContainer, 100);
        }
    }
    addContainer();

    // Inject script file into page context
    function injectScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = chrome.runtime.getURL(src);
            script.onload = () => {
                console.log('✓', src);
                resolve();
            };
            script.onerror = () => {
                console.error('✗', src);
                resolve();
            };
            (document.head || document.documentElement).appendChild(script);
        });
    }

    // Inject all scripts in order
    async function injectScripts() {
        console.log('=== INJECTING SCRIPTS ===');
        console.log('✓ Extension URL in data attribute');
        
        // 1. p5.js
        await injectScript('p5.min.js');
        await new Promise(r => setTimeout(r, 500)); // Wait longer for p5 to initialize
        
        // 2. Base classes
        await injectScript('Pet.js');
        await injectScript('Item.js');
        await injectScript('Coin.js');
        
        // 3. Pet types
        await injectScript('Cat.js');
        await injectScript('Cow.js');
        await injectScript('Pig.js');
        await injectScript('Chicken.js');
        await injectScript('Horse.js');
        await injectScript('Dragon.js');
        
        // 4. Game systems
        await injectScript('Store.js');
        await injectScript('ScreenPetGame.js');
        
        console.log('=== ALL SCRIPTS INJECTED ===');
        
        // 5. Initialize (separate file, wait for all classes to be ready)
        await new Promise(r => setTimeout(r, 500));
        await injectScript('init.js');
        
        console.log('✓ Initialization complete');
    }

    // Listen for messages from popup
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        console.log('📨 Extension received:', message);
        
        // Forward to page context
        window.postMessage({
            source: 'screen-pet-extension',
            ...message
        }, '*');
        
        sendResponse({status: 'ok'});
        return true;
    });
    
    // Listen for messages FROM page (coin collection, etc)
    window.addEventListener('message', function(event) {
        if (event.source !== window) return;
        
        if (event.data.source === 'screen-pet-game') {
            console.log('📨 Game event:', event.data);
            
            // Update coins directly in storage (no popup message needed!)
            if (event.data.action === 'coinCollected') {
                chrome.storage.local.get(['coins'], function(result) {
                    const currentCoins = (result.coins || 0) + (event.data.amount || 1);
                    chrome.storage.local.set({ coins: currentCoins }, function() {
                        console.log('✓ Coins updated:', currentCoins);
                    });
                });
            }
        }
    });
})();
