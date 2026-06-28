const Parser = {
    parseAlertString: function(alertString, config) {
        if (!alertString || typeof alertString !== 'string') return null;

        // Clean up string, remove "Alert " prefix if it exists
        const cleanedStr = alertString.replace(/^Alert\s+/i, '').trim();
        
        const parts = cleanedStr.split(config.parserRules.delimiter);
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
                
                if (storeData.isRemodel) {
                    parsedData.is_remodel = true;
                }
            }
        }

        return parsedData;
    }
};
