// ==UserScript==
// @name         Oracle CX Auto Fill Inbox Notifier
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Automates pressing "Fill Inbox", intercepting the fillInbox request, and playing a sound if successful.
// @author       Andrew Toothman - vn580fc
// @match        https://centralops.custhelp.com/AgentWeb/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=custhelp.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // ---- CONFIGURATION ----
    const FILL_INBOX_POLL_INTERVAL = 60000; // Time in milliseconds (e.g., 30s)
    const AUDIO_URL = 'https://actions.google.com/sounds/v1/alarms/beep_short.ogg'; // Notification sound URL

    // Add a UI overlay for stats
    const infoPanel = document.createElement('div');
    infoPanel.style.position = 'fixed';
    infoPanel.style.top = '10px';
    infoPanel.style.right = '10px';
    infoPanel.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    infoPanel.style.color = 'white';
    infoPanel.style.padding = '10px';
    infoPanel.style.borderRadius = '5px';
    infoPanel.style.zIndex = '999999';
    infoPanel.style.fontFamily = 'monospace';
    infoPanel.innerHTML = 'Auto-Fill: <span id="autoFillStatus">Starting...</span>';
    document.body.appendChild(infoPanel);

    const statusEl = document.getElementById('autoFillStatus');

    let audio = new Audio(AUDIO_URL);
    let autoFillInterval = null;

    function playSound() {
        audio.play().catch(e => console.error("Error playing alarm sound:", e));
    }
    
    // Attempt to automatically click the "Fill Inbox" command if it exists on screen
    // Sometimes it's better to intercept the XMLHttpRequest, we will listen in on the network.
    const origOpen = XMLHttpRequest.prototype.open;
    const origSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.send = function() {
        this.addEventListener('load', function() {
            if (this._url && this._url.includes('/workspaceCommand/fillInbox')) {
                try {
                    const response = JSON.parse(this.responseText);
                    if (response && response.resultState === "Success") {
                        console.log("[Notifier] New dispatch detected!");
                        playSound();
                        statusEl.innerText = 'New Dispatch!';
                        statusEl.style.color = '#00ff00';
                        setTimeout(() => {
                           statusEl.innerText = 'Listening...';
                           statusEl.style.color = 'white';
                        }, 5000);
                    } else if (response && response.resultState === "None") {
                        statusEl.innerText = 'No new dispatches';
                    }
                } catch (e) {
                    console.error("[Notifier] Error parsing fillInbox response", e);
                }
            }
        });
        origSend.apply(this, arguments);
    };

    XMLHttpRequest.prototype.open = function(method, url) {
        this._url = url;
        origOpen.apply(this, arguments);
    };

    // Periodically click the actual "Fill Inbox" button
    function triggerFillInbox() {
        // Because the button is within a UI framework, we need to find it by its label or icon.
        // It's likely a generic toolbar button. 
        // A generic approach: look for a button containing the text "Fill Inbox" or with a specific aria-label.
        
        // This is a generic selector to be refined by the user if necessary.
        const buttons = document.querySelectorAll('button');
        let fillInboxButton = null;
        for (let btn of buttons) {
            if (btn.innerText.includes('Fill Inbox') || (btn.getAttribute('aria-label') && btn.getAttribute('aria-label').includes('Fill Inbox'))) {
                fillInboxButton = btn;
                break;
            }
        }

        if (fillInboxButton) {
            fillInboxButton.click();
            statusEl.innerText = 'Polling...';
        } else {
            statusEl.innerText = 'Button not found';
            statusEl.style.color = 'yellow';
        }
    }

    // Start auto-polling loop
    setTimeout(() => {
        statusEl.innerText = 'Listening...';
        autoFillInterval = setInterval(triggerFillInbox, FILL_INBOX_POLL_INTERVAL);
    }, 5000); // give the page time to load

})();
