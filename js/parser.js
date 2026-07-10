const Parser = {
    parseDispatchString: function(dispatchString, config) {
        if (!dispatchString) return null;
        
        let existingState = typeof window !== 'undefined' && window.ParserState ? window.ParserState : {};
        
        let mergedRaw = existingState.raw ? existingState.raw + '\n' + dispatchString : dispatchString;

        let parsed = {
            dispatch_type: 'DISPATCH',
            ...existingState,
            raw: mergedRaw
        };

        const extract = (pattern) => {
            const match = dispatchString.match(pattern);
            return match && match[1] ? match[1].trim() : "";
        };

        const safeExtract = (key, pattern) => {
            const newVal = extract(pattern);
            if (newVal) parsed[key] = newVal;
        };

        safeExtract("reference_number", /Reference#?:?\s*(\d{6}-\d{6})/i);
        if(!parsed.reference_number) safeExtract("reference_number", /(\d{6}-\d{6})/);
        
        safeExtract("contact", /Contact:\s*(.+?)(?=\s*\||$)/i);
        
        if (parsed.contact && parsed.contact === parsed.contact.toUpperCase()) {
            parsed.contact = parsed.contact.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
        }
        
        safeExtract("position", /Position:\s*(.+?)(?=\s*\||$)/i);
        safeExtract("units_affected", /Units Affected:\s*(\d+)/i);
        safeExtract("rack_associated", /Rack Associated:\s*(.+?)(?=\s*\||$)/i);
        safeExtract("systems_affected", /Systems Affected:\s*(.+?)(?=\s*\||$)/i);
        safeExtract("dispatch_message", /Dispatch Message:\s*(.+?)(?=\s*\||$)/i);
        safeExtract("manual_comment", /Manual Comment:\s*(.+?)(?=\s*\||$)/i);

        window.ParserState = parsed;
        return parsed;
    }
};

if (typeof window !== 'undefined') {
    window.Parser = Parser;
}
