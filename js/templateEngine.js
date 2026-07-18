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

            // Return empty string ONLY if the key corresponds to a dynamic form field that is missing/unanswered.
            // If the key does not match any known field id, it's a literal user-defined bracket in standard text (e.g. {Name}).
            if (config && config.activeProfileFields) {
                const isFormAssignedField = config.activeProfileFields.some(f => f.id === key);
                if (!isFormAssignedField) {
                    return match; // It's not a field, it's just raw bracketed text like [or { ] from instructions
                }
            }

            // If it IS a form field but unanswered, clear it out.
            return ""; 
        });

        // Clean up empty fields and their labels.
        // We cannot blindly split by '|' because the raw parsed alert string contains pipes natively (e.g. US|100|...), which breaks them with padding!
        // Instead, we will look for specific patterns: " Label: |" or " Label:   |" and remove them carefully.

        // Remove dangling label structures that evaluated strictly empty
        let lines = output.split('\n');
        let hasChanges = true;

        while(hasChanges) {
            hasChanges = false;
            let newLines = [];
            
            for (let i = 0; i < lines.length; i++) {
                let line = lines[i];
                
                // Is it an empty leaf field? (Ends with colon then space(s) or is completely empty after colon)
                if (/^[ \t]*[^:|\n]+:[ \t]+$/.test(line)) {
                    hasChanges = true;
                    continue; 
                }
                
                // Is it a header with no children in new format? (Ends with colon)
                if (/^[ \t]*[^:|\n]+:[ \t]*$/.test(line)) {
                    // Check next line to see if it's indented MORE than this line.
                    let thisIndent = line.match(/^[ \t]*/)[0].length;
                    
                    let nextLineIndent = -1;
                    for(let j = i + 1; j < lines.length; j++) {
                        if(lines[j].trim() !== "" && !lines[j].includes('|')) {
                            nextLineIndent = lines[j].match(/^[ \t]*/)[0].length;
                            break;
                        }
                    }
                    
                    // If next line has same or less indent, or there are no more non-empty lines, this header is orphaned.
                    if (nextLineIndent <= thisIndent) {
                        hasChanges = true;
                        continue;
                    }
                }
                
                newLines.push(line);
            }
            lines = newLines;
        }
        
        output = lines.join('\n');

        // Additionally fix empty parenthesis structures generated by missing config values "( )"
        output = output.replace(/\s*\(\s*\)/g, "");

        // General cleanup for weird dangling pipes dynamically shifted
        // This removes duplicate pipes " | | " -> " | " and trailing pipes.
        output = output.replace(/(\|\s*){2,}/g, "| ").replace(/^\s*\|\s*/, "").replace(/\s*\|\s*$/, "");
        
        // Final cleanup for excessive blank lines left over from parent structural deletion
        output = output.replace(/\n{3,}/g, "\n\n").trim();

        return output;
    }
};