const TemplateEngine = {
    generateNote: function(templateStr, formData, config) {
        if (!templateStr) return "";
        
        let output = templateStr;
        
        // Replace {reusable_*} keys with text from the Reusable Text Library
        if (config && config.reusableText) {
            const reusableRegex = /{reusable_([^}]+)}/g;
            output = output.replace(reusableRegex, (match, key) => {
                return config.reusableText[key] !== undefined ? config.reusableText[key] : match;
            });
        }
        
        // Replace {variable_name} with actual data. If missing, leave a placeholder
        const regex = /{([^}]+)}/g;
        output = output.replace(regex, (match, key) => {
            // Check if there is data, or if it evaluates essentially empty
            if (formData[key] !== undefined && formData[key] !== "") {
                // If it matches a standardized call result, auto-swap to Reusable Text Library phrase to save typing
                if (key === 'contact_result') {
                    if (formData[key] === "Advised to monitor product" && config.reusableText.monitor_advisement) {
                        return config.reusableText.monitor_advisement;
                    }
                    if (formData[key] === "No Answer / Left Voicemail" && config.reusableText.voicemail_left) {
                        return config.reusableText.voicemail_left;
                    }
                    if (formData[key] === "Call not required" && config.reusableText.not_required) {
                        return config.reusableText.not_required;
                    }
                }
                return formData[key];
            } else if (config && config.activeProfileFields && config.activeProfileFields.find(f => f.id === key && f.visibleIf)) {
                // If this is a hidden conditional field, omit it cleanly rather than showing bracket tags
                 if (!DecisionEngine.checkCondition(config.activeProfileFields.find(f=>f.id === key).visibleIf, formData)) {
                     return ""; // Return blank if it's gracefully hidden
                 }
            }
            
            // If the field is totally empty and optional, we will output empty string, and then we will clean up labels later
            if (key === 'custom_notes' && (!formData[key] || formData[key] === "")) {
                return "";
            }

            // Return empty string for any empty field instead of brackets, so we can clean up labels globally
            return ""; 
        });

        // Clean up empty fields and their labels
        // This regex looks for: Pipeline character, optional spaces, Any text not containing pipe or colon, colon, optional spaces, and then either just pipe or end of string. Wait, no.
        // It's better to just do this: If a section between pipes has no text after the colon, remove it.
        const sections = output.split('|').map(s => s.trim());
        const cleanedSections = sections.filter(s => {
            if (!s.includes(':')) return s !== ""; // Keep it if it doesn't have a colon and isn't empty (like Review [Unknown])
            const parts = s.split(':');
            return parts[1] && parts[1].trim() !== ""; // Keep if there is text after the colon
        });
        output = cleanedSections.join(' | ');

        // Final cleanup for dangling empty pipes where standard output hid something gracefully
        output = output.replace(/\|\s*\|/g, "|").replace(/\|\s*$/, "");

        return output;
    }
};