// ==UserScript==
// @name         Crystal Alert Watcher
// @namespace    crystal-alert-watcher
// @version      1.7
// @author       Andrew Toothman - vn580fc
// @description  Watches Walmart Crystal alerts and notifies on new tasks
// @match        https://crystal.walmart.com/us/iot/alert-manager*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_notification
// @grant        GM_addStyle
// @grant        GM_getResourceURL
// @resource     customAlertSound file:///C:/path/to/your/sound.mp3
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    /**********************
     * CONFIG
     **********************/
    const CONFIG = {
        pollInterval: 60000,

        endpoint: "/api/iot/v1/task/queue/getTasksInQueue",

        country: "US",

        queues: [
            "CL-Region-33A",
            "RA-Region-33A"
        ],

        playSound: true,
        soundType: "speech", // Options: "beep", "speech", "custom"
        speechText: "New Alert", // Used if soundType is "speech"
        customSoundUrl: "", // URL to mp3/wav file if soundType is "custom"

        panelPosition: "bottom-left", // Options: "bottom-right", "bottom-left", "top-right", "top-left"
        
        desktopNotification: true,
        flashTitle: true,

        autoClickAssign: true,

        debug: true
    };

    /**********************
     * STATE
     **********************/
    const STORAGE_KEY = "crystal_seen_alerts_v1";
    const RUNNING_KEY = "crystal_running_state_v1";
    const seenAlerts = new Set(GM_getValue(STORAGE_KEY, []));

    let lastCheckTime = null;
    let running = GM_getValue(RUNNING_KEY, false);

    /**********************
     * SOUND
     **********************/
    function playSound() {
        try {
            if (CONFIG.soundType === "beep") {
                const ctx = new AudioContext();
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.type = "sine";
                osc.frequency.value = 880;

                gain.gain.value = 0.1;

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.start();
                osc.stop(ctx.currentTime + 0.25);
            } else if (CONFIG.soundType === "speech") {
                const utterance = new SpeechSynthesisUtterance(CONFIG.speechText || "New alert");
                speechSynthesis.speak(utterance);
            } else if (CONFIG.soundType === "custom") {
                let audioUrl = CONFIG.customSoundUrl;
                
                // If using a local file via GM_getResourceURL
                if (typeof GM_getResourceURL === 'function') {
                    const resourceUrl = GM_getResourceURL("customAlertSound");
                    if (resourceUrl) {
                        audioUrl = resourceUrl;
                    }
                }
                
                if (audioUrl) {
                    const audio = new Audio(audioUrl);
                    audio.play();
                }
            }
        } catch (e) {
            console.warn("Sound failed", e);
        }
    }

    /**********************
     * NOTIFICATION
     **********************/
    function notify(alert) {
        const title = "🔴 New Crystal Alert";
        const body = `${alert.alertMessage || "Unknown"}\nStore: ${alert.store}\nSeverity: ${alert.severity}`;

        if (CONFIG.desktopNotification && typeof GM_notification !== "undefined") {
            GM_notification({
                title,
                text: body,
                timeout: 5000
            });
        }

        if (CONFIG.flashTitle) {
            document.title = "🔴 NEW ALERT!";
            setTimeout(() => {
                document.title = "Crystal Alerts";
            }, 3000);

            if (CONFIG.playSound) {
                playSound();
            }
        }
    }

    /**********************
     * AUTO CLICK ASSIGN BUTTON
     **********************/
    function clickAssignButton() {
            // Some SPAs require clicking a specific refresh button, or failing that, a full page reload.

            const assignBtnText = "Assign"; // Target exact text

            const clickAssign = () => {
                const btn = [...document.querySelectorAll("button")]
                    .find(b => b.textContent.trim() === assignBtnText);

                if (btn) {
                    if (CONFIG.debug) console.log("[CrystalWatcher] Clicking Assign button");
                    btn.click();
                    return true;
                }
                return false;
            };

            // First pass, check if it's already there
            if (clickAssign()) return;

            // Try clicking a UI "Refresh" button
            const refreshBtn = [...document.querySelectorAll("button")]
                .find(b => b.textContent.trim().toLowerCase() === "refresh");

            if (refreshBtn) {
                 if (CONFIG.debug) console.log("[CrystalWatcher] Clicking Refresh button");
                 refreshBtn.click();
                 
                 setTimeout(() => {
                     if (!clickAssign()) {
                         if (CONFIG.debug) console.log("[CrystalWatcher] Assign button not found after UI refresh, falling back to full page reload.");
                         location.reload();
                     }
                 }, 1000); 
            } else {
                 if (CONFIG.debug) console.log("[CrystalWatcher] No Refresh button found, falling back to full page reload.");
                 location.reload();
            }
        }

        /**********************
     * SAVE STATE
     **********************/
        function saveState() {
            GM_setValue(STORAGE_KEY, Array.from(seenAlerts));
        }

        /**********************
     * FETCH ALERTS
     **********************/
        async function fetchAlerts() {
            try {
                const res = await fetch(CONFIG.endpoint, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "x-tenant": "us"
                    },
                    body: JSON.stringify({
                        cc: CONFIG.country,
                        queues: CONFIG.queues
                    })
                });

                // Some APIs return 404 or 204 when the queue is completely empty
                if (!res.ok) {
                    if (res.status === 404) return { result: [] };
                    throw new Error("HTTP " + res.status);
                }

                const text = await res.text();
                // If response is physically empty, treat as no alerts
                if (!text || text.trim() === "") return { result: [] };

                return JSON.parse(text);
            } catch (err) {
                if (CONFIG.debug) console.error("[CrystalWatcher] Fetch error:", err);
                return null;
            }
        }

        /**********************
     * PROCESS ALERTS
     **********************/
        function process(data) {
            if (!data || !data.result) return;

            const alerts = data.result;

            if (CONFIG.debug) {
                console.log("[CrystalWatcher] Alerts received:", alerts.length);
            }

            for (const alert of alerts) {
                const id = alert.alert;

                if (!seenAlerts.has(id)) {
                    seenAlerts.add(id);

                    if (CONFIG.debug) {
                        console.log("[CrystalWatcher] NEW ALERT:", alert);
                    }

                    notify(alert);
                }
            }

            saveState();
        }

        /**********************
     * STATUS PANEL
     **********************/

        let positionStyles = "bottom: 10px; right: 10px;";
        if (CONFIG.panelPosition === "bottom-left") positionStyles = "bottom: 10px; left: 10px;";
        else if (CONFIG.panelPosition === "top-right") positionStyles = "top: 10px; right: 10px;";
        else if (CONFIG.panelPosition === "top-left") positionStyles = "top: 10px; left: 10px;";

        GM_addStyle(`
        #cw-panel {
            position: fixed;
            ${positionStyles}
            background: rgba(0,0,0,0.85);
            color: #00ff88;
            padding: 10px;
            font-size: 12px;
            z-index: 999999;
            font-family: monospace;
            border-radius: 6px;
            min-width: 220px;
            white-space: pre-wrap;
        }
    `);

        const panel = document.createElement("div");
        panel.id = "cw-panel";
        document.body.appendChild(panel);

        function updatePanel(status, count) {
            panel.innerHTML = `
Crystal Alert Watcher
---------------------
Status: ${status}

Seen Alerts: ${seenAlerts.size}

Last Check: ${lastCheckTime || "never"}

Latest Count: ${count ?? "-"}
<button id="cw-toggle-btn" style="margin-top: 10px; width: 100%; padding: 5px; cursor: pointer; color: black; font-weight: bold; background-color: ${running ? '#00ff88' : '#ff4444'};">
    ${running ? 'STOP WATCHING' : 'START WATCHING'}
</button>
        `;
            
            document.getElementById("cw-toggle-btn").addEventListener("click", () => {
                running = !running;
                GM_setValue(RUNNING_KEY, running);
                if (running) {
                    updatePanel("STARTING", count);
                    loop(); // Restart the loop
                } else {
                    updatePanel("STOPPED", count);
                }
            });
    }

        /**********************
     * LOOP
     **********************/
        async function loop() {
            if (!running) return;

            // Pause checking if we aren't on the main queue page (e.g. inside a specific alert)
            const currentPath = window.location.pathname;
            const currentSearch = window.location.search;
            const isMainPage = currentPath.startsWith('/us/iot/alert-manager') && 
                               (currentSearch === '' || currentSearch.includes('view=Alerts'));
            
            if (!isMainPage) {
                updatePanel("PAUSED (In Alert)", "-");
                setTimeout(loop, CONFIG.pollInterval);
                return;
            }
            lastCheckTime = new Date().toLocaleTimeString();

            const data = await fetchAlerts();

            if (data) {
                process(data);

                if (data.result && data.result.length > 0) {
                    updatePanel("ALERTS FOUND", data.result.length);
                } else {
                    updatePanel("WAITING...", 0);
                }

                // optional auto-refresh behavior (your "Assign" button)
                if (CONFIG.autoClickAssign && data.result?.length > 0) {
                    clickAssignButton();
                }
            } else {
                updatePanel("ERROR", 0);
            }

            setTimeout(loop, CONFIG.pollInterval);
        }

        /**********************
     * START
     **********************/
        console.log("[CrystalWatcher] Loaded, running state: " + running);

        if (running) {
            updatePanel("STARTING", 0);
            loop();
        } else {
            updatePanel("STOPPED", "-");
        }

    })();
