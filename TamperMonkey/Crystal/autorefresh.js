// ==UserScript==
// @name         Crystal Alert Watcher
// @namespace    crystal-alert-watcher
// @version      1.0
// @description  Watches Walmart Crystal alerts and notifies on new tasks
// @match        https://crystal.walmart.com/us/iot/alert-manager*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_notification
// @grant        GM_addStyle
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    /**********************
     * CONFIG
     **********************/
    const CONFIG = {
        pollInterval: 5000,

        endpoint: "/api/iot/v1/task/queue/getTasksInQueue",

        country: "US",

        queues: [
            "CL-Region-33A",
            "RA-Region-33A"
        ],

        playSound: true,
        soundType: "speech", // Options: "beep", "speech", "custom"
        speechText: "You got mail!", // Used if soundType is "speech"
        customSoundUrl: "", // URL to mp3/wav file if soundType is "custom"

        panelPosition: "bottom-right", // Options: "bottom-right", "bottom-left", "top-right", "top-left"
        
        desktopNotification: true,
        flashTitle: true,

        autoClickAssign: true,

        debug: true
    };

    /**********************
     * STATE
     **********************/
    const STORAGE_KEY = "crystal_seen_alerts_v1";
    const seenAlerts = new Set(GM_getValue(STORAGE_KEY, []));

    let lastCheckTime = null;
    let running = true;

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
            } else if (CONFIG.soundType === "custom" && CONFIG.customSoundUrl) {
                const audio = new Audio(CONFIG.customSoundUrl);
                audio.play();
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
            const btn = [...document.querySelectorAll("button")]
            .find(b => b.textContent.trim() === "Assign");

            if (btn) {
                if (CONFIG.debug) console.log("[CrystalWatcher] Clicking Assign button");
                btn.click();
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
        `;
    }

        /**********************
     * LOOP
     **********************/
        async function loop() {
            if (!running) return;

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
        console.log("[CrystalWatcher] Started");

        updatePanel("STARTING", 0);
        loop();

    })();
