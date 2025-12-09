// popup.js - Mac OS 9 style popup with store

document.addEventListener('DOMContentLoaded', function() {
    
    let currentCoins = 0;
    let ownedItems = {
        gentlemanHat: false,
        cowboyHat: false,
        windmillHat: false,
        santaHat: false,
        collar: false,
        sunglasses: false,
        babyDuck: false
    };
    let equippedItems = {
        gentlemanHat: false,
        cowboyHat: false,
        windmillHat: false,
        santaHat: false,
        collar: false,
        sunglasses: false,
        babyDuck: false
    };
    
    // State tracking for controls
    let coinsVisible = true;
    let petHidden = false;
    
    // Load saved data
    chrome.storage.local.get(['coins', 'ownedItems', 'equippedItems', 'selectedPet'], function(result) {
        if (result.coins !== undefined) {
            currentCoins = result.coins;
            updateCoinDisplay();
        }
        if (result.ownedItems) {
            ownedItems = result.ownedItems;
        }
        if (result.equippedItems) {
            equippedItems = result.equippedItems;
        }
        updateStoreButtons();
        
        // Send equipped items to game
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs[0]) {
                for (let item in equippedItems) {
                    if (equippedItems[item]) {
                        chrome.tabs.sendMessage(tabs[0].id, {
                            action: 'equipItem',
                            item: item
                        });
                    }
                }
            }
        });
        
        if (result.selectedPet) {
            updateSelectedPet(result.selectedPet);
        }
    });
    
    // Refresh coin count periodically while popup is open
    setInterval(function() {
        chrome.storage.local.get(['coins'], function(result) {
            if (result.coins !== undefined && result.coins !== currentCoins) {
                currentCoins = result.coins;
                updateCoinDisplay();
            }
        });
    }, 500); // Check every 500ms
    
    // Update coin display
    function updateCoinDisplay() {
        document.getElementById('coin-count').textContent = currentCoins;
        document.getElementById('store-coin-count').textContent = currentCoins;
    }
    
    // Update selected pet UI
    function updateSelectedPet(petType) {
        const petButtons = document.querySelectorAll('.pet-button');
        petButtons.forEach(button => {
            if (button.dataset.pet === petType) {
                button.classList.add('active');
                // Show description for active pet
                document.getElementById('pet-description').textContent = button.dataset.description;
            } else {
                button.classList.remove('active');
            }
        });
    }
    
    // Update store button states
    function updateStoreButtons() {
        const buyButtons = document.querySelectorAll('.buy-button');
        buyButtons.forEach(button => {
            const item = button.dataset.item;
            
            if (ownedItems[item]) {
                // Item is owned - show equipped state
                if (equippedItems[item]) {
                    button.textContent = 'Equipped';
                    button.classList.add('owned');
                } else {
                    button.textContent = 'Unequipped';
                    button.classList.remove('owned');
                }
                button.disabled = false; // Allow clicking to toggle
            } else {
                // Item not owned - show buy button
                button.textContent = 'Buy';
                button.classList.remove('owned');
                button.disabled = false;
            }
        });
    }
    
    // Pet selection
    const petButtons = document.querySelectorAll('.pet-button');
    petButtons.forEach(button => {
        button.addEventListener('click', function() {
            const petType = this.dataset.pet;
            
            petButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            chrome.storage.local.set({ selectedPet: petType });
            
            // Send message to content script
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: 'changePet',
                    pet: petType
                });
            });
        });
        
        // Show description on hover
        button.addEventListener('mouseenter', function() {
            const description = this.dataset.description;
            document.getElementById('pet-description').textContent = description;
        });
        
        button.addEventListener('mouseleave', function() {
            const activePet = document.querySelector('.pet-button.active');
            if (activePet) {
                document.getElementById('pet-description').textContent = activePet.dataset.description;
            } else {
                document.getElementById('pet-description').textContent = 'Hover over a pet to see its special abilities!';
            }
        });
    });
    
    // Show active pet description initially
    const activePet = document.querySelector('.pet-button.active');
    if (activePet) {
        document.getElementById('pet-description').textContent = activePet.dataset.description;
    }
    
    // Store modal
    document.getElementById('open-store').addEventListener('click', function() {
        document.getElementById('store-modal').classList.add('active');
    });
    
    document.getElementById('close-store').addEventListener('click', function() {
        document.getElementById('store-modal').classList.remove('active');
    });
    
    document.getElementById('close-store-btn').addEventListener('click', function() {
        document.getElementById('store-modal').classList.remove('active');
    });
    
    // Buy/Toggle items
    const buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const item = this.dataset.item;
            const price = parseInt(this.dataset.price);
            
            if (!ownedItems[item]) {
                // Buying the item
                if (currentCoins >= price) {
                    currentCoins -= price;
                    ownedItems[item] = true;
                    equippedItems[item] = true; // Auto-equip on purchase
                    
                    // Save to storage
                    chrome.storage.local.set({ 
                        coins: currentCoins,
                        ownedItems: ownedItems,
                        equippedItems: equippedItems
                    });
                    
                    // Update UI
                    updateCoinDisplay();
                    updateStoreButtons();
                    
                    // Send to game
                    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, {
                            action: 'equipItem',
                            item: item
                        });
                    });
                    
                    console.log('Item purchased and equipped:', item);
                } else {
                    alert('Not enough coins!');
                }
            } else {
                // Toggling equipped state
                equippedItems[item] = !equippedItems[item];
                
                // Save to storage
                chrome.storage.local.set({ 
                    equippedItems: equippedItems
                });
                
                // Update UI
                updateStoreButtons();
                
                // Send to game
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    if (equippedItems[item]) {
                        chrome.tabs.sendMessage(tabs[0].id, {
                            action: 'equipItem',
                            item: item
                        });
                    } else {
                        chrome.tabs.sendMessage(tabs[0].id, {
                            action: 'unequipItem',
                            item: item
                        });
                    }
                });
                
                console.log('Item toggled:', item, equippedItems[item] ? 'equipped' : 'unequipped');
            }
        });
    });
    
    // Toggle coins
    document.getElementById('toggle-coins').addEventListener('click', function() {
        coinsVisible = !coinsVisible;
        
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: coinsVisible ? 'showCoins' : 'hideCoins'
            });
        });
        
        this.textContent = coinsVisible ? 'Hide Coins' : 'Show Coins';
    });
    
    // Reset position
    document.getElementById('reset-position').addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'resetPosition'
            });
        });
    });
    
    // Hide pet
    document.getElementById('hide-pet').addEventListener('click', function() {
        petHidden = !petHidden;
        
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: petHidden ? 'hidePet' : 'showPet'
            });
        });
        
        this.textContent = petHidden ? 'Show Pet' : 'Hide Pet';
    });
});
