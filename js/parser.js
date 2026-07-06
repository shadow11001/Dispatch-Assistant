const Parser = {
        parseDispatchString: function(dispatchString, config) {
        if (!dispatchString) return null;
        
        // Sometimes the user will paste two blocks. Sometimes reference number is standalone.
        // E.g: "Reference#: 260705-005046 \n Home Office Only | Refrigeration - HO Use Only..."
        
        // Retrieve existing state if we are accumulating data
        let existingState = typeof window !== 'undefined' && window.ParserState ? window.ParserState : {};
        
        // Don't overwrite raw if appending
        let mergedRaw = existingState.raw ? existingState.raw + '\n' + dispatchString : dispatchString;

        let parsed = {
            alarm_type: 'DISPATCH',
            ...existingState,
            raw: mergedRaw
        };

        const extract = (pattern) => {
            const match = dispatchString.match(pattern);
            return match && match[1] ? match[1].trim() : "";
        };

        // If we found a value previously, don't overwrite it with empty if not found this time
        const safeExtract = (key, pattern) => {
            const newVal = extract(pattern);
            if (newVal) parsed[key] = newVal;
        };


        // Try extracting with "Reference#: " prefix or just a plain 6-6 digit format anywhere
        safeExtract("reference_number", /Reference#?:?\s*(\d{6}-\d{6})/i);
        if(!parsed.reference_number) safeExtract("reference_number", /(\d{6}-\d{6})/);
        
        safeExtract("contact", /Contact:\s*(.+?)(?=\s*\||$)/i);
        
        safeExtract("position", /Position:\s*(.+?)(?=\s*\||$)/i);
        safeExtract("units_affected", /Units Affected:\s*(\d+)/i);
        safeExtract("rack_associated", /Rack Associated:\s*(.+?)(?=\s*\||$)/i);
        safeExtract("systems_affected", /Systems Affected:\s*(.+?)(?=\s*\||$)/i);
        safeExtract("alarm_message", /Alarm Message:\s*(.+?)(?=\s*\||$)/i);
        safeExtract("manual_comment", /Manual Comment:\s*(.+?)(?=\s*\||$)/i);

        
        // Save state so sequential pastes build up the full object
        window.ParserState = parsed;
        return parsed;
    },

    parseAlertString: function(alertString, config) {
        if (!alertString || typeof alertString !== 'string') return null;

        // Clean up string, unconditionally strip the case-insensitive "Alert " prefix from the beginning
        alertString = alertString.replace(/^Alert\s+/i, '').trim();
        
        const parts = alertString.split(config.parserRules.delimiter);
        const schema = config.parserRules.schema;
        
        const parsedData = {};
        
        // Map the parsed segments based on the schema order
        schema.forEach((key, index) => {
            if (parts[index] !== undefined) {
                parsedData[key] = parts[index];
            } else {
                parsedData[key] = "";
            }
        });
        
        // Add full original string as part of the data
        parsedData._original_alert = alertString;

        // Extract EMS Data if available
        if (parsedData.site_number && window.EMS_MAPPING) {
            // Normalize site number (e.g. "054" -> "54")
            const normalizedSite = parseInt(parsedData.site_number, 10).toString();
            if (window.EMS_MAPPING[normalizedSite]) {
                const storeData = window.EMS_MAPPING[normalizedSite];
                parsedData.store_racks = storeData.racks || {};
                
                // Determine EMS systems
                if (storeData.ems) {
                    parsedData.store_ems_primary = storeData.ems;
                } else if (storeData.racks) {
                    // Extract unique EMS systems from racks
                    const emsSet = new Set();
                    Object.values(storeData.racks).forEach(rack => {
                        if (rack.ems) emsSet.add(rack.ems);
                    });
                    
                    if (emsSet.size > 0) {
                        parsedData.store_ems_primary = Array.from(emsSet).join(', ');
                    } else {
                        parsedData.store_ems_primary = null;
                    }
                } else {
                    parsedData.store_ems_primary = null;
                }
                
                // Allow EMS Mapping file OR the new Global Config list to flag a remodel
                if (storeData.isRemodel || (config && config.remodels && config.remodels.includes(normalizedSite))) {
                    parsedData.is_remodel = true;
                }
            } else if (config && config.remodels && config.remodels.includes(normalizedSite)) {
                // If it wasn't in EMS mapping, but IS in the remodels list
                parsedData.is_remodel = true;
            }
        } else if (parsedData.site_number && config && config.remodels) {
            const normalizedSite = parseInt(parsedData.site_number, 10).toString();
            if (config.remodels.includes(normalizedSite)) {
                parsedData.is_remodel = true;
            }
        }

        return parsedData;
    }
};
