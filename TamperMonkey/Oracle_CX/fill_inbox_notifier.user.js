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
    const AUDIO_URL = 'data:audio/mp3;base64,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'; // Notification sound URL

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
            infoPanel.style.display = 'block';
            fillInboxButton.click();
            statusEl.innerText = 'Polling...';
        } else {
            infoPanel.style.display = 'none';
        }

    }

    // Start auto-polling loop
    setTimeout(() => {
        statusEl.innerText = 'Listening...';
        autoFillInterval = setInterval(triggerFillInbox, FILL_INBOX_POLL_INTERVAL);
    }, 5000); // give the page time to load

})();
