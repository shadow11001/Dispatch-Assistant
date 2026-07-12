// ==UserScript==
// @name         Dispatch Assistant CORS Proxy
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Bypasses CORS for Dispatch Assistant standalone file to pull ServiceChannel data
// @author       You
// @match        file:///*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('fetchFromServiceChannel', function(e) {
        if (!e.detail || !e.detail.woId) return;
        
        const woId = e.detail.woId;
        const createWoUrl = `https://www.servicechannel.com/sc/wo/WorkOrders/CreateWorkorderDetailsModel?id=${woId}`;
        
        GM_xmlhttpRequest({
            method: 'GET',
            url: createWoUrl,
            headers: {
                "Accept": "application/json"
            },
            onload: function(createWoRes) {
                try {
                    if (createWoRes.status !== 200) {
                        return window.dispatchEvent(new CustomEvent('serviceChannelDataReady', { detail: { woId: woId, error: `Invalid status ${createWoRes.status}` } }));
                    }
                    const createWoData = JSON.parse(createWoRes.responseText);

                    // Helper to recursively find a key
                    const findKey = (obj, targetKey) => {
                        if (!obj || typeof obj !== 'object') return null;
                        if (obj[targetKey]) return obj[targetKey];
                        for (const key of Object.keys(obj)) {
                            const result = findKey(obj[key], targetKey);
                            if (result) return result;
                        }
                        return null;
                    };

                    const locationId = findKey(createWoData, 'LocationId');
                    
                    if (!locationId) {
                        window.dispatchEvent(new CustomEvent('serviceChannelDataReady', { detail: { woId: woId, error: 'No LocationId found' } }));
                        return;
                    }

                    // Extract StoreId, Priority, and Trade
                    const storeId = findKey(createWoData, 'StoreId');
                    const priority = findKey(createWoData, 'Priority');
                    let trade = findKey(createWoData, 'Trade');
                    
                    // Handle "FM - " prefix for Trade if it exists
                    if (trade && trade.startsWith("FM - ")) {
                        trade = trade.substring(5).toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
                    } else if (trade) {
                        trade = trade.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
                    }

                    const woData = {
                        store: storeId || "",
                        trade: trade || "",
                        priority: priority || ""
                    };
                    
                    const notesUrl = `https://www.servicechannel.com/sc/Location/GetLocationNotes?locationId=${locationId}&includeEmptyValue=false`;
                    
                    GM_xmlhttpRequest({
                        method: 'GET',
                        url: notesUrl,
                        headers: {
                            "Accept": "application/json"
                        },
                        onload: function(notesRes) {
                            try {
                                if (notesRes.status !== 200) {
                                    return window.dispatchEvent(new CustomEvent('serviceChannelDataReady', { detail: { woId: woId, error: `Invalid status ${notesRes.status}` } }));
                                }
                                const notesData = JSON.parse(notesRes.responseText);
                                window.dispatchEvent(new CustomEvent('serviceChannelDataReady', { detail: { woId: woId, data: notesData, woData: woData } }));
                            } catch (err) {
                                window.dispatchEvent(new CustomEvent('serviceChannelDataReady', { detail: { woId: woId, error: 'Failed to parse notesData: ' + err.message } }));
                            }
                        },
                        onerror: function(err) {
                            window.dispatchEvent(new CustomEvent('serviceChannelDataReady', { detail: { woId: woId, error: err } }));
                        }
                    });
                    
                } catch (err) {
                    window.dispatchEvent(new CustomEvent('serviceChannelDataReady', { detail: { woId: woId, error: 'Failed to parse createWoData: ' + err.message } }));
                }
            },
            onerror: function(err) {
                window.dispatchEvent(new CustomEvent('serviceChannelDataReady', { detail: { woId: woId, error: err } }));
            }
        });
    });
})();
