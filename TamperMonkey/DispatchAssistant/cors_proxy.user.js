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

                    // Helper to recursively find LocationId
                    const findLocationId = (obj) => {
                        if (!obj || typeof obj !== 'object') return null;
                        if (obj.LocationId) return obj.LocationId;
                        for (const key of Object.keys(obj)) {
                            const result = findLocationId(obj[key]);
                            if (result) return result;
                        }
                        return null;
                    };

                    const locationId = findLocationId(createWoData);
                    
                    if (!locationId) {
                        window.dispatchEvent(new CustomEvent('serviceChannelDataReady', { detail: { woId: woId, error: 'No LocationId found' } }));
                        return;
                    }
                    
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
                                window.dispatchEvent(new CustomEvent('serviceChannelDataReady', { detail: { woId: woId, data: notesData } }));
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
