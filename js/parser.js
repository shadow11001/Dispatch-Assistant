const Parser = {
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
